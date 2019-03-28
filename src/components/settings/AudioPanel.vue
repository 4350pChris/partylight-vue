<template>
  <v-layout row wrap>
        <v-flex>
          <v-card flat>
            <v-card-actions>
              <v-flex xs12 pl-2>
                <v-radio-group v-model="scaling" label="Scaling Strategy">
                  <v-radio
                    v-for="[name, val] in scalingStrategies"
                    :key="name"
                    :label="val"
                    :value="Number(name)"
                  ></v-radio>
                </v-radio-group>
                <v-switch v-model="useAverage" label="Use Average"></v-switch>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex v-for="(item, key) in audioPanel" :key="key">
          <slider-card
            :title="item.title"
            :min="item.min"
            :max="item.max"
            @input="item.update($event)"
            :value="item.value"
          ></slider-card>
        </v-flex>
      </v-layout>
</template>

<script lang="ts">
import { Action, State, Mutation } from 'vuex-class';
import { Actions as AlertActions } from '@/store/alert';
import { Actions as AudioActions, initAudio } from '@/store/audio';
import { Component, Vue } from 'vue-property-decorator';
import { debounce } from 'lodash';
import { StoreState } from '@/store';
import AudioParameters, { ScalingStrategy } from '@/models/audioParameters';
import SliderCard from '@/components/shared/SliderCard.vue';

@Component({
  components: { SliderCard }
})
export default class AudioPanel extends Vue {
  @State((store: StoreState) => store.audio.parameters)
  private audioParameters!: AudioParameters;

  @Action(AlertActions.ShowAlert)
  private showAlert!: (
    payload: { type: string; duration?: number; message: string }
  ) => void;

  private get audioPanel() {
    return [
      {
        min: 0,
        max: 20000,
        update: debounce(
          ([min, max]: number[]) =>
            this.saveParameters({
              minimumFrequency: min,
              maximumFrequency: max
            }),
          350
        ),
        title: 'Frequency (in Hz)',
        value: [
          this.audioParameters.minimumFrequency,
          this.audioParameters.maximumFrequency
        ]
      },
      {
        min: 1,
        max: 32,
        update: ([e, ...rest]: number[]) =>
          this.saveParameters({ numberOfChannels: e }),
        title: 'Number of Channels',
        value: [this.audioParameters.numberOfChannels]
      },
      {
        min: 0,
        max: 255,
        update: ([e, ...rest]: number[]) =>
          this.saveParameters({ maximumAmplitude: e }),
        title: 'Maximum Amplitude',
        value: [this.audioParameters.maximumAmplitude]
      }
    ];
  }

  private get useAverage(): boolean {
    return this.audioParameters.useAverage;
  }

  private set useAverage(avg: boolean) {
    this.saveParameters({ useAverage: avg });
  }

  private get scaling(): number {
    return this.audioParameters.scalingStrategy;
  }

  private set scaling(n: number) {
    this.saveParameters({ scalingStrategy: n });
  }

  public get scalingStrategies(): Array<[string, any]> {
    return Object.entries(ScalingStrategy).filter(
      ([key, value]) => !isNaN(Number(key))
    );
  }

  private savingFailed(e: any) {
    this.showAlert({
      type: 'error',
      message: 'Failed saving settings.<br>' + e
    });
  }

  private saveParameters(params: Partial<AudioParameters>) {
    this.$store.dispatch(AudioActions.SaveParameters, params)
      .catch(e => (this.savingFailed(e)));
  }

  private created() {
    initAudio(this.$store).catch(e =>
      this.showAlert({
        type: 'error',
        message: 'Failed getting audio settings from server.<br>' + e
      })
    );
  }
}
</script>

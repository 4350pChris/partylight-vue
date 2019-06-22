<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap>
      <v-flex>
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
      <v-flex v-for="(item, key) in audioPanel" :key="key" xs12 md6>
        <div class="subtitle-1 text-xs-center mb-1">{{ item.title }}</div>
        <slider-card
          :name="`${item.title}-slider`"
          :min="item.min"
          :max="item.max"
          @input="item.update($event)"
          :value="item.value"
        ></slider-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Action, State, Mutation } from 'vuex-class';
import { Actions as AudioActions } from '@/store/audio';
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { debounce } from 'lodash';
import { StoreState, Actions as RootActions, InitFunctions } from '@/store';
import AudioParameters, { ScalingStrategy } from '@/models/audioParameters';
import SliderCard from '@/components/shared/SliderCard.vue';
import InitModule from '@/mixins/initModule';
import Alert from '@/mixins/alert';

@Component({
  components: { SliderCard }
})
export default class AudioPanel extends Mixins(Alert, InitModule) {
  @State((store: StoreState) => store.audio.parameters)
  private audioParameters!: AudioParameters;

  @Action(AudioActions.SaveParameters)
  private saveParameters!: (params: Partial<AudioParameters>) => Promise<void>;

  private get audioPanel() {
    return [
      {
        min: 0,
        max: 20000,
        update: debounce(
          ([min, max]: number[]) =>
            this.save({
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
          this.save({ numberOfChannels: e }),
        title: 'Number of Channels',
        value: [this.audioParameters.numberOfChannels]
      },
      {
        min: 0,
        max: 255,
        update: ([e, ...rest]: number[]) =>
          this.save({ maximumAmplitude: e }),
        title: 'Maximum Amplitude',
        value: [this.audioParameters.maximumAmplitude]
      }
    ];
  }

  private get useAverage(): boolean {
    return this.audioParameters.useAverage;
  }

  private set useAverage(avg: boolean) {
    this.save({ useAverage: avg });
  }

  private get scaling(): number {
    return this.audioParameters.scalingStrategy;
  }

  private set scaling(n: number) {
    this.save({ scalingStrategy: n });
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

  private save(params: Partial<AudioParameters>) {
    this.saveParameters(params).catch((e: any) => this.savingFailed(e));
  }

  private created() {
    this.initModule('audio').catch((e: any) => this.showAlert({
        type: 'error',
        message: 'Failed getting audio settings from server.<br>' + e
      })
    );
  }
}
</script>

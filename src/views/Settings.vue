<template>
    <v-tabs v-model="tab" class="elevation-2" centered fixed-tabs>
      <v-tab v-for="(name, i) in ['Settings', 'Audio Parameters']" :key="i">
        {{name}}
      </v-tab>
      <v-tab-item>
        <v-layout row wrap>
          <v-flex v-for="(item, key) in settingsPanel" :key="key">
            <v-card flat>
              <v-card-title primary-title>{{item.title}}</v-card-title>
              <v-card-text>
                <slider-card
                  :min="item.min"
                  :max="item.max"
                  @input="item.update($event)"
                  :value="item.value"
                ></slider-card>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
      <v-tab-item>
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
            <v-card height="100%" flat>
              <v-card-title primary-title>{{item.title}}</v-card-title>
              <v-card-text>
                <slider-card
                  :min="item.min"
                  :max="item.max"
                  @input="item.update($event)"
                  :value="item.value"
                ></slider-card>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
import { Action, State, Mutation } from 'vuex-class';
import Settings from '@/models/settings';
import SliderCard from '@/components/SliderCard.vue';
import AlertMixin from '@/mixins/Alert.vue';
import { StoreState } from '@/store';
import { initSettings, Actions as SettingsActions } from '@/store/settings';
import { initAudio, Actions as AudioActions } from '@/store/audio';
import AudioParameters, { ScalingStrategy } from '@/models/audioParameters';
import { debounce } from 'lodash';

interface PanelProps {
  min?: number;
  max?: number;
  update: (e: any) => any;
  title: string;
  value: any;
}

@Component({
  components: { SliderCard }
})
export default class SettingsList extends Mixins(AlertMixin) {
  private tab = 0;

  @State((store: StoreState) => store.settings)
  private settings!: Settings;

  @State((store: StoreState) => store.audio.parameters)
  private audioParameters!: AudioParameters;

  private get settingsPanel(): PanelProps[] {
    return [
      {
        min: 0,
        max: 100,
        update: (e: number) => this.setSettings({ brightness: e }),
        title: 'Brightness',
        value: this.settings.brightness
      },
      {
        min: 0,
        max: 100,
        update: (e: number) => this.setSettings({ delay: e }),
        title: 'Delay',
        value: this.settings.delay
      }
    ];
  }

  private get audioPanel(): PanelProps[] {
    return [
      {
        min: 0,
        max: 20000,
        update: debounce((e: number[]) => this.saveParameters(
          { minimumFrequency: e[0], maximumFrequency: e[1] }), 350),
        title: 'Frequency',
        value: [this.audioParameters.minimumFrequency, this.audioParameters.maximumFrequency]
      },
      {
        min: 1,
        max: 32,
        update: (e: number) => this.saveParameters({ numberOfChannels: e }),
        title: 'Number of Channels',
        value: this.audioParameters.numberOfChannels
      },
      {
        min: 0,
        max: 255,
        update: (e: number) => this.saveParameters({ maximumAmplitude: e }),
        title: 'Maximum Amplitude',
        value: this.audioParameters.maximumAmplitude
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
    return Object.entries(ScalingStrategy).filter(([key, value]) => !isNaN(Number(key)));
  }

  private async setSettings(
    settings: Partial<Record<keyof Settings, Settings[keyof Settings]>>
  ) {
    try {
      await this.$store.dispatch(SettingsActions.SaveSettings, settings);
    } catch (e) {
      this.showAlert({
        type: 'error',
        message: 'Failed saving settings.<br>' + e
      });
    }
  }

  private async saveParameters(
    params: Partial<Record<keyof AudioParameters, AudioParameters[keyof AudioParameters]>>
  ) {
    try {
      await this.$store.dispatch(AudioActions.SaveParameters, params);
    } catch (e) {
      this.showAlert({
        type: 'error',
        message: 'Failed saving audio parameters.<br>' + e
      });
    }
  }

  private created() {
    initSettings(this.$store).catch(e =>
      this.showAlert({
        type: 'error',
        message: 'Failed getting settings from server.<br>' + e
      }));
  }
}
</script>

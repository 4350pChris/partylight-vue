<template>
  <v-tabs v-model="tab" class="elevation-2" centered fixed-tabs>
    <v-tab v-for="(name, i) in ['Visual', 'Audio']" :key="i">{{name}}</v-tab>
    <v-tab-item>
      <v-layout row wrap>
        <v-flex v-for="(item, key) in settingsPanel" :key="key">
          <slider-card
            :title="item.title"
            :min="item.min"
            :max="item.max"
            :step="item.step"
            @input="item.update($event)"
            :value="item.value"
          ></slider-card>
        </v-flex>
        <v-flex>
          <color-picker
            v-model="color"
            :class="['elevation-0', 'v-card', { 'theme--dark': theme.isDark }]"
          ></color-picker>
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
          <slider-card
            :title="item.title"
            :min="item.min"
            :max="item.max"
            @input="item.update($event)"
            :value="item.value"
          ></slider-card>
        </v-flex>
      </v-layout>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Inject } from 'vue-property-decorator';
import { Action, State, Mutation } from 'vuex-class';
import Settings, { Color } from '@/models/settings';
import AudioParameters, { ScalingStrategy } from '@/models/audioParameters';
import SliderCard from '@/components/SliderCard.vue';
import AlertMixin from '@/mixins/Alert.vue';
import { StoreState } from '@/store';
import {
  initSettings,
  Actions as SettingsActions,
  Actions
} from '@/store/settings';
import { initAudio, Actions as AudioActions } from '@/store/audio';
import { initDMX, Actions as DMXActions, State as DMXState } from '@/store/dmx';
import { debounce } from 'lodash';
import { Chrome as ColorPicker } from 'vue-color';

interface PanelProps {
  min?: number;
  max?: number;
  step?: number;
  update: (e: number[]) => void;
  title: string;
  value: number[];
}

@Component({
  components: { ColorPicker, SliderCard }
})
export default class SettingsList extends Mixins(AlertMixin) {
  private tab = 0;

  @Inject() private theme!: { isDark: boolean };

  @State((store: StoreState) => store.settings)
  private settings!: Settings;

  @State((store: StoreState) => store.audio.parameters)
  private audioParameters!: AudioParameters;

  @State((store: StoreState) => store.dmx.samplingRate)
  private samplingRate!: number;

  @State((store: StoreState) => store.dmx.lengthOfUniverse)
  private lengthOfUniverse!: number;

  @Action(DMXActions.SaveSamplingRate)
  private saveSamplingRate!: (rate: number) => Promise<void>;

  @Action(DMXActions.SaveLengthOfUniverse)
  private saveLengthOfUniverse!: (rate: number) => Promise<void>;

  private get color() {
    return this.settings.color;
  }

  private set color(color: any) {
    this.saveSettings({ color: color.rgba });
  }

  private get settingsPanel(): PanelProps[] {
    return [
      {
        min: 0,
        max: 100,
        update: ([e, ...rest]: number[]) =>
          this.saveSettings({ brightness: e }),
        title: 'Brightness (in %)',
        value: [this.settings.brightness]
      },
      {
        min: 0,
        max: 100,
        step: 10,
        update: ([e, ...rest]: number[]) => this.saveSettings({ delay: e }),
        title: 'Delay (in ms)',
        value: [this.settings.delay]
      },
      {
        min: 50,
        max: 1000,
        step: 50,
        update: ([e, ...rest]: number[]) => this.saveDMXParameters({ samplingRate: e }),
        title: 'Sampling Rate (in ms)',
        value: [this.samplingRate]
      },
      {
        min: 1,
        max: 255,
        update: ([e, ...rest]: number[]) => this.saveDMXParameters({ lengthOfUniverse: e }),
        title: 'Length of Universe',
        value: [this.lengthOfUniverse]
      }
    ];
  }

  private get audioPanel(): PanelProps[] {
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

  private async saveSettings(
    settings: Partial<Record<keyof Settings, Settings[keyof Settings]>>
  ) {
    try {
      await this.$store.dispatch(SettingsActions.SaveSettings, settings);
    } catch (e) {
      this.savingFailed(e);
    }
  }

  private async saveDMXParameters({ lengthOfUniverse, samplingRate }: Partial<DMXState>) {
    try {
      const calls = [];
      if (lengthOfUniverse !== undefined) {
        calls.push(this.saveLengthOfUniverse(lengthOfUniverse));
      }
      if (samplingRate !== undefined) {
        calls.push(this.saveSamplingRate(samplingRate));
      }
      await Promise.all(calls);
    } catch (e) {
      this.savingFailed(e);
    }
  }

  private async saveParameters(params: Partial<AudioParameters>) {
    try {
      await this.$store.dispatch(AudioActions.SaveParameters, params);
    } catch (e) {
      this.savingFailed(e);
    }
  }

  private created() {
    initSettings(this.$store).catch(e =>
      this.showAlert({
        type: 'error',
        message: 'Failed getting general settings from server.<br>' + e
      })
    );
    initAudio(this.$store).catch(e =>
      this.showAlert({
        type: 'error',
        message: 'Failed getting audio settings from server.<br>' + e
      })
    );
  }
}
</script>

<style>
.vc-chrome-body {
  background-color: inherit !important;
}

.vc-editable-input input,
.vc-editable-input span {
  color: inherit !important;
}

.vc-chrome.theme--dark path {
  fill: white !important;
}
</style>

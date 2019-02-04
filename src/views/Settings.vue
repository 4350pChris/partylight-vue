<template>
  <v-container>
    <v-expansion-panel class="elevation-4">
      <v-expansion-panel-content>
        <div slot="header">Settings</div>
        <v-card v-for="(item, key) in settingsPanel" :key="key">
          <v-divider v-if="key"/>
          <v-card-title>{{item.title}}</v-card-title>
          <v-card-text>
            <slider-card
              :min="item.min"
              :max="item.max"
              @input="item.update($event)"
              :value="item.value"
            ></slider-card>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">Audio Parameters</div>
        <v-card v-for="(item, key) in audioPanel" :key="key">
          <v-divider v-if="key"/>
          <v-card-title>{{item.title}}</v-card-title>
          <v-card-text>
            <slider-card
              :min="item.min"
              :max="item.max"
              @input="item.update($event)"
              :value="item.value"
            ></slider-card>
          </v-card-text>
        </v-card>
        <v-divider/>
        <v-card>
          <v-card-text>
            <v-layout row justify-space-around>
              <v-flex shrink>
                <v-switch v-model="useAverage" label="Use Average"></v-switch>
              </v-flex>
              <v-flex shrink>
                <p>Scaling Strategy</p>
                <v-radio-group v-model="scaling" row>
                  <v-radio
                    v-for="strat in scalingStrategies"
                    :key="strat"
                    :label="strat"
                    :value="strat"
                  ></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
import { Action, State, Mutation } from 'vuex-class';
import { Mutations } from '@/store/settings/mutations';
import Settings from '@/models/settings';
import SliderCard from '@/components/SliderCard.vue';
import AlertMixin from '@/mixins/Alert.vue';
import { StoreState } from '@/store';
import { initSettings } from '@/store/settings';
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
  @State((store: StoreState) => store.settings)
  private settings!: Settings;

  @State((store: StoreState) => store.audio.parameters)
  private audioParameters!: AudioParameters;

  private get settingsPanel(): PanelProps[] {
    return [
      {
        min: 0,
        max: 100,
        update: (e: number) => this.alertingSetSettings({ brightness: e }),
        title: 'Brightness',
        value: this.settings.brightness
      },
      {
        min: 0,
        max: 100,
        update: (e: number) => this.alertingSetSettings({ delay: e }),
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
        update: debounce((e: number[]) => this.alertingSaveParameters(
          { minimumFrequency: e[0], maximumFrequency: e[1] }), 350),
        title: 'Frequency',
        value: [this.audioParameters.minimumFrequency, this.audioParameters.maximumFrequency]
      },
      {
        min: 1,
        max: 32,
        update: (e: number) => this.alertingSaveParameters({ numberOfChannels: e }),
        title: 'Number of Channels',
        value: this.audioParameters.numberOfChannels
      },
      {
        min: 0,
        max: 255,
        update: (e: number) => this.alertingSaveParameters({ maximumAmplitude: e }),
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

  public get scalingStrategies(): string[] {
    return Object.keys(ScalingStrategy).filter(key => isNaN(Number(key)));
  }

  @Mutation(Mutations.SetSettings)
  private setSettings!: (settings: Partial<Record<keyof Settings, Settings[keyof Settings]>>) => Promise<void>;

  private alertingSetSettings = (
    settings: Partial<Record<keyof Settings, Settings[keyof Settings]>>
  ) => this.setSettings(settings).catch(e => this.showAlert({
    type: 'error',
    message: 'Error while saving audio settings'
  }));


  @Action(AudioActions.SaveParameters)
  private saveParameters!:
    (params: Partial<Record<keyof AudioParameters, AudioParameters[keyof AudioParameters]>>) => Promise<void>;

  private alertingSaveParameters(
    params: Partial<Record<keyof AudioParameters, AudioParameters[keyof AudioParameters]>>) {
      this.saveParameters(params).catch(e => this.showAlert({
        type: 'error',
        message: 'Failed saving audio parameters.<br>' + e
      }));
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

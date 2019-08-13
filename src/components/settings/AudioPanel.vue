<template>
  <v-expansion-panels accordion focusable>
    <v-expansion-panel>
      <v-expansion-panel-header #default="{ open }" ripple>
        Scaling Stragegy
        <v-fade-transition leave-absolute>
          <span v-if="!open" class="text--secondary pl-4">{{ scalingName }}</span>
        </v-fade-transition>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-radio-group v-model="scaling" row>
          <v-radio
            v-for="[name, val] in scalingStrategies"
            :key="name"
            :label="val"
            :value="Number(name)"
          ></v-radio>
        </v-radio-group>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header #default="{ open }" ripple>
        Use Average
        <span v-if="!open" class="text--secondary pl-4">{{ useAverage }}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-switch v-model="useAverage"></v-switch>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <PanelItem v-for="item in audioPanel" :key="item.title" :value="item"/>      
  </v-expansion-panels>
</template>

<script lang="ts">
import { Action, State, Mutation } from 'vuex-class';
import { Actions as AudioActions } from '@/store/audio';
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { debounce } from 'lodash';
import { StoreState, Actions as RootActions, InitFunctions } from '@/store';
import AudioParameters, { ScalingStrategy } from '@/models/audioParameters';
import InitModule from '@/mixins/initModule';
import Alert from '@/mixins/alert';
import PanelItem, { Item } from './PanelItem.vue';

@Component({
  components: { PanelItem }
})
export default class AudioPanel extends Mixins(Alert, InitModule) {
  @State((store: StoreState) => store.audio.parameters)
  audioParameters!: AudioParameters;

  @Action(AudioActions.SaveParameters)
  saveParameters!: (params: Partial<AudioParameters>) => Promise<void>;

  get audioPanel(): Item[] {
    return [
      {
        min: 0,
        max: 20000,
        update: debounce(
          ([min, max]: number[]) => this.save({
            minimumFrequency: min,
            maximumFrequency: max
          }),
          350
        ),
        title: 'Frequency',
        unit: 'Hz',
        value: [
          this.audioParameters.minimumFrequency,
          this.audioParameters.maximumFrequency
        ]
      },
      {
        min: 1,
        max: 32,
        update: ([e, ...rest]: number[]) => this.save({ numberOfChannels: e }),
        title: 'Number of Channels',
        value: [this.audioParameters.numberOfChannels]
      },
      {
        min: 0,
        max: 255,
        update: ([e, ...rest]: number[]) => this.save({ maximumAmplitude: e }),
        title: 'Maximum Amplitude',
        value: [this.audioParameters.maximumAmplitude]
      }
    ];
  }

  get useAverage(): boolean {
    return this.audioParameters.useAverage;
  }

  set useAverage(avg: boolean) {
    this.save({ useAverage: avg });
  }

  get scaling(): number {
    return this.audioParameters.scalingStrategy;
  }

  set scaling(n: number) {
    this.save({ scalingStrategy: n });
  }

  get scalingName() {
    return ScalingStrategy[this.scaling];
  }

  get scalingStrategies(): Array<[string, any]> {
    return Object.entries(ScalingStrategy).filter(
      ([key, value]) => !isNaN(Number(key))
    );
  }

  savingFailed(e: any) {
    this.showAlert({
      type: 'error',
      message: 'Failed saving settings.<br>' + e
    });
  }

  save(params: Partial<AudioParameters>) {
    this.saveParameters(params).catch((e: any) => this.savingFailed(e));
  }

  created() {
    this.initModule('audio').catch((e: any) => this.showAlert({
        type: 'error',
        message: 'Failed getting audio settings from server.<br>' + e
      })
    );
  }
}
</script>

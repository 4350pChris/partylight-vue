<template>
  <v-expansion-panels accordion focusable>
    <PanelItem v-for="item in settingsPanel" :key="item.title" :value="item" />      
    <v-expansion-panel>
      <v-expansion-panel-header #default="{ open }" class="py-0" ripple>
        <v-layout align-center>
          <v-flex shrink>Color</v-flex>
          <v-flex pl-4>
            <v-fade-transition>
              <svg v-if="!open" height="24px">
                <circle cx="12" cy="12" r="12" :fill="settings.color.hex8"></circle>
              </svg>
            </v-fade-transition>
          </v-flex>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <color-picker :value="settings.color" @input="colorChanged"></color-picker>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Action, State, Mutation } from 'vuex-class';
import { Slider as ColorPicker } from 'vue-color';
import { throttle } from 'lodash';
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { Actions as DMXActions, State as DMXState } from '@/store/dmx';
import { Actions as SettingsActions, Actions, State as SettingsState } from '@/store/settings';
import { StoreState } from '@/store';
import InitModule from '@/mixins/initModule';
import Alert from '@/mixins/alert';
import { RGBAtoHex } from 'vuetify/src/util/colorUtils';
import PanelItem, { Item } from './PanelItem.vue';
import { Frequency, Percentage, Millisecond } from '@/models/measurement';

@Component({
  components: { ColorPicker, PanelItem }
})
export default class VisualPanel extends Mixins(Alert, InitModule) {
  @State((store: StoreState) => store.settings)
  settings!: SettingsState;

  @State((store: StoreState) => store.dmx.samplingRate)
  samplingRate!: Frequency;

  @State((store: StoreState) => store.dmx.lengthOfUniverse)
  lengthOfUniverse!: number;

  @Action(DMXActions.SaveSamplingRate)
  saveSamplingRate!: (rate: number) => Promise<void>;

  @Action(DMXActions.SaveLengthOfUniverse)
  saveLengthOfUniverse!: (rate: number) => Promise<void>;

  @Action(SettingsActions.SaveSettings)
  saveSettings!: (state: Partial<SettingsState>) => Promise<void>;

  colorChanged = throttle((color: any) => this.displayMsgOnError(() => this.saveSettings({ color })), 500);

  get settingsPanel(): Item[] {
    return [
      {
        min: 0,
        max: 100,
        update: ([e, ...rest]: number[]) => this.saveSettings({ brightness: new Percentage(e) }),
        title: 'Brightness',
        unit: this.settings.brightness.unit,
        value: [this.settings.brightness.value]
      },
      {
        min: 0,
        max: 100,
        step: 10,
        update: ([e, ...rest]: number[]) => this.saveSettings({ delay: new Millisecond(e) }),
        title: 'Delay',
        unit: this.settings.delay.unit,
        value: [this.settings.delay.value]
      },
      {
        min: 50,
        max: 1000,
        step: 50,
        update: ([e, ...rest]: number[]) => this.saveSamplingRate(e),
        title: 'Sampling Rate',
        unit: this.samplingRate.unit,
        value: [this.samplingRate.value]
      },
      {
        min: 1,
        max: 255,
        update: ([e, ...rest]: number[]) => this.saveLengthOfUniverse(e),
        title: 'Length of Universe',
        value: [this.lengthOfUniverse]
      }
    ].map(item => ({
      ...item,
      // wrap all update functions to show an error on failure
      update: (args: number[]) => this.displayMsgOnError(() => item.update(args))
    }));
  }

  displayMsgOnError(fn: () => Promise<any>) {
    return fn().catch(e => this.showAlert({
      type: 'error',
      message: 'Failed saving settings.<br>' + e
    }));
  }

  created() {
    Promise.all([
      this.initModule('settings'),
      this.initModule('dmx')
    ]).catch((e: any) =>
      this.showAlert({
        type: 'error',
        message: 'Failed getting visual settings from server.<br>' + e
      })
    );
  }
}
</script>

<style lang="scss">
.vc-slider {
  display: flex;
  flex-flow: row wrap;
  width: auto !important;
  padding: 5px;

  > div {
    flex-basis: 300px;
    flex-grow: 1;
    margin: 5px;
    margin-top: 20px;
  }
}
</style>

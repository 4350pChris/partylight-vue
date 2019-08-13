<template>
  <v-expansion-panels accordion>
    <PanelItem v-for="item in settingsPanel" :key="item.title" :value="item" />      
    <v-expansion-panel>
      <v-expansion-panel-header #default="{ open }" class="py-0">
        <v-layout align-center>
          <v-flex shrink>Color</v-flex>
          <v-flex pl-4>
            <v-fade-transition>
              <svg v-if="!open" height="24px">
                <circle cx="12" cy="12" r="12" :fill="colorFill"></circle>
              </svg>
            </v-fade-transition>
          </v-flex>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <color-picker
          :value="color"
          @input="color = $event.rgba"
          :class="{'theme--dark': theme.isDark }"
        ></color-picker>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Action, State, Mutation } from 'vuex-class';
import { Chrome as ColorPicker } from 'vue-color';
import { Component, Inject, Mixins, Vue } from 'vue-property-decorator';
import { Actions as DMXActions, State as DMXState } from '@/store/dmx';
import { Actions as SettingsActions, Actions } from '@/store/settings';
import { StoreState } from '@/store';
import Settings, { Color } from '@/models/settings';
import InitModule from '@/mixins/initModule';
import Alert from '@/mixins/alert';
import { RGBAtoHex } from 'vuetify/src/util/colorUtils';
import PanelItem, { Item } from './PanelItem.vue';

@Component({
  components: { ColorPicker, PanelItem }
})
export default class VisualPanel extends Mixins(Alert, InitModule) {
  @Inject() theme!: { isDark: boolean };

  @State((store: StoreState) => store.settings)
  settings!: Settings;

  @State((store: StoreState) => store.dmx.samplingRate)
  samplingRate!: number;

  @State((store: StoreState) => store.dmx.lengthOfUniverse)
  lengthOfUniverse!: number;

  @Action(DMXActions.SaveSamplingRate)
  saveSamplingRate!: (rate: number) => Promise<void>;

  @Action(DMXActions.SaveLengthOfUniverse)
  saveLengthOfUniverse!: (rate: number) => Promise<void>;

  get colorFill() {
    return RGBAtoHex(this.color);
  }

  get color(): Color {
    return this.settings.color;
  }

  set color(color: Color) {
    this.saveSettings({ color });
  }

  get settingsPanel(): Item[] {
    return [
      {
        min: 0,
        max: 100,
        update: ([e, ...rest]: number[]) => this.saveSettings({ brightness: e }),
        title: 'Brightness',
        unit: '%',
        value: [this.settings.brightness]
      },
      {
        min: 0,
        max: 100,
        step: 10,
        update: ([e, ...rest]: number[]) => this.saveSettings({ delay: e }),
        title: 'Delay',
        unit: 'ms',
        value: [this.settings.delay]
      },
      {
        min: 50,
        max: 1000,
        step: 50,
        update: ([e, ...rest]: number[]) => this.saveDMXParameters({ samplingRate: e }),
        title: 'Sampling Rate',
        unit: 'ms',
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

  saveSettings(settings: Partial<Settings>) {
    this.$store.dispatch(SettingsActions.SaveSettings, settings)
      .catch(e => (this.savingFailed(e)));
  }

  saveDMXParameters({ lengthOfUniverse, samplingRate }: Partial<DMXState>) {
    const calls = [];
    if (lengthOfUniverse !== undefined) {
      calls.push(this.saveLengthOfUniverse(lengthOfUniverse));
    }
    if (samplingRate !== undefined) {
      calls.push(this.saveSamplingRate(samplingRate));
    }
    Promise.all(calls).catch(e => (this.savingFailed(e)));
  }

  savingFailed(e: any) {
    this.showAlert({
      type: 'error',
      message: 'Failed saving settings.<br>' + e
    });
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
.vc-chrome.theme--dark {
  .vc-chrome-body {
    background-color: #303030 !important;
  }

  path {
    fill: white !important;
  }
}

.vc-editable-input {
  input, span {
    color: inherit !important;
  }
}
</style>

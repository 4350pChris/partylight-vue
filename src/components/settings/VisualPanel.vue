<template>
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
        :value="color"
        @input="color = $event.rgba"
        :class="['elevation-0', 'v-card', { 'theme--dark': theme.isDark }]"
      ></color-picker>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Action, State, Mutation } from 'vuex-class';
import { Chrome as ColorPicker } from 'vue-color';
import { Component, Inject, Mixins, Vue } from 'vue-property-decorator';
import { Actions as DMXActions, State as DMXState } from '@/store/dmx';
import { Actions as SettingsActions, Actions } from '@/store/settings';
import { StoreState } from '@/store';
import Settings, { Color } from '@/models/settings';
import SliderCard from '@/components/shared/SliderCard.vue';
import InitModule from '@/mixins/initModule';
import Alert from '@/mixins/alert';

@Component({
  components: { ColorPicker, SliderCard }
})
export default class VisualPanel extends Mixins(Alert, InitModule) {
  @Inject() private theme!: { isDark: boolean };

  @State((store: StoreState) => store.settings)
  private settings!: Settings;

  @State((store: StoreState) => store.dmx.samplingRate)
  private samplingRate!: number;

  @State((store: StoreState) => store.dmx.lengthOfUniverse)
  private lengthOfUniverse!: number;

  @Action(DMXActions.SaveSamplingRate)
  private saveSamplingRate!: (rate: number) => Promise<void>;

  @Action(DMXActions.SaveLengthOfUniverse)
  private saveLengthOfUniverse!: (rate: number) => Promise<void>;

  private get color(): Color {
    return this.settings.color;
  }

  private set color(color: Color) {
    this.saveSettings({ color });
  }

  private get settingsPanel() {
    return [
      {
        min: 0,
        max: 100,
        update: ([e, ...rest]: number[]) => this.saveSettings({ brightness: e }),
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

  private saveSettings(settings: Partial<Settings>) {
    this.$store.dispatch(SettingsActions.SaveSettings, settings)
      .catch(e => (this.savingFailed(e)));
  }

  private saveDMXParameters({ lengthOfUniverse, samplingRate }: Partial<DMXState>) {
    const calls = [];
    if (lengthOfUniverse !== undefined) {
      calls.push(this.saveLengthOfUniverse(lengthOfUniverse));
    }
    if (samplingRate !== undefined) {
      calls.push(this.saveSamplingRate(samplingRate));
    }
    Promise.all(calls).catch(e => (this.savingFailed(e)));
  }

  private savingFailed(e: any) {
    this.showAlert({
      type: 'error',
      message: 'Failed saving settings.<br>' + e
    });
  }

  private created() {
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


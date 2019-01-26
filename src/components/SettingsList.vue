<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <slider-card
          v-for="(value, key) in sliders" :key="key"
          :title="key" :value="value" @end="updateSettings(key, $event)">
        </slider-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { Mutations } from '@/store/settings/mutations';
import Settings from '@/models/settings';
import SliderCard from '@/components/SliderCard.vue';

@Component({
  components: { SliderCard }
})
export default class SettingsList extends Vue {
  @State(store => store.settings) private settings!: Settings;

  @Mutation(Mutations.SetSettings) private setSettings!: (settings: Settings) => void;

  private get sliders() {
    return {
      brightness: this.settings.brightness,
      delay: this.settings.delay
    };
  }

  private updateSettings(key: keyof Settings, value: Settings[typeof key]) {
    this.setSettings(Object.assign({ ... this.settings }, { [key]: value }));
  }
}
</script>

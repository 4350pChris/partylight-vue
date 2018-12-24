<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card 
          v-for="(value, key) in settings"
          :key="key"
        >
          <v-card-title>{{ key | capitalize }}</v-card-title>
          <v-card-text>
            <v-slider
            :value="value"
            @end="updateSetting(key, $event)"
            thumb-label="always"
          ></v-slider>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Settings } from '@/api/settings';
import { MUTATIONS } from '@/store/settings/mutations';

@Component
export default class SettingsList extends Vue {
  get settings() {
    return this.$store.state.settings;
  }

  public updateSetting(key: keyof Settings, value: any) {
    const cpy = this.settings;
    cpy[key] = value;
    this.$store.commit(MUTATIONS.SET_SETTINGS, cpy);
  }
}
</script>

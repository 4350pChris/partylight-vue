<template>
  <div>
    <div v-for="(value, key) in settings" :key="key">
      <h2>{{key}}: {{value}}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Settings } from '@/api/settings';

@Component
export default class SettingsList extends Vue {
  private settings: Settings = this.$store.state.settings;
}
</script>

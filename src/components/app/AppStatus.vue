<template>
  <v-container fluid>
    <v-layout wrap text-xs-center>
      <v-flex>Sampling Rate - {{ samplingRate }}</v-flex>
      <v-flex>Packets / sec - {{ packetsPerSecond }}</v-flex>
      <v-flex>Max Frequency - {{ maximumFrequency }}</v-flex>
      <v-flex>Used Frequency - {{ usedFrequency }}</v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { State } from 'vuex-class';
import { StoreState } from '@/store';

@Component
export default class AppStatus extends Vue {
  @State((store: StoreState) => store.dmx.samplingRate)
  samplingRate!: number;

  @State((store: StoreState) => store.dmx.packetsPerSecond)
  packetsPerSecond!: number;

  @State((store: StoreState) => store.dmx.maximumFrequency)
  maximumFrequency!: number;

  @State((store: StoreState) => store.dmx.usedFrequency)
  usedFrequency!: number;
}
</script>

<template>
  <v-layout row wrap>
    <v-flex>
      <v-card>
        <v-card-title>
          <v-label>Packets per Second</v-label>
        </v-card-title>
        <v-sheet color="transparent">
          <v-sparkline
            :value="packetsPerSecond"
            :labels="time"
            auto-draw
          ></v-sparkline>
        </v-sheet>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Mixins, Watch } from 'vue-property-decorator';
import AlertMixin from '@/mixins/Alert.vue';
import { Action, State, Mutation } from 'vuex-class';
import { StoreState } from '@/store';
import { State as DMXState } from '@/store/dmx';

@Component
export default class Status extends Mixins(AlertMixin) {
  @State((store: StoreState) => store.dmx)
  private dmx!: DMXState;

  private time: number[] = [];

  private packetsPerSecond: number[] = [];

  private samplingRates: number[] = [];

  private currentTime: number = 0;

  private mounted() {
    setInterval(() => {
        this.time.push(this.currentTime);
        this.packetsPerSecond.push(this.dmx.packetsPerSecond + 20 * this.time[this.currentTime]);
        this.samplingRates.push(this.dmx.samplingRate);
        this.currentTime += 1;
    }, 1000);
  }
}
</script>

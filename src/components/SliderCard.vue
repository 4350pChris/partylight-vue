<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <div
        :is="typeof range === 'undefined' ? 'v-slider' : 'v-range-slider'"
        :value="value"
        :min="range.min"
        :max="range.max"
        @end="$emit('end', $event)"
        thumb-label='always'
      ></div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component
export default class SliderCard extends Vue {
    @Prop() private value!: number;
    @Prop({ type: { min: Number, max: Number } }) private range?: { min: number, max: number };
    @Prop() private title!: string;
}
</script>

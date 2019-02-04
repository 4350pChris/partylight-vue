<template>
  <v-card>
    <v-card-title>{{ title | capitalize }}</v-card-title>
    <v-card-text>
      <div
        :is="range ? 'v-range-slider' : 'v-slider'"
        :value="value"
        :min="min"
        :max="max"
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
    @Prop({ type: Boolean, default: false }) private range!: boolean;
    @Prop() private min?: number;
    @Prop() private max?: number;
    @Prop() private title!: string;
}
</script>

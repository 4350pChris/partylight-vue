<template>
  <v-card>
    <v-card-title>{{ title | capitalize }}</v-card-title>
    <v-card-text>
      <v-slider :value="value" @end="$emit('end', $event)" thumb-label="always"></v-slider>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SliderCard extends Vue {
    @Prop() public value!: number;
    @Prop() public title!: string;
}
</script>

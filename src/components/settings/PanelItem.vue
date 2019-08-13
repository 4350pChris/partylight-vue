<template>
  <v-expansion-panel>
    <v-expansion-panel-header #default="{ open }" ripple>
      {{ value.title }}
      <v-fade-transition>
        <span v-if="!open" class="text--secondary pl-4">
          <span v-if="value.value.length === 1">
            {{ formatted(value.value[0]) }}
          </span>
          <v-layout v-else>
            <span>Min: {{ formatted(value.value[0]) }}</span>
            <span class="pl-2">Max: {{ formatted(value.value[1]) }}</span>
          </v-layout>
        </span>
      </v-fade-transition>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="pt-4">
      <slider-card
        :name="`${value.title}-slider`"
        :min="value.min"
        :max="value.max"
        @input="value.update($event)"
        :value="value.value"
        :suffix="value.unit ? value.unit : ''"
      ></slider-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SliderCard from '@/components/shared/SliderCard.vue';

export interface Item {
 min: number;
 max: number;
 update: (args: number[]) => any;
 step?: number;
 title: string;
 unit?: string;
 value: number[];
}

@Component({ components: { SliderCard }})
export default class PanelItem extends Vue {
  @Prop({ required: true, type: Object }) value!: Item;

  formatted(v: number): string {
    const suffix = this.value.unit ? this.value.unit : '';
    return `${v} ${suffix}`;
  }
}
</script>
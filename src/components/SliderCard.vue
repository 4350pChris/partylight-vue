<template>
      <v-container grid-list-lg text-xs-center>
        <v-layout row nowrap>
          <v-flex shrink style="width: 75px">
            <v-text-field
              v-if="typeof value === 'object'"
              :value="value[0]"
              hide-details
              single-line
              type="number"
              @input="$emit('input', [$event, value[1]])"
            ></v-text-field>
          </v-flex>
          <v-flex>
            <div
              :is="typeof value === 'object' ? 'v-range-slider' : 'v-slider'"
              :value="value"
              :min="min"
              :max="max"
              @end="$emit('input', $event)"
              thumb-label="always"
              thumb-size="40"
            ></div>
          </v-flex>
          <v-flex shrink style="width: 75px">
            <v-text-field
              v-if="typeof value === 'object'"
              :value="value[1]"
              hide-details
              single-line
              shrink
              type="number"
              @input="$emit('input', [value[0], $event])"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component
export default class SliderCard extends Vue {
  @Prop() private value!: number | number[];
  @Prop() private min?: number;
  @Prop() private max?: number;
  @Prop() private title!: string;
}
</script>

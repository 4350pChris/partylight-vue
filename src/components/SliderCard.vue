<template>
  <v-card flat height="100%">
    <v-card-title primary-title class="justify-center">
      <v-label>{{title}}</v-label>
    </v-card-title>
    <v-card-text>
      <v-container text-xs-center>
        <v-layout row nowrap>
          <v-flex
            shrink
            style="width: 75px"
            mr-3
          >
            <v-text-field
              v-if="isRange"
              :value="value[0]"
              hide-details
              single-line
              type="number"
              @input="$emit('input', [$event, value[1]])"
            ></v-text-field>
            <v-text-field
              v-else
              :value="value"
              hide-details
              single-line
              type="number"
              @input="$emit('input', $event)"
            >
            </v-text-field>
          </v-flex>
          <v-flex>
            <div
              :is="isRange ? 'v-range-slider' : 'v-slider'"
              :value="value"
              :min="min"
              :max="max"
              :step="step"
              :ticks="!!step"
              @end="$emit('input', $event)"
              thumb-label="always"
              thumb-size="40"
            ></div>
          </v-flex>
          <v-flex
            v-if="isRange"
            shrink
            style="width: 75px"
            ml-3
          >
            <v-text-field
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
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component
export default class SliderCard extends Vue {
  @Prop() private value!: number | number[];
  @Prop() private min!: number;
  @Prop() private max!: number;
  @Prop() private title!: string;
  @Prop() private step!: number;

  private valid = true;

  private get isRange() {
    return typeof this.value === 'object';
  }
}
</script>

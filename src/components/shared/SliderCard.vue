<template>
  <v-container fluid>
    <v-layout row wrap justify-space-between>
      <v-flex shrink style="width: 75px" :class="[isRange ? 'order-xs2 order-md1' : '']">
        <v-text-field
          :value="minValue"
          hide-details
          single-line
          type="number"
          @blur="isRange ?
            update([$event.target.value, maxValue]) : update([$event.target.value])"
        ></v-text-field>
      </v-flex>
      <v-flex :class="['pt-3', isRange ? 'xs12 md8 order-xs1 order-md2' : '']">
        <component
          :is="isRange ? 'v-range-slider' : 'v-slider'"
          :value="isRange ? internalValue : minValue"
          :min="min"
          :max="max"
          :step="step"
          :ticks="!!step"
          :error-messages="errors"
          :always-dirty="min !== 0"
          @end="isRange ? update($event) : update([$event])"
          thumb-label="always"
          thumb-size="40"
          hide-details
        ></component>
      </v-flex>
      <v-flex v-if="isRange" shrink style="width: 75px" order-xs3>
        <v-text-field
          :value="maxValue"
          hide-details
          single-line
          shrink
          type="number"
          @blur="isRange ?
            update([minValue, $event.target.value]) : update([$event.target.value])"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { min, max } from 'lodash';
import { required, between } from 'vuelidate/lib/validators';
import { VRangeSlider, VSlider } from 'vuetify/lib';
import { Vuelidate } from '@/decorators';

@Component({
  components: { VRangeSlider, VSlider }
})
export default class SliderCard extends Vue {
  @Prop({ required: true, type: Array }) value!: number[];
  @Prop({ required: true, type: Number }) min!: number;
  @Prop({ required: true, type: Number }) max!: number;
  @Prop({ required: false, type: Number }) step!: number;

  private internalValue = this.value;

  get minValue(): number {
    return min(this.internalValue) as number;
  }

  get maxValue(): number {
    return max(this.internalValue) as number;
  }

  @Vuelidate
  validations() {
    return {
      internalValue: {
        $each: {
          required,
          between: between(this.min, this.max)
        }
      }
    };
  }

  get isRange() {
    return this.value.length > 1;
  }

  get errors() {
    const errors: string[] = [];
    if (!this.$v.internalValue.$dirty) {
      return errors;
    }
    if (!this.$v.internalValue.$each || !this.$v.internalValue.$each.$iter) {
      return errors;
    }

    for (const v of Object.values(this.$v.internalValue.$each.$iter)) {
      if (v === undefined) {
        continue;
      }
      if (!v.required) {
        errors.push('Value cannot be empty!');
      }
      if (!v.between) {
        errors.push(`Value must be between ${this.min} and ${this.max}!`);
      }
    }
    return errors;
  }

  update(v: number[]) {
    this.internalValue = v.map(n => Number(n)).sort();
    this.$v.internalValue.$touch();
    if (!this.$v.internalValue.$invalid) {
      this.$emit('input', this.internalValue);
    }
  }
}
</script>

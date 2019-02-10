<template>
  <v-card flat height="100%">
    <v-card-title primary-title class="justify-center">
      <v-label>{{title}}</v-label>
    </v-card-title>
    <v-card-text>
      <form>
        <v-container text-xs-center>
          <v-layout row nowrap>
            <v-flex shrink style="width: 75px" mr-3>
              <v-text-field
                :value="internalValue[0]"
                hide-details
                single-line
                type="number"
                @blur="isRange ?
                  input([$event.target.value, internalValue[1]]) : input([$event.target.value])"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <div
                :is="isRange ? 'v-range-slider' : 'v-slider'"
                :value="isRange ? internalValue : internalValue[0]"
                :min="min"
                :max="max"
                :step="step"
                :ticks="!!step"
                :error-messages="errors"
                @end="isRange ? input($event) : input([$event])"
                thumb-label="always"
                thumb-size="40"
              ></div>
            </v-flex>
            <v-flex v-if="isRange" shrink style="width: 75px" ml-3>
              <v-text-field
                :value="internalValue[1]"
                hide-details
                single-line
                shrink
                type="number"
                @blur="isRange ?
                  input([internalValue[0], $event.target.value]) : input([$event.target.value])"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';
import { Vuelidate } from '@/decorators';
import { required, between } from 'vuelidate/lib/validators';

@Component
export default class SliderCard extends Vue {
  @Prop() private value!: number[];
  @Prop() private min!: number;
  @Prop() private max!: number;
  @Prop() private title!: string;
  @Prop() private step!: number;

  private internalValue = this.value;

  @Vuelidate
  private validations() {
    return {
      internalValue: {
        $each: {
          required,
          between: between(this.min, this.max)
        }
      }
    };
  }

  private get isRange() {
    return this.value.length > 1;
  }

  private get errors() {
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

  @Emit()
  private input(v: number[]) {
    this.internalValue = v.map(n => Number(n));
    this.$v.internalValue.$touch();
    return this.internalValue;
  }
}
</script>

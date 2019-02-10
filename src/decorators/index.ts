import { createDecorator } from 'vue-class-component';

export const Vuelidate = createDecorator((options, key) => {
  if (options.methods === undefined) {
    options.methods = {};
  }
  options.validations = options.methods[key];
});

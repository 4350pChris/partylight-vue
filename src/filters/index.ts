import Vue from 'vue';

export const filters = {
  capitalize(value: string) {
    if (!value) {
      return '';
    }
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
} as { [name: string]: (...args: any) => any };


for (const name in filters) {
  if (filters.hasOwnProperty(name)) {
    Vue.filter(name, filters[name]);
  }
}

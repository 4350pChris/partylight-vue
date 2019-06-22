import Vue from 'vue';
import Vuetify, { VList } from 'vuetify/lib';

Vue.use(Vuetify, { components: { VList }});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  }
});

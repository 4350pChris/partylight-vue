<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/splash.png">
    <settings-list/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SettingsList from '@/components/SettingsList.vue';

@Component({
  components: {
    SettingsList,
  },
})
export default class Home extends Vue {}
</script>

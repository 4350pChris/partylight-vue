<template>
  <div class="home">
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

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/splash.png">
    <script-editor/>
    <settings-list/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScriptEditor from '@/components/ScriptEditor.vue';
import SettingsList from '@/components/SettingsList.vue';

@Component({
  components: {
    SettingsList,
    ScriptEditor,
  },
})
export default class Home extends Vue {}
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/splash.png">
    <script-editor/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScriptEditor from '@/components/ScriptEditor.vue';

@Component({
  components: {
    ScriptEditor,
  },
})
export default class Home extends Vue {}
</script>

<template>
  <script-editor id='editor'/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScriptEditor from '@/components/ScriptEditor.vue';

@Component({
  components: {
    ScriptEditor,
  }
})
export default class Editor extends Vue {

}
</script>

<style scoped>
#editor {
  height: 100%;
}
</style>


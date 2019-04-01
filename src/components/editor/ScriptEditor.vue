<template>
  <!-- <monaco-editor class="editor" v-model="code" language="csharp" ref="editor"></monaco-editor> -->
  <div id="editor"></div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { IPosition, editor, languages } from 'monaco-editor';
import services from '@/api';

@Component
export default class ScriptEditor extends Vue {
  @Prop()
  private value!: string;

  private code: string = this.value || '';

  @Watch('value')
  private onValueChanged() {
    this.code = this.value;
  }

  private mounted() {
    monaco.languages.registerCompletionItemProvider('csharp', {
      provideCompletionItems: async (model, position) => {
        const source = model.getValue();
        const pos = model.getOffsetAt(position);
        const suggestions  = await services.scripts.getCompletionItems(model.getValue(), pos);
        return { suggestions } as languages.CompletionList;
      }
    });
    monaco.editor.create(document.getElementById('editor') as HTMLElement, {
        value: this.code,
        language: 'csharp'
    });
  }
}
</script>

<style scoped>
#editor {
  height: 100%;
}
</style>

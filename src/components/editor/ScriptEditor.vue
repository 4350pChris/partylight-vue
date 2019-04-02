<template>
  <div id="editor"></div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Watch, Vue } from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { IPosition, editor, languages } from 'monaco-editor';
import services from '@/api';

@Component
export default class ScriptEditor extends Vue {
  @Inject()
  private theme!: { isDark: boolean };

  private get editorTheme() {
    return this.theme.isDark ? 'vs-dark' : 'vs';
  }

  @Prop()
  private value!: string;

  private code: string = this.value || '';

  @Watch('theme', { deep: true })
  private onThemeChanged() {
    monaco.editor.setTheme(this.editorTheme);
  }

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
        language: 'csharp',
        theme: this.editorTheme,
        scrollBeyondLastLine: false,
        automaticLayout: true
    });
  }
}
</script>

<style scoped>
#editor {
  height: 100%;
}
</style>

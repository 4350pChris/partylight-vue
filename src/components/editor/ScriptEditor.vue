<template>
  <div id="editor"></div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { IPosition, editor, languages } from 'monaco-editor';
import services from '@/api';
import Completion from '@/models/completion';
import ThemeMixin from '@/mixins/theme';

@Component
export default class ScriptEditor extends Mixins(ThemeMixin) {
  private editor: editor.IStandaloneCodeEditor | null = null;

  @Prop()
  private value!: string;

  @Watch('theme', { deep: true })
  private onDarkChanged(val: boolean) {
    const theme = this.theme.isDark ? 'vs-dark' : 'vs';
    monaco.editor.setTheme(theme);
  }

  @Watch('value')
  private onValueChanged(val: string, oldVal: string) {
    if (this.editor !== null && val !== this.editor.getValue()) {
      this.editor.setValue(val);
    }
  }

  private registerCompletion() {
    monaco.languages.registerCompletionItemProvider('csharp', {
      provideCompletionItems: async (model, position) => {
        const source = model.getValue();
        const pos = model.getOffsetAt(position);
        const completions: Completion[]  = await services.scripts.getCompletionItems(model.getValue(), pos);
        const suggestions: languages.CompletionItem[] = completions.map(i => {
          const kind: languages.CompletionItemKind =
            languages.CompletionItemKind[i.kind as keyof typeof languages.CompletionItemKind];
          const wordAtPos: editor.IWordAtPosition = model.getWordAtPosition(position) as editor.IWordAtPosition;
          let startColumn: number;
          let endColumn: number;
          if (wordAtPos === null) {
            startColumn = position.column;
            endColumn = position.column;
          } else {
            startColumn = wordAtPos.startColumn;
            endColumn = wordAtPos.endColumn;
          }
          const range: monaco.IRange = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn,
            endColumn
          };
          return {
            label: i.label,
            insertText: i.label,
            kind,
            range
          };
        });
        return { suggestions } as languages.CompletionList;
      }
    });
  }

  private createEditor(): editor.IStandaloneCodeEditor {
    const options: monaco.editor.IEditorConstructionOptions = {
      value: this.value,
      language: 'csharp',
      theme: this.theme.isDark ? 'vs-dark' : 'vs',
      scrollBeyondLastLine: false,
      minimap: { enabled: false }
    };
    return monaco.editor.create(
      document.getElementById('editor') as HTMLElement,
      options
    );
  }

  private registerInputListener() {
    if (this.editor !== null) {
      const e = this.editor;
      e.onDidChangeModelContent(() => {
        this.$emit('input', e.getValue());
      });
    }
  }

  private resizeEditor() {
    if (this.editor !== null) {
      this.editor.layout();
    }
  }

  private mounted() {
    this.registerCompletion();
    this.editor = this.createEditor();
    this.registerInputListener();
    window.addEventListener('resize', this.resizeEditor);
  }

  private beforeDestroy() {
    window.removeEventListener('resize', this.resizeEditor);
  }
}
</script>

<style scoped>
#editor {
  height: 100%;
}
</style>

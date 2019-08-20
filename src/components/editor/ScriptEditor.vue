<template>
  <MonacoEditor
    id="editor"
    :value="code"
    @change="codeChanged"
    language="csharp"
    :theme="editorTheme"
    :options="options"
    ref="editor"
    v-resize="resizeEditor"
  />
</template>

<script lang="ts">
import { Component, PropSync, Watch, Mixins } from 'vue-property-decorator';
import MonacoEditor from 'vue-monaco';
import { IPosition, IRange, editor, languages } from 'monaco-editor';
import services from '@/api';
import Completion from '@/models/completion';
import ThemeMixin from '@/mixins/theme';

@Component({ components: { MonacoEditor }})
export default class ScriptEditor extends Mixins(ThemeMixin) {
  @PropSync('value', { required: true, type: String })
  code!: string;

  options: editor.IEditorConstructionOptions = {
    scrollBeyondLastLine: false,
    minimap: { enabled: false }
  };

  get editorTheme() {
    return this.theme.isDark ? 'vs-dark' : 'vs';
  }

  get editor(): editor.IStandaloneCodeEditor {
    return (this.$refs.editor as any).getEditor();
  }

  resizeEditor() {
    setTimeout(this.resizeEditor, 0);
  }

  codeChanged(code: string) {
    this.$emit('input', code);
  }

  registerCompletion() {
    languages.registerCompletionItemProvider('csharp', {
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
          const range: IRange = {
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
}
</script>

<style scoped>
#editor {
  height: 100%;
}
</style>

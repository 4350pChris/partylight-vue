<template>
  <MonacoEditor
    id="editor"
    v-model="code"
    language="csharp"
    :theme="editorTheme"
    :options="options"
    ref="editor"
    v-resize="resizeEditor"
  />
</template>

<script lang="ts">
import { Component, PropSync, Watch, Mixins } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import MonacoEditor from 'vue-monaco';
import { IPosition, IRange, editor, languages } from 'monaco-editor';
import services from '@/api';
import Completion from '@/models/completion';
import ThemeMixin from '@/mixins/theme';
import { StoreState } from '@/store/index';
import Script from '@/models/script';
import { Actions } from '@/store/scripts';

@Component({ components: { MonacoEditor }})
export default class ScriptEditor extends Mixins(ThemeMixin) {
  @State((store: StoreState) => store.scripts.editorScript)
  script!: Script | null;

  @Action(Actions.UpdateEditorScript)
  updateScript!: (s: Partial<Script>) => void;

  options: editor.IEditorConstructionOptions = {
    scrollBeyondLastLine: false,
    minimap: { enabled: false }
  };

  get code() {
    return this.script ? this.script.code : '';
  }

  set code(code: string) {
    this.updateScript({ ...this.script, code });
  }

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

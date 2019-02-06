<template>
  <div id='editorwrapper'>
    <textarea ref="editor"></textarea>
  </div>
</template>

<script lang="ts">
import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import Script from '@/models/script';

@Component
export default class ScriptEditor extends Vue {
  private cm!: CodeMirror.Editor;

  @Prop() private value!: string;

  @Inject() private theme!: { isDark: boolean };

  @Watch('value')
  private onCodeChanged() {
    if (this.cm === null || this.value === null || this.value === this.cm.getValue()) {
      return;
    }
    this.cm.setValue(this.value);
  }

  @Watch('theme', { deep: true })
  private onThemeChanged() {
    const dark = this.theme.isDark;
    this.cm.setOption('theme', dark ? 'monokai' : 'default');
  }

  private mounted() {
    this.cm = CodeMirror.fromTextArea(this.$refs.editor as HTMLTextAreaElement, {
      lineNumbers: true,
      mode: 'text/x-csharp',
    });
    this.cm.on('change', () => this.$emit('input', this.cm.getValue()));
  }
}
</script>

<style>
#editorwrapper {
  height: 100%;
}

.CodeMirror {
  height: 100%;
}
</style>

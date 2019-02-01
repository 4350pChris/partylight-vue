<template>
  <div id='editorwrapper'>
    <textarea ref="editor"></textarea>
  </div>
</template>

<script lang="ts">
import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/lib/codemirror.css';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Script from '@/models/script';

@Component
export default class ScriptEditor extends Vue {
  private cm!: CodeMirror.Editor;

  @Prop() private value!: string;

  @Watch('value')
  public onCodeChanged() {
    if (this.cm === null || this.value === null || this.value === this.cm.getValue()) {
      return;
    }
    this.cm.setValue(this.value);
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

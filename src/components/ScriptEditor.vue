<template>
  <div id='editorwrapper'>
    <textarea ref="editor" v-text="value"></textarea>
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
  private cm: CodeMirror.Editor | null = null;

  @Prop() private value: string | null = null;

  @Watch('value') onCodeChanged() {
    if (this.cm === null || this.value === null) {
      return;
    }
    this.cm.setValue(this.value);
  }

  private mounted() {
    this.cm = CodeMirror.fromTextArea(this.$refs.editor as HTMLTextAreaElement, {
      lineNumbers: true,
      mode: 'text/x-csharp',
    });
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

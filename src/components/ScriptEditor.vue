<template>
  <div id='editorwrapper'>
    <textarea ref="editor" v-text="defaultText"></textarea>
  </div>
</template>

<script lang="ts">
import CodeMirror from 'codemirror';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/lib/codemirror.css';

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ScriptEditor extends Vue {
  protected defaultText = 'public static void main() {\n\n}\n';

  public mounted() {
    CodeMirror.fromTextArea(this.$refs.editor as HTMLTextAreaElement, {
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

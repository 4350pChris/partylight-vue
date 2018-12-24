<template>
  <div>
    <script-editor/>
  </div>
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

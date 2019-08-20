<template>
  <v-toolbar>
    <ScriptList/>
    <ScriptRenameButton :script="syncedScript" :icon="true" />
    <v-spacer/>
    <ScriptNewButton :icon="true"/>
    <ScriptActivateButton :script="syncedScript" :icon="true" />
    <ScriptDeleteButton :script="syncedScript" :icon="true"/>
    <ScriptSaveButton :script="syncedScript" :icon="true" />
  </v-toolbar>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';
import ScriptList from '@/components/editor/ScriptList.vue';
import ScriptActivateButton from '@/components/editor/buttons/ScriptActivateButton.vue';
import ScriptDeleteButton from '@/components/editor/buttons/ScriptDeleteButton.vue';
import ScriptNewButton from '@/components/editor/buttons/ScriptNewButton.vue';
import ScriptSaveButton from '@/components/editor/buttons/ScriptSaveButton.vue';
import ScriptRenameButton from '@/components/editor/buttons/ScriptRenameButton.vue';
import Script from '@/models/script';

@Component({
  components: { ScriptList, ScriptActivateButton, ScriptDeleteButton, ScriptNewButton, ScriptSaveButton, ScriptRenameButton }
})
export default class ScriptToolbar extends Vue {
  @PropSync('script') syncedScript!: Script;
}
</script>

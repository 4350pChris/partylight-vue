<template>
  <v-select @change="$emit('select', $event)" :items="scripts" item-text="name" item-value="id" return-object :value="value">
    <template #prepend-item>
      <v-list-item @click.stop="newScript">
        <v-list-item-content>
          <v-list-item-title>New Script</v-list-item-title>          
        </v-list-item-content>
      </v-list-item>
    </template>
    <template #item="{ item: script }">
        <v-list-item ripple>
          <v-list-item-content>
            <v-list-item-title>{{ script.name }}</v-list-item-title>
          </v-list-item-content>
          <v-scroll-x-transition>
            <v-icon v-if="isActiveScript(script)" color="success">check_circle</v-icon>
          </v-scroll-x-transition>
        </v-list-item>
    </template>
  </v-select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Script from '@/models/script';
import { StoreState } from '@/store';
import { Actions, Getters } from '@/store/scripts';
import { Action, Getter, State } from 'vuex-class';
import { VList } from 'vuetify/lib';

@Component({ components: { VList }})
export default class ScriptList extends Vue {
  @State((store: StoreState) => store.scripts.scripts)
  private scripts!: Script[];

  @Getter(Getters.ActiveScript)
  private active!: Script | null;

  @Prop({ required: false, type: Number, default: -1 })
  private value!: number;

  private isActiveScript(script: Script) {
    return this.active !== null && this.active.id === script.id;
  }

  private newScript() {
    this.$emit('input', {
      name: 'New Script',
      code: 'public void setup() {\n\n}\n\npublic void loop() {\n\n}\n'
    });
  }
}
</script>


<template>
  <v-card>
    <v-list>
      <v-list-tile @click="$emit('new')" ripple>
        <v-list-tile-content>
          <v-list-tile-title>New Script</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-for="script in scripts"
        :key="script.id"
        @click="$emit('select', script)"
        ripple
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ script.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Script from "@/models/script";

@Component
export default class ScriptList extends Vue {
  @Prop() private scripts!: Script[];
}
</script>


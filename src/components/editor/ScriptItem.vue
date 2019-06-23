<template>
  <v-list-item>
    <v-flex xs2 class="pl-0">
      <v-slide-x-transition>
        <v-icon v-if="active" color="success">mdi-check-circle</v-icon>
      </v-slide-x-transition>
    </v-flex>
    <v-flex>
      <v-list-item-content>
        <v-list-item-title>{{ value.name }}</v-list-item-title>
      </v-list-item-content>
    </v-flex>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Script from '@/models/script';

@Component
export default class ScriptItem extends Vue {
  @Prop({ required: true, type: Object })
  value!: Script;

  @Prop({ required: false, default: false, type: Boolean })
  active!: boolean;
}
</script>

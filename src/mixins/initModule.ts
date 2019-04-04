import { Component, Vue } from 'vue-property-decorator';
import { Actions as RootActions, InitFunctions } from '@/store';
import { Action } from 'vuex-class';

@Component
export default class InitModule extends Vue {
  @Action(RootActions.InitModule)
  protected initModule!: (name: keyof InitFunctions) => Promise<void>;
}

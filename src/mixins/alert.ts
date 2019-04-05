import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { Actions as AlertActions } from '@/store/alert';

@Component
export default class Alert extends Vue {
  @Action(AlertActions.ShowAlert)
  protected showAlert!: (
    payload: { type: string; duration?: number; message: string }
  ) => void;
}

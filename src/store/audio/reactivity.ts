import { Actions } from '.';
import { Store } from 'vuex';
import services from '@/api';

const audioService = services.audio;

export async function initAudio(store: Store<any>) {
  await audioService.startConnection();
  await store.dispatch(Actions.FetchParameters);
  audioService.onChange((prop, value) =>
    store.dispatch(Actions.SaveParameters, { [prop]: value })
  );
}

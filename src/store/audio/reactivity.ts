import { Store } from 'vuex';
import ServiceFactory from '../../api';
import AudioService from '../../api/audio/audioService';
import { Actions } from '.';

const audioService = ServiceFactory.get('audio') as AudioService;

export async function initAudio(store: Store<any>) {
  await audioService.startConnection();
  await store.dispatch(Actions.FetchParameters);
  audioService.onChange((prop, value) => store.dispatch(Actions.SaveParameters, { [prop]: value }));
}

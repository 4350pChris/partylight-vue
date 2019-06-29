import { BaseSocketService } from '../baseSocketService';
import AudioParameters from '@/models/audioParameters';

export default class AudioService extends BaseSocketService {
  getAudioParameters = () => this.invoke<AudioParameters>('GetAudioParameters');

  setAudioParameters = (params: AudioParameters) => this.invoke<void>('SetAudioParameters', params);

  onChange = (cb: (
    prop: keyof AudioParameters,
    value: AudioParameters[keyof AudioParameters])
    => void) => this.on('PropertyChanged', cb)
}

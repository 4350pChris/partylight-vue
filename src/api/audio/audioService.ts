import { BaseSocketService } from '../baseSocketService';
import AudioParameters from '@/models/audioParameters';

export default class AudioService extends BaseSocketService {
  public getAudioParameters = () => this.invoke<AudioParameters>('GetAudioParameters');

  public setAudioParameters = (params: AudioParameters) => this.invoke<void>('SetAudioParameters', params);

  public onChange = (cb: (
    prop: keyof AudioParameters,
    value: AudioParameters[keyof AudioParameters])
    => void) => this.on('PropertyChanged', cb)
}

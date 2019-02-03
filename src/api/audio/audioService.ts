import { BaseSocketService } from '../baseSocketService';
import AudioParameters from '@/models/audioParameters';


export default class AudioService extends BaseSocketService {
  public getAudioParameters = () => this.invoke<AudioParameters>('GetAudioParameters');

  public getAudioBuffer = () => this.invoke<number[]>('GetAudioBuffer');

  public setAudioParameters = (params: AudioParameters) => this.invoke<void>('SetAudioParameters', params);

  public setAudioBuffer = (buffer: number[]) => this.invoke<void>('SetAudioBuffer', buffer);

  public onChange = (cb: (
    prop: keyof AudioParameters | 'buffer',
    value: AudioParameters[keyof AudioParameters] | number[])
    => void) => this.on('AudioPropertyChanged', cb)
}

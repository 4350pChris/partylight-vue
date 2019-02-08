import { BaseSocketService } from '../baseSocketService';

export default class DMXService extends BaseSocketService {
  public getSamplingRate = () => this.invoke<number>('GetSamplingRate');

  public getPacketsPerSecond = () => this.invoke<number>('GetPacketsPerSecond');

  public setSamplingRate = (rate: number) => this.invoke<boolean>('SetSamplingRate', rate);

  public onChange = (cb: (prop: string, value: number) => void) => this.on('PropertyChanged', cb);
}

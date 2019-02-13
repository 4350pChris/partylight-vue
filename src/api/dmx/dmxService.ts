import { BaseSocketService } from '../baseSocketService';

export default class DMXService extends BaseSocketService {
  public getSamplingRate = () => this.invoke<number>('GetSamplingRate');

  public getPacketsPerSecond = () => this.invoke<number>('GetPacketsPerSecond');

  public getMaximumFrequency = (length: number) => this.invoke<number>('CalculateMaximumFrequency', length);

  public getUsedFrequency = () => this.invoke<number>('CalculateUsedFrequency');

  public getLengthOfUniverse = () => this.invoke<number>('GetLengthOfUniverse');

  public setLengthOfUniverse = (length: number) => this.invoke<boolean>('SetLengthOfUniverse', length);

  public setSamplingRate = (rate: number) => this.invoke<boolean>('SetSamplingRate', rate);

  public onChange = (cb: (prop: string, value: number) => void) => this.on('PropertyChanged', cb);
}

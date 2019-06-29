import { BaseSocketService } from '../baseSocketService';

export default class DMXService extends BaseSocketService {
  getSamplingRate = () => this.invoke<number>('GetSamplingRate');

  getPacketsPerSecond = () => this.invoke<number>('GetPacketsPerSecond');

  getMaximumFrequency = (length: number) => this.invoke<number>('CalculateMaximumFrequency', length);

  getUsedFrequency = () => this.invoke<number>('CalculateUsedFrequency');

  getLengthOfUniverse = () => this.invoke<number>('GetLengthOfUniverse');

  setLengthOfUniverse = (length: number) => this.invoke<boolean>('SetLengthOfUniverse', length);

  setSamplingRate = (rate: number) => this.invoke<boolean>('SetSamplingRate', rate);

  onChange = (cb: (prop: string, value: number) => void) => this.on('PropertyChanged', cb);
}

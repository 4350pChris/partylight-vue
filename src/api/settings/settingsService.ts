import { BaseSocketService } from '../baseSocketService';

export default class SettingsService extends BaseSocketService {

  public getBrightness = () => this.invoke<number>('GetBrightness');

  public getDelay = () => this.invoke<number>('GetDelay');

  public getColor = () => this.invoke<number>('GetColor');

  public setBrightness = (brightness: number) => this.invoke<void>('SetBrightness', brightness);

  public setDelay = (delay: number) => this.invoke<void>('SetDelay', delay);

  public setColor = (color: number) => this.invoke<void>('SetColor', color);

  public onSettingChanged(cb: (prop: string, val: number) => void): void {
    this.on('PropertyChanged', cb);
  }
}

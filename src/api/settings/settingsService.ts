import { BaseSocketService } from '../baseSocketService';

export default class SettingsService extends BaseSocketService {

  public getBrightness = () => this.invoke('GetBrightness');

  public getDelay = () => this.invoke('GetDelay');

  public getColor = () => this.invoke('GetColor');

  public setBrightness = (brightness: number) => this.invoke('SetBrightness', brightness);

  public setDelay = (delay: number) => this.invoke('SetDelay', delay);

  public setColor = (color: number) => this.invoke('SetColor', color);

  public onSettingChanged(cb: (prop: string, val: number) => void): void {
    this.on('SettingChanged', cb);
  }
}

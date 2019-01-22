import * as signalR from '@aspnet/signalr';
import { Settings } from './settings';

export default class SettingsService {
  private connection: signalR.HubConnection;

  constructor(url: string) {
    this.connection = new signalR.HubConnectionBuilder().withUrl(url).build();

    this.connection.start();
  }

  public async getSettings(): Promise<Settings> {
    const [ brightness, delay, color ] = await Promise.all([
      this.connection.invoke<number>('GetBrightness'),
      this.connection.invoke<number>('GetDelay'),
      this.connection.invoke<number>('GetColor')
    ]);

    return { brightness, delay, color } as Settings;
  }

  public setSettings(settings: Settings): Promise<void[]> {
    return Promise.all([
      this.connection.invoke<void>('SetBrightness', settings.brightness),
      this.connection.invoke<void>('SetDelay', settings.delay),
      this.connection.invoke<void>('SetColor', settings.color)
    ]);
  }
}

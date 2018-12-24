import * as signalR from '@aspnet/signalr';
import { Settings } from './settings';

export default class SettingsService {
  public connection: signalR.HubConnection;

  constructor(url: string) {
    this.connection = new signalR.HubConnectionBuilder().withUrl(url).build();

    this.connection.start();
  }

  public async getSettings(): Promise<Settings> {
    return this.connection.invoke<Settings>('GetSettings');
  }

  public setSettings(settings: Settings): Promise<void> {
    return this.connection.invoke<void>('SetSettings', settings);
  }
}

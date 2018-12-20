import signalR from '@aspnet/signalr';

export default class SettingsService {
  public connection: signalR.HubConnection;
  public settings: Settings | object = {};

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('settings')
      .build();

    this.connection.on(
      'SettingsChanged',
      (settings) => (this.settings = settings),
    );

    this.connection.start();

    this.getSettings().then((settings) => (this.settings = settings));
  }

  public getSettings() {
    return this.connection.invoke<Settings>('GetSettings');
  }

  public setSettings() {
    return this.connection.invoke<void>('SetSettings', this.settings);
  }
}

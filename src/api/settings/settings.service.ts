import signalR from '@aspnet/signalr';

export default class SettingsService {
  private connection: signalR.HubConnection;
  private settings: Settings | null = null;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('settings')
      .build();

    this.connection.on(
      'SettingsChanged',
      settings => (this.settings = settings)
    );

    this.connection
      .start()
      .then(res =>
        this.getSettings().then(settings => (this.settings = settings))
      );
  }

  public async getSettings(): Promise<Settings> {
    if (this.settings === null) {
      return this.connection.invoke<Settings>('GetSettings');
    } else {
      return this.settings;
    }
  }

  public setSettings(): Promise<void> {
    return this.connection.invoke<void>('SetSettings', this.settings);
  }
}

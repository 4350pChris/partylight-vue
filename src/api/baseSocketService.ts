import * as signalR from '@aspnet/signalr';

export abstract class BaseSocketService {
  static baseUrl: string;

  private readonly connection: signalR.HubConnection;

  constructor(hubUrl: string) {
    const fullUrl = BaseSocketService.baseUrl + hubUrl;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(fullUrl)
      .build();
  }

  get isConnected() {
    return this.connection.state === signalR.HubConnectionState.Connected;
  }

  async startConnection() {
    if (!this.isConnected) {
      return this.connection.start();
    }
  }

  protected async invoke<T>(name: string, ...args: any[]): Promise<T> {
    if (!this.isConnected) {
      await this.startConnection();
    }
    return this.connection.invoke<T>(name, ...args);
  }

  protected on(name: string, cb: (...args: any) => void) {
    this.connection.on(name, cb);
  }
}

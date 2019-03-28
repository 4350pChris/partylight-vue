import * as signalR from '@aspnet/signalr';

export abstract class BaseSocketService {
  public static baseUrl: string;

  private readonly connection: signalR.HubConnection;

  constructor(hubUrl: string) {
    const fullUrl = BaseSocketService.baseUrl + hubUrl;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(fullUrl)
      .build();
  }

  public get isConnected() {
    return this.connection.state === signalR.HubConnectionState.Connected;
  }

  public async startConnection() {
    if (this.connection.state === signalR.HubConnectionState.Disconnected) {
      return this.connection.start();
    }
  }

  protected invoke<T>(name: string, ...args: any[]) {
    return this.connection.invoke<T>(name, ...args);
  }

  protected on = (name: string, cb: (...args: any) => void) =>
    this.connection.on(name, cb)
}

import SettingsService from './settings/settingsService';
import { BaseSocketService } from './baseSocketService';

BaseSocketService.baseUrl = process.env.VUE_APP_HUB_URL || '';

const services: { [name: string]: BaseSocketService } = {
  settings: new SettingsService('/settingsHub')
};

const serviceFactory = {
  get<T extends BaseSocketService>(name: string): T {
    return services[name] as T;
  }
};

export default serviceFactory;

import SettingsService from './settings/settingsService';
import { BaseSocketService } from './baseSocketService';
import ScriptsService from './scripts/scriptsService';
import AudioService from './audio/audioService';

BaseSocketService.baseUrl = process.env.VUE_APP_HUB_URL || '';

class ServiceFactory {

  private services: Services = {
    audio: new AudioService('/audio'),
    settings: new SettingsService('/settings'),
    scripts: new ScriptsService('/scripts'),
  };

  public get(name: keyof Services): Services[keyof Services] {
    return this.services[name];
  }
}

export default new ServiceFactory();

export interface Services {
  audio: AudioService;
  settings: SettingsService;
  scripts: ScriptsService;
}

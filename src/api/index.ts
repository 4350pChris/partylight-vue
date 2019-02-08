import { BaseSocketService } from './baseSocketService';
import AudioService from './audio/audioService';
import DMXService from './dmx/dmxService';
import SettingsService from './settings/settingsService';
import ScriptsService from './scripts/scriptsService';

BaseSocketService.baseUrl = process.env.VUE_APP_HUB_URL || '';

class ServiceFactory {

  private services: Services = {
    audio: new AudioService('/audio'),
    dmx: new DMXService('dmx'),
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
  dmx: DMXService;
  settings: SettingsService;
  scripts: ScriptsService;
}

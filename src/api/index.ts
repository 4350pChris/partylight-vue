import { BaseSocketService } from './baseSocketService';
import AudioService from './audio/audioService';
import DMXService from './dmx/dmxService';
import SettingsService from './settings/settingsService';
import ScriptsService from './scripts/scriptsService';

BaseSocketService.baseUrl = process.env.VUE_APP_HUB_URL || '';

const services: Services = {
  audio: new AudioService('/audio'),
  dmx: new DMXService('/dmx'),
  settings: new SettingsService('/settings'),
  scripts: new ScriptsService('/scripts')
};

export default services;

export interface Services {
  audio: AudioService;
  dmx: DMXService;
  settings: SettingsService;
  scripts: ScriptsService;
}

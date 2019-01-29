import { BaseSocketService } from '../baseSocketService';
import Script from '@/models/script';

export default class ScriptsService extends BaseSocketService {
    public getScripts = () => this.invoke('GetScripts');

    public getScriptById = (id: number) => this.invoke('GetScriptById', id);

    public addScript = (script: Script) => this.invoke('AddScript', script);

    public replaceScript = (script: Script) => this.invoke('ReplaceScriptById', script.id, script);

    public deleteScript = (id: number) => this.invoke('DeleteScriptById', id);

    public setActiveScript = (id: number) => this.invoke('SetScript', id);

    public onScriptAdded = (cb: (script: Script) => void) => this.on('ScriptAdded', cb);

    public onScriptUpdated = (cb: (script: Script) => void) => this.on('ScriptReplaced', cb);

    public onScriptDeleted = (cb: (script: Script) => void) => this.on('ScriptDeleted', cb);
}

import { BaseSocketService } from '../baseSocketService';
import Script from '@/models/script';

export default class ScriptsService extends BaseSocketService {
    public getScripts = () => this.invoke<Script[]>('GetScripts');

    public getScriptById = (id: number) => this.invoke<Script>('GetScriptById', id);

    public addScript = (script: Script) => this.invoke<boolean>('AddScript', script);

    public replaceScript = (script: Script) => this.invoke<boolean>('ReplaceScriptById', script.id, script);

    public deleteScript = (id: number) => this.invoke<boolean>('DeleteScriptById', id);

    public setActiveScript = (id: number) => this.invoke<boolean>('SetScript', id);

    public onScriptAdded = (cb: (script: Script) => void) => this.on('ScriptAdded', cb);

    public onScriptUpdated = (cb: (script: Script) => void) => this.on('ScriptReplaced', cb);

    public onScriptDeleted = (cb: (script: Script) => void) => this.on('ScriptDeleted', cb);
}

import { BaseSocketService } from '../baseSocketService';
import Script from '@/models/script';
import Completion from '@/models/completion';
export default class ScriptsService extends BaseSocketService {
    getScripts = () => this.invoke<Script[]>('GetScripts');

    getScriptById = (id: number) => this.invoke<Script>('GetScriptById', id);

    getCompletionItems = (code: string, position: number) =>
        this.invoke<Completion[]>('GetCompletions', code, position)

    addScript = (script: Script) => this.invoke<boolean>('AddScript', script);

    replaceScript = (script: Script) => this.invoke<boolean>('ReplaceScriptById', script.id, script);

    deleteScript = (id: number) => this.invoke<boolean>('DeleteScriptById', id);

    setActiveScript = (script: Script) => this.invoke<boolean>('SetScript', script);

    setActiveScriptById = (id: number) => this.invoke<boolean>('SetScriptById', id);

    onScriptAdded = (cb: (script: Script) => void) => this.on('ScriptAdded', cb);

    onScriptUpdated = (cb: (script: Script) => void) => this.on('ScriptReplaced', cb);

    onScriptDeleted = (cb: (script: Script) => void) => this.on('ScriptDeleted', cb);

    onScriptStarted = (cb: (script: Script) => void) => this.on('ScriptStarted', cb);
}

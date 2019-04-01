import { BaseSocketService } from '../baseSocketService';
import Script from '@/models/script';
import { languages } from 'monaco-editor';

export default class ScriptsService extends BaseSocketService {
    public getScripts = () => this.invoke<Script[]>('GetScripts');

    public getScriptById = (id: number) => this.invoke<Script>('GetScriptById', id);

    public getCompletionItems = (code: string, position: number) =>
        this.invoke<Array<Partial<languages.CompletionItem>>>('GetCompletions', code, position)

    public addScript = (script: Script) => this.invoke<boolean>('AddScript', script);

    public replaceScript = (script: Script) => this.invoke<boolean>('ReplaceScriptById', script.id, script);

    public deleteScript = (id: number) => this.invoke<boolean>('DeleteScriptById', id);

    public setActiveScript = (script: Script) => this.invoke<boolean>('SetScript', script);

    public setActiveScriptById = (id: number) => this.invoke<boolean>('SetScriptById', id);

    public onScriptAdded = (cb: (script: Script) => void) => this.on('ScriptAdded', cb);

    public onScriptUpdated = (cb: (script: Script) => void) => this.on('ScriptReplaced', cb);

    public onScriptDeleted = (cb: (script: Script) => void) => this.on('ScriptDeleted', cb);

    public onScriptStarted = (cb: (script: Script) => void) => this.on('ScriptStarted', cb);
}

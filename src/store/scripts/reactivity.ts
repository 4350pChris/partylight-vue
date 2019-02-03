import { Store } from 'vuex';
import ServiceFactory from '@/api';
import ScriptsService from '@/api/scripts/scriptsService';
import { Actions, Mutations } from '.';

export async function initScripts(store: Store<any>) {
  const scriptsService = ServiceFactory.get('scripts') as ScriptsService;

  await scriptsService.startConnection();
  store.dispatch(Actions.FetchScripts).then(() => {
      scriptsService.onScriptAdded(script => store.commit(Mutations.AddScript, script));
      scriptsService.onScriptDeleted(script => store.commit(Mutations.DeleteScript, script));
      scriptsService.onScriptUpdated(script => store.commit(Mutations.UpdateScript, script));
      scriptsService.onScriptStarted(script => store.commit(Mutations.SetActiveScript, script));
  });
}

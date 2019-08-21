import { Store } from 'vuex';
import services from '@/api';
import { Actions, Mutations } from '.';

export async function initScripts(store: Store<any>) {
  const scriptsService = services.scripts;

  store.dispatch(Actions.UpdateEditorScript); // sets the editor script to the empty one

  await scriptsService.startConnection();
  await store.dispatch(Actions.FetchScripts);

  scriptsService.onScriptAdded(script =>
    store.commit(Mutations.AddScript, script)
  );
  scriptsService.onScriptDeleted(script =>
    store.commit(Mutations.DeleteScript, script.id as number)
  );
  scriptsService.onScriptUpdated(script =>
    store.commit(Mutations.UpdateScript, script)
  );
  scriptsService.onScriptStarted(script =>
    store.commit(Mutations.SetActiveScript, script)
  );
}

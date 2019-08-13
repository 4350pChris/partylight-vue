import mutations, { Mutations } from './mutations';
import { State, state } from '.';
import { cloneDeep } from 'lodash';

const makeState = () => cloneDeep(state);

describe('DMX Store Mutations', () => {
  it('Set DMX settings', () => {
    const payload: Partial<State> = {
      packetsPerSecond: 10,
      lengthOfUniverse: 32,
      usedFrequency: 256
    };
    const localState = makeState();
    mutations[Mutations.SetDMXSettings](localState, payload);
    expect(localState).toMatchObject(payload);
  });
});

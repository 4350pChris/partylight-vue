import { State } from '.';
import mutations, { Mutations } from './mutations';
import { ScalingStrategy } from '@/models/audioParameters';
import { Frequency } from '@/models/measurement';

const makeState: () => State = () => ({
  parameters: {
    maximumAmplitude: 100,
    minimumFrequency: new Frequency(1),
    maximumFrequency: new Frequency(20000),
    numberOfChannels: 32,
    useAverage: true,
    scalingStrategy: ScalingStrategy.Decibel
  },
  buffer: []
});

describe('Audio Store Mutations', () => {
  it('Set All Parameters', () => {
    const state = makeState();
    const setParams = mutations[Mutations.SetParameters];
    const payload: State['parameters'] = {
      maximumAmplitude: 20000,
      minimumFrequency: new Frequency(100),
      maximumFrequency: new Frequency(5000),
      numberOfChannels: 16,
      useAverage: false,
      scalingStrategy: ScalingStrategy.Linear
    };
    setParams(state, payload);
    expect(state.parameters).toEqual(payload);
  });

  it('Set only some parameters', () => {
    const state = makeState();
    const setParams = mutations[Mutations.SetParameters];
    const payload: Partial<State['parameters']> = {
      maximumAmplitude: 20000,
      minimumFrequency: new Frequency(100),
    };
    setParams(state, payload);
    expect(state.parameters).toMatchObject(payload);
  });

  it('Set the buffer', () => {
    const state = makeState();
    const setBuffer = mutations[Mutations.SetBuffer];
    const payload: State['buffer'] = [1, 2, 3];
    setBuffer(state, payload);
    expect(state.buffer).toEqual(payload);
  });
});

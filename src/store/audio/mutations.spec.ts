import { State } from '.';
import mutations, { Mutations } from './mutations';
import { ScalingStrategy } from '@/models/audioParameters';

const makeState: () => State = () => ({
  parameters: {
    maximumAmplitude: 100,
    minimumFrequency: 1,
    maximumFrequency: 20000,
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
    const payload = {
      maximumAmplitude: 20000,
      minimumFrequency: 0,
      maximumFrequency: 10000,
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
    const payload = { maximumAmplitude: 20000 };
    setParams(state, payload);
    expect(state.parameters).toMatchObject(payload);
  });

  it('Set the buffer', () => {
    const state = makeState();
    const setBuffer = mutations[Mutations.SetBuffer];
    const payload = [1, 2, 3];
    setBuffer(state, payload);
    expect(state.buffer).toEqual(payload);
  });
});

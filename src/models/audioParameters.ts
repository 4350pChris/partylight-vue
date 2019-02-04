// convert to range types as soon as typescript implements it
// might be in ts version 3.4
export default interface AudioParameters {
  maximumFrequency: number;
  minimumFrequency: number;
  numberOfChannels: number;
  maximumAmplitude: number;
  scalingStrategy: ScalingStrategy;
  useAverage: boolean;
}

export enum ScalingStrategy {
  Decibel,
  Linear,
  Sqrt
}

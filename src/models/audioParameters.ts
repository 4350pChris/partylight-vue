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

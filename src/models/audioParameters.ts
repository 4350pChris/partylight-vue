export default interface AudioParameters {
  maximumFrequency: number;
  minimumFrequency: number;
  numberOfChannels: number;
  maximumAmplitude: number;
  scalingStrategy: string;
  useAverage: boolean;
}

export enum ScalingStrategy {
  Decibel,
  Linear,
  Sqrt
}

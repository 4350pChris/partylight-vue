export default interface Settings {
  brightness: number;
  color: Color;
  delay: number;
}

export interface Color {
  a: number;
  r: number;
  g: number;
  b: number;
}

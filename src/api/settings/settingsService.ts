import { BaseSocketService } from '../baseSocketService';
import { Color } from '@/models/settings';

export default class SettingsService extends BaseSocketService {

  getBrightness = () => this.invoke<number>('GetBrightness');

  getDelay = () => this.invoke<number>('GetDelay');

  getColor = () => this.invoke<number>('GetColor').then(n => this.numberToColor(n));

  setBrightness = (brightness: number) => this.invoke<void>('SetBrightness', brightness);

  setDelay = (delay: number) => this.invoke<void>('SetDelay', delay);

  setColor = (color: Color) => this.invoke<void>('SetColor', this.colorToNumber(color));

  onSettingChanged(cb: (prop: string, val: number) => void): void {
    this.on('PropertyChanged', cb);
  }

  private numberToColor(n: number): Color {
    // needs positive int
    if (n < 0) {
      n *= -1;
    }
    // get two's complement by subtracting the inverse of n from 2 ^ 32 (because int is 32 bits)
    const twos = (2 ** 32 - n).toString(16);
    const nums: number[] = [];
    for (let i = 0; i <= 6; i += 2) {
      nums.push(Number('0x' + twos.slice(i, i + 2)));
    }
    return {
      a: nums[0],
      r: nums[1],
      g: nums[2],
      b: nums[3]
    };
  }

  private colorToNumber({ a, r, g, b }: Color): number {
    a = Math.round(a * 255);
    // convert argb to hex values (as string)
    const hex = [a, r, g, b].map(v => v.toString(16).padStart(2, '0'));
    // join hex values and convert to number
    const n = Number('0x' + hex.join(''));
    return 2 ** 32 - n;
  }
}

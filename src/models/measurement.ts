// tslint:disable max-classes-per-file
export class Measurement {
  readonly unit: string;
  value: number;
  constructor(v: number, unit: string) {
    this.value = v;
    this.unit = unit;
  }
}

export class Frequency extends Measurement {
  constructor(v: number) {
    super(v, 'Hz');
  }
}

export class Millisecond extends Measurement {
  constructor(v: number) {
    super(v, 'ms');
  }
}

export class Percentage extends Measurement {
  constructor(v: number) {
    super(v, '%');
  }
}

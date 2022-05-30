export default class Utils {
  static isNumeric(value: unknown): boolean {
    return !Number.isNaN(parseFloat(String(value))) && Number.isFinite(Number(value));
  }

  public static toNumber = (value: unknown, dft = 0): number => (this.isNumeric(value) ? Number(value) : dft);

  public static clamp = (value: number, min: number, max: number): number => {
    return ((value > max) ? max : (value < min) ? min : value);
  };

  public static getRandomIndex = (array: Array<unknown> | string): number => Math.floor((Math.random() * array.length));

  public static getPercentageOf = (number1: number | string, number2: number | string): number => {
    return (Utils.toNumber(number2) / 100) * Utils.toNumber(number1);
  };

  public static getPercents = (number1: number | string, number2: number | string): number => {
    return (((Utils.toNumber(number2) / Utils.toNumber(number1)) || 0) * 100);
  };

  public static setToFixed = (val: number, fixedNumber = 1): string => {
    return ((val % 1) ? val.toFixed(fixedNumber) : String(val));
  };

  public static uuidv4 = (): string => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0; const
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

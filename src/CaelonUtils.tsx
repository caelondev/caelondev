export default class CaelonUtils {
  public static randomRange(min: number, max: number, inclusive = false) {
    if (inclusive) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return Math.floor(Math.random() * (max - min)) + min;
  }
}

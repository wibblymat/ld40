export type V2 = number[] | Float32Array | Float64Array;

export const v2 = {
  create(x = 0, y = 0): V2 {
    return [x, y];
  },

  set(result: V2, x = 0, y = 0) {
    result[0] = x;
    result[1] = y;
  },

  clone(result: V2, a: V2) {
    result[0] = a[0];
    result[1] = a[1];
  },

  isZero(a: V2): boolean {
    return a[0] === 0 && a[1] === 0;
  },

  normalise(result: V2, a: V2) {
    if (!v2.isZero(a)) {
      const length = v2.length(a);
      result[0] = a[0] / length;
      result[1] = a[1] / length;
    }
  },

  lengthSquared(a: V2): number {
    return a[0] ** 2 + a[1] ** 2;
  },

  length(a: V2): number {
    return Math.sqrt(v2.lengthSquared(a));
  },

  distanceSquared(a: V2, b: V2) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  },

  distance(a: V2, b: V2) {
    return Math.sqrt(this.distanceSquared(a, b));
  },

  angle(a: V2): number {
    return Math.atan2(a[1], a[0]);
  },

  add(result: V2, a: V2, b: V2) {
    result[0] = a[0] + b[0];
    result[1] = a[1] + b[1];
  },

  sub(result: V2, a: V2, b: V2) {
    result[0] = a[0] - b[0];
    result[1] = a[1] - b[1];
  },

  mul(result: V2, a: V2, scalar: number) {
    result[0] = a[0] * scalar;
    result[1] = a[1] * scalar;
  },

  rotate(result: V2, a: V2, angle: number) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const x = a[0];
    const y = a[1];

    result[0] = c * x - s * y;
    result[1] = s * x + c * y;
  },

  invert(result: V2, a: V2) {
    result[0] = -a[0];
    result[1] = -a[1];
  },

  dot(a: V2, b: V2): number {
    return a[0] * b[0] + a[1] * b[1];
  },
};

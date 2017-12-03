export function err(): never {
  throw new Error('Something went wrong!');
}

/**
 * inputs and outputs are [0, 1], except h.
 */
export function hsvToRgb(h: number, s: number, v: number) {
  if (s === 0) {
    return [v, v, v];
  }
  if (h >= 360) {
    h = 0;
  }
  h /= 60;

  const i = Math.floor(h);
  const ff = h - i;
  const p = v * (1 - s);
  const q = v * (1 - (s * ff));
  const t = v * (1 - (s * (1 - ff)));

  switch (i) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
    default:
      return [v, p, q];
  }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

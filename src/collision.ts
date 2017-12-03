// GJK/Mikowski collision
import { v2, V2 } from './maths';

export type SupportFunction = (direction: V2) => V2;

const ao = v2.create();
const ab = v2.create();
const ac = v2.create();

function update(simplex: V2[], direction: V2): boolean {
  const last: V2 = simplex[simplex.length - 1];
  const n = simplex.length;
  if (n === 1) {
    direction[0] = -last[0];
    direction[1] = -last[1];
    return false;
  }
  v2.invert(ao, last);
  v2.sub(ab, simplex[0], last);

  if (n === 2) {
    direction[0] = -ab[1];
    direction[1] = ab[0];

    if (v2.dot(direction, ao) < 0) {
      direction[0] = -direction[0];
      direction[1] = -direction[1];
    }

    return false;
  }

  if (n === 3) {
    direction[0] = -ab[1];
    direction[1] = ab[0];

    if (v2.dot(direction, simplex[1]) > 0) {
      direction[0] = -direction[0];
      direction[1] = -direction[1];
    }

    if (v2.dot(direction, ao) > 0) {
      simplex[1] = simplex[2];
      const old = simplex.pop()!;

      return false;
    }

    v2.sub(ac, simplex[1], last);
    direction[0] = -ac[1];
    direction[1] = ac[0];

    if (v2.dot(direction, simplex[0]) > 0) {
      direction[0] = -direction[0];
      direction[1] = -direction[1];
    }

    if (v2.dot(direction, ao) > 0) {
      simplex.shift();
      return false;
    }

    return true;
  }
  return false;
}

const inverseDirection = v2.create();

export function combineSupport(support1: SupportFunction, support2: SupportFunction): SupportFunction {
  // TODO: cache these functions
  return (direction: V2): V2 => {
    v2.invert(inverseDirection, direction);
    const s1 = support1(direction);
    const s2 = support2(inverseDirection);
    v2.sub(s1, s1, s2);
    return s1;
  };
}

export function intersect(support1: SupportFunction, support2: SupportFunction): boolean {
  return intersection(combineSupport(support1, support2));
}

function intersection(support: SupportFunction): boolean {
  const simplex: V2[] = [];
  const direction = v2.create(1, 0);
  while (true) {
    const a = support(direction);
    if (v2.dot(a, direction) < 0) {
      return false;
    }

    simplex.push(a);

    if (update(simplex, direction)) {
      return true;
    }
  }
}

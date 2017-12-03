export enum Key {
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,

  A = 65,
  D = 68,
  S = 83,
  W = 87,
}

const keystate: { [key: number]: boolean } = {};

const controls = {
  isPressed(key: number) {
    return keystate[key];
  },
};

function keydown(e: KeyboardEvent) {
  keystate[e.keyCode] = true;
}

function keyup(e: KeyboardEvent) {
  keystate[e.keyCode] = false;
}

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

export default controls;
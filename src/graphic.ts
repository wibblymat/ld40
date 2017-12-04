import { Facing } from './entity';
import { V2 } from './maths';
import { err } from './utils';

const spritesheet: HTMLImageElement = new Image();

export const spritesLoaded = new Promise((resolve, reject) => {
  spritesheet.onload = resolve;
  spritesheet.onerror = reject;
});

spritesheet.src = 'assets/sprites.png';

function getCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d') || err();

  return [canvas, context];
}

function makeGoblinGraphic(color: string): HTMLCanvasElement {
  const [canvas, context] = getCanvas(20, 20);

  context.translate(10, 10);
  context.fillStyle = color;
  context.strokeStyle = 'white';
  context.beginPath();
  context.arc(0, 0, 8, 0, Math.PI * 2, false);
  context.fill();
  context.stroke();
  context.fillRect(8, -4, 2, 8);

  return canvas;
}

function makePlayerGraphic(): HTMLCanvasElement {
  const [canvas, context] = getCanvas(16, 16);

  context.fillStyle = 'purple';
  context.strokeStyle = 'white';
  context.fillRect(0, 0, 16, 16);
  context.strokeRect(0, 0, 16, 16);

  return canvas;
}

function makeFallbackGraphic() {
  const [canvas, context] = getCanvas(32, 32);

  context.fillStyle = 'blue';
  context.fillRect(0, 0, 32, 32);

  context.strokeStyle = 'white';
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(31, 31);
  context.moveTo(0, 31);
  context.lineTo(31, 0);
  context.stroke();

  return canvas;
}

function makeProjectileGraphic() {
  const [canvas, context] = getCanvas(10, 10);

  context.fillStyle = 'yellow';
  context.strokeStyle = 'black';

  context.beginPath();
  context.arc(4, 4, 4, 0, Math.PI * 2, false);
  context.fill();
  context.stroke();

  return canvas;
}

function makeGrenadeGraphic() {
  const [canvas, context] = getCanvas(16, 16);

  context.fillStyle = 'black';
  context.strokeStyle = 'black';

  context.beginPath();
  context.arc(8, 8, 8, 0, Math.PI * 2, false);
  context.fill();
  context.beginPath();
  context.moveTo(8, 8);
  context.lineTo(16, 16);
  context.stroke();
  context.strokeStyle = 'yellow';

  context.beginPath();
  context.moveTo(15, 15);
  context.lineTo(16, 16);
  context.stroke();

  return canvas;
}

function makeHeartGraphic() {
  const [canvas, context] = getCanvas(32, 32);

  const tileX = 1;
  const tileY = 4;

  spritesLoaded.then(() => {
    context.translate(0, 32);
    context.scale(1, -1);
    context.drawImage(spritesheet, tileX * 32, tileY * 32, 32, 32, 0, 0, 32, 32);
  });

  return canvas;
}

function makeMcguffinGraphic() {
  const [canvas, context] = getCanvas(32, 32);

  const tileX = 0;
  const tileY = 4;

  spritesLoaded.then(() => {
    context.translate(0, 32);
    context.scale(1, -1);
    context.drawImage(spritesheet, tileX * 32, tileY * 32, 32, 32, 0, 0, 32, 32);
  });

  return canvas;
}

function makeExitGraphic() {
  const [canvas, context] = getCanvas(32, 32);

  const tileX = 1;
  const tileY = 2;

  spritesLoaded.then(() => {
    context.translate(0, 32);
    context.scale(1, -1);
    context.drawImage(spritesheet, tileX * 32, tileY * 32, 32, 32, 0, 0, 32, 32);
  });

  return canvas;
}

function makeSpikesGraphic() {
  const [canvas, context] = getCanvas(32, 32);

  const tileX = 2;
  const tileY = 4;

  spritesLoaded.then(() => {
    context.translate(0, 32);
    context.scale(1, -1);
    context.drawImage(spritesheet, tileX * 32, tileY * 32, 32, 32, 0, 0, 32, 32);
  });

  return canvas;
}

function makeFloaterGraphic() {
  const [canvas, context] = getCanvas(32, 32);

  const tileX = 0;
  const tileY = 3;

  spritesLoaded.then(() => {
    context.translate(0, 32);
    context.scale(1, -1);
    context.drawImage(spritesheet, tileX * 32, tileY * 32, 32, 32, 0, 0, 32, 32);
  });

  return canvas;
}

function makeGunIconGraphic() {
  const [canvas, context] = getCanvas(32, 32);

  const tileX = 3;
  const tileY = 4;

  spritesLoaded.then(() => {
    // context.translate(0, 32);
    // context.scale(1, -1);
    context.drawImage(spritesheet, tileX * 32, tileY * 32, 32, 32, 0, 0, 32, 32);
  });

  return canvas;
}

function makeBombIconGraphic() {
  const [canvas, context] = getCanvas(32, 32);

  const tileX = 3;
  const tileY = 3;

  spritesLoaded.then(() => {
    // context.translate(0, 32);
    // context.scale(1, -1);
    context.drawImage(spritesheet, tileX * 32, tileY * 32, 32, 32, 0, 0, 32, 32);
  });

  return canvas;
}

export const playerGraphic = makePlayerGraphic();
export const fallbackGraphic = makeFallbackGraphic();
export const goblinGraphic = makeGoblinGraphic('orange');
export const goblinArcherGraphic = makeGoblinGraphic('red');
export const heartGraphic = makeHeartGraphic();
export const mcguffinGraphic = makeMcguffinGraphic();
export const projectileGraphic = makeProjectileGraphic();
export const exitGraphic = makeExitGraphic();
export const spikesGraphic = makeSpikesGraphic();
export const grenadeGraphic = makeGrenadeGraphic();
export const gunIconGraphic = makeGunIconGraphic();
export const bombIconGraphic = makeBombIconGraphic();
export const floaterGraphic = makeFloaterGraphic();

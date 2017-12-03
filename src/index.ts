import controls, { Key } from './controls';
import { canvas, context } from './display';
import Entity, { EntityType } from './entity';
import { entities, newLevel, player, worldMap } from './gameState';
import { V2, v2 } from './maths';

// The more you have, the worse it gets
// ====================================
//
// Platformer. You must collect, say, 5 mcguffins per level. Each mcguffin adds a
// complication. Like, you take double damage, or more monsters spawn. Or
// perhaps visibilty gets worse. Something like that!
// - Tile based
// - Totally 2D
// - Probably not WebGL during the compo

// Weapons:
// - pistol
// - sword
// - machine gun
// - grenades

// Debuffs:
// - monsters faster
// - can't heal
// - can't change weapon
// - double damage
// - ammo regen slower

// import { buildTime } from 'build-info';

// OKAY, let's code!

// console.log(buildTime);

// Just for the constructor

let lastFrameStart: number = 0;

function loop() {
  if (lastFrameStart === 0) {
    lastFrameStart = performance.now();
  }

  const frameStart = performance.now();
  const dT = Math.min((frameStart - lastFrameStart) / 1000, 0.2);
  lastFrameStart = frameStart;

  for (const entity of entities) {
    entity.update(dT);
  }

  context.save();

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.translate((canvas.width / 2), (canvas.height / 2));
  context.scale(1, -1);
  context.translate(-player.pos[0], -player.pos[1]);

  worldMap.draw(context);

  for (const entity of entities) {
    if (entity.killable /*&& entity.health < entity.maxHealth*/ && entity !== player) {
      context.save();
      context.translate(entity.pos[0], entity.pos[1]);
      context.fillStyle = 'red';
      context.fillRect(-12, entity.radius + 4, 24 * (entity.health / entity.maxHealth), 5);
      context.restore();
    }
    entity.graphic.draw(context, entity.pos, [entity.radius * 2, entity.radius * 2], entity.facing);
  }

  context.restore();

  drawGUI();

  requestAnimationFrame(loop);
}

const healthGradient = context.createLinearGradient(0, 0, 100, 20);
healthGradient.addColorStop(0, 'rgb(128, 0, 0)');
healthGradient.addColorStop(1, 'rgb(255, 55, 55)');

function drawGUI() {
  context.strokeStyle = 'white';
  context.fillStyle = healthGradient;
  context.fillRect(15, 15, 100 * player.health / player.maxHealth, 20);
  context.strokeRect(15, 15, 100, 20);
}

function init() {
  newLevel();
  requestAnimationFrame(loop);
}

init();

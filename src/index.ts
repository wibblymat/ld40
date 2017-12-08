import { drawBanner, drawTopBanner } from './banner';
import controls, { Key } from './controls';
import { canvas, context } from './display';
import Entity, { Facing } from './entity';
import { entities, level, paused, player, reset, togglePause, weaponsAvailable, WeaponType } from './gameState';
import { bombIconGraphic, gunIconGraphic, spritesLoaded } from './graphic';
import { levelsLoaded } from './levels';
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
// - double damage
// - ammo regen slower
// Maybe:
// - can't change weapon
// - Something that makes spikes harder

// import { buildTime } from 'build-info';

// OKAY, let's code!

// console.log(buildTime);

// Just for the constructor

// URGENT TODOS:
// - more levels
// - more creature types - flying? jumping?
// - make creatures not walk off edges
// - Better death effect (deadtimer for fade)

let lastFrameStart: number = 0;
let pauseHeld = false;

function loop() {
  if (lastFrameStart === 0) {
    lastFrameStart = performance.now();
  }

  const frameStart = performance.now();
  const dT = Math.min((frameStart - lastFrameStart) / 1000, 0.2);
  lastFrameStart = frameStart;

  if (controls.isPressed(Key.P)) {
    if (!pauseHeld) {
      togglePause();
    }
    pauseHeld = true;
  } else {
    pauseHeld = false;
  }

  if (!paused) {
    for (const entity of entities) {
      entity.update(dT);
    }

    if (player.pos[1] < 0) {
      player.die();
    }
  }

  context.save();

  context.fillStyle = 'rgb(48, 48, 128)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.translate((canvas.width / 4), (canvas.height / 4));
  context.scale(1, -1);
  context.translate(-player.pos[0], -player.pos[1]);

  level.map.draw(context);

  for (const entity of entities) {
    context.save();
    context.translate(entity.pos[0], entity.pos[1]);
    if (entity.killable && entity.health < entity.maxHealth && entity !== player) {
      context.fillStyle = 'red';
      context.fillRect(-12, entity.radius + 4, 24 * (entity.health / entity.maxHealth), 5);
    }
    if (entity.facing === Facing.Left) {
      context.scale(-1, 1);
    }
    if (entity.isExplosion) {
      context.fillStyle = 'yellow';
      context.beginPath();
      context.arc(0, 0, entity.radius, 0, Math.PI * 2);
      context.fill();
    } else {
      context.drawImage(entity.graphic, -entity.graphic.width / 2, -entity.graphic.height / 2);
    }
    context.restore();
  }

  context.restore();

  drawTopBanner(context, dT);
  drawBanner(context, dT);

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

  context.font = '20px "Fredoka One", Arial, sans-serif';
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.textBaseline = 'top';
  context.fillText(String(player.ammo), 130, 15);
  context.strokeText(String(player.ammo), 130, 15);

  let weaponCounter = 0;

  if (weaponsAvailable.includes(WeaponType.Gun)) {
    context.fillText('1', 20, 56 + (50 * weaponCounter));
    context.drawImage(gunIconGraphic, 45, 50 + (50 * weaponCounter));
    if (player.weaponType === WeaponType.Gun) {
      context.strokeStyle = 'white';
      context.strokeRect(15, 45 + (50 * weaponCounter), 67, 42);
    }
    weaponCounter++;
  }

  if (weaponsAvailable.includes(WeaponType.Grenade)) {
    context.fillText('2', 20, 56 + (50 * weaponCounter));
    context.drawImage(bombIconGraphic, 45, 50 + (50 * weaponCounter));
    if (player.weaponType === WeaponType.Grenade) {
      context.strokeStyle = 'white';
      context.strokeRect(15, 45 + (50 * weaponCounter), 67, 42);
    }
    weaponCounter++;
  }
}

function init() {
  reset();
  requestAnimationFrame(loop);
}

const loadingImage = new Image();
loadingImage.src = 'assets/loading.png';
loadingImage.onload = () => {
  context.drawImage(loadingImage, 0, 0, canvas.width / 2, canvas.height / 2);
  setTimeout(() => {
    Promise.all([levelsLoaded, spritesLoaded]).then(init);
  }, 3000);
};

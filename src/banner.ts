const bannerQueue: Array<{ text: string, size: number }> = [];

export function addBanner(text: string, size: number) {
  if (currentBanner === text) {
    return;
  }
  for (const banner of bannerQueue) {
    if (text === banner.text) {
      return;
    }
  }
  bannerQueue.push({ text, size });
}

let currentTimer = 0;
let currentBanner: string = '';
let currentSize = 20;
const MAX_TIME = 3;

export function drawBanner(context: CanvasRenderingContext2D, dT: number) {
  if (currentTimer <= 0 && bannerQueue.length > 0) {
    currentTimer = MAX_TIME;
    const details = bannerQueue.shift()!;
    currentBanner = details.text;
    currentSize = details.size;
  }

  if (currentTimer > 0) {
    currentTimer -= dT;
  } else {
    currentBanner = '';
    return;
  }

  context.save();
  if (currentTimer > 2.5) {
    context.globalAlpha = 1 - ((currentTimer - 2.5) * 2);
  }
  if (currentTimer < 0.5) {
    context.globalAlpha = Math.max(0, currentTimer * 2);
  }
  context.font = `${currentSize}px "Bungee", Arial, sans-serif`;
  context.textBaseline = 'middle';
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.lineWidth = Math.max(1, currentSize / 20);
  context.shadowOffsetX = Math.max(1, currentSize / 8);
  context.shadowOffsetY = Math.max(1, currentSize / 8);

  const width = context.measureText(currentBanner).width;

  context.fillText(currentBanner, context.canvas.width / 4 - width / 2, context.canvas.height / 4 - 100);
  context.strokeText(currentBanner, context.canvas.width / 4 - width / 2, context.canvas.height / 4 - 100);
  context.restore();
}

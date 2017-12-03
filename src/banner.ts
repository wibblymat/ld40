const bannerQueue: Array<{ text: string, size: number }> = [];
const topBannerQueue: Array<{ text: string, size: number }> = [];

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

export function addTopBanner(text: string, size: number) {
  if (currentTopBanner === text) {
    return;
  }
  for (const banner of topBannerQueue) {
    if (text === banner.text) {
      return;
    }
  }
  topBannerQueue.push({ text, size });
}

let currentTimer = 0;
let currentBanner: string = '';
let currentSize = 20;
const MAX_TIME = 3;

let currentTopTimer = 0;
let currentTopBanner: string = '';
let currentTopSize = 80;
const MAX_TOP_TIME = 3;

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

  context.fillText(currentBanner, context.canvas.width / 4 - width / 2, context.canvas.height / 4 + 100);
  context.strokeText(currentBanner, context.canvas.width / 4 - width / 2, context.canvas.height / 4 + 100);
  context.restore();
}

export function drawTopBanner(context: CanvasRenderingContext2D, dT: number) {
  if (currentTopTimer <= 0 && topBannerQueue.length > 0) {
    currentTopTimer = MAX_TOP_TIME;
    const details = topBannerQueue.shift()!;
    currentTopBanner = details.text;
    currentTopSize = details.size;
  }

  if (currentTopTimer > 0) {
    currentTopTimer -= dT;
  } else {
    currentTopBanner = '';
    return;
  }

  context.save();
  if (currentTopTimer > 2.5) {
    context.globalAlpha = 1 - ((currentTopTimer - 2.5) * 2);
  }
  if (currentTopTimer < 0.5) {
    context.globalAlpha = Math.max(0, currentTopTimer * 2);
  }
  context.font = `${currentTopSize}px "Bungee", Arial, sans-serif`;
  context.textBaseline = 'middle';
  context.fillStyle = 'white';
  context.strokeStyle = 'black';
  context.lineWidth = Math.max(1, currentTopSize / 20);
  context.shadowOffsetX = Math.max(1, currentTopSize / 8);
  context.shadowOffsetY = Math.max(1, currentTopSize / 8);

  const width = context.measureText(currentTopBanner).width;

  context.fillText(currentTopBanner, context.canvas.width / 4 - width / 2, context.canvas.height / 4 - 100);
  context.strokeText(currentTopBanner, context.canvas.width / 4 - width / 2, context.canvas.height / 4 - 100);
  context.restore();
}

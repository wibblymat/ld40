import { err } from './utils';

export const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
export const context = canvas.getContext('2d') || err();

canvas.width = 1920;
canvas.height = 1080;
const targetAspect = canvas.width / canvas.height;
context.imageSmoothingEnabled = false;

function resize() {
  const aspect = window.innerWidth / window.innerHeight;
  if (aspect > targetAspect) {
    canvas.style.height = window.innerHeight + 'px';
    canvas.style.width = (window.innerWidth * targetAspect / aspect) + 'px';
  } else {
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = (window.innerHeight * aspect / targetAspect) + 'px';
  }
}

resize();
window.addEventListener('resize', resize);

document.body.appendChild(canvas);

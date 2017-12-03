import {assetsLoaded, getAsset} from './assets';
import { clamp } from './utils';

const soundAssets: string[] = [
  'click',
  'click2',
  'explosion1',
  'pop',
  'squelch1',
  'urgh',
];

const sounds: Map<string, AudioBuffer> = new Map();
const context = new AudioContext();

const soundGainNode = context.createGain();
const musicGainNode = context.createGain();

soundGainNode.connect(context.destination);
musicGainNode.connect(context.destination);

assetsLoaded.then(() => {
  for (const name of soundAssets) {
    const data = getAsset(`${name}.wav`) as ArrayBuffer;
    context.decodeAudioData(data, (buffer) => {
      sounds.set(name, buffer);
    });
  }
});

class SoundManager {
  get musicVolume() {
    return musicGainNode.gain.value;
  }

  set musicVolume(value: number) {
    value = clamp(value, 0, 1);
    musicGainNode.gain.value = value;
  }

  get soundVolume() {
    return soundGainNode.gain.value;
  }

  set soundVolume(value: number) {
    value = clamp(value, 0, 1);
    soundGainNode.gain.value = value;
  }

  play(name: string) {
    if (sounds.has(name)) {
      const source = context.createBufferSource();
      source.buffer = sounds.get(name)!;
      source.connect(soundGainNode);
      source.start();
    }
  }

  connectMusic(audio: HTMLAudioElement) {
    const source = context.createMediaElementSource(audio);
    source.connect(musicGainNode);
  }
}
export default new SoundManager();

const images = [
  'sprites.png',
];

const music: string[] = [];

const other = [
  'click.wav',
  'click2.wav',
  'explosion1.wav',
  'pop.wav',
  'squelch1.wav',
  'urgh.wav',
  'whoop.wav',
];

type Asset = HTMLImageElement | HTMLAudioElement | ArrayBuffer;

const loaded: Map<string, Asset> = new Map();

function makeURL(filename: string): string {
  return `assets/${filename}`;
}

let pending = 0;

export const assetsLoaded = new Promise((resolve, reject) => {
  const success = (url: string, object: Asset) => {
    pending--;
    loaded.set(url, object);
    if (pending === 0) {
      resolve();
    }
  };

  const fail = (url: string, err: Error | string) => {
    pending--;
    console.log(`Couldn't load ${url}: ${err}`);
    if (pending === 0) {
      resolve();
    }
  };

  for (const imageURL of images) {
    pending++;
    const image = new Image();
    image.src = makeURL(imageURL);
    image.onload = () => success(imageURL, image);
    image.onerror = (e) => fail(imageURL, e.error);
  }

  for (const musicURL of music) {
    pending++;
    const audio = document.createElement('audio');
    audio.src = makeURL(musicURL);
    audio.oncanplay = () => success(musicURL, audio);
    audio.onerror = (e) => fail(musicURL, e.error);
  }

  for (const url of other) {
    pending++;
    fetch(makeURL(url)).then((response) => response.arrayBuffer())
      .then((buffer) => success(url, buffer))
      .catch((reason) => fail(url, reason));
  }
});

// TODO: Progress meter

export function getAsset(name: string): Asset | undefined {
  return loaded.get(name);
}

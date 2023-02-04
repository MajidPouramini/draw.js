import { Video } from '../components/Video';

export class Player {
  constructor(private video: Video) {
    this.draw();
  }

  draw() {
    const playButton: HTMLButtonElement = document.createElement('button');
    this.video.container.appendChild(playButton)
    playButton.innerText = 'play';
    playButton.onclick = () => {
      this.video.play();
    };

    const pause: HTMLButtonElement = document.createElement('button');
    this.video.container.appendChild(pause)
    pause.innerText = 'pause';
    pause.onclick = () => {
      this.video.pause();
    };

    const full: HTMLButtonElement = document.createElement('button');
    this.video.container.appendChild(full)
    full.innerText = 'fullscreen';
    full.onclick = () => {
      this.video.fullScreen();
    };
  }
}

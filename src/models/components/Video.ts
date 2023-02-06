import { Component } from '../Component';
import { Player } from '../misc/Player';

export class Video extends Component {
  videoElement!: HTMLVideoElement;
  sourceElement!: HTMLSourceElement;

  private player = new Player(this);
  constructor(public src: string) {
    super();
    this.createVideoElement();
    this.setVideoOnLoad();
    this.draw();
  }
  public draw() {
    super.draw();
  }

  private createVideoElement(): void {
    this.videoElement = document.createElement('video');
    this.videoElement.className = 'video';
    this.createSourceElement();
    this.content.appendChild(this.videoElement);
  }

  private createSourceElement(): void {
    this.sourceElement = document.createElement('source');
    this.sourceElement.src = this.src;
    this.videoElement.appendChild(this.sourceElement);
  }

  private setVideoOnLoad(): void {
    this.videoElement.onloadedmetadata = event => {
      this.setWidth((event.target as any).videoWidth);
      this.setHeight((event.target as any).videoHeight);
      this.centralize();
    };
  }

  public play() {
    this.videoElement.play().then();
  }

  public pause() {
    this.videoElement.pause();
  }

  public fullScreen() {
    this.videoElement.requestFullscreen().then();
  }
}

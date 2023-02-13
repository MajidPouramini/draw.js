import { Component } from '../Component';
import { Player } from '../misc/Player';
import { Editor } from '../Editor';
import { Loader } from '../features';

export class Video extends Component {
  videoElement!: HTMLVideoElement;
  sourceElement!: HTMLSourceElement;

  private loader: Loader = new Loader(this);
  private player: Player = new Player(this);

  constructor(public src: string, cloneSource?: Video) {
    super(cloneSource);

    this.setWidth(200);
    this.setHeight(100);
    this.createVideoElement();
    this.loader.enable();
    this.setVideoOnLoad();
    this.draw();
  }

  public draw(): void {
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
      const editor: Editor = Editor.getInstance();

      this.loader.disable();
      this.videoElement.controls = true;

      this.setWidth((event.target as HTMLVideoElement).videoWidth);
      this.setHeight((event.target as HTMLVideoElement).videoHeight);
      if (this.getHeight() > editor.getHeight() || this.getWidth() > editor.getWidth()) {
        this.fitToEditor();
      } else {
        this.centralize();
      }
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

  public override clone(): Video {
    return new Video(this.src, this);
  }

  public override clonePropertiesFrom (cloneSource: Component): void {
  }
}

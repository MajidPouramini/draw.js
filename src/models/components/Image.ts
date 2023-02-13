import { Component } from '../Component';
import { Loader } from '../features';

export class Image extends Component {
  imageElement!: HTMLImageElement;

  private loader: Loader = new Loader(this);
  constructor(
    public src: string = 'https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg',
    cloneSource?: Image,
  ) {
    super(cloneSource);
    if (cloneSource) {
      this.clonePropertiesFrom(cloneSource);
    }
    this.loader.enable();
    this.createImageElement();
    this.setImageOnLoad();
    this.draw();
  }

  private createImageElement(): void {
    this.imageElement = document.createElement('img');
    this.imageElement.className = 'image';
    this.imageElement.src = this.src;
    this.content.appendChild(this.imageElement);
  }

  private setImageOnLoad(): void {
    this.imageElement.onload = () => {
      this.loader.disable();
      this.setWidth(this.imageElement.width);
      this.setHeight(this.imageElement.height);
      this.centralize();
    };
  }

  clone(): Component {
    return new Image(this.src, this);
  }

  clonePropertiesFrom(cloneSource: Image): void {
    this.src = cloneSource.src;
  }
}

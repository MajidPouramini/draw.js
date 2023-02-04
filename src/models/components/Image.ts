import {Component} from "../Component";

export class Image extends Component {
    imageElement!: HTMLImageElement;
    constructor(public src: string = 'https://picsum.photos/536/354') {
        super();
        this.createImageElement();
        this.setImageOnLoad();
        this.draw();
    }
    public draw() {
        super.draw();
    }

    private createImageElement(): void {
        this.imageElement = document.createElement('img');
        this.imageElement.className = 'image';
        this.imageElement.src = this.src;
        this.content.appendChild(this.imageElement);
    }

    private setImageOnLoad(): void {
        this.imageElement.onload = () => {
            this.setWidth(this.imageElement.width);
            this.setHeight(this.imageElement.height);
            this.centralize();
        };
    }
}
import { Shape } from './Shape';
import { Resizer } from '../features';
import { Component } from '../Component';
import { numberToPixel } from '../../utils/utils';
import { Font } from '../../interfaces/Font';

export class TextField extends Component {
  private padding: number = 5;
  private color: string = '#fff';
  private font: Font = { family: 'sans-serif', size: 24 };

  private text: string = 'Sample Text';

  constructor(private shape?: Shape, cloneSource?: TextField) {
    super(cloneSource);
    // if (this.shape) {
    //   this.shape.content.innerText = this.text;
    // } else {
    //   this.content.innerText = this.text;
    // }
    this.draw();
  }

  public getPadding(): number {
    return this.padding;
  }

  public setPadding(padding: number): void {
    this.padding = padding;
    this.draw();
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
    this.draw();
  }

  public getText(): string {
    return this.text;
  }

  public setText(text: string): void {
    this.text = text;
    this.draw();
  }

  protected override draw() {
    super.draw();

    this.content.style.padding = numberToPixel(this.padding);
    this.content.innerText = this.text;
    this.content.style.color = this.color;
    this.content.style.fontFamily = this.font.family;
    this.content.style.fontSize = numberToPixel(this.font.size);
    this.content.contentEditable = 'true';
    this.content.onchange = ev => {
      console.log(ev);
    };
  }

  public override clone(): TextField {
    return new TextField(this.shape, this);
  }

  public override clonePropertiesFrom(cloneSource: TextField): void {
    this.text = cloneSource.text;
    this.font = { ...cloneSource.font };
    this.color = cloneSource.color;
    this.padding = cloneSource.padding;
  }
}

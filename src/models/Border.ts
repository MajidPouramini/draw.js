import { BaseObject } from './BaseObject';
import {Drawable} from "../interfaces/Drawable";

export class Border implements Drawable {
  private _width: number = 0;
  private _color: string = '#5656cc';
  private _style: string = 'solid';

  constructor(private object: BaseObject) {}

  set width(width: number) {
    this._width = width;
    this.draw();
  }

  set color(color: string) {
    this._color = color;
    this.draw();
  }

  set style(style: string) {
    this._style = style;
  }

  draw() {
    let s = (this.object.content.firstChild as SVGElement);
    s.setAttribute(
      'stroke-width',
      this._width.toString(),
    );
    s.setAttribute('stroke', this._color)
  }

  remove() {}
}

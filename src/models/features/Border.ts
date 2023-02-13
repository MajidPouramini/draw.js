import { BaseObject } from '../BaseObject';
import { Drawable } from '../../interfaces/Drawable';

export class Border implements Drawable {
  private width: number = 0;
  private color: string = '#5656cc';
  private style: string = 'solid';

  constructor(private object: BaseObject, cloneSource?: Border) {
    if (cloneSource) {
      this.setBorderPropertiesFrom(cloneSource);
    }
  }

  public setWidth(width: number) {
    this.width = width;
    this.draw();
  }

  public setColor(color: string) {
    this.color = color;
    this.draw();
  }

  public setStyle(style: string) {
    this.style = style;
  }

  public draw() {
    let s = this.object.content.firstChild as SVGElement;
    s.setAttribute('stroke-width', this.width.toString());
    s.setAttribute('stroke', this.color);
  }

  public remove(): void {
    this.setWidth(0);
  }

  public clone(): Border {
    return new Border(this.object, this)
  }

  private setBorderPropertiesFrom(cloneSource: Border): void {
    this.width = cloneSource.width;
    this.color = cloneSource.color;
    this.style = cloneSource.style;
  }
}

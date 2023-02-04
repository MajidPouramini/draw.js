import { Component } from './Component';
import { Border } from './Border';
import { ShapeType } from '../interfaces/ShapeType';
import { SHAPE_MAP } from '../constants/shapes/circle';
import { TextField } from './TextField';

export class Shape extends Component {
  public border: Border = new Border(this);
  public textEditor: TextField = new TextField(this);

  constructor(private type: ShapeType) {
    super();
    this.draw();
  }

  setType(type: ShapeType) {
    this.type = type;
    this.draw();
  }

  getType(): ShapeType {
    return this.type;
  }

  override setWidth(width: number) {
    super.setWidth(width);
    this.draw();
  }

  override setHeight(height: number) {
    super.setHeight(height);
    this.draw();
  }

  override setBackgroundColor(color: string) {
    super.setBackgroundColor(color);
    this.draw();
  }

  protected override draw() {
    super.draw();
    this.content.innerHTML = SHAPE_MAP[this.type];
    let path = ((this.content as HTMLElement).firstChild as HTMLElement).firstChild as HTMLElement;
    if (this.type === 'CIRCLE') {
      path.setAttribute('cx', String(this.getWidth() / 2));
      path.setAttribute('cy', String(this.getHeight() / 2));
      path.setAttribute('rx', String(this.getWidth() / 2));
      path.setAttribute('ry', String(this.getHeight() / 2));
      path.setAttribute('ry', String(this.getHeight() / 2));
      path.setAttribute('fill', this.getBackgroundColor());
    } else if (this.type === 'SQUARE') {
      path.setAttribute('x', String(0));
      path.setAttribute('y', String(0));
      path.setAttribute('width', String(this.getWidth()));
      path.setAttribute('height', String(this.getHeight()));
      path.setAttribute('fill', this.getBackgroundColor());
    } else if (this.type === 'TRIANGLE') {
      path.setAttribute(
        'points',
        `0,${this.getHeight()} ${this.getWidth()},${this.getHeight()} ${this.getWidth() / 2},0`,
      );
      path.setAttribute('fill', this.getBackgroundColor());
    }
  }
}

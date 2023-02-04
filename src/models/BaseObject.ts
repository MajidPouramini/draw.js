import { numberToPixel } from '../utils/utils';
import { saveSnapshot } from './misc/EditorStateRepository';
import { StateOption } from '../interfaces/StateOption';
import { DEFAULT_STATE_OPTION } from '../constants/stateOption';

export class BaseObject {
  /** Container of object */
  public container!: HTMLDivElement;

  /** Content of object */
  public content!: HTMLDivElement;

  /** Whether the object is selected or not*/
  public selected: boolean = false;

  private backgroundColor: string = '#7d67e3';

  constructor(
    private width: number = 100,
    private height: number = 100,
    private top: number = 0,
    private left: number = 0,
  ) {
    this.drawContainerElement();
    this.drawContentElement();
  }

  private drawContainerElement() {
    this.container = document.createElement('div');
    this.container.className = 'container';
  }

  private drawContentElement() {
    this.content = document.createElement('div');
    this.content.className = 'content';
    this.container.appendChild(this.content);
  }

  public getContainerStyle(): CSSStyleDeclaration {
    return this.container.style;
  }

  public getWidth() {
    return this.width;
  }

  // @saveSnapshot()
  public setWidth(width: number, options: StateOption = DEFAULT_STATE_OPTION) {
    this.width = width;
    this.draw();
  }

  public changeWidthBy(amount: number) {
    this.setWidth(this.width + amount);
  }

  public getHeight() {
    return this.height;
  }

  public setHeight(height: number) {
    this.height = height;
    this.draw();
  }

  public changeHeightBy(amount: number) {
    this.setHeight(this.height + amount);
  }

  public getTop(): number {
    return this.top;
  }

  public setTop(top: number) {
    this.top = top;
    this.draw();
  }

  public changeTopBy(amount: number) {
    this.setTop(this.top + amount);
  }

  public getLeft(): number {
    return this.left;
  }

  public setLeft(left: number) {
    this.left = left;
    this.draw();
  }

  public changeLeftBy(amount: number) {
    this.setLeft(this.left + amount);
  }

  public getBackgroundColor(): string {
    return this.backgroundColor;
  }

  public setBackgroundColor(color: string): void {
    this.backgroundColor = color;
  }

  protected draw(): void {
    this.container.style.top = numberToPixel(this.top);
    this.container.style.left = numberToPixel(this.left);
    this.container.style.width = numberToPixel(this.width);
    this.container.style.height = numberToPixel(this.height);
  }

  public isSelected() {
    return this.selected;
  }

}

import { numberToPixel } from '../utils/utils';

export abstract class BaseObject {
  /** Container of object */
  public container!: HTMLDivElement;

  /** Content of object */
  public content!: HTMLDivElement;

  /** Whether the object is selected or not */
  public selected: boolean = false;

  /** Width of object */
  private width: number = 100;

  /** Height of object */
  private height: number = 100;

  /** Top position offset of object */
  private top: number = 0;

  /** Left position offset of object */
  private left: number = 0;

  /** Background color of object in hex format */
  private backgroundColor: string = '#b8ff75';

  protected constructor(cloneSource?: BaseObject) {
    if (cloneSource) {
      this.cloneBaseObjectPropertiesFrom(cloneSource);
    }
    this.drawContainerElement();
    this.drawContentElement();
  }

  public cloneBaseObjectPropertiesFrom(cloneSource: BaseObject): void {
    this.width = cloneSource.width;
    this.height = cloneSource.height;
    this.top = cloneSource.top;
    this.left = cloneSource.left;
    this.backgroundColor = cloneSource.backgroundColor;
  }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): void {
    this.width = width;
    this.draw();
  }

  public changeWidthBy(amount: number): void {
    this.setWidth(this.width + amount);
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(height: number): void {
    this.height = height;
    this.draw();
  }

  public changeHeightBy(amount: number): void {
    this.setHeight(this.height + amount);
  }

  public getTop(): number {
    return this.top;
  }

  public setTop(top: number): void {
    this.top = top;
    this.draw();
  }

  public changeTopBy(amount: number): void {
    this.setTop(this.top + amount);
  }

  public getLeft(): number {
    return this.left;
  }

  public setLeft(left: number): void {
    this.left = left;
    this.draw();
  }

  public changeLeftBy(amount: number): void {
    this.setLeft(this.left + amount);
  }

  public getBackgroundColor(): string {
    return this.backgroundColor;
  }

  public setBackgroundColor(color: string): void {
    this.backgroundColor = color;
  }

  public isSelected(): boolean {
    return this.selected;
  }

  protected draw(): void {
    this.container.style.top = numberToPixel(this.top);
    this.container.style.left = numberToPixel(this.left);
    this.container.style.width = numberToPixel(this.width);
    this.container.style.height = numberToPixel(this.height);
  }

  private drawContainerElement(): void {
    this.container = document.createElement('div');
    this.container.className = 'container';
  }

  private drawContentElement(): void {
    this.content = document.createElement('div');
    this.content.className = 'content';
    this.container.appendChild(this.content);
  }
}

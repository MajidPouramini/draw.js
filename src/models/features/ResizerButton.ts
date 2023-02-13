import { ResizerButtonPosition } from '../../constants/resizer';
import { Component } from '../Component';
import { Resizer } from './Resizer';

export class ResizerButton {
  private element!: HTMLDivElement;
  private clientXChange: number = 0;
  private clientYChange: number = 0;
  private lastXClient: number = 0;
  private lastYClient: number = 0;

  constructor(
    private position: ResizerButtonPosition,
    private component: Component,
    private resizer: Resizer,
  ) {
    this.draw();
    this.listenOnMouseDown();
  }

  private draw(): void {
    this.element = document.createElement('div');
    this.element.classList.add('resizer-item-' + this.position);
    this.resizer.element?.appendChild(this.element);
  }

  private listenOnMouseDown(): void {
    this.element.onmousedown = e => this.onDragMouseDown.call(this, e);
  }

  private onDragMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.lastXClient = event.clientX;
    this.lastYClient = event.clientY;

    this.element.classList.add('active');
    this.resizer.hideAllButtonsExcept(this);
    this.resizer.showTooltip();

    document.onmouseup = () => this.onDragMouseup.call(this);
    document.onmousemove = e => this.onDrag.call(this, e);
  }

  private onDragMouseup(): void {
    document.onmouseup = null;
    document.onmousemove = null;

    // todo save a snapshot here

    this.element.classList.remove('active');
    this.resizer.showAllButtons();
    this.resizer.hideTooltip();
  }

  private onDrag(e: MouseEvent): void {
    e.preventDefault();

    this.clientXChange = this.lastXClient - e.clientX;
    this.clientYChange = this.lastYClient - e.clientY;
    this.lastXClient = e.clientX;
    this.lastYClient = e.clientY;

    this.resizer.updateTooltipText();

    this.resizeBasedOnResizerButtonPosition();
  }

  private resizeBasedOnResizerButtonPosition(): void {
    switch (this.position) {
      case 'top':
        this.handleTopResizer();
        break;
      case 'right':
        this.handleRightResizer();
        break;
      case 'bottom':
        this.handleBottomResizer();
        break;
      case 'left':
        this.handleLeftResizer();
        break;
      case 'top-left':
        this.handleTopResizer();
        this.handleLeftResizer();
        break;
      case 'top-right':
        this.handleTopResizer();
        this.handleRightResizer();
        break;
      case 'bottom-right':
        this.handleBottomResizer();
        this.handleRightResizer();
        break;
      case 'bottom-left':
        this.handleBottomResizer();
        this.handleLeftResizer();
        break;
    }
  }

  private handleTopResizer(): void {
    if (this.lastYClient > this.component.getTop() + this.component.getHeight()) return;
    this.component.changeTopBy(-this.clientYChange);
    this.component.changeHeightBy(this.clientYChange);
  }

  private handleRightResizer(): void {
    if (this.lastXClient < this.component.getLeft()) return;
    this.component.changeWidthBy(-this.clientXChange);
  }

  private handleBottomResizer(): void {
    if (this.lastYClient < this.component.getTop()) return;
    this.component.changeHeightBy(-this.clientYChange);
  }

  private handleLeftResizer(): void {
    if (this.lastXClient > this.component.getLeft() + this.component.getWidth()) return;
    this.component.changeLeftBy(-this.clientXChange);
    this.component.changeWidthBy(this.clientXChange);
  }

  public hide() {
    this.element.classList.add('hidden');
  }

  public show() {
    this.element.classList.remove('hidden');
  }
}

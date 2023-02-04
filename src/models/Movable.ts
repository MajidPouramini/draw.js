import { Component } from './Component';
import { Editor } from './Editor';

export class Movable {
  private clientXChange: number = 0;
  private clientYChange: number = 0;
  private lastClientX: number = 0;
  private lastClientY: number = 0;

  private elementIsMoved: boolean = false;

  constructor(private component: Component) {
    this.component.container.onmousedown = event => this.onElementMouseDown.call(this, event);
  }

  private onElementMouseDown(event: MouseEvent): void {
    event.preventDefault();

    Editor.getInstance().selectComponent(this.component);

    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;

    document.onmouseup = () => this.onMouseUp.call(this);
    document.onmousemove = e => this.onMouseMove.call(this, e);
  }

  private onMouseMove(event: MouseEvent): void {
    event.preventDefault();

    this.clientXChange = this.lastClientX - event.clientX;
    this.clientYChange = this.lastClientY - event.clientY;
    this.lastClientX = event.clientX;
    this.lastClientY = event.clientY;

    this.onElementMove();
  }

  private onMouseUp(): void {
    document.onmouseup = null;
    document.onmousemove = null;
    this.elementIsMoved = false;
    this.changeCursorTypeToDefault();
    this.component.resizer.showAllButtons();
  }

  private changeCursorTypeToMove(): void {
    this.component.container.style.cursor = 'move';
  }

  private changeCursorTypeToDefault(): void {
    this.component.container.style.cursor = 'default';
  }

  private onElementMove(): void {
    this.elementIsMoved = this.elementIsMoved
      ? true
      : Math.abs(this.clientXChange) > 0 || Math.abs(this.clientYChange) > 0;

    if (this.elementIsMoved) {
      this.component.resizer.hideAllButtons();
      this.changeCursorTypeToMove();
      this.component.changeTopBy(-this.clientYChange);
      this.component.changeLeftBy(-this.clientXChange);
    }
  }
}

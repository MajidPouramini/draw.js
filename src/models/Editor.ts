import { BaseObject } from './BaseObject';
import { Component } from './Component';
import { EditorOptions } from '../interfaces/EditorOptions';
import { Border } from './features';
import { Point } from './misc/Point';
import { ShortcutRepository } from './misc/ShortcutRepository';
import { EditorUtils } from './misc/EditorUtils';
import { Group } from './components';
import { SAME_POSITION_OBJECT_OFFSET } from '../constants';

export class Editor extends BaseObject {
  private border: Border = new Border(this);
  public components: Component[] = [];
  private static instance?: Editor;
  private shortcutRepository: ShortcutRepository = new ShortcutRepository(this);

  public utils: EditorUtils = new EditorUtils(this);

  constructor(boardId: string, width: number, height: number, private options?: EditorOptions) {
    super();

    this.setWidth(width);
    this.setHeight(height);
    this.draw();
    const board = document.getElementById(boardId);
    this.addEditorEventListeners();
    this.setupEditor(board!);
    Editor.instance = this;
  }

  draw(): void {
    super.draw();

    this.container.style.position = 'relative';
    if (this.options?.hasHiddenOverflow) this.container.style.overflow = 'hidden';
    this.removeAllComponentsFromDOM();
    this.components.forEach(component => this.content.appendChild(component.container));
  }

  public addComponent(component: Component, options: { center: boolean } = { center: true }): void {
    options.center && component.centralize();
    this.placeComponent(component);
    this.deselectAllComponents();
    component.select();

    this.components.push(component);
    this.draw();
  }

  private placeComponent(component: Component): void {
    while (this.anotherComponentAlreadyExistInPosition(component.getTop(), component.getLeft())) {
      component.changeTopBy(SAME_POSITION_OBJECT_OFFSET);
      component.changeLeftBy(SAME_POSITION_OBJECT_OFFSET);
    }
  }

  private anotherComponentAlreadyExistInPosition(top: number, left: number): boolean {
    return this.components.some(
      component => component.getTop() === top && component.getLeft() === left,
    );
  }

  public getSelectedComponent(): Component | undefined {
    return this.components.find(com => com.selected);
  }

  public getSelectedComponents(): Component[] {
    return this.components.filter(component => component.selected);
  }

  public export(): string {
    this.deselectAllComponents();
    return `<div style="overflow: hidden; width: max-content; height: max-content" >
              ${this.container.outerHTML}
            </div>`;
  }

  public removeSelectedComponent(): void {
    if (this.getSelectedComponent()) {
      this.removeComponent(this.getSelectedComponent()!);
    }
  }

  public removeComponent(component: Component): void {
    const componentIndex: number = this.components.findIndex(c => c === component);
    this.components.splice(componentIndex, 1);
    this.draw();
  }

  public getCenterPoint(): Point {
    return {
      x: this.getWidth() / 2,
      y: this.getHeight() / 2,
    };
  }

  activeObjects(): Component[] {
    return this.components.filter(component => component.selected);
  }

  private setupEditor(board: HTMLElement) {
    this.clearComponents();
    board.appendChild(this.container);
  }

  public static getInstance(): Editor {
    if (!this.instance) {
      throw new Error('Editor: No editor instance found');
    } else {
      return this.instance;
    }
  }

  public selectComponent(component: Component) {
    if (!this.shortcutRepository.isHoldingCtrl) {
      this.deselectAllComponents();
    }
    component.select();
  }

  public deselectAllComponents(): void {
    this.components.forEach(component => component.deselect());
  }

  private addEditorEventListeners(): void {
    // document.addEventListener('click', event => {
    //   if ((event.target as any).className === 'content') {
    //     this.deselectAllComponents();
    //   }
    // });
  }

  public duplicateSelectedComponent(): void {
    const selectedComponent: Component | undefined = this.getSelectedComponent()?.clone();
    if (selectedComponent) {
      this.addComponent(selectedComponent, { center: false });
    }
  }

  private removeAllComponentsFromDOM(): void {
    while (this.content.firstChild) {
      this.content.removeChild(this.content.firstChild);
    }
  }

  public clearComponents() {
    this.components = [];
    this.content.innerHTML = '';
  }

  public groupSelectedComponents(): void {
    const selectedComponents: Component[] = this.getSelectedComponents();
    if (selectedComponents.length > 1) {
      const group: Group = new Group();
      selectedComponents.forEach(component => {
        group.addComponent(component);
        this.removeComponent(component);
      });

      this.addComponent(group, { center: false });
    }
  }
}

import { Component } from '../Component';
import { BaseObject } from '../BaseObject';

export class Loader {
  element!: HTMLDivElement;

  constructor(private object: BaseObject) {
    this.element = document.createElement('div');
    this.element.className = 'loader';
    this.object.container.appendChild(this.element);
  }

  enable(): void {
    this.element.style.display = 'initial';
  }

  disable(): void {
    this.element.style.display = 'none';
  }
}

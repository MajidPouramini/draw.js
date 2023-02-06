import { BaseObject } from '../BaseObject';

export class Menu {
  constructor(private object: BaseObject) {
    this.initialize();
  }

  initialize() {
    let menu = document.createElement('div');
    menu.className = 'menu';
    this.object.container.appendChild(menu);
  }
}

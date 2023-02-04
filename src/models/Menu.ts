import { BaseObject } from './BaseObject';
import { Editor } from './Editor';
import { Shape } from './Shape';

export class Menu {
    constructor(private object: BaseObject) {
        this.initialize()
    }

    initialize() {
        let menu = document.createElement('div');
        menu.className = 'menu';
        this.object.container.appendChild(menu);
    }
}

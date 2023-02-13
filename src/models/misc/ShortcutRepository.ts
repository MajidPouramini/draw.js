import { Shortcut } from '../../interfaces/Shortcut';
import { Editor } from '../Editor';

export class ShortcutRepository {
  static registeredShortcuts: Shortcut[] = [
    { key: 'ArrowDown', callback: editor => editor.getSelectedComponent()?.changeTopBy(2) },
    { key: 'ArrowUp', callback: editor => editor.getSelectedComponent()?.changeTopBy(-2) },
    { key: 'ArrowRight', callback: editor => editor.getSelectedComponent()?.changeLeftBy(2) },
    { key: 'ArrowLeft', callback: editor => editor.getSelectedComponent()?.changeLeftBy(-2) },
    { key: 'Delete', callback: editor => editor.removeSelectedComponent() },
  ];
  isHoldingCtrl = false;
  constructor(editor: Editor) {
    document.addEventListener('keydown', e => {
      if (e.key === 'Control') {
        this.isHoldingCtrl = true;
      }
      if (ShortcutRepository.registeredShortcuts.map(shortcut => shortcut.key).includes(e.key)) {
        ShortcutRepository.registeredShortcuts
          .find(shortcut => shortcut.key === e.key)!
          .callback(editor);
      }
    });

    document.addEventListener('keyup', e => {
      if (e.key === 'Control') {
        this.isHoldingCtrl = false;
      }
    });
  }
}

function bindToKey() {
  console.log('first(): factory evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ShortcutRepository.registeredShortcuts.push();
    console.log('first(): called');
  };
}

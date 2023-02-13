import { BaseObject } from './BaseObject';
import { Editor } from './Editor';
import { Cropper } from './features';
import { Resizer } from './features';
import { Movable } from './features';
import { Point } from './misc/Point';
import { FIT_TO_EDITOR_OFFSET } from '../constants';
import { Cloneable } from '../interfaces/Cloneable';

export abstract class Component extends BaseObject implements Cloneable {
  cropper: Cropper = new Cropper(this);
  resizer: Resizer = new Resizer(this);

  private movable: Movable = new Movable(this);

  protected constructor(cloneSource?: Component) {
    super(cloneSource);
    if (cloneSource) {
      this.clonePropertiesFrom(cloneSource)
    }
  }

  public select(): void {
    this.selected = true;
    this.resizer.show();
  }

  public deselect(): void {
    this.selected = false;
    this.resizer.hide();
  }

  public centralize(): void {
    const centerPoint: Point = Editor.getInstance().getCenterPoint();
    this.setTop(centerPoint.y - this.getHeight() / 2);
    this.setLeft(centerPoint.x - this.getWidth() / 2);
  }

  public fitToEditor(): void {
    const editor: Editor = Editor.getInstance();
    const widthScale: number = editor.getWidth() / this.getWidth();
    const heightScale: number = editor.getHeight() / this.getHeight();
    const minScale: number = Math.min(widthScale, heightScale);

    this.setWidth(this.getWidth() * minScale - FIT_TO_EDITOR_OFFSET);
    this.setHeight(this.getHeight() * minScale - FIT_TO_EDITOR_OFFSET);
    this.centralize();
  }

  public fillToEditor(): void {
    const editor: Editor = Editor.getInstance();
    this.setWidth(editor.getWidth());
    this.setHeight(editor.getHeight());
    this.centralize();
  }

  public abstract clone(): Component;
  public abstract clonePropertiesFrom(cloneSource: Component): void;
}

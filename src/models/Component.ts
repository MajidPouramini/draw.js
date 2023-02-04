import { BaseObject } from './BaseObject';
import { TriangleSvg } from '../constants/shapes/triangle';
import { Editor } from './Editor';
import { Cropper } from './Cropper';
import { Resizer } from './Resizer';
import { Movable } from './Movable';
import { Point } from './misc/Point';

export class Component extends BaseObject {
  cropper: Cropper = new Cropper(this);
  resizer: Resizer = new Resizer(this);

  private movable: Movable = new Movable(this);

  constructor() {
    super();
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
}

export class Triangle extends Component {
  constructor() {
    super();
    this.content.innerHTML = TriangleSvg;
    const style2 = this.getContainerStyle();
    style2.width = '200px';
    style2.height = '200px';
    this.centralize();
    // super.setBorder()
  }
}

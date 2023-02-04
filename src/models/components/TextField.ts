import { Shape } from './Shape';
import { Resizer } from '../features/Resizer';
import { Component } from '../Component';

export class TextField extends Component {
  constructor(private shape?: Shape) {
    super();
    if (this.shape) {
      this.shape.content.innerText = 'hi';
    } else {
      this.resizer = new Resizer(this);
      this.content.innerText = 'self text field';
    }
  }
}

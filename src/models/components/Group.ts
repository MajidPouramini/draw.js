import { Component } from '../Component';

export class Group extends Component {
  private components: Component[] = [];
  constructor() {
    super();
    this.draw();
  }

  public addComponent(...component: Component[]): void {
    this.components.push(...component);
    // debugger;
    this.setCoordinatesBasedOnComponents();
  }

  private setCoordinatesBasedOnComponents() {
    const prevTop: number = this.getTop();
    const prevLeft: number = this.getLeft();

    this.setTop(Math.min(...this.components.map(component => component.getTop())));
    this.setLeft(Math.min(...this.components.map(component => component.getLeft())));

    if (this.getTop() !== prevTop || this.getLeft() !== prevLeft) {
      this.resetComponentsCoordinates();
    }
  }

  private resetComponentsCoordinates(): void {
    this.components.forEach(component => {
      component.deselect();
      console.log(component.getTop(), this.getTop());
      component.changeTopBy(-this.getTop());
      component.changeLeftBy(-this.getLeft());
    });
  }

  protected draw() {
    super.draw();

    // this.components.forEach(component => this.content.appendChild(component.container));
  }
}

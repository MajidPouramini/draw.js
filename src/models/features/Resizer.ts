import { Component } from '../Component';
import {
  RESIZER_BUTTONS_POSITION,
  SIDE_BUTTONS_POSITION,
} from '../../constants/resizer';
import { ResizerButton } from './ResizerButton';

export class Resizer {
  public element!: HTMLDivElement;
  private resizerButtons: ResizerButton[] = [];
  private tooltip!: HTMLDivElement;
  private preserveAspectRatio: boolean = false;

  constructor(private component: Component) {
    this.draw();
  }

  private draw(): void {
    this.drawResizerElement();
    this.drawResizerButtons();
    this.drawWidthAndHeightTooltip();
  }

  private drawResizerElement(): void {
    this.element = document.createElement('div');
    this.element.className = 'resizer';
    this.component.container.appendChild(this.element);
  }

  private drawResizerButtons(): void {
    this.resizerButtons = []
    RESIZER_BUTTONS_POSITION.forEach(position => {
      if (this.preserveAspectRatio && SIDE_BUTTONS_POSITION.includes(position)) {
        return;
      }
      const button: ResizerButton = new ResizerButton(position, this.component, this);
      this.resizerButtons.push(button);
    });
  }

  private drawWidthAndHeightTooltip(): void {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'resizer-tooltip';
    this.element.appendChild(this.tooltip);
    this.hideTooltip();
  }

  public show(): void {
    this.element.classList.remove('hidden');
  }

  public hide(): void {
    this.element.classList.add('hidden');
  }

  public showAllButtons(): void {
    this.resizerButtons.forEach(button => button.show());
  }

  public hideAllButtons(): void {
    this.resizerButtons.forEach(button => button.hide());
  }

  public hideAllButtonsExcept(except: ResizerButton): void {
    this.resizerButtons.filter(button => button !== except).forEach(button => button.hide());
  }

  public showTooltip(): void {
    this.tooltip.classList.remove('hidden');
  }

  public hideTooltip(): void {
    this.tooltip.classList.add('hidden');
  }

  public updateTooltipText(): void {
    this.tooltip.innerText = `width: ${this.component.getWidth()}, height: ${this.component.getHeight()}`;
  }
}

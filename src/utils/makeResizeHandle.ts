import { ResizerItemPosition, RESIZER_BUTTONS_POSITION } from '../constants/resizer';
import { extractNumber } from './utils';

export function makeResizeHandle(
  container: HTMLElement,
  element: HTMLElement,
  position: ResizerItemPosition,
) {
  let clientXChange = 0,
    clientYChange = 0,
    lastXClient = 0,
    lastYClient = 0;
  element.onmousedown = onDragMouseDown;

  function onDragMouseDown(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    lastXClient = e.clientX;
    lastYClient = e.clientY;

    RESIZER_BUTTONS_POSITION.forEach(item => {
      if (item !== position) {
        Array.from(document.getElementsByClassName(`resizer-item-${item}`)).forEach(item => {
          (item as HTMLElement).style.display = 'none';
        });
      }
    });

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    RESIZER_BUTTONS_POSITION.forEach(item => {
      Array.from(document.getElementsByClassName(`resizer-item-${item}`)).forEach(item => {
        (item as HTMLElement).style.display = 'block';
      });
    });
  }

  function elementDrag(e: MouseEvent) {
    e.preventDefault();
    clientXChange = lastXClient - e.clientX;
    clientYChange = lastYClient - e.clientY;
    lastXClient = e.clientX;
    lastYClient = e.clientY;
    handleDragBasedOnResizerItem(position);
  }

  function handleDragBasedOnResizerItem(position: ResizerItemPosition) {
    switch (position) {
      case 'top':
        handleTopResizer();
        break;
      case 'right':
        handleRightResizer();
        break;
      case 'bottom':
        handleBottomResizer();
        break;
      case 'left':
        handleLeftResizer();
        break;
      case 'top-left':
        handleTopResizer();
        handleLeftResizer();
        break;
      case 'top-right':
        handleTopResizer();
        handleRightResizer();
        break;
      case 'bottom-right':
        handleBottomResizer();
        handleRightResizer();
        break;
      case 'bottom-left':
        handleBottomResizer();
        handleLeftResizer();
        break;
    }
  }

  function handleTopResizer() {
    if (lastYClient > extractNumber(container.style.top) + extractNumber(container.style.height))
      return;
    container.style.top = `${extractNumber(container.style.top) - clientYChange}px`;
    container.style.height = `${extractNumber(container.style.height) + clientYChange}px`;
  }

  function handleRightResizer() {
    if (lastXClient < extractNumber(container.style.left)) return;
    container.style.width = `${extractNumber(container.style.width) - clientXChange}px`;
  }

  function handleBottomResizer() {
    if (lastYClient < extractNumber(container.style.top)) return;
    container.style.height = `${extractNumber(container.style.height) - clientYChange}px`;
  }

  function handleLeftResizer() {
    if (lastXClient > extractNumber(container.style.left) + extractNumber(container.style.width))
      return;
    container.style.left = `${extractNumber(container.style.left) - clientXChange}px`;
    container.style.width = Number(container.style.width.split('px')[0]) + clientXChange + 'px';
  }
}

export const SIDE_BUTTONS_POSITION: ResizerButtonPosition[] = ['top', 'right', 'bottom', 'left'];
export const CORNER_BUTTONS_POSITION: ResizerButtonPosition[] = [
  'top-right',
  'bottom-right',
  'bottom-left',
  'top-left',
];

export const RESIZER_BUTTONS_POSITION: ResizerButtonPosition[] = [
  ...SIDE_BUTTONS_POSITION,
  ...CORNER_BUTTONS_POSITION,
];

export type ResizerButtonPosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

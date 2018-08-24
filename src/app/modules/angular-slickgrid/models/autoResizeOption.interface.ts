export interface AutoResizeOption {
  /** bottom padding of the grid in pixels */
  bottomPadding?: number;

  /** container id */
  containerId?: string;

  /** minimum height to use in pixels */
  minHeight?: any;

  /** minimum width to use in pixels */
  minWidth?: any;

  /** side (left/right) padding in pixels */
  sidePadding?: number;

  /** defaults to 10ms, delay before triggering the auto-resize */
  delay?: number;
}

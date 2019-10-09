export interface AutoResizeOption {
  /** Defaults to 'window', which DOM element are we using to calculate the available size for the grid? */
  calculateAvailableSizeBy?: 'container' | 'window';

  /** bottom padding of the grid in pixels */
  bottomPadding?: number;

  /** container id */
  containerId?: string;

  /** maximum height (pixels) of the grid */
  maxHeight?: number;

  /** minimum height (pixels) of the grid */
  minHeight?: number;

  /** maximum width (pixels) of the grid */
  maxWidth?: number;

  /** minimum width (pixels) of the grid */
  minWidth?: number;

  /** side (left/right) padding in pixels */
  sidePadding?: number;

  /** defaults to 10ms, delay before triggering the auto-resize (only on 1st page load) */
  delay?: number;
}

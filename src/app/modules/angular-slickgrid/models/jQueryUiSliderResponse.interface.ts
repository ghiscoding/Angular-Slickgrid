export interface JQueryUiSliderResponse {
  /** DOM element of the slider handle (the round handle which the user can drag) */
  handle: HTMLElement;

  /** Index of the slider handle, basically which handles is used when dragging the value from the handle. */
  handleIndex: number;

  /** value which the slider returns */
  value?: number;

  /** value which the slider returns when using a range */
  values?: number[];
}

import { JQueryUiSliderResponse } from './jQueryUiSliderResponse.interface';

export interface JQueryUiSliderOption {
  /** are we using animation? */
  animate?: boolean;

  /** maximum value that can be used by the slider */
  max?: number;

  /** minimum value that can be used by the slider */
  min?: number;

  /** Slider orientation (horizontal or vertical) */
  orientation?: 'horizontal' | 'vertical';

  /** defaults to false, are we using a range slider (that is with 2 values low/high) */
  range?: boolean | 'max' | 'min';

  /** step to increment */
  step?: number;

  /** value to preload */
  value?: number;

  /** values which can be preloaded in the slider */
  values?: number[];

  // --
  // Events / Methods
  // -----------------

  /** Triggered when the slider value changes, only after mouse up */
  change?: (e: Event, ui: JQueryUiSliderResponse) => void;

  /** Triggered when the slider is created */
  create?: (e: Event, ui: JQueryUiSliderResponse) => void;

  /** Triggered when the user starts to slide with the slider handle */
  start?: (e: Event, ui: JQueryUiSliderResponse) => void;

  /** Triggered when the user stops to slide with the slider handle */
  stop?: (e: Event, ui: JQueryUiSliderResponse) => void;

  /** Triggered whenever the slider handle moves, useful to update low/high values when displayed. */
  slide?: (e: Event, ui: JQueryUiSliderResponse) => void;
}

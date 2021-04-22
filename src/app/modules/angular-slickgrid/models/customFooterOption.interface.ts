import { MetricTexts } from './metricTexts.interface';

export interface CustomFooterOption {
  /** Optionally pass some text to be displayed on the left side (in the "left-footer" css class) */
  leftFooterText?: string;

  /** CSS class used for the left container */
  leftContainerClass?: string;

  /** Date format used when showing the "Last Update" timestamp in the metrics section. */
  dateFormat?: string;

  /** Defaults to 20, height of the Custom Footer in pixels (this is required and is used by the auto-resizer) */
  footerHeight?: number;

  /**
   * Defaults to false, which will hide the selected rows count on the bottom left of the footer.
   * NOTE: if users defined a `leftFooterText`, then the selected rows count will NOT show up.
   */
  hideRowSelectionCount?: boolean;

  /** Defaults to false, do we want to hide the last update timestamp (endTime)? */
  hideLastUpdateTimestamp?: boolean;

  /**
   * Defaults to false, do we want to hide the metrics (right section) when the footer is displayed?
   * That could be used when we want to display only the left section with custom text
   */
  hideMetrics?: boolean;

  /** Defaults to false, do we want to hide the total item count of the entire dataset (the count exclude any filtered data) */
  hideTotalItemCount?: boolean;

  /** Defaults to "|", separator between the timestamp and the total count */
  metricSeparator?: string;

  /** Text shown in the custom footer on the far right for the metrics */
  metricTexts?: MetricTexts;

  /** CSS class used for the right container */
  rightContainerClass?: string;
}

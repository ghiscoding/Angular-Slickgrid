export interface CustomFooterOption {
  /** Optionally pass some text to be displayed on the left side (in the "left-footer" css class) */
  leftFooterText?: string;

  /** Date format used when showing the startTime/endTime metrics on screen */
  dateFormat?: string;

  /** Defaults to false, do we want to hide the last updated timestamp (endTime)? */
  hideLastUpdatedTimestamp?: boolean;

  /** Defaults to false, do we want to hide the metrics when the footer is displayed? */
  hideMetrics?: boolean;

  /** Defaults to false, do we want to hide the total item count of the entire dataset (the count exclude any filtered data) */
  hideTotalItemCount?: boolean;

  /** Defaults to "|", separator between the timestamp and the total count */
  metricSeparator?: string;

  metricTexts?: {
    /** Optionally pass a text to display before the metrics endTime timestamp shown in the footer */
    lastUpdatedText?: string;

    textItems: string;
    textLastUpdated?: string;
    textOf: string;
  }
}

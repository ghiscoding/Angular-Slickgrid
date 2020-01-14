export interface CustomFooterOption {
  /** Optionally pass some text to be displayed on the left side (in the "left-footer" css class) */
  leftFooterText?: string;

  /** CSS class used for the left container */
  leftContainerClass?: string;

  /** Date format used when showing the "Last Update" timestamp in the metrics section. */
  dateFormat?: string;

  /** Defaults to 20, height of the Custom Footer in pixels (this is required and is used by the auto-resizer) */
  footerHeight?: number;

  /** Defaults to false, do we want to hide the last update timestamp (endTime)? */
  hideLastUpdateTimestamp?: boolean;

  /** Defaults to false, do we want to hide the metrics when the footer is displayed? */
  hideMetrics?: boolean;

  /** Defaults to false, do we want to hide the total item count of the entire dataset (the count exclude any filtered data) */
  hideTotalItemCount?: boolean;

  /** Defaults to "|", separator between the timestamp and the total count */
  metricSeparator?: string;

  /** Text shown in the custom footer on the far right for the metrics */
  metricTexts?: {
    /** Defaults to empty string, optionally pass a text (Last Update) to display before the metrics endTime timestamp. */
    lastUpdate?: string;

    /** Defaults to "items", word to display at the end of the metrics to represent the items (e.g. you could change it for "users" or anything else). */
    items?: string;

    /** Defaults to "of", text word separator to display between the filtered items count and the total unfiltered items count (e.g.: "10 of 100 items"). */
    of?: string;

    // -- Translation Keys --//

    /** Defaults to "ITEMS", translation key used for the word displayed at the end of the metrics to represent the items (e.g. you could change it for "users" or anything else). */
    itemsKey?: string;

    /** Defaults to empty string, optionally pass a translation key (internally we use "LAST_UPDATE") to display before the metrics endTime timestamp. */
    lastUpdateKey?: string;

    /** Defaults to "OF", translation key used for the to display between the filtered items count and the total unfiltered items count. */
    ofKey?: string;
  };

  /** CSS class used for the right container */
  rightContainerClass?: string;
}

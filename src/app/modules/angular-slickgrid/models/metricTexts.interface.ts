export type MetricTexts = {
  /** Defaults to empty string, optionally pass a text (Last Update) to display before the metrics endTime timestamp. */
  lastUpdate?: string;

  /** Defaults to "items", word to display at the end of the metrics to represent the items (e.g. you could change it for "users" or anything else). */
  items?: string;

  /** Defaults to "of", text word separator to display between the filtered items count and the total unfiltered items count (e.g.: "10 of 100 items"). */
  of?: string;

  /** Defaults to "records selected", text word that is associated to the row selection count. */
  itemsSelected?: string;

  // --
  // Translation Keys
  // ------------------

  /** Defaults to "ITEMS", translation key used for the word displayed at the end of the metrics to represent the items (e.g. you could change it for "users" or anything else). */
  itemsKey?: string;

  /** Defaults to empty string, optionally pass a translation key (internally we use "LAST_UPDATE") to display before the metrics endTime timestamp. */
  lastUpdateKey?: string;

  /** Defaults to "OF", translation key used for the to display between the filtered items count and the total unfiltered items count. */
  ofKey?: string;

  /** Defaults to "ITEMS_SELECTED", text word that is associated to the row selection count. */
  itemsSelectedKey?: string;
};
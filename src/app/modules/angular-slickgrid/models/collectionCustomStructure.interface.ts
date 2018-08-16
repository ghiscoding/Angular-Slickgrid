export interface CollectionCustomStructure {
  /** your custom property name to for the "label" (text displayed in the select dropdown UI) */
  label: string;

  /** your custom property name to use for the "value" (equals of the "option" in a select dropdown) */
  value: string;

  /** an optional prefix that will be prepended before the label text */
  labelPrefix?: string;

  /** an optional suffix that will be appended to the label text */
  labelSuffix?: string;
}

export interface CollectionCustomStructure {
  /** your custom property name to for the "label" (text displayed in the select dropdown UI) */
  label: string;

  /** your custom property name to use for the "value" (equals of the "option" in a select dropdown) */
  value: string;

  /**
   * defaults to "value", optional text that can be added to each <option label=""> attribute, which can then be used when showing selected text
   * Can be used with `filterOptions: { useSelectOptionTitle: true }` (or with "editorOptions") when user want to show different text as selected values
   */
  optionLabel?: string;

  /** an optional prefix that will be prepended before the label text */
  labelPrefix?: string;

  /** an optional suffix that will be appended to the label text */
  labelSuffix?: string;
}

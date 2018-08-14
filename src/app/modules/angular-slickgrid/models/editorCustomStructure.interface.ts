export interface EditorCustomStructure {
  /** your custom property name to for the "label" (text displayed in the select dropdown UI) */
  label: string;

  /** your custom property name to use for the "value" (equals of the "option" in a select dropdown) */
  value: string;

  /** an optional prefix that will be prepended before the label text */
  labelPrefix?: string;

  /** an optional suffix that will be appended to the label text */
  labelSuffix?: string;

  /**
   * When the collection is inside an object descendant property
   * we can optionally pass a dot (.) notation string to pull the collection from an object property.
   * For example if our output data is:
   * myData = { someProperty: { myCollection: [] }, otherProperty: 'something' }
   * We can pass the dot notation string
   * collectionInObjectProperty: 'someProperty.myCollection'
   */
  collectionInObjectProperty?: string;

  /** defaults to empty, when using label with prefix/suffix, do we want to add a separator between each text (like a white space) */
  separatorBetweenTextLabels?: string;

  /** defaults to false, should the selected value include the prefix/suffix in the output format */
  includePrefixSuffixToSelectedValues?: boolean;
}

export enum FilterType {
  /** Input Filter type, with a magnifying glass as placeholder */
  input,

  /** Select Filter type, just a regular select dropdown. You might want to try "singleSelect" which has a nicer look and feel. */
  select,

  /** Multiple-Select Filter type */
  multipleSelect,

  /** Single Filter type */
  singleSelect,

  /** Custom Filter type */
  custom,

  /** Compound Date Filter (compound of Operator + Date picker) */
  compoundDate,

  /** Compound Input Filter (compound of Operator + Input) */
  compoundInput,
}

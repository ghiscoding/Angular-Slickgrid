export enum FilterType {
  /** Custom Filter type */
  custom = 'custom',

  /** Input Filter type */
  input = 'input', // might need <any> casting

  /** Multiple-Select Filter type */
  multipleSelect = 'multipleSelect',

  /** Select Filter type */
  select = 'select',

  /** Single Filter type */
  singleSelect = 'singleSelect'
}

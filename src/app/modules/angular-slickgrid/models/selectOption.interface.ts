export interface SelectOption {
  label: string;
  labelKey: string;
  value: number | string;
  [labelValue: string]: number | string;
}

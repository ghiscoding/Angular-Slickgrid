export type ToggleStateChangeTypeString = 'toggle-collapse' | 'toggle-expand' | 'full-collapse' | 'full-expand';

export enum ToggleStateChangeType {
  /** full tree collapse */
  toggleCollapse = 'toggle-collapse',

  /** full tree expand */
  fullExpand = 'full-expand',

  /** item toggle collapse */
  fullCollapse = 'full-collapse',

  /** item toggle expand */
  toggleExpand = 'toggle-expand',
}
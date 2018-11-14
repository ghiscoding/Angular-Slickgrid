export interface RowMoveManager {
  /** defaults to false, option to cancel edit on drag */
  cancelEditOnDrag?: boolean;

  //
  // Events

  /** SlickGrid Event fired before the row is moved. */
  onBeforeMoveRows?: (e: Event, args: any) => void;

  /** SlickGrid Event fired while the row is moved. */
  onMoveRows?: (e: Event, args: any) => void;
}

import { EditCommand } from './editCommand.interface';

export interface EditUndoRedoBuffer {
  /** Send the Edit Command to the Queue and Execute it after doing so */
  queueAndExecuteCommand: (editCommand: EditCommand) => void;

  /** Call to undo (rollback) changes */
  undo: () => void;

  /** Call to redo the previous undo changes */
  redo: () => void;
}
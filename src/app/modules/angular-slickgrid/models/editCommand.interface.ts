import { Editor } from ".";

export interface EditCommand {
    row: number;
    cell: number;
    editor: Editor | any;
    serializedValue: any;
    prevSerializedValue: any;

    /** Call to commit changes*/
    execute: () => void;

    /** Call to rollback changes*/
    undo: () => void;
}
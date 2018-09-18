import { Column, ElementPosition } from './index';
export interface EditorArgs {
    column: Column;
    container: any;
    grid: any;
    gridPosition: ElementPosition;
    item: any;
    position: ElementPosition;
    cancelChanges?: () => void;
    commitChanges?: () => void;
}

import { Extension } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export declare class CellExternalCopyManagerExtension implements Extension {
    private extensionUtility;
    private sharedService;
    private _extension;
    private _undoRedoBuffer;
    constructor(extensionUtility: ExtensionUtility, sharedService: SharedService);
    dispose(): void;
    register(): any;
    /** Create an undo redo buffer used by the Excel like copy */
    private createUndoRedoBuffer();
    /** Attach an undo shortcut key hook that will redo/undo the copy buffer */
    private hookUndoShortcutKey();
}

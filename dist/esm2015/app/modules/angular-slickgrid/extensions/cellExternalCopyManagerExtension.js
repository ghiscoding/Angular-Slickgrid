/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { sanitizeHtmlToText } from '../services/utilities';
import { SharedService } from '../services/shared.service';
export class CellExternalCopyManagerExtension {
    /**
     * @param {?} extensionUtility
     * @param {?} sharedService
     */
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    }
    /**
     * @return {?}
     */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
            this.createUndoRedoBuffer();
            this.hookUndoShortcutKey();
            /** @type {?} */
            let newRowIds = 0;
            /** @type {?} */
            const pluginOptions = {
                clipboardCommandHandler: (editCommand) => {
                    this._undoRedoBuffer.queueAndExecuteCommand.call(this._undoRedoBuffer, editCommand);
                },
                dataItemColumnValueExtractor: (item, columnDef) => {
                    // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
                    // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
                    if (!this.sharedService.gridOptions.editable || !columnDef.editor) {
                        /** @type {?} */
                        const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.exportWithFormatter);
                        if (columnDef.formatter && isEvaluatingFormatter) {
                            /** @type {?} */
                            const formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, this.sharedService.grid);
                            if (columnDef.sanitizeDataExport || (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
                                return sanitizeHtmlToText(formattedOutput);
                            }
                            return formattedOutput;
                        }
                    }
                    // else use the default "dataItemColumnValueExtractor" from the plugin itself
                    // we can do that by setting back the getter with null
                    return null;
                },
                readOnlyMode: false,
                includeHeaderWhenCopying: false,
                newRowCreator: (count) => {
                    for (let i = 0; i < count; i++) {
                        /** @type {?} */
                        const item = {
                            id: 'newRow_' + newRowIds++
                        };
                        this.sharedService.grid.getData().addItem(item);
                    }
                }
            };
            this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
            this._extension = new Slick.CellExternalCopyManager(pluginOptions);
            this.sharedService.grid.registerPlugin(this._extension);
            return this._extension;
        }
        return null;
    }
    /**
     * Create an undo redo buffer used by the Excel like copy
     * @private
     * @return {?}
     */
    createUndoRedoBuffer() {
        /** @type {?} */
        const commandQueue = [];
        /** @type {?} */
        let commandCtr = 0;
        this._undoRedoBuffer = {
            queueAndExecuteCommand: (editCommand) => {
                commandQueue[commandCtr] = editCommand;
                commandCtr++;
                editCommand.execute();
            },
            undo: () => {
                if (commandCtr === 0) {
                    return;
                }
                commandCtr--;
                /** @type {?} */
                const command = commandQueue[commandCtr];
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.undo();
                }
            },
            redo: () => {
                if (commandCtr >= commandQueue.length) {
                    return;
                }
                /** @type {?} */
                const command = commandQueue[commandCtr];
                commandCtr++;
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.execute();
                }
            }
        };
    }
    /**
     * Attach an undo shortcut key hook that will redo/undo the copy buffer
     * @private
     * @return {?}
     */
    hookUndoShortcutKey() {
        // undo shortcut
        $(document).keydown((e) => {
            if (e.which === 90 && (e.ctrlKey || e.metaKey)) { // CTRL + (shift) + Z
                if (e.shiftKey) {
                    this._undoRedoBuffer.redo();
                }
                else {
                    this._undoRedoBuffer.undo();
                }
            }
        });
    }
}
CellExternalCopyManagerExtension.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CellExternalCopyManagerExtension.ctorParameters = () => [
    { type: ExtensionUtility },
    { type: SharedService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    CellExternalCopyManagerExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    CellExternalCopyManagerExtension.prototype._undoRedoBuffer;
    /**
     * @type {?}
     * @private
     */
    CellExternalCopyManagerExtension.prototype.extensionUtility;
    /**
     * @type {?}
     * @private
     */
    CellExternalCopyManagerExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFPM0QsTUFBTSxPQUFPLGdDQUFnQzs7Ozs7SUFJM0MsWUFBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUksQ0FBQzs7OztJQUVqRyxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUNuRix5REFBeUQ7WUFDekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxD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RSxDQUFDO2lCQUM3QjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFyR0YsVUFBVTs7OztZQVJGLGdCQUFnQjtZQUVoQixhQUFhOzs7Ozs7O0lBUXBCLHNEQUF3Qjs7Ozs7SUFDeEIsMkRBQTZCOzs7OztJQUVqQiw0REFBMEM7Ozs7O0lBQUUseURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIEV4dGVuc2lvbiwgRXh0ZW5zaW9uTmFtZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBzYW5pdGl6ZUh0bWxUb1RleHQgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uOiBhbnk7XHJcbiAgcHJpdmF0ZSBfdW5kb1JlZG9CdWZmZXI6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LCBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UpIHsgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbiAmJiB0aGlzLl9leHRlbnNpb24uZGVzdHJveSkge1xyXG4gICAgICB0aGlzLl9leHRlbnNpb24uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIoKTogYW55IHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiB3aXRoIHJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXIpO1xyXG4gICAgICB0aGlzLmNyZWF0ZVVuZG9SZWRvQnVmZmVyKCk7XHJcbiAgICAgIHRoaXMuaG9va1VuZG9TaG9ydGN1dEtleSgpO1xyXG4gICAgICBsZXQgbmV3Um93SWRzID0gMDtcclxuICAgICAgY29uc3QgcGx1Z2luT3B0aW9ucyA9IHtcclxuICAgICAgICBjbGlwYm9hcmRDb21tYW5kSGFuZGxlcjogKGVkaXRDb21tYW5kOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyLnF1ZXVlQW5kRXhlY3V0ZUNvbW1hbmQuY2FsbCh0aGlzLl91bmRvUmVkb0J1ZmZlciwgZWRpdENvbW1hbmQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YUl0ZW1Db2x1bW5WYWx1ZUV4dHJhY3RvcjogKGl0ZW06IGFueSwgY29sdW1uRGVmOiBDb2x1bW4pID0+IHtcclxuICAgICAgICAgIC8vIHdoZW4gZ3JpZCBvciBjZWxsIGlzIG5vdCBlZGl0YWJsZSwgd2Ugd2lsbCBwb3NzaWJseSBldmFsdWF0ZSB0aGUgRm9ybWF0dGVyIGlmIGl0IHdhcyBwYXNzZWRcclxuICAgICAgICAgIC8vIHRvIGRlY2lkZSBpZiB3ZSBldmFsdWF0ZSB0aGUgRm9ybWF0dGVyLCB3ZSB3aWxsIHVzZSB0aGUgc2FtZSBmbGFnIGZyb20gRXhwb3J0IHdoaWNoIGlzIFwiZXhwb3J0V2l0aEZvcm1hdHRlclwiXHJcbiAgICAgICAgICBpZiAoIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lZGl0YWJsZSB8fCAhY29sdW1uRGVmLmVkaXRvcikge1xyXG4gICAgICAgICAgICBjb25zdCBpc0V2YWx1YXRpbmdGb3JtYXR0ZXIgPSAoY29sdW1uRGVmLmV4cG9ydFdpdGhGb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCkgPyBjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciA6ICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucy5leHBvcnRXaXRoRm9ybWF0dGVyKTtcclxuICAgICAgICAgICAgaWYgKGNvbHVtbkRlZi5mb3JtYXR0ZXIgJiYgaXNFdmFsdWF0aW5nRm9ybWF0dGVyKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkT3V0cHV0ID0gY29sdW1uRGVmLmZvcm1hdHRlcigwLCAwLCBpdGVtW2NvbHVtbkRlZi5maWVsZF0sIGNvbHVtbkRlZiwgaXRlbSwgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQpO1xyXG4gICAgICAgICAgICAgIGlmIChjb2x1bW5EZWYuc2FuaXRpemVEYXRhRXhwb3J0IHx8ICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucy5zYW5pdGl6ZURhdGFFeHBvcnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2FuaXRpemVIdG1sVG9UZXh0KGZvcm1hdHRlZE91dHB1dCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZWRPdXRwdXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIGVsc2UgdXNlIHRoZSBkZWZhdWx0IFwiZGF0YUl0ZW1Db2x1bW5WYWx1ZUV4dHJhY3RvclwiIGZyb20gdGhlIHBsdWdpbiBpdHNlbGZcclxuICAgICAgICAgIC8vIHdlIGNhbiBkbyB0aGF0IGJ5IHNldHRpbmcgYmFjayB0aGUgZ2V0dGVyIHdpdGggbnVsbFxyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWFkT25seU1vZGU6IGZhbHNlLFxyXG4gICAgICAgIGluY2x1ZGVIZWFkZXJXaGVuQ29weWluZzogZmFsc2UsXHJcbiAgICAgICAgbmV3Um93Q3JlYXRvcjogKGNvdW50OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0ge1xyXG4gICAgICAgICAgICAgIGlkOiAnbmV3Um93XycgKyBuZXdSb3dJZHMrK1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXREYXRhKCkuYWRkSXRlbShpdGVtKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNlbGVjdGlvbk1vZGVsKG5ldyBTbGljay5DZWxsU2VsZWN0aW9uTW9kZWwoKSk7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbiA9IG5ldyBTbGljay5DZWxsRXh0ZXJuYWxDb3B5TWFuYWdlcihwbHVnaW5PcHRpb25zKTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fZXh0ZW5zaW9uKTtcclxuICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuc2lvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSBhbiB1bmRvIHJlZG8gYnVmZmVyIHVzZWQgYnkgdGhlIEV4Y2VsIGxpa2UgY29weSAqL1xyXG4gIHByaXZhdGUgY3JlYXRlVW5kb1JlZG9CdWZmZXIoKSB7XHJcbiAgICBjb25zdCBjb21tYW5kUXVldWU6IGFueVtdID0gW107XHJcbiAgICBsZXQgY29tbWFuZEN0ciA9IDA7XHJcbiAgICB0aGlzLl91bmRvUmVkb0J1ZmZlciA9IHtcclxuICAgICAgcXVldWVBbmRFeGVjdXRlQ29tbWFuZDogKGVkaXRDb21tYW5kOiBhbnkpID0+IHtcclxuICAgICAgICBjb21tYW5kUXVldWVbY29tbWFuZEN0cl0gPSBlZGl0Q29tbWFuZDtcclxuICAgICAgICBjb21tYW5kQ3RyKys7XHJcbiAgICAgICAgZWRpdENvbW1hbmQuZXhlY3V0ZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICB1bmRvOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbW1hbmRDdHIgPT09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29tbWFuZEN0ci0tO1xyXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kUXVldWVbY29tbWFuZEN0cl07XHJcbiAgICAgICAgaWYgKGNvbW1hbmQgJiYgU2xpY2suR2xvYmFsRWRpdG9yTG9jay5jYW5jZWxDdXJyZW50RWRpdCgpKSB7XHJcbiAgICAgICAgICBjb21tYW5kLnVuZG8oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHJlZG86ICgpID0+IHtcclxuICAgICAgICBpZiAoY29tbWFuZEN0ciA+PSBjb21tYW5kUXVldWUubGVuZ3RoKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBjb21tYW5kUXVldWVbY29tbWFuZEN0cl07XHJcbiAgICAgICAgY29tbWFuZEN0cisrO1xyXG4gICAgICAgIGlmIChjb21tYW5kICYmIFNsaWNrLkdsb2JhbEVkaXRvckxvY2suY2FuY2VsQ3VycmVudEVkaXQoKSkge1xyXG4gICAgICAgICAgY29tbWFuZC5leGVjdXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEF0dGFjaCBhbiB1bmRvIHNob3J0Y3V0IGtleSBob29rIHRoYXQgd2lsbCByZWRvL3VuZG8gdGhlIGNvcHkgYnVmZmVyICovXHJcbiAgcHJpdmF0ZSBob29rVW5kb1Nob3J0Y3V0S2V5KCkge1xyXG4gICAgLy8gdW5kbyBzaG9ydGN1dFxyXG4gICAgJChkb2N1bWVudCkua2V5ZG93bigoZTogYW55KSA9PiB7XHJcbiAgICAgIGlmIChlLndoaWNoID09PSA5MCAmJiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkpIHsgICAgLy8gQ1RSTCArIChzaGlmdCkgKyBaXHJcbiAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcclxuICAgICAgICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyLnJlZG8oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fdW5kb1JlZG9CdWZmZXIudW5kbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
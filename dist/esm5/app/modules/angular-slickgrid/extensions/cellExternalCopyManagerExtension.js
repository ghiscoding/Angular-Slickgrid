/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { sanitizeHtmlToText } from '../services/utilities';
import { SharedService } from '../services/shared.service';
var CellExternalCopyManagerExtension = /** @class */ (function () {
    function CellExternalCopyManagerExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    CellExternalCopyManagerExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    };
    /**
     * @return {?}
     */
    CellExternalCopyManagerExtension.prototype.register = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin with requireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
            this.createUndoRedoBuffer();
            this.hookUndoShortcutKey();
            /** @type {?} */
            var newRowIds_1 = 0;
            /** @type {?} */
            var pluginOptions = {
                clipboardCommandHandler: function (editCommand) {
                    _this._undoRedoBuffer.queueAndExecuteCommand.call(_this._undoRedoBuffer, editCommand);
                },
                dataItemColumnValueExtractor: function (item, columnDef) {
                    // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
                    // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
                    if (!_this.sharedService.gridOptions.editable || !columnDef.editor) {
                        /** @type {?} */
                        var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (_this.sharedService.gridOptions.exportOptions && _this.sharedService.gridOptions.exportOptions.exportWithFormatter);
                        if (columnDef.formatter && isEvaluatingFormatter) {
                            /** @type {?} */
                            var formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, _this.sharedService.grid);
                            if (columnDef.sanitizeDataExport || (_this.sharedService.gridOptions.exportOptions && _this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
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
                newRowCreator: function (count) {
                    for (var i = 0; i < count; i++) {
                        /** @type {?} */
                        var item = {
                            id: 'newRow_' + newRowIds_1++
                        };
                        _this.sharedService.grid.getData().addItem(item);
                    }
                }
            };
            this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
            this._extension = new Slick.CellExternalCopyManager(pluginOptions);
            this.sharedService.grid.registerPlugin(this._extension);
            return this._extension;
        }
        return null;
    };
    /** Create an undo redo buffer used by the Excel like copy */
    /**
     * Create an undo redo buffer used by the Excel like copy
     * @private
     * @return {?}
     */
    CellExternalCopyManagerExtension.prototype.createUndoRedoBuffer = /**
     * Create an undo redo buffer used by the Excel like copy
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var commandQueue = [];
        /** @type {?} */
        var commandCtr = 0;
        this._undoRedoBuffer = {
            queueAndExecuteCommand: function (editCommand) {
                commandQueue[commandCtr] = editCommand;
                commandCtr++;
                editCommand.execute();
            },
            undo: function () {
                if (commandCtr === 0) {
                    return;
                }
                commandCtr--;
                /** @type {?} */
                var command = commandQueue[commandCtr];
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.undo();
                }
            },
            redo: function () {
                if (commandCtr >= commandQueue.length) {
                    return;
                }
                /** @type {?} */
                var command = commandQueue[commandCtr];
                commandCtr++;
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.execute();
                }
            }
        };
    };
    /** Attach an undo shortcut key hook that will redo/undo the copy buffer */
    /**
     * Attach an undo shortcut key hook that will redo/undo the copy buffer
     * @private
     * @return {?}
     */
    CellExternalCopyManagerExtension.prototype.hookUndoShortcutKey = /**
     * Attach an undo shortcut key hook that will redo/undo the copy buffer
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // undo shortcut
        $(document).keydown(function (e) {
            if (e.which === 90 && (e.ctrlKey || e.metaKey)) { // CTRL + (shift) + Z
                if (e.shiftKey) {
                    _this._undoRedoBuffer.redo();
                }
                else {
                    _this._undoRedoBuffer.undo();
                }
            }
        });
    };
    CellExternalCopyManagerExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CellExternalCopyManagerExtension.ctorParameters = function () { return [
        { type: ExtensionUtility },
        { type: SharedService }
    ]; };
    return CellExternalCopyManagerExtension;
}());
export { CellExternalCopyManagerExtension };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFxQixhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNM0Q7SUFLRSwwQ0FBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUksQ0FBQzs7OztJQUVqRyxrREFBTzs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxtREFBUTs7O0lBQVI7UUFBQSxpQkE2Q0M7UUE1Q0MsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25GLHlEQUF5RDtZQUN6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLG9CQUFv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aUJBQzdCO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXJHRixVQUFVOzs7O2dCQVJGLGdCQUFnQjtnQkFFaEIsYUFBYTs7SUE0R3RCLHVDQUFDO0NBQUEsQUF0R0QsSUFzR0M7U0FyR1ksZ0NBQWdDOzs7Ozs7SUFDM0Msc0RBQXdCOzs7OztJQUN4QiwyREFBNkI7Ozs7O0lBRWpCLDREQUEwQzs7Ozs7SUFBRSx5REFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbHVtbiwgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IHNhbml0aXplSHRtbFRvVGV4dCB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9leHRlbnNpb246IGFueTtcclxuICBwcml2YXRlIF91bmRvUmVkb0J1ZmZlcjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSkgeyB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uICYmIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2V4dGVuc2lvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWdpc3RlcigpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIHdpdGggcmVxdWlyZUpTXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlcik7XHJcbiAgICAgIHRoaXMuY3JlYXRlVW5kb1JlZG9CdWZmZXIoKTtcclxuICAgICAgdGhpcy5ob29rVW5kb1Nob3J0Y3V0S2V5KCk7XHJcbiAgICAgIGxldCBuZXdSb3dJZHMgPSAwO1xyXG4gICAgICBjb25zdCBwbHVnaW5PcHRpb25zID0ge1xyXG4gICAgICAgIGNsaXBib2FyZENvbW1hbmRIYW5kbGVyOiAoZWRpdENvbW1hbmQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fdW5kb1JlZG9CdWZmZXIucXVldWVBbmRFeGVjdXRlQ29tbWFuZC5jYWxsKHRoaXMuX3VuZG9SZWRvQnVmZmVyLCBlZGl0Q29tbWFuZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhSXRlbUNvbHVtblZhbHVlRXh0cmFjdG9yOiAoaXRlbTogYW55LCBjb2x1bW5EZWY6IENvbHVtbikgPT4ge1xyXG4gICAgICAgICAgLy8gd2hlbiBncmlkIG9yIGNlbGwgaXMgbm90IGVkaXRhYmxlLCB3ZSB3aWxsIHBvc3NpYmx5IGV2YWx1YXRlIHRoZSBGb3JtYXR0ZXIgaWYgaXQgd2FzIHBhc3NlZFxyXG4gICAgICAgICAgLy8gdG8gZGVjaWRlIGlmIHdlIGV2YWx1YXRlIHRoZSBGb3JtYXR0ZXIsIHdlIHdpbGwgdXNlIHRoZSBzYW1lIGZsYWcgZnJvbSBFeHBvcnQgd2hpY2ggaXMgXCJleHBvcnRXaXRoRm9ybWF0dGVyXCJcclxuICAgICAgICAgIGlmICghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVkaXRhYmxlIHx8ICFjb2x1bW5EZWYuZWRpdG9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRXZhbHVhdGluZ0Zvcm1hdHRlciA9IChjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciAhPT0gdW5kZWZpbmVkKSA/IGNvbHVtbkRlZi5leHBvcnRXaXRoRm9ybWF0dGVyIDogKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zLmV4cG9ydFdpdGhGb3JtYXR0ZXIpO1xyXG4gICAgICAgICAgICBpZiAoY29sdW1uRGVmLmZvcm1hdHRlciAmJiBpc0V2YWx1YXRpbmdGb3JtYXR0ZXIpIHtcclxuICAgICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRPdXRwdXQgPSBjb2x1bW5EZWYuZm9ybWF0dGVyKDAsIDAsIGl0ZW1bY29sdW1uRGVmLmZpZWxkXSwgY29sdW1uRGVmLCBpdGVtLCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCk7XHJcbiAgICAgICAgICAgICAgaWYgKGNvbHVtbkRlZi5zYW5pdGl6ZURhdGFFeHBvcnQgfHwgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zLnNhbml0aXplRGF0YUV4cG9ydCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzYW5pdGl6ZUh0bWxUb1RleHQoZm9ybWF0dGVkT3V0cHV0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZE91dHB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gZWxzZSB1c2UgdGhlIGRlZmF1bHQgXCJkYXRhSXRlbUNvbHVtblZhbHVlRXh0cmFjdG9yXCIgZnJvbSB0aGUgcGx1Z2luIGl0c2VsZlxyXG4gICAgICAgICAgLy8gd2UgY2FuIGRvIHRoYXQgYnkgc2V0dGluZyBiYWNrIHRoZSBnZXR0ZXIgd2l0aCBudWxsXHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlYWRPbmx5TW9kZTogZmFsc2UsXHJcbiAgICAgICAgaW5jbHVkZUhlYWRlcldoZW5Db3B5aW5nOiBmYWxzZSxcclxuICAgICAgICBuZXdSb3dDcmVhdG9yOiAoY291bnQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgaWQ6ICduZXdSb3dfJyArIG5ld1Jvd0lkcysrXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldERhdGEoKS5hZGRJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U2VsZWN0aW9uTW9kZWwobmV3IFNsaWNrLkNlbGxTZWxlY3Rpb25Nb2RlbCgpKTtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gbmV3IFNsaWNrLkNlbGxFeHRlcm5hbENvcHlNYW5hZ2VyKHBsdWdpbk9wdGlvbnMpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLl9leHRlbnNpb24pO1xyXG4gICAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIGFuIHVuZG8gcmVkbyBidWZmZXIgdXNlZCBieSB0aGUgRXhjZWwgbGlrZSBjb3B5ICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVVbmRvUmVkb0J1ZmZlcigpIHtcclxuICAgIGNvbnN0IGNvbW1hbmRRdWV1ZTogYW55W10gPSBbXTtcclxuICAgIGxldCBjb21tYW5kQ3RyID0gMDtcclxuICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyID0ge1xyXG4gICAgICBxdWV1ZUFuZEV4ZWN1dGVDb21tYW5kOiAoZWRpdENvbW1hbmQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbW1hbmRRdWV1ZVtjb21tYW5kQ3RyXSA9IGVkaXRDb21tYW5kO1xyXG4gICAgICAgIGNvbW1hbmRDdHIrKztcclxuICAgICAgICBlZGl0Q29tbWFuZC5leGVjdXRlKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHVuZG86ICgpID0+IHtcclxuICAgICAgICBpZiAoY29tbWFuZEN0ciA9PT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICBjb21tYW5kQ3RyLS07XHJcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRRdWV1ZVtjb21tYW5kQ3RyXTtcclxuICAgICAgICBpZiAoY29tbWFuZCAmJiBTbGljay5HbG9iYWxFZGl0b3JMb2NrLmNhbmNlbEN1cnJlbnRFZGl0KCkpIHtcclxuICAgICAgICAgIGNvbW1hbmQudW5kbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcmVkbzogKCkgPT4ge1xyXG4gICAgICAgIGlmIChjb21tYW5kQ3RyID49IGNvbW1hbmRRdWV1ZS5sZW5ndGgpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IGNvbW1hbmRRdWV1ZVtjb21tYW5kQ3RyXTtcclxuICAgICAgICBjb21tYW5kQ3RyKys7XHJcbiAgICAgICAgaWYgKGNvbW1hbmQgJiYgU2xpY2suR2xvYmFsRWRpdG9yTG9jay5jYW5jZWxDdXJyZW50RWRpdCgpKSB7XHJcbiAgICAgICAgICBjb21tYW5kLmV4ZWN1dGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKiogQXR0YWNoIGFuIHVuZG8gc2hvcnRjdXQga2V5IGhvb2sgdGhhdCB3aWxsIHJlZG8vdW5kbyB0aGUgY29weSBidWZmZXIgKi9cclxuICBwcml2YXRlIGhvb2tVbmRvU2hvcnRjdXRLZXkoKSB7XHJcbiAgICAvLyB1bmRvIHNob3J0Y3V0XHJcbiAgICAkKGRvY3VtZW50KS5rZXlkb3duKChlOiBhbnkpID0+IHtcclxuICAgICAgaWYgKGUud2hpY2ggPT09IDkwICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSkgeyAgICAvLyBDVFJMICsgKHNoaWZ0KSArIFpcclxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xyXG4gICAgICAgICAgdGhpcy5fdW5kb1JlZG9CdWZmZXIucmVkbygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl91bmRvUmVkb0J1ZmZlci51bmRvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
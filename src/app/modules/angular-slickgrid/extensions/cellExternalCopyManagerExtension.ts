import { Injectable } from '@angular/core';
import {
  Column,
  EditCommand,
  EditUndoRedoBuffer,
  ExcelCopyBufferOption,
  Extension,
  ExtensionName,
  SelectedRange,
  SlickEventHandler,
} from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { sanitizeHtmlToText } from '../services/utilities';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

@Injectable()
export class CellExternalCopyManagerExtension implements Extension {
  private _addon: any;
  private _addonOptions: ExcelCopyBufferOption;
  private _eventHandler: SlickEventHandler;
  private _commandQueue: EditCommand[];
  private _undoRedoBuffer: EditUndoRedoBuffer;

  constructor(private extensionUtility: ExtensionUtility, private sharedService: SharedService) {
    this._eventHandler = new Slick.EventHandler();
  }

  get addonOptions(): ExcelCopyBufferOption {
    return this._addonOptions;
  }

  get eventHandler(): SlickEventHandler {
    return this._eventHandler;
  }

  get commandQueue(): EditCommand[] {
    return this._commandQueue;
  }

  get undoRedoBuffer(): EditUndoRedoBuffer {
    return this._undoRedoBuffer;
  }

  dispose() {
    // unsubscribe all SlickGrid events
    this._eventHandler.unsubscribeAll();
    if (this._addon && this._addon.destroy) {
      this._addon.destroy();
    }
  }

  /** Get the instance of the SlickGrid addon (control or plugin). */
  getAddonInstance() {
    return this._addon;
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin (addon) with RequireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
      this.createUndoRedoBuffer();
      this.hookUndoShortcutKey();

      this._addonOptions = { ...this.getDefaultOptions(), ...this.sharedService.gridOptions.excelCopyBufferOptions } as ExcelCopyBufferOption;
      this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
      this._addon = new Slick.CellExternalCopyManager(this._addonOptions);
      this.sharedService.grid.registerPlugin(this._addon);

      // hook to all possible events
      if (this.sharedService.grid && this.sharedService.gridOptions.excelCopyBufferOptions) {
        if (this.sharedService.gridOptions.excelCopyBufferOptions.onExtensionRegistered) {
          this.sharedService.gridOptions.excelCopyBufferOptions.onExtensionRegistered(this._addon);
        }
        this._eventHandler.subscribe(this._addon.onCopyCells, (e: any, args: { ranges: SelectedRange[] }) => {
          if (this.sharedService.gridOptions.excelCopyBufferOptions && typeof this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCells === 'function') {
            this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCells(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onCopyCancelled, (e: any, args: { ranges: SelectedRange[] }) => {
          if (this.sharedService.gridOptions.excelCopyBufferOptions && typeof this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCancelled === 'function') {
            this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCancelled(e, args);
          }
        });
        this._eventHandler.subscribe(this._addon.onPasteCells, (e: any, args: { ranges: SelectedRange[] }) => {
          if (this.sharedService.gridOptions.excelCopyBufferOptions && typeof this.sharedService.gridOptions.excelCopyBufferOptions.onPasteCells === 'function') {
            this.sharedService.gridOptions.excelCopyBufferOptions.onPasteCells(e, args);
          }
        });
      }

      return this._addon;
    }
    return null;
  }

  /** Create an undo redo buffer used by the Excel like copy */
  private createUndoRedoBuffer() {
    let commandCtr = 0;
    this._commandQueue = [];

    this._undoRedoBuffer = {
      queueAndExecuteCommand: (editCommand: EditCommand) => {
        this._commandQueue[commandCtr] = editCommand;
        commandCtr++;
        editCommand.execute();
      },
      undo: () => {
        if (commandCtr === 0) {
          return;
        }
        commandCtr--;
        const command = this._commandQueue[commandCtr];
        if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
          command.undo();
        }
      },
      redo: () => {
        if (commandCtr >= this._commandQueue.length) {
          return;
        }
        const command = this._commandQueue[commandCtr];
        commandCtr++;
        if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
          command.execute();
        }
      }
    };
  }

  /** @return default plugin (addon) options */
  private getDefaultOptions(): ExcelCopyBufferOption {
    let newRowIds = 0;

    return {
      clipboardCommandHandler: (editCommand: any) => {
        this._undoRedoBuffer.queueAndExecuteCommand.call(this._undoRedoBuffer, editCommand);
      },
      dataItemColumnValueExtractor: (item: any, columnDef: Column) => {
        // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
        // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
        if (!this.sharedService.gridOptions.editable || !columnDef.editor) {
          const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.exportWithFormatter);
          if (columnDef.formatter && isEvaluatingFormatter) {
            const formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, this.sharedService.grid);
            if (columnDef.sanitizeDataExport || (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
              let outputString = formattedOutput as string;
              if (formattedOutput && typeof formattedOutput === 'object' && formattedOutput.hasOwnProperty('text')) {
                outputString = formattedOutput.text;
              }
              if (outputString === null) {
                outputString = '';
              }
              return sanitizeHtmlToText(outputString);
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
      newRowCreator: (count: number) => {
        for (let i = 0; i < count; i++) {
          const item = {
            id: 'newRow_' + newRowIds++
          };
          this.sharedService.grid.getData().addItem(item);
        }
      }
    };
  }

  /** Hook an undo shortcut key hook that will redo/undo the copy buffer using Ctrl+(Shift)+Z keyboard events */
  private hookUndoShortcutKey() {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const keyCode = e.keyCode || e.code;
      if (keyCode === 90 && (e.ctrlKey || e.metaKey)) {
        if (e.shiftKey) {
          this._undoRedoBuffer.redo(); // Ctrl + Shift + Z
        } else {
          this._undoRedoBuffer.undo(); // Ctrl + Z
        }
      }
    });
  }
}

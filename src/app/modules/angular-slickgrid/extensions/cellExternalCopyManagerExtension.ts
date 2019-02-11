import { Injectable } from '@angular/core';
import { Column, Extension, ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { sanitizeHtmlToText } from '../services/utilities';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

@Injectable()
export class CellExternalCopyManagerExtension implements Extension {
  private _extension: any;
  private _undoRedoBuffer: any;

  constructor(private extensionUtility: ExtensionUtility, private sharedService: SharedService) { }

  dispose() {
    if (this._extension && this._extension.destroy) {
      this._extension.destroy();
    }
  }

  register(): any {
    if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
      // dynamically import the SlickGrid plugin with requireJS
      this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
      this.createUndoRedoBuffer();
      this.hookUndoShortcutKey();
      let newRowIds = 0;
      const pluginOptions = {
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
      this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
      this._extension = new Slick.CellExternalCopyManager(pluginOptions);
      this.sharedService.grid.registerPlugin(this._extension);
      return this._extension;
    }
    return null;
  }

  /** Create an undo redo buffer used by the Excel like copy */
  private createUndoRedoBuffer() {
    const commandQueue: any[] = [];
    let commandCtr = 0;
    this._undoRedoBuffer = {
      queueAndExecuteCommand: (editCommand: any) => {
        commandQueue[commandCtr] = editCommand;
        commandCtr++;
        editCommand.execute();
      },
      undo: () => {
        if (commandCtr === 0) { return; }
        commandCtr--;
        const command = commandQueue[commandCtr];
        if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
          command.undo();
        }
      },
      redo: () => {
        if (commandCtr >= commandQueue.length) { return; }
        const command = commandQueue[commandCtr];
        commandCtr++;
        if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
          command.execute();
        }
      }
    };
  }

  /** Attach an undo shortcut key hook that will redo/undo the copy buffer */
  private hookUndoShortcutKey() {
    // undo shortcut
    $(document).keydown((e: any) => {
      if (e.which === 90 && (e.ctrlKey || e.metaKey)) {    // CTRL + (shift) + Z
        if (e.shiftKey) {
          this._undoRedoBuffer.redo();
        } else {
          this._undoRedoBuffer.undo();
        }
      }
    });
  }
}

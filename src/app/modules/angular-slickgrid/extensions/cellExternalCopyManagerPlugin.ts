import { GridOption, Column } from '../models';
import { sanitizeHtmlToText } from '../services/utilities';

// using external non-typed js libraries
declare var Slick: any;
declare var $: any;

export class CellExternalCopyManagerPlugin {
  undoRedoBuffer: any;

  constructor(private grid: any, private gridOptions: GridOption) {}

  register() {
    this.createUndoRedoBuffer();
    this.hookUndoShortcutKey();

    if (this.grid && this.gridOptions) {
      let newRowIds = 0;
      const pluginOptions = {
        clipboardCommandHandler: (editCommand: any) => {
          this.undoRedoBuffer.queueAndExecuteCommand.call(this.undoRedoBuffer, editCommand);
        },
        dataItemColumnValueExtractor: (item: any, columnDef: Column) => {
          // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
          // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
          if (!this.gridOptions.editable || !columnDef.editor) {
            const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this.gridOptions.exportOptions.exportWithFormatter;
            if (columnDef.formatter && isEvaluatingFormatter) {
              const formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, this.grid);
              if (columnDef.sanitizeDataExport || (this.gridOptions.exportOptions && this.gridOptions.exportOptions.sanitizeDataExport)) {
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
        newRowCreator: (count: number) => {
          for (let i = 0; i < count; i++) {
            const item = {
              id: 'newRow_' + newRowIds++
            };
            this.grid.getData().addItem(item);
          }
        }
      };

      this.grid.setSelectionModel(new Slick.CellSelectionModel());
      const plugin = new Slick.CellExternalCopyManager(pluginOptions);
      this.grid.registerPlugin(plugin);

      return plugin;
    }

    return null;
  }

  /** Create an undo redo buffer used by the Excel like copy */
  private createUndoRedoBuffer() {
    const commandQueue: any[] = [];
    let commandCtr = 0;

    this.undoRedoBuffer = {
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
    $(document).keydown((e) => {
      if (e.which === 90 && (e.ctrlKey || e.metaKey)) {    // CTRL + (shift) + Z
        if (e.shiftKey) {
          this.undoRedoBuffer.redo();
        } else {
          this.undoRedoBuffer.undo();
        }
      }
    });
  }
}

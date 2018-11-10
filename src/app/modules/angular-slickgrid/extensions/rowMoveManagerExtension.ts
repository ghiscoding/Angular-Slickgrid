import { Injectable } from '@angular/core';
import { CellArgs } from '../models/cellArgs.interface';
import { SharedService } from '../services/shared.service';

// using external non-typed js libraries
declare var Slick: any;

@Injectable()
export class RowMoveManagerExtension {
  constructor(private sharedService: SharedService) {}

  register(rowSelectionPlugin?: any): any {
    if (this.sharedService.grid && this.sharedService.gridOptions) {
      // this also requires the Row Selection Model to be registered as well
      if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
        rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
        this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
      }

      const extension = new Slick.RowMoveManager(this.sharedService.gridOptions.rowMoveManager || { cancelEditOnDrag: true });
      this.sharedService.grid.registerPlugin(extension);

      // hook all events
      if (this.sharedService.grid && this.sharedService.gridOptions.rowMoveManager) {
        extension.onBeforeMoveRows.subscribe((e: Event, args: CellArgs) => {
          if (this.sharedService.gridOptions.rowMoveManager && typeof this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows === 'function') {
            this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows(e, args);
          }
        });
        extension.onMoveRows.subscribe((e: Event, args: CellArgs) => {
          if (this.sharedService.gridOptions.rowMoveManager && typeof this.sharedService.gridOptions.rowMoveManager.onMoveRows === 'function') {
            this.sharedService.gridOptions.rowMoveManager.onMoveRows(e, args);
          }
        });
      }
      return extension;
    }
    return null;
  }
}

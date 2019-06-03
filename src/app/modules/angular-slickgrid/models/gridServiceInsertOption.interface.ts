import { GridServiceCrudOption } from './gridServiceCrudOption.interface';

export interface GridServiceInsertOption extends GridServiceCrudOption {
  highlightRow: boolean;
  resortGrid: boolean;
}

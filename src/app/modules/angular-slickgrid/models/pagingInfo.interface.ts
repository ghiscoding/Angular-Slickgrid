import { DataView } from './dataView.interface';

export interface PagingInfo {
  pageSize: number;
  pageNum: number;
  totalRows?: number;
  totalPages?: number;
  dataView?: DataView;
}

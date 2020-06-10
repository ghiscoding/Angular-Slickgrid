import { SlickDataView } from './slickDataView.interface';

export interface PagingInfo {
  pageSize: number;
  pageNum: number;
  totalRows?: number;
  totalPages?: number;
  dataView?: SlickDataView;
}

import { BackendService } from './index';
import {
  ExcelExportService,
  ExportService,
  ExtensionService,
  FilterService,
  GridService,
  GridEventService,
  GridStateService,
  GroupingAndColspanService,
  PaginationService,
  ResizerService,
  SortService
} from '../services';

export interface AngularGridInstance {
  /** Slick DataView object */
  dataView: any;

  /** Slick Grid object */
  slickGrid: any;

  // --
  // Methods

  /** Destroy the grid and optionally empty the DOM element grid container as well */
  destroy: (emptyDomElementContainer?: boolean) => void;

  // --
  // Services

  /** Backend Service, when available */
  backendService?: BackendService;

  /** Extension (Controls & Plugins) Service */
  extensionService: ExtensionService;

  /** @deprecated, use `extensionService` instead. Plugin and Control Service */
  pluginService: ExtensionService;

  /** Excel Export Service */
  excelExportService?: ExcelExportService;

  /** Export Service */
  exportService: ExportService;

  /** Filter Service */
  filterService: FilterService;

  /** Grid Service (grid extra functionalities) */
  gridService: GridService;

  /** Grid Events Service */
  gridEventService: GridEventService;

  /** Grid State Service */
  gridStateService: GridStateService;

  /** Grouping (and colspan) Service */
  groupingService: GroupingAndColspanService;

  /** Pagination Service (allows you to programmatically go to first/last page, etc...) */
  paginationService: PaginationService;

  /** Resizer Service (including auto-resize) */
  resizerService: ResizerService;

  /** Sort Service */
  sortService: SortService;
}

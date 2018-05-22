import { BackendService } from './../models';
import {
  ControlAndPluginService,
  ExportService,
  FilterService,
  GridService,
  GridEventService,
  GridStateService,
  GroupingAndColspanService,
  ResizerService,
  SortService
} from '../services';

export interface AngularGridInstance {
  backendService?: BackendService;
  pluginService: ControlAndPluginService;
  exportService: ExportService;
  filterService: FilterService;
  gridService: GridService;
  gridEventService: GridEventService;
  gridStateService: GridStateService;
  groupingService: GroupingAndColspanService;
  resizerService: ResizerService;
  sortService: SortService;
}

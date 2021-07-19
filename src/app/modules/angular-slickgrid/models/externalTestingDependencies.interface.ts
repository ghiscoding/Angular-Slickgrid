import {
  BackendUtilityService,
  CollectionService,
  ExtensionService,
  ExtensionUtility,
  FilterService,
  GridEventService,
  GridService,
  GridStateService,
  GroupingAndColspanService,
  PaginationService,
  ResizerService,
  RxJsFacade,
  SharedService,
  SortService,
  TreeDataService
} from '@slickgrid-universal/common';
import { EventPubSubService } from '@slickgrid-universal/event-pub-sub';

export interface ExternalTestingDependencies {
  backendUtilityService?: BackendUtilityService;
  collectionService?: CollectionService;
  eventPubSubService?: EventPubSubService;
  extensionService?: ExtensionService;
  extensionUtility?: ExtensionUtility;
  filterService?: FilterService;
  gridEventService?: GridEventService;
  gridService?: GridService;
  gridStateService?: GridStateService;
  groupingAndColspanService?: GroupingAndColspanService;
  paginationService?: PaginationService;
  resizerService?: ResizerService;
  rxjs?: RxJsFacade;
  sharedService?: SharedService;
  sortService?: SortService;
  treeDataService?: TreeDataService;
}
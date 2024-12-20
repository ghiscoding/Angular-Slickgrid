import type {
  BackendUtilityService,
  CollectionService,
  ExtensionService,
  ExtensionUtility,
  FilterService,
  GridEventService,
  GridService,
  GridStateService,
  HeaderGroupingService,
  PaginationService,
  ResizerService,
  RxJsFacade,
  SharedService,
  SortService,
  TreeDataService,
} from '@slickgrid-universal/common';
import type { EventPubSubService } from '@slickgrid-universal/event-pub-sub';

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
  headerGroupingService?: HeaderGroupingService;
  paginationService?: PaginationService;
  resizerService?: ResizerService;
  rxjs?: RxJsFacade;
  sharedService?: SharedService;
  sortService?: SortService;
  treeDataService?: TreeDataService;
}

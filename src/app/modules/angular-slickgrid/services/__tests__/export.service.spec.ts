// import 3rd party lib multiple-select for the tests
import '../../../../../assets/lib/multiple-select/multiple-select';

import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  BackendService,
  DelimiterType,
  FileType,
  FilterChangedArgs,
  GridOption,
} from '../../models';
import { ExportService } from '../export.service';
import { of, Subject } from 'rxjs';

declare var Slick: any;

// URL object is not supported in JSDOM, we can simply mock it
window.URL.createObjectURL = jest.fn();

const gridOptionMock = {
  enablePagination: true,
  enableFiltering: true,
  backendServiceApi: {
    service: undefined,
    preProcess: jest.fn(),
    process: jest.fn(),
    postProcess: jest.fn(),
  }
} as GridOption;

const dataViewStub = {
  getGrouping: jest.fn(),
  getIdxById: jest.fn(),
  getLength: jest.fn(),
  refresh: jest.fn(),
  setFilter: jest.fn(),
  setFilterArgs: jest.fn(),
  sort: jest.fn(),
  reSort: jest.fn(),
};

const backendServiceStub = {
  clearFilters: jest.fn(),
  getCurrentFilters: jest.fn(),
  getCurrentPagination: jest.fn(),
  processOnFilterChanged: (event: Event, args: FilterChangedArgs) => 'backend query',
} as unknown as BackendService;

const gridStub = {
  autosizeColumns: jest.fn(),
  getColumnIndex: jest.fn(),
  getOptions: () => gridOptionMock,
  getColumns: jest.fn(),
  getHeaderRowColumn: jest.fn(),
  getSortColumns: jest.fn(),
  invalidate: jest.fn(),
  onLocalSortChanged: jest.fn(),
  onSort: new Slick.Event(),
  onHeaderRowCellRendered: new Slick.Event(),
  render: jest.fn(),
  setSortColumns: jest.fn(),
};

describe('FilterService', () => {
  let service: ExportService;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportService],
      imports: [TranslateModule.forRoot()]
    });
    service = TestBed.get(ExportService);
    translate = TestBed.get(TranslateService);

    translate.setTranslation('en', {
      SALES_REP: 'Sales Rep.',
      FINANCE_MANAGER: 'Finance Manager',
      HUMAN_RESOURCES: 'Human Resources',
      IT_ADMIN: 'IT Admin',
      DEVELOPER: 'Developer',
    });
    translate.setTranslation('fr', {
      SALES_REP: 'Représentant des ventes',
      FINANCE_MANAGER: 'Responsable des finances',
      HUMAN_RESOURCES: 'Ressources humaines',
      IT_ADMIN: 'Administrateur IT',
      DEVELOPER: 'Développeur',
    });
    translate.setDefaultLang('en');
  });

  afterEach(() => {
    delete gridOptionMock.backendServiceApi;
    jest.clearAllMocks();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('exportToFile method', () => {
    let mockExportOptions;

    beforeEach(() => {
      mockExportOptions = {
        delimiter: DelimiterType.tab,
        filename: 'export',
        format: FileType.txt,
        useUtf8WithBom: true
      };
    });

    it('should trigger an event before exporting the file', () => {
      const spyOnBefore = jest.spyOn(service.onGridBeforeExportToFile, 'next');

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportOptions);

      expect(spyOnBefore).toHaveBeenCalled();
    });

    it('should trigger an event after exporting the file', (done) => {
      const spyOnAfter = jest.spyOn(service.onGridAfterExportToFile, 'next');

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportOptions);

      setTimeout(() => {
        expect(spyOnAfter).toHaveBeenCalled();
        done();
      });
    });
  });
});

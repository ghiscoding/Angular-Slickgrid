import { Formatters } from './../../formatters/index';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  DelimiterType,
  FileType,
  GridOption,
  Column,
} from '../../models';
import { ExportService } from '../export.service';
import { Formatter } from 'dist/app/modules/angular-slickgrid/models';

function removeMultipleSpaces(textS) {
  return `${textS}`.replace(/  +/g, '');
}

// URL object is not supported in JSDOM, we can simply mock it
(global as any).URL.createObjectURL = jest.fn();

const myBoldHtmlFormatter: Formatter = (row, cell, value, columnDef, dataContext) => value !== null ? { text: `<b>${value}</b>` } : null;
const myUppercaseFormatter: Formatter = (row, cell, value, columnDef, dataContext) => value ? { text: value.toUpperCase() } : null;
const myCustomObjectFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  let textValue = value && value.hasOwnProperty('text') ? value.text : value;
  const toolTip = value && value.hasOwnProperty('toolTip') ? value.toolTip : '';
  const cssClasses = value && value.hasOwnProperty('addClasses') ? [value.addClasses] : [''];

  if (dataContext && !isNaN(dataContext.order) && parseFloat(dataContext.order) > 10) {
    cssClasses.push('red');
    textValue = null;
  }

  return { text: textValue, addClasses: cssClasses.join(' '), toolTip };
};

const dataViewStub = {
  getGrouping: jest.fn(),
  getItem: jest.fn(),
  getLength: jest.fn(),
};

const gridStub = {
  getColumnIndex: jest.fn(),
  getOptions: jest.fn(),
  getColumns: jest.fn(),
  getGrouping: jest.fn(),
};

describe('FilterService', () => {
  let mockCollection: any[];
  let mockGridOptions: GridOption;
  let mockColumns: Column[];
  let service: ExportService;
  let translate: TranslateService;

  beforeEach(() => {
    mockGridOptions = {
      enablePagination: true,
      enableFiltering: true,
      i18n: translate,
      exportOptions: {
        sanitizeDataExport: true
      }
    } as GridOption;

    mockCollection = [
      { id: 0, userId: '1E06', firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 },
      { id: 1, userId: '2B02', firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 },
      { id: 2, userId: '3C2', firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 13 },
      { id: 3, userId: undefined, firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },
      { id: 4, userId: '5B3', firstName: 'Bob', lastName: 'Cash', position: 'SALES_REP', order: null },
      { id: 5, userId: '1E12', firstName: null, lastName: 'Doe', position: null, order: 5 },
      { id: 6, userId: '7E12', firstName: 'John', lastName: 'Zachary', position: 'SALES_REP', order: 2 },
      { id: 7, userId: '2B3', firstName: 'John', lastName: 'Doe', position: 'DEVELOPER', order: 4 },
      { id: 8, userId: '4C04', firstName: 'John Foo', lastName: 'Bar', position: 'SALES_REP', order: 8 },
    ];

    mockColumns = [
      { id: 'id', field: 'id', excludeFromExport: true },
      { id: 'userId', field: 'userId', name: 'User Id', width: 100, exportCsvForceToKeepAsString: true },
      { id: 'firstName', field: 'firstName', headerKey: 'FIRST_NAME', width: 100, formatter: myBoldHtmlFormatter },
      { id: 'lastName', field: 'lastName', headerKey: 'LAST_NAME', width: 100, formatter: myBoldHtmlFormatter, exportCustomFormatter: myUppercaseFormatter, sanitizeDataExport: true, exportWithFormatter: true },
      { id: 'position', field: 'position', name: 'Position', width: 100, formatter: Formatters.translate, exportWithFormatter: true },
      { id: 'order', field: 'order', width: 100, exportWithFormatter: true, formatter: Formatters.multiple, params: { formatters: [myBoldHtmlFormatter, myCustomObjectFormatter] } },
    ] as Column[];

    jest.spyOn(gridStub, 'getOptions').mockReturnValue(mockGridOptions);
    jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
    jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
    jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null)
      .mockReturnValueOnce(mockCollection[0])
      .mockReturnValueOnce(mockCollection[1])
      .mockReturnValueOnce(mockCollection[2])
      .mockReturnValueOnce(mockCollection[3])
      .mockReturnValueOnce(mockCollection[4])
      .mockReturnValueOnce(mockCollection[5])
      .mockReturnValueOnce(mockCollection[6])
      .mockReturnValueOnce(mockCollection[7])
      .mockReturnValueOnce(mockCollection[8]);

    TestBed.configureTestingModule({
      providers: [ExportService],
      imports: [TranslateModule.forRoot()]
    });
    service = TestBed.get(ExportService);
    translate = TestBed.get(TranslateService);

    translate.setTranslation('en', {
      FIRST_NAME: 'First Name',
      LAST_NAME: 'Last Name',
      SALES_REP: 'Sales Rep.',
      FINANCE_MANAGER: 'Finance Manager',
      HUMAN_RESOURCES: 'Human Resources',
      IT_ADMIN: 'IT Admin',
      DEVELOPER: 'Developer',
    });
    translate.setTranslation('fr', {
      FIRST_NAME: 'Prénom',
      LAST_NAME: 'Nom de famille',
      SALES_REP: 'Représentant des ventes',
      FINANCE_MANAGER: 'Responsable des finances',
      HUMAN_RESOURCES: 'Ressources humaines',
      IT_ADMIN: 'Administrateur IT',
      DEVELOPER: 'Développeur',
    });
    translate.setDefaultLang('en');
  });

  afterEach(() => {
    delete mockGridOptions.backendServiceApi;
    jest.clearAllMocks();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('exportToFile method', () => {
    let mockExportCsvOptions;
    let mockExportTxtOptions;
    let mockCsvBlob: Blob;
    let mockTxtBlob: Blob;

    beforeEach(() => {
      // @ts-ignore
      navigator.__defineGetter__('appName', () => 'Netscape');
      navigator.msSaveOrOpenBlob = undefined;
      mockCsvBlob = new Blob(['', ''], { type: `text/csv;charset=utf-8;` });
      mockTxtBlob = new Blob(['\uFEFF', ''], { type: `text/plain;charset=utf-8;` });

      mockExportCsvOptions = {
        delimiter: DelimiterType.comma,
        filename: 'export',
        format: FileType.csv,
        useUtf8WithBom: false,
      };

      mockExportTxtOptions = {
        delimiter: DelimiterType.tab,
        filename: 'export',
        format: FileType.txt,
        useUtf8WithBom: true
      };
    });

    it('should trigger an event before exporting the file', () => {
      const spyOnBefore = jest.spyOn(service.onGridBeforeExportToFile, 'next');

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportTxtOptions);

      expect(spyOnBefore).toHaveBeenCalled();
    });

    it('should trigger an event after exporting the file', (done) => {
      const spyOnAfter = jest.spyOn(service.onGridAfterExportToFile, 'next');

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportTxtOptions);

      setTimeout(() => {
        expect(spyOnAfter).toHaveBeenCalled();
        done();
      });
    });

    it('should call "URL.createObjectURL" with a Blob and Txt file when browser is not IE11 (basically any other browser) when exporting as CSV', (done) => {
      const spyOnAfter = jest.spyOn(service.onGridAfterExportToFile, 'next');
      const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
      const spyDownload = jest.spyOn(service, 'startDownloadFile');
      const contentExpectation =
        `"User Id","First Name","Last Name","Position","Order"
        ="1E06","John","Z","Sales Rep.","10"
        ="2B02","Jane","DOE","Finance Manager","1"
        ="3C2","Ava Luna","","Human Resources",""
        ="","","CASH","Sales Rep.","3"
        ="5B3","Bob","CASH","Sales Rep.",""
        ="1E12","","DOE","","5"
        ="7E12","John","ZACHARY","Sales Rep.","2"
        ="2B3","John","DOE","Developer","4"
        ="4C04","John Foo","BAR","Sales Rep.","8"`;

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportCsvOptions);

      setTimeout(() => {
        expect(spyOnAfter).toHaveBeenCalled();
        expect(spyUrlCreate).toHaveBeenCalledWith(mockCsvBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          content: removeMultipleSpaces(contentExpectation),
          filename: 'export.csv',
          format: 'csv',
          useUtf8WithBom: false
        });
        done();
      });
    });

    it('should call "msSaveOrOpenBlob" with a Blob and csv file when browser is IE11 when exporting as CSV', (done) => {
      navigator.msSaveOrOpenBlob = jest.fn();
      const spyOnAfter = jest.spyOn(service.onGridAfterExportToFile, 'next');
      const spyMsSave = jest.spyOn(navigator, 'msSaveOrOpenBlob');

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportCsvOptions);

      setTimeout(() => {
        expect(spyOnAfter).toHaveBeenCalled();
        expect(spyMsSave).toHaveBeenCalledWith(mockCsvBlob, 'export.csv');
        done();
      });
    });

    it('should call "URL.createObjectURL" with a Blob and Txt file when browser is not IE11 (basically any other browser) when exporting as TXT', (done) => {
      const spyOnAfter = jest.spyOn(service.onGridAfterExportToFile, 'next');
      const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportTxtOptions);

      setTimeout(() => {
        expect(spyOnAfter).toHaveBeenCalled();
        expect(spyUrlCreate).toHaveBeenCalledWith(mockTxtBlob);
        done();
      });
    });

    it('should call "msSaveOrOpenBlob" with a Blob and Txt file when browser is IE11 when exporting as TXT', (done) => {
      navigator.msSaveOrOpenBlob = jest.fn();
      const spyOnAfter = jest.spyOn(service.onGridAfterExportToFile, 'next');
      const spyMsSave = jest.spyOn(navigator, 'msSaveOrOpenBlob');

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportTxtOptions);

      setTimeout(() => {
        expect(spyOnAfter).toHaveBeenCalled();
        expect(spyMsSave).toHaveBeenCalledWith(mockTxtBlob, 'export.txt');
        done();
      });
    });

    it('should throw an error when browser is IE10 or lower', (done) => {
      // @ts-ignore
      navigator.__defineGetter__('appName', () => 'Microsoft Internet Explorer');

      service.init(gridStub, dataViewStub);
      service.exportToFile(mockExportTxtOptions)
        .catch((e) => {
          expect(e.toString()).toContain('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV');
          done();
        });
    });
  });
});

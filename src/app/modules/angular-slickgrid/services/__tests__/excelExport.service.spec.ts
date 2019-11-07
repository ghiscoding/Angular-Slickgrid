import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment-mini';

import {
  FileType,
  Formatter,
  GridOption,
  Column,
  FieldType,
  SortDirectionNumber,
  ExcelExportOption,
} from '../../models';
import { ExcelExportService } from '../excelExport.service';
import { Formatters } from '../../formatters/index';
import { Sorters } from '../../sorters/index';
import { GroupTotalFormatters } from '../..';

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
  setGrouping: jest.fn(),
};

const mockGridOptions = {
  enableExcelExport: true,
  enablePagination: true,
  enableFiltering: true,
} as GridOption;

const gridStub = {
  getColumnIndex: jest.fn(),
  getOptions: () => mockGridOptions,
  getColumns: jest.fn(),
  getGrouping: jest.fn(),
};

describe('ExcelExportService', () => {
  let mockColumns: Column[];
  let service: ExcelExportService;
  let translate: TranslateService;
  let mockExportExcelOptions: ExcelExportOption;
  let mockExcelBlob: Blob;

  describe('with ngx-translate', () => {
    beforeEach(() => {
      // @ts-ignore
      navigator.__defineGetter__('appName', () => 'Netscape');
      navigator.msSaveOrOpenBlob = undefined;
      mockExcelBlob = new Blob(['', ''], { type: `text/xlsx;charset=utf-8;` });

      mockExportExcelOptions = {
        filename: 'export',
        format: FileType.xlsx,
      };

      TestBed.configureTestingModule({
        providers: [ExcelExportService],
        imports: [TranslateModule.forRoot()]
      });
      service = TestBed.get(ExcelExportService);
      translate = TestBed.get(TranslateService);

      translate.setTranslation('en', {
        FIRST_NAME: 'First Name',
        LAST_NAME: 'Last Name',
        GROUP_BY: 'Grouped By',
        SALES_REP: 'Sales Rep.',
        FINANCE_MANAGER: 'Finance Manager',
        HUMAN_RESOURCES: 'Human Resources',
        IT_ADMIN: 'IT Admin',
        DEVELOPER: 'Developer',
      });
      translate.setTranslation('fr', {
        FIRST_NAME: 'Prénom',
        LAST_NAME: 'Nom de famille',
        GROUP_BY: 'Groupé par',
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
      expect(document).toBeTruthy();
    });

    it('should not have any output since there are no column definitions provided', async () => {
      const spyOnBefore = jest.spyOn(service.onGridBeforeExportToExcel, 'next');
      const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
      const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
      const spyDownload = jest.spyOn(service, 'startDownloadFile');

      const optionExpectation = { filename: 'export.xlsx', format: FileType.xlsx };

      service.init(gridStub, dataViewStub);
      const result = await service.exportToExcel(mockExportExcelOptions);

      expect(spyOnBefore).toHaveBeenCalledWith(true);
      expect(result).toBeTruthy();
      expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
      expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
      expect(spyDownload).toHaveBeenCalledWith({ ...optionExpectation, blob: new Blob(), data: [[]] });
    });

    describe('exportToExcel method', () => {
      beforeEach(() => {
        mockColumns = [
          { id: 'id', field: 'id', excludeFromExport: true },
          { id: 'userId', field: 'userId', name: 'User Id', width: 100 },
          { id: 'firstName', field: 'firstName', width: 100, formatter: myBoldHtmlFormatter },
          { id: 'lastName', field: 'lastName', width: 100, formatter: myBoldHtmlFormatter, exportCustomFormatter: myUppercaseFormatter, sanitizeDataExport: true, exportWithFormatter: true },
          { id: 'position', field: 'position', width: 100 },
          { id: 'order', field: 'order', width: 100, exportWithFormatter: true, formatter: Formatters.multiple, params: { formatters: [myBoldHtmlFormatter, myCustomObjectFormatter] } },
        ] as Column[];

        jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
      });

      it('should throw an error when trying call exportToExcel" without a grid and/or dataview object initialized', async () => {
        try {
          service.init(null, null);
          await service.exportToExcel(mockExportExcelOptions);
        } catch (e) {
          expect(e.toString()).toContain('[Angular-Slickgrid] it seems that the SlickGrid & DataView objects are not initialized did you forget to enable the grid option flag "enableExcelExport"?');
        }
      });

      it('should trigger an event before exporting the file', () => {
        const spyOnBefore = jest.spyOn(service.onGridBeforeExportToExcel, 'next');

        service.init(gridStub, dataViewStub);
        service.exportToExcel(mockExportExcelOptions);

        expect(spyOnBefore).toHaveBeenCalled();
      });

      it('should trigger an event after exporting the file', async () => {
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');

        service.init(gridStub, dataViewStub);
        const result = await service.exportToExcel(mockExportExcelOptions);

        expect(result).toBeTruthy();
        expect(spyOnAfter).toHaveBeenCalled();
      });

      it('should call "URL.createObjectURL" with a Blob and xlsx file when browser is not IE11 (basically any other browser) when exporting as xlsx', async () => {
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');

        service.init(gridStub, dataViewStub);
        const result = await service.exportToExcel(mockExportExcelOptions);

        expect(result).toBeTruthy();
        expect(spyOnAfter).toHaveBeenCalled();
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
      });

      it('should call "msSaveOrOpenBlob" with a Blob and xlsx file when browser is IE11 when exporting as xlsx', async () => {
        navigator.msSaveOrOpenBlob = jest.fn();
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyMsSave = jest.spyOn(navigator, 'msSaveOrOpenBlob');

        service.init(gridStub, dataViewStub);
        const result = await service.exportToExcel(mockExportExcelOptions);

        expect(result).toBeTruthy();
        expect(spyOnAfter).toHaveBeenCalled();
        expect(spyMsSave).toHaveBeenCalledWith(mockExcelBlob, 'export.xlsx');
      });

      it('should throw an error when browser is IE10 or lower', async () => {
        // @ts-ignore
        navigator.__defineGetter__('appName', () => 'Microsoft Internet Explorer');

        try {
          service.init(gridStub, dataViewStub);
          await service.exportToExcel(mockExportExcelOptions);
        } catch (e) {
          expect(e.toString()).toContain('Microsoft Internet Explorer 6 to 10 do not support javascript export to Excel.');
        }
      });
    });

    describe('startDownloadFile call after all private methods ran ', () => {
      let mockCollection: any[];

      it(`should have the Order exported correctly with multiple formatters which have 1 of them returning an object with a text property (instead of simple string)`, async () => {
        mockCollection = [{ id: 0, userId: '1E06', firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: FileType.xlsx };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['1E06', 'John', 'Z', 'SALES_REP', '<b>10</b>'],
          ]
        });
      });

      it(`should have the LastName in uppercase when "formatter" is defined but also has "exportCustomFormatter" which will be used`, async () => {
        mockCollection = [{ id: 1, userId: '2B02', firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['2B02', 'Jane', 'DOE', 'FINANCE_MANAGER', '<b>1</b>'],
          ]
        });
      });

      it(`should have the LastName as empty string when item LastName is NULL and column definition "formatter" is defined but also has "exportCustomFormatter" which will be used`, async () => {
        mockCollection = [{ id: 2, userId: '3C2', firstName: 'Ava Luna', lastName: null, position: 'HUMAN_RESOURCES', order: 3 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['3C2', 'Ava Luna', '', 'HUMAN_RESOURCES', '<b>3</b>'],
          ]
        });
      });

      it(`should have the UserId as empty string even when UserId property is not found in the item object`, async () => {
        mockCollection = [{ id: 2, firstName: 'Ava', lastName: 'Luna', position: 'HUMAN_RESOURCES', order: 3 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['', 'Ava', 'LUNA', 'HUMAN_RESOURCES', '<b>3</b>'],
          ]
        });
      });

      it(`should have the Order as empty string when using multiple formatters and last one result in a null output because its value is bigger than 10`, async () => {
        mockCollection = [{ id: 2, userId: '3C2', firstName: 'Ava', lastName: 'Luna', position: 'HUMAN_RESOURCES', order: 13 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['3C2', 'Ava', 'LUNA', 'HUMAN_RESOURCES', ''],
          ]
        });
      });

      it(`should have the UserId as empty string when its input value is null`, async () => {
        mockCollection = [{ id: 3, userId: undefined, firstName: '', lastName: 'Cash', position: 'SALES_REP', order: 3 },];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['', '', 'CASH', 'SALES_REP', '<b>3</b>'],
          ]
        });
      });

      it(`should have the Order without html tags when the grid option has "sanitizeDataExport" enabled`, async () => {
        mockGridOptions.excelExportOptions = { sanitizeDataExport: true };
        mockCollection = [{ id: 1, userId: '2B02', firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['2B02', 'Jane', 'DOE', 'FINANCE_MANAGER', '1'],
          ]
        });
      });

      it(`should have a custom Title when "customExcelHeader" is provided`, async () => {
        mockGridOptions.excelExportOptions = {
          sanitizeDataExport: true,
          customExcelHeader: (workbook, sheet) => {
            const stylesheet = workbook.getStyleSheet();
            const aFormatDefn = {
              'font': { 'size': 12, 'fontName': 'Calibri', 'bold': true, color: 'FF0000FF' }, // every color starts with FF, then regular HTML color
              'alignment': { 'wrapText': true }
            };
            const formatterId = stylesheet.createFormat(aFormatDefn);
            sheet.setRowInstructions(0, { height: 30 }); // change height of row 0

            // excel cells start with A1 which is upper left corner
            sheet.mergeCells('B1', 'D1');
            const cols = [];
            // push empty data on A1
            cols.push({ value: '' });
            // push data in B1 cell with metadata formatter
            cols.push({ value: 'My header that is long enough to wrap', metadata: { style: formatterId.id } });
            sheet.data.push(cols);
          }
        };
        mockCollection = [{ id: 1, userId: '2B02', firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 1 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { value: '' },
              { metadata: { style: 5, }, value: 'My header that is long enough to wrap', }
            ],
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['2B02', 'Jane', 'DOE', 'FINANCE_MANAGER', '1'],
          ]
        });
      });
    });

    describe('exportToExcel method with Date Fields', () => {
      let mockCollection: any[];

      beforeEach(() => {
        mockGridOptions.excelExportOptions = { sanitizeDataExport: true };
        mockColumns = [
          { id: 'id', field: 'id', excludeFromExport: true },
          { id: 'userId', field: 'userId', name: 'User Id', width: 100 },
          { id: 'firstName', field: 'firstName', width: 100, formatter: myBoldHtmlFormatter },
          { id: 'lastName', field: 'lastName', width: 100, sanitizeDataExport: true, exportWithFormatter: true },
          { id: 'position', field: 'position', width: 100 },
          { id: 'startDate', field: 'startDate', type: FieldType.dateIso, width: 100, exportWithFormatter: false },
          { id: 'endDate', field: 'endDate', width: 100, formatter: Formatters.dateIso, type: FieldType.dateUtc, exportWithFormatter: true, outputType: FieldType.dateIso },
        ] as Column[];

        jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
      });


      it(`should Date exported correctly when Field Type is provided and we use "exportWithFormatter" set to True & False`, async () => {
        mockCollection = [
          { id: 0, userId: '1E06', firstName: 'John', lastName: 'Z', position: 'SALES_REP', startDate: '2005-12-20T18:19:19.992Z', endDate: null },
          { id: 1, userId: '1E09', firstName: 'Jane', lastName: 'Doe', position: 'HUMAN_RESOURCES', startDate: '2010-10-09T18:19:19.992Z', endDate: '2024-01-02T16:02:02.000Z' },
        ];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]).mockReturnValueOnce(mockCollection[1]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: FileType.xlsx };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'StartDate', },
              { metadata: { style: 1, }, value: 'EndDate', },
            ],
            ['1E06', 'John', 'Z', 'SALES_REP', { metadata: { style: 5, }, value: '2005-12-20' }, ''],
            ['1E09', 'Jane', 'Doe', 'HUMAN_RESOURCES', { metadata: { style: 6, }, value: '2010-10-09' }, '2024-01-02'],
          ]
        });
      });
    });

    describe('startDownloadFile with some columns having complex object', () => {
      beforeEach(() => {
        mockGridOptions.excelExportOptions = { sanitizeDataExport: true };
        mockColumns = [
          { id: 'id', field: 'id', excludeFromExport: true },
          { id: 'firstName', field: 'user.firstName', name: 'First Name', width: 100, formatter: Formatters.complexObject, exportWithFormatter: true },
          { id: 'lastName', field: 'user.lastName', name: 'Last Name', width: 100, formatter: Formatters.complexObject, exportWithFormatter: true },
          { id: 'position', field: 'position', width: 100 },
        ] as Column[];

        jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
      });

      let mockCollection: any[];

      it(`should export correctly with complex object formatters`, async () => {
        mockCollection = [{ id: 0, user: { firstName: 'John', lastName: 'Z' }, position: 'SALES_REP', order: 10 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'First Name', },
              { metadata: { style: 1, }, value: 'Last Name', },
              { metadata: { style: 1, }, value: 'Position', },
            ],
            ['John', 'Z', 'SALES_REP'],
          ]
        });
      });
    });

    describe('with Translation', () => {
      let mockCollection: any[];

      beforeEach(() => {
        mockGridOptions.enableTranslate = true;
        mockGridOptions.i18n = translate;

        mockColumns = [
          { id: 'id', field: 'id', excludeFromExport: true },
          { id: 'userId', field: 'userId', name: 'User Id', width: 100 },
          { id: 'firstName', headerKey: 'FIRST_NAME', width: 100, formatter: myBoldHtmlFormatter },
          { id: 'lastName', field: 'lastName', headerKey: 'LAST_NAME', width: 100, formatter: myBoldHtmlFormatter, exportCustomFormatter: myUppercaseFormatter, sanitizeDataExport: true, exportWithFormatter: true },
          { id: 'position', field: 'position', name: 'Position', width: 100, formatter: Formatters.translate, exportWithFormatter: true },
          { id: 'order', field: 'order', width: 100, exportWithFormatter: true, formatter: Formatters.multiple, params: { formatters: [myBoldHtmlFormatter, myCustomObjectFormatter] } },
        ] as Column[];

        jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
      });

      it(`should have the LastName header title translated when defined as a "headerKey" and "i18n" is set in grid option`, async () => {
        mockCollection = [{ id: 0, userId: '1E06', firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem').mockReturnValue(null).mockReturnValueOnce(mockCollection[0]);
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'First Name', },
              { metadata: { style: 1, }, value: 'Last Name', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['1E06', 'John', 'Z', 'Sales Rep.', '10'],
          ]
        });
      });
    });

    describe('with Grouping', () => {
      let mockCollection: any[];
      let mockOrderGrouping;
      let mockItem1;
      let mockItem2;
      let mockGroup1;

      beforeEach(() => {
        mockGridOptions.enableGrouping = true;
        mockGridOptions.enableTranslate = false;
        mockGridOptions.excelExportOptions = { sanitizeDataExport: true, addGroupIndentation: true };

        mockColumns = [
          { id: 'id', field: 'id', excludeFromExport: true },
          { id: 'userId', field: 'userId', name: 'User Id', width: 100 },
          { id: 'firstName', field: 'firstName', width: 100, formatter: myBoldHtmlFormatter },
          { id: 'lastName', field: 'lastName', width: 100, formatter: myBoldHtmlFormatter, exportCustomFormatter: myUppercaseFormatter, sanitizeDataExport: true, exportWithFormatter: true },
          { id: 'position', field: 'position', width: 100 },
          {
            id: 'order', field: 'order', type: FieldType.number,
            exportWithFormatter: true,
            formatter: Formatters.multiple, params: { formatters: [myBoldHtmlFormatter, myCustomObjectFormatter] },
            groupTotalsFormatter: GroupTotalFormatters.sumTotals,
          },
        ] as Column[];

        mockOrderGrouping = {
          aggregateChildGroups: false,
          aggregateCollapsed: false,
          aggregateEmpty: false,
          aggregators: [{ _count: 2, _field: 'order', _nonNullCount: 2, _sum: 4, }],
          collapsed: false,
          comparer: (a, b) => Sorters.numeric(a.value, b.value, SortDirectionNumber.asc),
          compiledAccumulators: [jest.fn(), jest.fn()],
          displayTotalsRow: true,
          formatter: (g) => `Order:  ${g.value} <span style="color:green">(${g.count} items)</span>`,
          getter: 'order',
          getterIsAFn: false,
          lazyTotalsCalculation: true,
          predefinedValues: [],
        };

        mockItem1 = { id: 0, userId: '1E06', firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 };
        mockItem2 = { id: 1, userId: '2B02', firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 10 };
        mockGroup1 = {
          collapsed: 0, count: 2, groupingKey: '10', groups: null, level: 0, selectChecked: false,
          rows: [mockItem1, mockItem2],
          title: `Order: 20 <span style="color:green">(2 items)</span>`,
          totals: { value: '10', __group: true, __groupTotals: true, group: {}, initialized: true, sum: { order: 20 } },
        };

        jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
        mockCollection = [mockGroup1, mockItem1, mockItem2, { __groupTotals: true, initialized: true, sum: { order: 20 }, group: mockGroup1 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem')
          .mockReturnValue(null)
          .mockReturnValueOnce(mockCollection[0])
          .mockReturnValueOnce(mockCollection[1])
          .mockReturnValueOnce(mockCollection[2])
          .mockReturnValueOnce(mockCollection[3]);
        jest.spyOn(dataViewStub, 'getGrouping').mockReturnValue([mockOrderGrouping]);
      });

      it(`should have a xlsx export with grouping (same as the grid, WYSIWYG) when "enableGrouping" is set in the grid options and grouping are defined`, async () => {
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'Group By', },
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'FirstName', },
              { metadata: { style: 1, }, value: 'LastName', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['▿ Order: 20 (2 items)'],
            ['', '1E06', 'John', 'Z', 'SALES_REP', '10'],
            ['', '2B02', 'Jane', 'DOE', 'FINANCE_MANAGER', '10'],
            ['', '', '', '', '', '20'],
          ]
        });
      });
    });

    describe('with Grouping and Translation', () => {
      let mockCollection: any[];
      let mockOrderGrouping;
      let mockItem1;
      let mockItem2;
      let mockGroup1;

      beforeEach(() => {
        mockGridOptions.enableGrouping = true;
        mockGridOptions.enableTranslate = true;
        mockGridOptions.excelExportOptions = { sanitizeDataExport: true, addGroupIndentation: true };

        mockColumns = [
          { id: 'id', field: 'id', excludeFromExport: true },
          { id: 'userId', field: 'userId', name: 'User Id', width: 100 },
          { id: 'firstName', field: 'firstName', headerKey: 'FIRST_NAME', width: 100, formatter: myBoldHtmlFormatter },
          { id: 'lastName', field: 'lastName', headerKey: 'LAST_NAME', width: 100, formatter: myBoldHtmlFormatter, exportCustomFormatter: myUppercaseFormatter, sanitizeDataExport: true, exportWithFormatter: true },
          { id: 'position', field: 'position', name: 'Position', width: 100, formatter: Formatters.translate, exportWithFormatter: true },
          {
            id: 'order', field: 'order', type: FieldType.number,
            exportWithFormatter: true,
            formatter: Formatters.multiple, params: { formatters: [myBoldHtmlFormatter, myCustomObjectFormatter] },
            groupTotalsFormatter: GroupTotalFormatters.sumTotals,
          },
        ] as Column[];

        mockOrderGrouping = {
          aggregateChildGroups: false,
          aggregateCollapsed: false,
          aggregateEmpty: false,
          aggregators: [{ _count: 2, _field: 'order', _nonNullCount: 2, _sum: 4, }],
          collapsed: false,
          comparer: (a, b) => Sorters.numeric(a.value, b.value, SortDirectionNumber.asc),
          compiledAccumulators: [jest.fn(), jest.fn()],
          displayTotalsRow: true,
          formatter: (g) => `Order:  ${g.value} <span style="color:green">(${g.count} items)</span>`,
          getter: 'order',
          getterIsAFn: false,
          lazyTotalsCalculation: true,
          predefinedValues: [],
        };

        mockItem1 = { id: 0, userId: '1E06', firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 };
        mockItem2 = { id: 1, userId: '2B02', firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 10 };
        mockGroup1 = {
          collapsed: 0, count: 2, groupingKey: '10', groups: null, level: 0, selectChecked: false,
          rows: [mockItem1, mockItem2],
          title: `Order: 20 <span style="color:green">(2 items)</span>`,
          totals: { value: '10', __group: true, __groupTotals: true, group: {}, initialized: true, sum: { order: 20 } },
        };

        jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
        mockCollection = [mockGroup1, mockItem1, mockItem2, { __groupTotals: true, initialized: true, sum: { order: 20 }, group: mockGroup1 }];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem')
          .mockReturnValue(null)
          .mockReturnValueOnce(mockCollection[0])
          .mockReturnValueOnce(mockCollection[1])
          .mockReturnValueOnce(mockCollection[2])
          .mockReturnValueOnce(mockCollection[3]);
        jest.spyOn(dataViewStub, 'getGrouping').mockReturnValue([mockOrderGrouping]);
      });

      it(`should have a xlsx export with grouping (same as the grid, WYSIWYG) when "enableGrouping" is set in the grid options and grouping are defined`, async () => {
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'Grouped By', },
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'First Name', },
              { metadata: { style: 1, }, value: 'Last Name', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['▿ Order: 20 (2 items)'],
            ['', '1E06', 'John', 'Z', 'Sales Rep.', '10'],
            ['', '2B02', 'Jane', 'DOE', 'Finance Manager', '10'],
            ['', '', '', '', '', '20'],
          ]
        });
      });
    });

    describe('with Multiple Columns Grouping (by Order then by LastName) and Translation', () => {
      let mockCollection: any[];
      let mockOrderGrouping;
      let mockLastNameGrouping;
      let mockItem1;
      let mockItem2;
      let mockGroup1;
      let mockGroup2;
      let mockGroup3;
      let mockGroup4;

      beforeEach(() => {
        mockGridOptions.enableGrouping = true;
        mockGridOptions.enableTranslate = true;
        mockGridOptions.excelExportOptions = { sanitizeDataExport: true, addGroupIndentation: true, exportWithFormatter: true };

        mockColumns = [
          { id: 'id', field: 'id', excludeFromExport: true },
          { id: 'userId', field: 'userId', name: 'User Id', width: 100 },
          { id: 'firstName', field: 'firstName', headerKey: 'FIRST_NAME', width: 100, formatter: myBoldHtmlFormatter },
          { id: 'lastName', field: 'lastName', headerKey: 'LAST_NAME', width: 100, formatter: myBoldHtmlFormatter, exportCustomFormatter: myUppercaseFormatter, sanitizeDataExport: true, exportWithFormatter: true },
          { id: 'position', field: 'position', name: 'Position', width: 100, formatter: Formatters.translate },
          {
            id: 'order', field: 'order', type: FieldType.number,
            exportWithFormatter: true,
            formatter: Formatters.multiple, params: { formatters: [myBoldHtmlFormatter, myCustomObjectFormatter] },
            groupTotalsFormatter: GroupTotalFormatters.sumTotals,
          },
        ] as Column[];

        mockOrderGrouping = {
          aggregateChildGroups: false,
          aggregateCollapsed: false,
          aggregateEmpty: false,
          aggregators: [{ _count: 2, _field: 'order', _nonNullCount: 2, _sum: 4, }],
          collapsed: false,
          comparer: (a, b) => Sorters.numeric(a.value, b.value, SortDirectionNumber.asc),
          compiledAccumulators: [jest.fn(), jest.fn()],
          displayTotalsRow: true,
          formatter: (g) => `Order:  ${g.value} <span style="color:green">(${g.count} items)</span>`,
          getter: 'order',
          getterIsAFn: false,
          lazyTotalsCalculation: true,
          predefinedValues: [],
        };

        mockLastNameGrouping = {
          aggregateChildGroups: false,
          aggregateCollapsed: false,
          aggregateEmpty: false,
          aggregators: [{ _count: 1, _field: 'lastName', _nonNullCount: 2, _sum: 4, }],
          collapsed: false,
          comparer: (a, b) => Sorters.numeric(a.value, b.value, SortDirectionNumber.asc),
          compiledAccumulators: [jest.fn(), jest.fn()],
          displayTotalsRow: true,
          formatter: (g) => `Last Name:  ${g.value} <span style="color:green">(${g.count} items)</span>`,
          getter: 'lastName',
          getterIsAFn: false,
          lazyTotalsCalculation: true,
          predefinedValues: [],
        };

        mockItem1 = { id: 0, userId: '1E06', firstName: 'John', lastName: 'Z', position: 'SALES_REP', order: 10 };
        mockItem2 = { id: 1, userId: '2B02', firstName: 'Jane', lastName: 'Doe', position: 'FINANCE_MANAGER', order: 10 };
        mockGroup1 = {
          collapsed: false, count: 2, groupingKey: '10', groups: null, level: 0, selectChecked: false,
          rows: [mockItem1, mockItem2],
          title: `Order: 20 <span style="color:green">(2 items)</span>`,
          totals: { value: '10', __group: true, __groupTotals: true, group: {}, initialized: true, sum: { order: 20 } },
        };
        mockGroup2 = {
          collapsed: false, count: 2, groupingKey: '10:|:Z', groups: null, level: 1, selectChecked: false,
          rows: [mockItem1, mockItem2],
          title: `Last Name: Z <span style="color:green">(1 items)</span>`,
          totals: { value: '10', __group: true, __groupTotals: true, group: {}, initialized: true, sum: { order: 10 } },
        };
        mockGroup3 = {
          collapsed: false, count: 2, groupingKey: '10:|:Doe', groups: null, level: 1, selectChecked: false,
          rows: [mockItem1, mockItem2],
          title: `Last Name: Doe <span style="color:green">(1 items)</span>`,
          totals: { value: '10', __group: true, __groupTotals: true, group: {}, initialized: true, sum: { order: 10 } },
        };
        mockGroup4 = {
          collapsed: true, count: 0, groupingKey: '10:|:', groups: null, level: 1, selectChecked: false,
          rows: [],
          title: `Last Name: null <span style="color:green">(0 items)</span>`,
          totals: { value: '0', __group: true, __groupTotals: true, group: {}, initialized: true, sum: { order: 10 } },
        };

        jest.spyOn(gridStub, 'getColumns').mockReturnValue(mockColumns);
        mockCollection = [
          mockGroup1, mockGroup2, mockItem1, mockGroup3, mockItem2, mockGroup4,
          { __groupTotals: true, initialized: true, sum: { order: 20 }, group: mockGroup1 },
          { __groupTotals: true, initialized: true, sum: { order: 10 }, group: mockGroup2 },
        ];
        jest.spyOn(dataViewStub, 'getLength').mockReturnValue(mockCollection.length);
        jest.spyOn(dataViewStub, 'getItem')
          .mockReturnValue(null)
          .mockReturnValueOnce(mockCollection[0])
          .mockReturnValueOnce(mockCollection[1])
          .mockReturnValueOnce(mockCollection[2])
          .mockReturnValueOnce(mockCollection[3])
          .mockReturnValueOnce(mockCollection[4])
          .mockReturnValueOnce(mockCollection[5])
          .mockReturnValueOnce(mockCollection[6])
          .mockReturnValueOnce(mockCollection[7]);
        jest.spyOn(dataViewStub, 'getGrouping').mockReturnValue([mockOrderGrouping]);
      });

      it(`should have a xlsx export with grouping (same as the grid, WYSIWYG) when "enableGrouping" is set in the grid options and grouping are defined`, async () => {
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'Grouped By', },
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'First Name', },
              { metadata: { style: 1, }, value: 'Last Name', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['▿ Order: 20 (2 items)'],
            ['▿      Last Name: Z (1 items)'], // expanded
            ['', '1E06', 'John', 'Z', 'Sales Rep.', '10'],
            ['▿      Last Name: Doe (1 items)'], // expanded
            ['', '2B02', 'Jane', 'DOE', 'Finance Manager', '10'],
            ['▹      Last Name: null (0 items)'], // collapsed
            ['', '', '', '', '', '20'],
            ['', '', '', '', '', '10'],
          ]
        });
      });

      it(`should have a xlsx export with grouping but without indentation when "addGroupIndentation" is set to False
      and field should be exported as metadata when "exportWithFormatter" is false and the field type is number`, async () => {
        mockColumns[5].exportWithFormatter = false; // "order" field that is of type number will be exported as a number cell format metadata
        mockGridOptions.excelExportOptions.addGroupIndentation = false;
        const spyOnAfter = jest.spyOn(service.onGridAfterExportToExcel, 'next');
        const spyUrlCreate = jest.spyOn(URL, 'createObjectURL');
        const spyDownload = jest.spyOn(service, 'startDownloadFile');

        const optionExpectation = { filename: 'export.xlsx', format: 'xlsx' };

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);

        expect(spyOnAfter).toHaveBeenCalledWith(optionExpectation);
        expect(spyUrlCreate).toHaveBeenCalledWith(mockExcelBlob);
        expect(spyDownload).toHaveBeenCalledWith({
          ...optionExpectation, blob: new Blob(), data: [
            [
              { metadata: { style: 1, }, value: 'Grouped By', },
              { metadata: { style: 1, }, value: 'User Id', },
              { metadata: { style: 1, }, value: 'First Name', },
              { metadata: { style: 1, }, value: 'Last Name', },
              { metadata: { style: 1, }, value: 'Position', },
              { metadata: { style: 1, }, value: 'Order', },
            ],
            ['Order: 20 (2 items)'],
            ['Last Name: Z (1 items)'],
            ['', '1E06', 'John', 'Z', 'Sales Rep.', { metadata: { style: 3 }, value: '10', }],
            ['Last Name: Doe (1 items)'],
            ['', '2B02', 'Jane', 'DOE', 'Finance Manager', { metadata: { style: 3 }, value: '10', }],
            ['Last Name: null (0 items)'],
            ['', '', '', '', '', '20'],
            ['', '', '', '', '', '10'],
          ]
        });
      });
    });

    describe('useCellFormatByFieldType method', () => {
      it('should return a date time format when using FieldType.dateTime and a Date object as input', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '2012-02-28 15:07:59';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTime);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeIso', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '2012-02-28 15:07:59';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeIso);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeShortIso', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '2012-02-28 15:07';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeShortIso);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeIsoAmPm', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '2012-02-28 03:07:59 pm';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeIsoAmPm);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeIsoAM_PM', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '2012-02-28 03:07:59 PM';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeIsoAM_PM);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateEuro', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '28/02/2012';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateEuro);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateEuroShort', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '28/2/12';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateEuroShort);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeEuro', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '28/02/2012 15:07:59';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeEuro);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeShortEuro', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '28/02/2012 15:07';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeShortEuro);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeEuroAmPm', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '28/02/2012 03:07:59 pm';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeEuroAmPm);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeEuroAM_PM', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '28/02/2012 03:07:59 PM';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeEuroAM_PM);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeEuroShort', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '28/2/12 15:7:59';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeEuroShort);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeEuroShortAmPm', async () => {
        const input = '2012-02-28 15:07:59';
        const expectedDate = '28/2/12 3:7:59 pm';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeEuroShortAmPm);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateUs', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '02/28/2012';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateUs);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateUsShort', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '2/28/12';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateUsShort);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeUs', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '02/28/2012 15:07:59';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeUs);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeShortUs', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '02/28/2012 15:07';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeShortUs);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeUsAmPm', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '02/28/2012 03:07:59 pm';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeUsAmPm);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeUsAM_PM', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '02/28/2012 03:07:59 PM';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeUsAM_PM);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeUsShort', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '2/28/12 15:7:59';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeUsShort);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.dateTimeUsShortAmPm', async () => {
        const input = new Date('2012-02-28 15:07:59');
        const expectedDate = '2/28/12 3:7:59 pm';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateTimeUsShortAmPm);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      xit('should return a date time format when using FieldType.dateUtc', async () => {
        const input = moment('2013-05-23T17:55:00.325').utcOffset(420); // timezone that is +7 UTC hours
        const expectedDate = '2013-05-24T04:55:00.325+07:00';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.dateUtc);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });

      it('should return a date time format when using FieldType.date', async () => {
        const input = new Date('2012-02-28T23:01:52.103Z');
        const expectedDate = '2012-02-28';

        service.init(gridStub, dataViewStub);
        await service.exportToExcel(mockExportExcelOptions);
        const output = service.useCellFormatByFieldType(input, FieldType.date);

        expect(output).toEqual({ metadata: { style: 5 }, value: expectedDate });
      });
    });
  });

  describe('without ngx-translate', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ExcelExportService],
        imports: []
      });
      service = TestBed.get(ExcelExportService);
    });

    it('should throw an error if "enableTranslate" is set but the Translate Service is null', () => {
      const gridOptionsMock = { enableTranslate: true, enableGridMenu: true, gridMenu: { hideForceFitButton: false, hideSyncResizeButton: true, columnTitleKey: 'TITLE' } } as GridOption;
      jest.spyOn(gridStub, 'getOptions').mockReturnValue(gridOptionsMock);

      expect(() => service.init(gridStub, dataViewStub)).toThrowError('[Angular-Slickgrid] requires "ngx-translate" to be installed and configured');
    });
  });
});

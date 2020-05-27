import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Column, GridOption } from '../../models';
import { RowMoveManagerExtension } from '../rowMoveManagerExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';

declare const Slick: any;

const gridStub = {
  getOptions: jest.fn(),
  getSelectionModel: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectionModel: jest.fn(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn(),
  getColumnDefinition: jest.fn(),
  onBeforeMoveRows: new Slick.Event(),
  onMoveRows: new Slick.Event(),
}));

const mockSelectionModel = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/plugins/slick.rowmovemanager', () => mockAddon);
Slick.RowMoveManager = mockAddon;

jest.mock('slickgrid/plugins/slick.rowselectionmodel', () => mockSelectionModel);
Slick.RowSelectionModel = mockSelectionModel;

describe('rowMoveManagerExtension', () => {
  let translate: TranslateService;
  let extension: RowMoveManagerExtension;
  const gridOptionsMock = {
    enableRowMoveManager: true,
    rowMoveManager: {
      cancelEditOnDrag: true,
      singleRowMove: true,
      disableRowSelection: true,
      onExtensionRegistered: jest.fn(),
      onBeforeMoveRows: (e, args: { insertBefore: number; rows: number[]; }) => { },
      onMoveRows: (e, args: { insertBefore: number; rows: number[]; }) => { },
    },
  } as GridOption;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RowMoveManagerExtension, ExtensionUtility, SharedService],
      imports: [TranslateModule.forRoot()]
    });
    extension = TestBed.get(RowMoveManagerExtension);
    translate = TestBed.get(TranslateService);
  });

  it('should return null after calling "create" method when either the column definitions or the grid options is missing', () => {
    const output = extension.create([] as Column[], null);
    expect(output).toBeNull();
  });

  it('should return null after calling "loadAddonWhenNotExists" method when either the column definitions or the grid options is missing', () => {
    const output = extension.loadAddonWhenNotExists([] as Column[], null);
    expect(output).toBeNull();
  });

  it('should return null after calling "register" method when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('create method', () => {
    let columnsMock: Column[];

    beforeEach(() => {
      columnsMock = [
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 50 }
      ];
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should add a reserved column for icons in 1st column index', () => {
      const instance = extension.loadAddonWhenNotExists(columnsMock, gridOptionsMock);
      const spy = jest.spyOn(instance, 'getColumnDefinition').mockReturnValue({ id: '_move', field: 'move' });
      extension.create(columnsMock, gridOptionsMock);

      expect(spy).toHaveBeenCalled();
      expect(columnsMock).toEqual([
        {
          excludeFromColumnPicker: true,
          excludeFromExport: true,
          excludeFromGridMenu: true,
          excludeFromHeaderMenu: true,
          excludeFromQuery: true,
          field: 'move',
          id: '_move'
        },
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 50 },
      ]);
    });

    it('should NOT add the move icon column if it already exist in the column definitions', () => {
      columnsMock = [{
        id: '_move', name: '', field: 'move', width: 40,
        behavior: 'selectAndMove', selectable: false, resizable: false, cssClass: '',
        formatter: (row, cell, value, columnDef, dataContext, grid) => ({ addClasses: 'cell-reorder dnd' })
      }, ...columnsMock] as Column[];
      const instance = extension.loadAddonWhenNotExists(columnsMock, gridOptionsMock);
      const spy = jest.spyOn(instance, 'getColumnDefinition').mockReturnValue({ id: '_move', field: 'move' });
      extension.create(columnsMock, gridOptionsMock);

      expect(spy).toHaveBeenCalled();
      expect(columnsMock).toEqual([
        {
          behavior: 'selectAndMove',
          cssClass: '',
          field: 'move',
          formatter: expect.anything(),
          id: '_move',
          name: '',
          resizable: false,
          selectable: false,
          width: 40,
          excludeFromColumnPicker: true,
          excludeFromExport: true,
          excludeFromGridMenu: true,
          excludeFromHeaderMenu: true,
          excludeFromQuery: true,
        },
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 50 },
      ]);
    });

    it('should expect the column to be at a different column index position when "columnIndexPosition" is defined', () => {
      gridOptionsMock.rowMoveManager.columnIndexPosition = 2;
      const instance = extension.loadAddonWhenNotExists(columnsMock, gridOptionsMock);
      const spy = jest.spyOn(instance, 'getColumnDefinition').mockReturnValue({ id: '_move', field: 'move' });
      extension.create(columnsMock, gridOptionsMock);

      expect(spy).toHaveBeenCalled();
      expect(columnsMock).toEqual([
        { id: 'field1', field: 'field1', width: 100, cssClass: 'red' },
        { id: 'field2', field: 'field2', width: 50 },
        {
          excludeFromColumnPicker: true,
          excludeFromExport: true,
          excludeFromGridMenu: true,
          excludeFromHeaderMenu: true,
          excludeFromQuery: true,
          field: 'move',
          id: '_move'
        },
      ]);
    });
  });

  describe('registered addon', () => {
    let columnsMock: Column[];

    beforeEach(() => {
      columnsMock = [{ id: 'field1', field: 'field1', width: 100, cssClass: 'red' }];
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
      jest.clearAllMocks();
    });
    it('should register the addon', () => {
      const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.rowMoveManager, 'onExtensionRegistered');
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');

      const instance = extension.loadAddonWhenNotExists(columnsMock, gridOptionsMock);
      extension.create(columnsMock, gridOptionsMock);
      extension.register();
      const addonInstance = extension.getAddonInstance();

      expect(instance).toBeTruthy();
      expect(instance).toEqual(addonInstance);
      expect(mockAddon).toHaveBeenCalledWith({
        cancelEditOnDrag: true,
        disableRowSelection: true,
        singleRowMove: true,
        columnIndexPosition: 2,
        onExtensionRegistered: expect.anything(),
        onBeforeMoveRows: expect.anything(),
        onMoveRows: expect.anything(),
      });
      expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should dispose of the addon', () => {
      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should provide addon options and expect them to be called in the addon constructor', () => {
      const optionMock = { cancelEditOnDrag: true, singleRowMove: true, disableRowSelection: true };
      const addonOptions = { ...gridOptionsMock, rowMoveManager: optionMock };
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(addonOptions);

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();

      expect(mockAddon).toHaveBeenCalledWith(gridOptionsMock.rowMoveManager);
    });

    it('should call internal event handler subscribe and expect the "onBeforeMoveRows" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.rowMoveManager, 'onBeforeMoveRows');
      const onMoveSpy = jest.spyOn(SharedService.prototype.gridOptions.rowMoveManager, 'onMoveRows');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onBeforeMoveRows.notify({ insertBefore: 3, rows: [1] }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(2);
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onBeforeSpy).toHaveBeenCalledWith(expect.anything(), { insertBefore: 3, rows: [1] });
      expect(onMoveSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onMoveRows" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.rowMoveManager, 'onBeforeMoveRows');
      const onMoveSpy = jest.spyOn(SharedService.prototype.gridOptions.rowMoveManager, 'onMoveRows');

      const instance = extension.create(columnsMock, gridOptionsMock);
      extension.register();
      instance.onMoveRows.notify({ insertBefore: 3, rows: [1] }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(2);
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onMoveSpy).toHaveBeenCalledWith(expect.anything(), { insertBefore: 3, rows: [1] });
      expect(onBeforeSpy).not.toHaveBeenCalled();
    });
  });
});

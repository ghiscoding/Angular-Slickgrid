import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridOption } from '../../models/gridOption.interface';
import { RowMoveManagerExtension } from '../rowMoveManagerExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';

declare var Slick: any;

const gridStub = {
  getOptions: jest.fn(),
  getSelectionModel: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectionModel: jest.fn(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn(),
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

  it('should return null when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('registered addon', () => {
    beforeEach(() => {
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should register the addon', () => {
      const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.rowMoveManager, 'onExtensionRegistered');
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');

      const instance = extension.register();
      const addonInstance = extension.getAddonInstance();

      expect(instance).toBeTruthy();
      expect(instance).toEqual(addonInstance);
      expect(mockAddon).toHaveBeenCalledWith({
        onExtensionRegistered: expect.anything(),
        onBeforeMoveRows: expect.anything(),
        onMoveRows: expect.anything(),
      });
      expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should dispose of the addon', () => {
      const instance = extension.register();
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should provide addon options and expect them to be called in the addon constructor', () => {
      const optionMock = { cancelEditOnDrag: true };
      const addonOptions = { ...gridOptionsMock, rowMoveManager: optionMock };
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(addonOptions);

      extension.register();

      expect(mockAddon).toHaveBeenCalledWith(optionMock);
    });

    it('should call internal event handler subscribe and expect the "onBeforeMoveRows" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onBeforeSpy = jest.spyOn(SharedService.prototype.gridOptions.rowMoveManager, 'onBeforeMoveRows');
      const onMoveSpy = jest.spyOn(SharedService.prototype.gridOptions.rowMoveManager, 'onMoveRows');

      const instance = extension.register();
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

      const instance = extension.register();
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

import { I18N } from 'aurelia-i18n';
import { GridOption } from '../../models/gridOption.interface';
import { CellExternalCopyManagerExtension } from '../cellExternalCopyManagerExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { SelectedRange } from '../../models';

declare var Slick: any;

const gridStub = {
  getOptions: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectionModel: jest.fn(),
};

const addonStub = {
  init: jest.fn(),
  destroy: jest.fn(),
  onCopyCells: new Slick.Event(),
  onCopyCancelled: new Slick.Event(),
  onPasteCells: new Slick.Event(),
};
const mockAddon = jest.fn().mockImplementation(() => addonStub);
const mockSelectionModel = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/plugins/slick.cellexternalcopymanager', () => mockAddon);
Slick.CellExternalCopyManager = mockAddon;

jest.mock('slickgrid/plugins/slick.cellselectionmodel', () => mockSelectionModel);
Slick.CellSelectionModel = mockSelectionModel;

describe('cellExternalCopyManagerExtension', () => {
  const mockEventCallback = (e, args: { ranges: SelectedRange[] }) => { };
  const mockSelectRange = [{ fromCell: 1, fromRow: 1, toCell: 1, toRow: 1 }] as SelectedRange[];
  const mockSelectRangeEvent = { ranges: mockSelectRange };

  let extension: CellExternalCopyManagerExtension;
  let extensionUtility: ExtensionUtility;
  let sharedService: SharedService;
  const gridOptionsMock = {
    enableCheckboxSelector: true,
    excelCopyBufferOptions: {
      onExtensionRegistered: jest.fn(),
      onCopyCells: mockEventCallback,
      onCopyCancelled: mockEventCallback,
      onPasteCells: mockEventCallback,
    }
  } as GridOption;

  beforeEach(() => {
    extensionUtility = new ExtensionUtility({} as I18N, sharedService);
    sharedService = new SharedService();
    extension = new CellExternalCopyManagerExtension(extensionUtility, sharedService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    it('should register the addon', () => {
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');
      const optionSpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onExtensionRegistered');

      const instance = extension.register();

      expect(optionSpy).toHaveBeenCalledWith(instance);
      expect(pluginSpy).toHaveBeenCalledWith(instance);
      expect(mockSelectionModel).toHaveBeenCalled();
      expect(mockAddon).toHaveBeenCalledWith({
        clipboardCommandHandler: expect.anything(),
        dataItemColumnValueExtractor: expect.anything(),
        newRowCreator: expect.anything(),
        includeHeaderWhenCopying: false,
        readOnlyMode: false,
        onCopyCancelled: expect.anything(),
        onCopyCells: expect.anything(),
        onExtensionRegistered: expect.anything(),
        onPasteCells: expect.anything(),
      });
    });

    it('should call internal event handler subscribe and expect the "onCopyCells" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onCopySpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onCopyCells');
      const onCancelSpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onCopyCancelled');
      const onPasteSpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onPasteCells');

      const instance = extension.register();
      instance.onCopyCells.notify(mockSelectRangeEvent, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(3);
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onCopySpy).toHaveBeenCalledWith(expect.anything(), mockSelectRangeEvent);
      expect(onCancelSpy).not.toHaveBeenCalled();
      expect(onPasteSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onCopyCancelled" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onCopySpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onCopyCells');
      const onCancelSpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onCopyCancelled');
      const onPasteSpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onPasteCells');

      const instance = extension.register();
      instance.onCopyCancelled.notify(mockSelectRangeEvent, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(3);
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onCopySpy).not.toHaveBeenCalled();
      expect(onCancelSpy).toHaveBeenCalledWith(expect.anything(), mockSelectRangeEvent);
      expect(onPasteSpy).not.toHaveBeenCalled();
    });

    it('should call internal event handler subscribe and expect the "onPasteCells" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onCopySpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onCopyCells');
      const onCancelSpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onCopyCancelled');
      const onPasteSpy = jest.spyOn(SharedService.prototype.gridOptions.excelCopyBufferOptions, 'onPasteCells');

      const instance = extension.register();
      instance.onPasteCells.notify(mockSelectRangeEvent, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledTimes(3);
      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onCopySpy).not.toHaveBeenCalled();
      expect(onCancelSpy).not.toHaveBeenCalled();
      expect(onPasteSpy).toHaveBeenCalledWith(expect.anything(), mockSelectRangeEvent);
    });

    it('should dispose of the addon', () => {
      const instance = extension.register();
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });
  });
});

import { I18N } from 'aurelia-i18n';
import { GridOption } from '../../models/gridOption.interface';
import { RowSelectionExtension } from '../rowSelectionExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';

declare var Slick: any;

const gridStub = {
  getOptions: jest.fn(),
  registerPlugin: jest.fn(),
  setSelectionModel: jest.fn(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  constructor: jest.fn(),
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/plugins/slick.rowselectionmodel', () => mockAddon);
Slick.RowSelectionModel = mockAddon;

describe('rowSelectionExtension', () => {
  let extension: RowSelectionExtension;
  let extensionUtility: ExtensionUtility;
  let sharedService: SharedService;
  const gridOptionsMock = { enableRowSelection: true } as GridOption;

  beforeEach(() => {
    extensionUtility = new ExtensionUtility({} as I18N, sharedService);
    sharedService = new SharedService();
    extension = new RowSelectionExtension(extensionUtility, sharedService);
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
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'setSelectionModel');

      const instance = extension.register();

      expect(mockAddon).toHaveBeenCalledWith({});
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should dispose of the addon', () => {
      const instance = extension.register();
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should provide addon options and expect them to be called in the addon constructor', () => {
      const optionMock = { selectActiveRow: true };
      const addonOptions = { ...gridOptionsMock, rowSelectionOptions: optionMock };
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(addonOptions);

      extension.register();

      expect(mockAddon).toHaveBeenCalledWith(optionMock);
    });
  });
});

import { I18N } from 'aurelia-i18n';
import { GridOption } from '../../models/gridOption.interface';
import { AutoTooltipExtension } from '../autoTooltipExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';

declare var Slick: any;

const gridStub = {
  getOptions: jest.fn(),
  registerPlugin: jest.fn(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn()
}));

jest.mock('slickgrid/plugins/slick.autotooltips', () => mockAddon);
Slick.AutoTooltips = mockAddon;

describe('autoTooltipExtension', () => {
  let extension: AutoTooltipExtension;
  let extensionUtility: ExtensionUtility;
  let sharedService: SharedService;
  const gridOptionsMock = { enableAutoTooltip: true } as GridOption;

  beforeEach(() => {
    extensionUtility = new ExtensionUtility({} as I18N, sharedService);
    sharedService = new SharedService();
    extension = new AutoTooltipExtension(extensionUtility, sharedService);
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
      const optionMock = { enableForCells: true, enableForHeaderCells: false, maxToolTipLength: 12 };
      const addonOptions = { ...gridOptionsMock, autoTooltipOptions: optionMock };
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(addonOptions);

      extension.register();

      expect(mockAddon).toHaveBeenCalledWith(optionMock);
    });
  });
});

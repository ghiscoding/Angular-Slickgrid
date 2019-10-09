import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
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
  let translate: TranslateService;
  let extension: AutoTooltipExtension;
  const gridOptionsMock = { enableAutoTooltip: true } as GridOption;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoTooltipExtension, ExtensionUtility, SharedService],
      imports: [TranslateModule.forRoot()]
    });
    extension = TestBed.get(AutoTooltipExtension);
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

    it('should register the addon', () => {
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');

      const instance = extension.register();
      const addonInstance = extension.getAddonInstance();

      expect(instance).toBeTruthy();
      expect(instance).toEqual(addonInstance);
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

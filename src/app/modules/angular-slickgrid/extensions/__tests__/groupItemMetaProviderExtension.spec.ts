import { GroupItemMetaProviderExtension } from '../groupItemMetaProviderExtension';
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

jest.mock('slickgrid/slick.groupitemmetadataprovider', () => mockAddon);
Slick.Data.GroupItemMetadataProvider = mockAddon;

describe('groupItemMetaProviderExtension', () => {
  let extension: GroupItemMetaProviderExtension;
  let sharedService: SharedService;

  beforeEach(() => {
    sharedService = new SharedService();
    sharedService.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
    extension = new GroupItemMetaProviderExtension(sharedService);
  });

  it('should return null when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('registered addon', () => {
    beforeEach(() => {
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
    });

    it('should register the addon', () => {
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');

      const instance = extension.register();
      const addonInstance = extension.getAddonInstance();

      expect(instance).toBeTruthy();
      expect(instance).toEqual(addonInstance);
      expect(sharedService.groupItemMetadataProvider).toEqual(instance);
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should register the addon with empty object when "groupItemMetadataProvider" is null', () => {
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');
      sharedService.groupItemMetadataProvider = undefined;

      const instance = extension.register();

      expect(pluginSpy).toHaveBeenCalledWith({});
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should dispose of the addon', () => {
      const instance = extension.register();
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { GridOption } from '../../models/gridOption.interface';
import { DraggableGroupingExtension } from '../draggableGroupingExtension';
import { ExtensionUtility } from '../extensionUtility';
import { SharedService } from '../../services/shared.service';
import { Grouping } from '../../models';

declare var Slick: any;

const gridStub = {
  getOptions: jest.fn(),
  registerPlugin: jest.fn(),
};

const mockAddon = jest.fn().mockImplementation(() => ({
  init: jest.fn(),
  destroy: jest.fn(),
  onGroupChanged: new Slick.Event(),
}));

jest.mock('slickgrid/plugins/slick.draggablegrouping', () => mockAddon);
Slick.DraggableGrouping = mockAddon;

describe('draggableGroupingExtension', () => {
  let translate: TranslateService;
  let extension: DraggableGroupingExtension;
  const gridOptionsMock = {
    enableDraggableGrouping: true,
    draggableGrouping: {
      deleteIconCssClass: 'class',
      dropPlaceHolderText: 'test',
      groupIconCssClass: 'group-class',
      onExtensionRegistered: jest.fn(),
      onGroupChanged: (e: Event, args: { caller?: string; groupColumns: Grouping[] }) => { },
    }
  } as GridOption;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DraggableGroupingExtension, ExtensionUtility, SharedService],
      imports: [TranslateModule.forRoot()]
    });
    extension = TestBed.get(DraggableGroupingExtension);
    translate = TestBed.get(TranslateService);
  });

  it('should return null after calling "create" method when the grid options is missing', () => {
    const output = extension.create(null);
    expect(output).toBeNull();
  });

  it('should return null after calling "register" method when either the grid object or the grid options is missing', () => {
    const output = extension.register();
    expect(output).toBeNull();
  });

  describe('registered addon', () => {
    beforeEach(() => {
      jest.spyOn(SharedService.prototype, 'grid', 'get').mockReturnValue(gridStub);
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(gridOptionsMock);
    });

    it('should register the addon', () => {
      const onRegisteredSpy = jest.spyOn(SharedService.prototype.gridOptions.draggableGrouping, 'onExtensionRegistered');
      const pluginSpy = jest.spyOn(SharedService.prototype.grid, 'registerPlugin');

      const instance = extension.create(gridOptionsMock);
      const addon = extension.register();
      const addonInstance = extension.getAddonInstance();

      expect(instance).toBeTruthy();
      expect(instance).toEqual(addonInstance);
      expect(addon).not.toBeNull();
      expect(mockAddon).toHaveBeenCalledWith({
        deleteIconCssClass: 'class',
        dropPlaceHolderText: 'test',
        groupIconCssClass: 'group-class',
        onExtensionRegistered: expect.anything(),
        onGroupChanged: expect.anything(),
      });
      expect(onRegisteredSpy).toHaveBeenCalledWith(instance);
      expect(pluginSpy).toHaveBeenCalledWith(instance);
    });

    it('should dispose of the addon', () => {
      const instance = extension.create(gridOptionsMock);
      const destroySpy = jest.spyOn(instance, 'destroy');

      extension.dispose();

      expect(destroySpy).toHaveBeenCalled();
    });

    it('should provide addon options and expect them to be called in the addon constructor', () => {
      const optionMock = {
        deleteIconCssClass: 'different-class',
        dropPlaceHolderText: 'different-test',
        groupIconCssClass: 'different-group-class',
      };
      const addonOptions = { ...gridOptionsMock, draggableGrouping: optionMock };
      jest.spyOn(SharedService.prototype, 'gridOptions', 'get').mockReturnValue(addonOptions);

      extension.create(addonOptions);
      extension.register();

      expect(mockAddon).toHaveBeenCalledWith(optionMock);
    });

    it('should call internal event handler subscribe and expect the "onGroupChanged" option to be called when addon notify is called', () => {
      const handlerSpy = jest.spyOn(extension.eventHandler, 'subscribe');
      const onColumnSpy = jest.spyOn(SharedService.prototype.gridOptions.draggableGrouping, 'onGroupChanged');

      const instance = extension.create(gridOptionsMock);
      extension.register();
      instance.onGroupChanged.notify({ caller: 'clear-all', groupColumns: [] }, new Slick.EventData(), gridStub);

      expect(handlerSpy).toHaveBeenCalledWith(
        { notify: expect.anything(), subscribe: expect.anything(), unsubscribe: expect.anything(), },
        expect.anything()
      );
      expect(onColumnSpy).toHaveBeenCalledWith(expect.anything(), { caller: 'clear-all', groupColumns: [] });
    });
  });
});

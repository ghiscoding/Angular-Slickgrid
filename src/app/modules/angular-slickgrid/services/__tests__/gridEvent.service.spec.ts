import { GridEventService } from '../gridEvent.service';
import { Column } from '../../models';

declare var Slick: any;

const dataViewStub = {
  refresh: jest.fn(),
  sort: jest.fn(),
  reSort: jest.fn(),
};

const gridStub = {
  getColumnIndex: jest.fn(),
  getColumns: jest.fn(),
  getDataItem: jest.fn(),
  getOptions: jest.fn(),
  setActiveCell: jest.fn(),
  setColumns: jest.fn(),
  setSortColumns: jest.fn(),
  onCellChange: new Slick.Event(),
  onClick: new Slick.Event(),
};

describe('GridEventService', () => {
  let service: GridEventService;

  beforeEach(() => {
    service = new GridEventService();
  });

  afterEach(() => {
    service.dispose();
    jest.clearAllMocks();
  });

  describe('bindOnCellChange method', () => {
    let mockColumn;
    let mockRowData;

    beforeEach(() => {
      mockColumn = { id: 'firstName', field: 'firstName', onCellChange: jest.fn() } as Column;
      mockRowData = { firstName: 'John', lastName: 'Doe' };
    });

    it('should not do anything when no arguments are provided to the event', () => {
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);

      service.bindOnCellChange(gridStub, dataViewStub);
      gridStub.onCellChange.notify(undefined, new Slick.EventData(), gridStub);

      expect(spyGetCols).not.toHaveBeenCalled();
    });

    it('should not do anything when "cell" property is missing', () => {
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);

      service.bindOnCellChange(gridStub, dataViewStub);
      gridStub.onCellChange.notify({ cell: undefined, row: undefined }, new Slick.EventData(), gridStub);

      expect(spyGetCols).not.toHaveBeenCalled();
    });

    it('should execute the column "onCellChange" callback method', () => {
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);
      const spyGetData = jest.spyOn(gridStub, 'getDataItem').mockReturnValue(mockRowData);
      const spyOnChange = jest.spyOn(mockColumn, 'onCellChange');

      service.bindOnCellChange(gridStub, dataViewStub);
      gridStub.onCellChange.notify({ cell: 0, row: 0 }, new Slick.EventData(), gridStub);

      expect(spyGetCols).toHaveBeenCalled();
      expect(spyGetData).toHaveBeenCalled();
      expect(spyOnChange).toHaveBeenCalledWith(expect.anything(), {
        row: 0,
        cell: 0,
        dataView: dataViewStub,
        grid: gridStub,
        columnDef: mockColumn,
        dataContext: mockRowData
      });
    });
  });

  describe('bindOnClick method', () => {
    let mockColumn;
    let mockRowData;

    beforeEach(() => {
      mockColumn = { id: 'firstName', field: 'firstName', onCellClick: jest.fn() } as Column;
      mockRowData = { firstName: 'John', lastName: 'Doe' };
    });

    it('should not do anything when no arguments are provided to the event', () => {
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);

      service.bindOnClick(gridStub, dataViewStub);
      gridStub.onClick.notify(undefined, new Slick.EventData(), gridStub);

      expect(spyGetCols).not.toHaveBeenCalled();
    });

    it('should not do anything when "cell" property is missing', () => {
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);

      service.bindOnClick(gridStub, dataViewStub);
      gridStub.onClick.notify({ cell: undefined, row: undefined }, new Slick.EventData(), gridStub);

      expect(spyGetCols).not.toHaveBeenCalled();
    });

    it('should execute the column "onCellClick" callback method', () => {
      gridStub.getOptions = undefined;
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);
      const spyGetData = jest.spyOn(gridStub, 'getDataItem').mockReturnValue(mockRowData);
      const spyOnChange = jest.spyOn(mockColumn, 'onCellClick');

      service.bindOnClick(gridStub, dataViewStub);
      gridStub.onClick.notify({ cell: 0, row: 0 }, new Slick.EventData(), gridStub);

      expect(spyGetCols).toHaveBeenCalled();
      expect(spyGetData).toHaveBeenCalled();
      expect(spyOnChange).toHaveBeenCalledWith(expect.anything(), {
        row: 0,
        cell: 0,
        dataView: dataViewStub,
        grid: gridStub,
        columnDef: mockColumn,
        dataContext: mockRowData
      });
    });

    it('should execute the column "onCellClick" callback method and "setActiveCell" cell navigation is enabled but column is not editable', () => {
      gridStub.getOptions = jest.fn();
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableCellNavigation: true, editable: false });
      const spyActive = jest.spyOn(gridStub, 'setActiveCell');
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);
      const spyGetData = jest.spyOn(gridStub, 'getDataItem').mockReturnValue(mockRowData);
      const spyOnChange = jest.spyOn(mockColumn, 'onCellClick');

      service.bindOnClick(gridStub, dataViewStub);
      gridStub.onClick.notify({ cell: 0, row: 0 }, new Slick.EventData(), gridStub);

      expect(spyActive).toHaveBeenCalled();
      expect(spyGetCols).toHaveBeenCalled();
      expect(spyGetData).toHaveBeenCalled();
      expect(spyOnChange).toHaveBeenCalledWith(expect.anything(), {
        row: 0,
        cell: 0,
        dataView: dataViewStub,
        grid: gridStub,
        columnDef: mockColumn,
        dataContext: mockRowData
      });
    });

    it('should execute the column "onCellClick" callback method and "setActiveCell" when cell is editable and autoCommitEdit', () => {
      gridStub.getOptions = jest.fn();
      jest.spyOn(gridStub, 'getOptions').mockReturnValue({ enableCellNavigation: true, editable: true, autoCommitEdit: true });
      const spyActive = jest.spyOn(gridStub, 'setActiveCell');
      const spyGetCols = jest.spyOn(gridStub, 'getColumns').mockReturnValue([mockColumn]);
      const spyGetData = jest.spyOn(gridStub, 'getDataItem').mockReturnValue(mockRowData);
      const spyOnChange = jest.spyOn(mockColumn, 'onCellClick');

      service.bindOnClick(gridStub, dataViewStub);
      gridStub.onClick.notify({ cell: 0, row: 0 }, new Slick.EventData(), gridStub);

      expect(spyActive).toHaveBeenCalled();
      expect(spyGetCols).toHaveBeenCalled();
      expect(spyGetData).toHaveBeenCalled();
      expect(spyOnChange).toHaveBeenCalledWith(expect.anything(), {
        row: 0,
        cell: 0,
        dataView: dataViewStub,
        grid: gridStub,
        columnDef: mockColumn,
        dataContext: mockRowData
      });
    });
  });

  describe('dispose method', () => {
    it('should unsubscribe all event from the event handler', () => {
      const eventHandler = service.eventHandler;
      const spy = jest.spyOn(eventHandler, 'unsubscribeAll');

      service.dispose();

      expect(spy).toHaveBeenCalled();
    });
  });
});

import * as entry from './index';

describe('Testing library entry point', () => {
  it('should have an index entry point defined', () => {
    expect(entry).toBeTruthy();
  });

  it('should have all exported object defined', () => {
    expect(typeof entry.AngularSlickgridComponent).toBe('function');
    expect(typeof entry.AngularSlickgridModule).toBe('function');
    expect(typeof entry.SlickgridConfig).toBe('function');
    expect(typeof entry.SlickPaginationComponent).toBe('function');
    expect(typeof entry.RowDetailViewExtension).toBe('function');
    expect(typeof entry.AngularUtilService).toBe('function');
    expect(typeof entry.BsDropDownService).toBe('function');
    expect(typeof entry.unsubscribeAllObservables).toBe('function');
  });
});

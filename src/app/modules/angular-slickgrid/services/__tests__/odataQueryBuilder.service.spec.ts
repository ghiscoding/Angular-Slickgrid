import { CaseType } from '../../models/caseType';
import { OdataQueryBuilderService } from '../odataQueryBuilder.service';

describe('OdataQueryBuilderService', () => {
  let service: OdataQueryBuilderService;

  beforeEach(() => {
    service = new OdataQueryBuilderService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('buildQuery method', () => {
    beforeEach(() => {
      service.options = { filterQueue: [], orderBy: '' };
    });

    it('should throw an error when odata options are null', () => {
      service.options = undefined;
      expect(() => service.buildQuery()).toThrow();
    });

    it('should return a query with $top pagination', () => {
      const expectation = '$top=25';

      service.options = { top: 25 };
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with $top and $skip pagination', () => {
      const expectation = '$top=25&$skip=10';

      service.options = { top: 25, skip: 10 };
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with sorting when "orderBy" is provided as a string', () => {
      const expectation = '$top=10&$orderby=Gender asc';

      service.options = { top: 10, orderBy: 'Gender asc' };
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with sorting when "orderBy" is provided as an array', () => {
      const expectation = '$top=10&$orderby=Gender asc,Company desc';

      service.options = { top: 10, orderBy: ['Gender asc', 'Company desc'] };
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with sorting when "filter" is provided as a string', () => {
      const expectation = `$top=10&$filter=(FirstName eq 'John')`;

      service.options = { top: 10, filter: `FirstName eq 'John'` };
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with sorting when "filterBy" is provided as a string', () => {
      const expectation = `$top=10&$filter=(FirstName eq 'John')`;

      service.options = { top: 10, filterBy: `FirstName eq 'John'` };
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with sorting when "filterBy" is provided as an array', () => {
      const expectation = `$top=10&$filter=(FirstName eq 'John' and FirstName eq 'Jane')`;

      service.options = { top: 10, filter: [`FirstName eq 'John'`, `FirstName eq 'Jane'`] };
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should return a query with sorting when "filterBy" is provided as an array', () => {
      const expectation = `$top=10&$filter=(FirstName eq 'John' or FirstName eq 'Jane')`;

      service.options = { top: 10, filterBy: [`FirstName eq 'John'`, `FirstName eq 'Jane'`], filterBySeparator: 'or' };
      const query = service.buildQuery();
      const filterCount = service.getFilterCount();

      expect(query).toBe(expectation);
      expect(filterCount).toBe(2);
    });
  });

  describe('saveColumnFilter method', () => {
    it('should return "columnFilters" object with multiple properties as the filter names', () => {
      service.saveColumnFilter('FirstName', 'John', ['John']);

      const columnFilters = service.columnFilters;

      expect(columnFilters).toEqual({ FirstName: { search: ['John'], value: 'John' } });
    });

    it('should return "columnFilters" object with multiple properties as the filter names', () => {
      service.saveColumnFilter('FirstName', 'John', ['John']);
      service.saveColumnFilter('LastName', 'Doe', ['Doe']);

      const columnFilters = service.columnFilters;

      expect(columnFilters).toEqual({
        FirstName: { search: ['John'], value: 'John' },
        LastName: { search: ['Doe'], value: 'Doe' }
      });
    });
  });

  describe('removeColumnFilter method', () => {
    it('should return "columnFilters" object without the one deleted', () => {
      service.saveColumnFilter('FirstName', 'John', ['John']);
      service.saveColumnFilter('LastName', 'Doe', ['Doe']);

      service.removeColumnFilter('LastName');
      const columnFilters = service.columnFilters;

      expect(columnFilters).toEqual({
        FirstName: { search: ['John'], value: 'John' }
      });
    });
  });

  describe('updateOptions method', () => {
    beforeEach(() => {
      service.updateOptions({ caseType: CaseType.pascalCase });
    });

    it('should be able to provide "filterBy" array and expect see the query string include the filter', () => {
      const expectation = `$filter=(FirstName eq 'John')`;

      service.updateOptions({ filterBy: `FirstName eq 'John'` });
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should be able to provide "filterBy" array and expect see the query string include the filter', () => {
      const expectation = `$filter=(FirstName eq 'John' and substring(Gender 'male')`;

      service.updateOptions({ filterBy: [`FirstName eq 'John'`, `substring(Gender 'male'`] });
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should be able to provide "orderBy" array and expect see the query string include the filter', () => {
      const expectation = `$orderby=FirstName desc`;

      service.updateOptions({ orderBy: 'FirstName desc' });
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });

    it('should be able to provide "orderBy" array and expect see the query string include the filter', () => {
      const expectation = `$orderby=FirstName desc,LastName asc`;

      service.updateOptions({ orderBy: ['FirstName desc', 'LastName asc'] });
      const query = service.buildQuery();

      expect(query).toBe(expectation);
    });
  });
});

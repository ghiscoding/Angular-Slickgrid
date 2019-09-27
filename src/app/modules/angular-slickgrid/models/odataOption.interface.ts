import { BackendServiceOption } from './backendServiceOption.interface';
import { CaseType } from './caseType';

export interface OdataOption extends BackendServiceOption {
  /** What is the casing type to use? Typically that would be 1 of the following 2: camelCase or PascalCase */
  caseType?: CaseType;

  /** Add the total count $inlinecount (OData v2) or $count (OData v4) to the OData query */
  enableCount?: boolean;

  /** How many rows to pull? */
  top?: number;

  /** How many rows to skip on the pagination? */
  skip?: number;

  /** (alias to "filter") Filter string (or array of string) that must be a valid OData string */
  filter?: string | string[];

  /** Filter string (or array of string) that must be a valid OData string */
  filterBy?: any;

  /** What is separator between each filters? Typically "and", "or" */
  filterBySeparator?: 'and' | 'or';

  /** Filter queue */
  filterQueue?: any[];

  /** Sorting string (or array of string) that must be a valid OData string */
  orderBy?: string | string[];

  /** OData version number (the query string is different between versions) */
  version?: number;

  /** When accessed as an object */
  [key: string]: any;
}

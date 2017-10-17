import { CaseType } from './caseType';

export interface OdataOption {
    caseType?: CaseType;
    top?: number;
    skip?: number;
    filter?: string;
    filterBy?: any;
    filterBySeparator?: string;
    filterQueue?: any[];
    orderBy?: string;
    [key: string]: any;
}

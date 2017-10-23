import { BackendServiceOption } from './backendServiceOption.interface';
import { CaseType } from './caseType';

export interface OdataOption extends BackendServiceOption {
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

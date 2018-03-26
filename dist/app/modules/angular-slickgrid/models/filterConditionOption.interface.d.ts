import { FieldType } from './fieldType';
export interface FilterConditionOption {
    operator: string;
    cellValue: any;
    cellValueLastChar?: string;
    fieldType: FieldType;
    filterSearchType?: FieldType;
    searchTerm?: string | number;
    searchTerms?: string[] | number[];
}

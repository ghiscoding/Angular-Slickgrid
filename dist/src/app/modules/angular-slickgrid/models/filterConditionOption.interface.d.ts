import { FieldType } from './fieldType';
export interface FilterConditionOption {
    operator: string;
    cellValue: any;
    fieldType: FieldType;
    searchTerm: string;
    filterSearchType?: FieldType;
    cellValueLastChar?: string;
}

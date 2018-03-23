import { FieldType } from './index';
export interface CollectionSortBy {
    property: string;
    sortDesc?: boolean;
    fieldType?: FieldType;
}

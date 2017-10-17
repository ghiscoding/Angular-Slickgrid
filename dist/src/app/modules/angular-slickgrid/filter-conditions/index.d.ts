import { FilterConditionOption } from './../models/filterConditionOption.interface';
export declare const FilterConditions: {
    executeMappedCondition: (options: FilterConditionOption) => boolean;
    booleanFilter: (options: FilterConditionOption) => boolean;
    dateFilter: (options: FilterConditionOption) => boolean;
    dateIsoFilter: (options: FilterConditionOption) => boolean;
    dateUtcFilter: (options: FilterConditionOption) => boolean;
    dateUsFilter: (options: FilterConditionOption) => boolean;
    dateUsShortFilter: (options: FilterConditionOption) => boolean;
    numberFilter: (options: FilterConditionOption) => boolean;
    stringFilter: (options: FilterConditionOption) => boolean;
    testFilter: Function;
};

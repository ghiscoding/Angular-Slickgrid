export declare const FilterConditions: {
    executeMappedCondition: import("../models/filterCondition.interface").FilterCondition;
    booleanFilter: import("../models/filterCondition.interface").FilterCondition;
    collectionSearchFilter: import("../models/filterCondition.interface").FilterCondition;
    dateFilter: import("../models/filterCondition.interface").FilterCondition;
    dateIsoFilter: import("../models/filterCondition.interface").FilterCondition;
    dateUtcFilter: import("../models/filterCondition.interface").FilterCondition;
    dateUsFilter: import("../models/filterCondition.interface").FilterCondition;
    dateUsShortFilter: import("../models/filterCondition.interface").FilterCondition;
    numberFilter: import("../models/filterCondition.interface").FilterCondition;
    stringFilter: import("../models/filterCondition.interface").FilterCondition;
    testFilter: (operator: string, value1: any, value2: any) => boolean;
};

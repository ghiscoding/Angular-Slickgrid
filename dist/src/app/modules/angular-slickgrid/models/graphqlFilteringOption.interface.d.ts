export interface GraphqlFilteringOption {
    fieldName: string;
    fieldOperator: '<' | '>' | '>=' | '<' | '<=' | '<>' | '!=' | '=' | '==' | '*' | 'IN' | 'NIN';
    fieldValue: any;
}

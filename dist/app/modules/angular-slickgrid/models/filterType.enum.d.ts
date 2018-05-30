export declare enum FilterType {
    /** Input Filter type, with a magnifying glass as placeholder */
    input = 0,
    /** Select Filter type, just a regular select dropdown. You might want to try "singleSelect" which has a nicer look and feel. */
    select = 1,
    /** Multiple-Select Filter type */
    multipleSelect = 2,
    /** Single Filter type */
    singleSelect = 3,
    /** Custom Filter type */
    custom = 4,
    /** Compound Date Filter (compound of Operator + Date picker) */
    compoundDate = 5,
    /** Compound Input Filter (compound of Operator + Input) */
    compoundInput = 6,
}

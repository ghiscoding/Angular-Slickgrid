export declare enum OperatorType {
    /** value is empty */
    empty = "",
    /** value contains x */
    contains = "Contains",
    /** value not contains x (inversed of contains) */
    notContains = "Not_Contains",
    /** value less than x */
    lessThan = "LT",
    /** value less than or equal to x */
    lessThanOrEqual = "LE",
    /** value greater than x */
    greaterThan = "GT",
    /** value great than or equal to x */
    greaterThanOrEqual = "GE",
    /** value not equal to x */
    notEqual = "NE",
    /** value equal to x */
    equal = "EQ",
    /** String ends with value */
    endsWith = "EndsWith",
    /** String starts with value */
    startsWith = "StartsWith",
    /** Find an equal match inside a collection */
    in = "IN",
    /** Inverse (Not In) of an equal match inside a collection */
    notIn = "NOT_IN",
    /**
     * Find a substring contained inside a collection
     * For example, this condition would return True with "IN_CONTAINS":: value='Task2,Task3', collection=['Task2','Task3']
     * This would have returned False with "IN" because 'Task2' does not equal 'Task2,Task3'. However 'Task2' is contained in 'Task2,Task3'
     */
    inContains = "IN_CONTAINS",
    /** Inversed (Not In) of substring contained inside a collection */
    notInContains = "NOT_IN_CONTAINS"
}

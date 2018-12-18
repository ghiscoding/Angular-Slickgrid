/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var OperatorType = {
    /** value is empty */
    empty: '',
    /** value contains x */
    contains: 'Contains',
    /** value not contains x (inversed of contains) */
    notContains: 'Not_Contains',
    /** value less than x */
    lessThan: 'LT',
    /** value less than or equal to x */
    lessThanOrEqual: 'LE',
    /** value greater than x */
    greaterThan: 'GT',
    /** value great than or equal to x */
    greaterThanOrEqual: 'GE',
    /** value not equal to x */
    notEqual: 'NE',
    /** value equal to x */
    equal: 'EQ',
    /** String ends with value */
    endsWith: 'EndsWith',
    /** String starts with value */
    startsWith: 'StartsWith',
    /** Find an equal match inside a collection */
    in: 'IN',
    /** Inverse (Not In) of an equal match inside a collection */
    notIn: 'NOT_IN',
    /**
     * Find a substring contained inside a collection
     * For example, this condition would return True with "IN_CONTAINS":: value='Task2,Task3', collection=['Task2','Task3']
     * This would have returned False with "IN" because 'Task2' does not equal 'Task2,Task3'. However 'Task2' is contained in 'Task2,Task3'
     */
    inContains: 'IN_CONTAINS',
    /** Inversed (Not In) of substring contained inside a collection */
    notInContains: 'NOT_IN_CONTAINS',
};
export { OperatorType };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0b3JUeXBlLmVudW0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9vcGVyYXRvclR5cGUuZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFDRSxxQkFBcUI7SUFDckIsT0FBUSxFQUFFO0lBRVYsdUJBQXVCO0lBQ3ZCLFVBQVcsVUFBVTtJQUVyQixrREFBa0Q7SUFDbEQsYUFBYyxjQUFjO0lBRTVCLHdCQUF3QjtJQUN4QixVQUFXLElBQUk7SUFFZixvQ0FBb0M7SUFDcEMsaUJBQWtCLElBQUk7SUFFdEIsMkJBQTJCO0lBQzNCLGFBQWMsSUFBSTtJQUVsQixxQ0FBcUM7SUFDckMsb0JBQXFCLElBQUk7SUFFekIsMkJBQTJCO0lBQzNCLFVBQVcsSUFBSTtJQUVmLHVCQUF1QjtJQUN2QixPQUFRLElBQUk7SUFFWiw2QkFBNkI7SUFDN0IsVUFBVyxVQUFVO0lBRXJCLCtCQUErQjtJQUMvQixZQUFhLFlBQVk7SUFFekIsOENBQThDO0lBQzlDLElBQUssSUFBSTtJQUVULDZEQUE2RDtJQUM3RCxPQUFRLFFBQVE7SUFFaEI7Ozs7T0FJRztJQUNILFlBQWEsYUFBYTtJQUUxQixtRUFBbUU7SUFDbkUsZUFBZ0IsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gT3BlcmF0b3JUeXBlIHtcclxuICAvKiogdmFsdWUgaXMgZW1wdHkgKi9cclxuICBlbXB0eSA9ICcnLFxyXG5cclxuICAvKiogdmFsdWUgY29udGFpbnMgeCAqL1xyXG4gIGNvbnRhaW5zID0gJ0NvbnRhaW5zJyxcclxuXHJcbiAgLyoqIHZhbHVlIG5vdCBjb250YWlucyB4IChpbnZlcnNlZCBvZiBjb250YWlucykgKi9cclxuICBub3RDb250YWlucyA9ICdOb3RfQ29udGFpbnMnLFxyXG5cclxuICAvKiogdmFsdWUgbGVzcyB0aGFuIHggKi9cclxuICBsZXNzVGhhbiA9ICdMVCcsXHJcblxyXG4gIC8qKiB2YWx1ZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8geCAqL1xyXG4gIGxlc3NUaGFuT3JFcXVhbCA9ICdMRScsXHJcblxyXG4gIC8qKiB2YWx1ZSBncmVhdGVyIHRoYW4geCAqL1xyXG4gIGdyZWF0ZXJUaGFuID0gJ0dUJyxcclxuXHJcbiAgLyoqIHZhbHVlIGdyZWF0IHRoYW4gb3IgZXF1YWwgdG8geCAqL1xyXG4gIGdyZWF0ZXJUaGFuT3JFcXVhbCA9ICdHRScsXHJcblxyXG4gIC8qKiB2YWx1ZSBub3QgZXF1YWwgdG8geCAqL1xyXG4gIG5vdEVxdWFsID0gJ05FJyxcclxuXHJcbiAgLyoqIHZhbHVlIGVxdWFsIHRvIHggKi9cclxuICBlcXVhbCA9ICdFUScsXHJcblxyXG4gIC8qKiBTdHJpbmcgZW5kcyB3aXRoIHZhbHVlICovXHJcbiAgZW5kc1dpdGggPSAnRW5kc1dpdGgnLFxyXG5cclxuICAvKiogU3RyaW5nIHN0YXJ0cyB3aXRoIHZhbHVlICovXHJcbiAgc3RhcnRzV2l0aCA9ICdTdGFydHNXaXRoJyxcclxuXHJcbiAgLyoqIEZpbmQgYW4gZXF1YWwgbWF0Y2ggaW5zaWRlIGEgY29sbGVjdGlvbiAqL1xyXG4gIGluID0gJ0lOJyxcclxuXHJcbiAgLyoqIEludmVyc2UgKE5vdCBJbikgb2YgYW4gZXF1YWwgbWF0Y2ggaW5zaWRlIGEgY29sbGVjdGlvbiAqL1xyXG4gIG5vdEluID0gJ05PVF9JTicsXHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmQgYSBzdWJzdHJpbmcgY29udGFpbmVkIGluc2lkZSBhIGNvbGxlY3Rpb25cclxuICAgKiBGb3IgZXhhbXBsZSwgdGhpcyBjb25kaXRpb24gd291bGQgcmV0dXJuIFRydWUgd2l0aCBcIklOX0NPTlRBSU5TXCI6OiB2YWx1ZT0nVGFzazIsVGFzazMnLCBjb2xsZWN0aW9uPVsnVGFzazInLCdUYXNrMyddXHJcbiAgICogVGhpcyB3b3VsZCBoYXZlIHJldHVybmVkIEZhbHNlIHdpdGggXCJJTlwiIGJlY2F1c2UgJ1Rhc2syJyBkb2VzIG5vdCBlcXVhbCAnVGFzazIsVGFzazMnLiBIb3dldmVyICdUYXNrMicgaXMgY29udGFpbmVkIGluICdUYXNrMixUYXNrMydcclxuICAgKi9cclxuICBpbkNvbnRhaW5zID0gJ0lOX0NPTlRBSU5TJyxcclxuXHJcbiAgLyoqIEludmVyc2VkIChOb3QgSW4pIG9mIHN1YnN0cmluZyBjb250YWluZWQgaW5zaWRlIGEgY29sbGVjdGlvbiAqL1xyXG4gIG5vdEluQ29udGFpbnMgPSAnTk9UX0lOX0NPTlRBSU5TJyxcclxufVxyXG4iXX0=
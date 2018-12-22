/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
var /**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
GraphqlQueryBuilder = /** @class */ (function () {
    /* Constructor, query/mutator you wish to use, and an alias or filter arguments. */
    function GraphqlQueryBuilder(queryFnName, aliasOrFilter) {
        this.queryFnName = queryFnName;
        this.head = [];
        if (typeof aliasOrFilter === 'function') {
            this.alias = aliasOrFilter;
        }
        else if (typeof aliasOrFilter === 'object') {
            this.filter(aliasOrFilter);
        }
        else if (undefined === aliasOrFilter && 2 === arguments.length) {
            throw new TypeError("You have passed undefined as Second argument to \"Query\"");
        }
        else if (undefined !== aliasOrFilter) {
            throw new TypeError("Second argument to \"Query\" should be an alias name(String) or filter arguments(Object). was passed " + aliasOrFilter);
        }
    }
    /**
     * The parameters to run the query against.
     * @param filters An object mapping attribute to values
     */
    /**
     * The parameters to run the query against.
     * @template THIS
     * @this {THIS}
     * @param {?} filters An object mapping attribute to values
     * @return {THIS}
     */
    GraphqlQueryBuilder.prototype.filter = /**
     * The parameters to run the query against.
     * @template THIS
     * @this {THIS}
     * @param {?} filters An object mapping attribute to values
     * @return {THIS}
     */
    function (filters) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(Object.keys(filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                if (typeof filters[prop] === 'function') {
                    continue;
                }
                /** @type {?} */
                var val = (/** @type {?} */ (this)).getGraphQLValue(filters[prop]);
                if (val === '{}') {
                    continue;
                }
                (/** @type {?} */ (this)).head.push(prop + ":" + val);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return (/** @type {?} */ (this));
    };
    /**
     * Outlines the properties you wish to be returned from the query.
     * @param properties representing each attribute you want Returned
     */
    /**
     * Outlines the properties you wish to be returned from the query.
     * @template THIS
     * @this {THIS}
     * @param {...?} searches
     * @return {THIS}
     */
    GraphqlQueryBuilder.prototype.find = /**
     * Outlines the properties you wish to be returned from the query.
     * @template THIS
     * @this {THIS}
     * @param {...?} searches
     * @return {THIS}
     */
    function () {
        var searches = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            searches[_i] = arguments[_i];
        }
        if (!searches) {
            throw new TypeError("find value can not be >>falsy<<");
        }
        // if its a string.. it may have other values
        // else it sould be an Object or Array of maped values
        /** @type {?} */
        var searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
        (/** @type {?} */ (this)).body = (/** @type {?} */ (this)).parceFind(searchKeys);
        return (/** @type {?} */ (this));
    };
    /**
     * set an alias for this result.
     * @param alias
     */
    /**
     * set an alias for this result.
     * @param {?} alias
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.setAlias = /**
     * set an alias for this result.
     * @param {?} alias
     * @return {?}
     */
    function (alias) {
        this.alias = alias;
    };
    /**
     * Return to the formatted query string
     * @return
     */
    /**
     * Return to the formatted query string
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.toString = /**
     * Return to the formatted query string
     * @return {?}
     */
    function () {
        if (this.body === undefined) {
            throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
        }
        return ((this.alias) ? (this.alias + ':') : '') + " " + this.queryFnName + " " + ((this.head.length > 0) ? '(' + this.head.join(',') + ')' : '') + "  { " + this.body + " }";
    };
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    /**
     * @private
     * @param {?} _levelA
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.parceFind = 
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    /**
     * @private
     * @param {?} _levelA
     * @return {?}
     */
    function (_levelA) {
        /** @type {?} */
        var propsA = _levelA.map(function (currentValue, index) {
            /** @type {?} */
            var itemX = _levelA[index];
            if (itemX instanceof GraphqlQueryBuilder) {
                return itemX.toString();
            }
            else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                /** @type {?} */
                var propsAA = Object.keys(itemX);
                if (1 !== propsAA.length) {
                    throw new RangeError("Alias objects should only have one value. was passed: " + JSON.stringify(itemX));
                }
                /** @type {?} */
                var propS = propsAA[0];
                /** @type {?} */
                var item = itemX[propS];
                if (Array.isArray(item)) {
                    return new GraphqlQueryBuilder(propS).find(item);
                }
                return propS + " : " + item + " ";
            }
            else if (typeof itemX === 'string') {
                return itemX;
            }
            else {
                throw new RangeError("cannot handle Find value of " + itemX);
            }
        });
        return propsA.join(',');
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.getGraphQLValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (typeof value === 'string') {
            value = JSON.stringify(value);
        }
        else if (Array.isArray(value)) {
            value = value.map(function (item) {
                return _this.getGraphQLValue(item);
            }).join();
            value = "[" + value + "]";
        }
        else if (value instanceof Date) {
            value = JSON.stringify(value);
        }
        else if (value !== null && typeof value === 'object') {
            value = this.objectToString(value);
        }
        return value;
    };
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    GraphqlQueryBuilder.prototype.objectToString = /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        var e_2, _a;
        /** @type {?} */
        var sourceA = [];
        try {
            for (var _b = tslib_1.__values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var prop = _c.value;
                if (typeof obj[prop] === 'function') {
                    continue;
                }
                sourceA.push(prop + ":" + this.getGraphQLValue(obj[prop]));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return "{" + sourceA.join() + "}";
    };
    return GraphqlQueryBuilder;
}());
/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
export default GraphqlQueryBuilder;
if (false) {
    /** @type {?} */
    GraphqlQueryBuilder.prototype.alias;
    /** @type {?} */
    GraphqlQueryBuilder.prototype.head;
    /** @type {?} */
    GraphqlQueryBuilder.prototype.body;
    /**
     * @type {?}
     * @private
     */
    GraphqlQueryBuilder.prototype.queryFnName;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFF1ZXJ5QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvZ3JhcGhxbFF1ZXJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OztJQUtFLG1GQUFtRjtJQUNuRiw2QkFBb0IsV0FBbUIsRUFBRSxhQUErQjtRQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUp2QyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBS2YsSUFBSSxPQUFPLGFBQWEsS0FBSyxVQUFVLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7U0FDNUI7YUFBTSxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzVCO2FBQU0sSUFBSSxTQUFTLEtBQUssYUFBYSxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2hFLE1BQU0sSUFBSSxTQUFTLENBQUMsMkRBQXlELENBQUMsQ0FBQztTQUNoRjthQUFNLElBQUksU0FBUyxLQUFLLGFBQWEsRUFBRTtZQUN0QyxNQUFNLElBQUksU0FBUyxDQUFDLDBHQUFzRyxhQUFlLENBQUMsQ0FBQztTQUM1STtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0gsb0NBQU07Ozs7Ozs7SUFBTixVQUFPLE9BQVk7OztZQUNqQixLQUFtQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBcEMsSUFBTSxJQUFJLFdBQUE7Z0JBQ2IsSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ3ZDLFNBQVM7aUJBQ1Y7O29CQUNLLEdBQUcsR0FB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Q0FBQyxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7SUFFTyw0Q0FBYzs7Ozs7SUFBdEIsVUFBdUIsR0FBUTs7O1lBQ3ZCLE9BQU8sR0FBRyxFQUFFOztZQUVsQixLQUFtQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBaEMsSUFBTSxJQUFJLFdBQUE7Z0JBQ2IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ25DLFNBQVM7aUJBQ1Y7Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBSSxJQUFJLFNBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUcsQ0FBQyxDQUFDO2FBQzVEOzs7Ozs7Ozs7UUFDRCxPQUFPLE1BQUksT0FBTyxDQUFDLElBQUksRUFBRSxNQUFHLENBQUM7SUFDL0IsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQWxJRCxJQWtJQzs7Ozs7Ozs7Ozs7O0lBaklDLG9DQUF5Qjs7SUFDekIsbUNBQWlCOztJQUNqQixtQ0FBVTs7Ozs7SUFHRSwwQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhpcyBHcmFwaHFsUXVlcnlCdWlsZGVyIGNsYXNzIGlzIGEgbGliIHRoYXQgYWxyZWFkeSBleGlzdFxyXG4gKiBidXQgd2FzIGNhdXNpbmcgaXNzdWVzIHdpdGggVHlwZVNjcmlwdCwgUmVxdWlyZUpTIGFuZCBvdGhlciBidW5kbGVyL3BhY2thZ2Vyc1xyXG4gKiBhbmQgc28gSSByZXdyb3RlIGl0IGluIHB1cmUgVHlwZVNjcmlwdC5cclxuICpcclxuICogVGhlIHByZXZpb3VzIGxpYiBjYW4gYmUgdmlld2VkIGhlcmUgYXQgdGhpcyBHaXRodWJcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2NvZGVtZWFzYW5kd2ljaC9ncmFwaHFsLXF1ZXJ5LWJ1aWxkZXJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBocWxRdWVyeUJ1aWxkZXIge1xyXG4gIGFsaWFzOiBzdHJpbmcgfCBGdW5jdGlvbjtcclxuICBoZWFkOiBhbnlbXSA9IFtdO1xyXG4gIGJvZHk6IGFueTtcclxuXHJcbiAgLyogQ29uc3RydWN0b3IsIHF1ZXJ5L211dGF0b3IgeW91IHdpc2ggdG8gdXNlLCBhbmQgYW4gYWxpYXMgb3IgZmlsdGVyIGFyZ3VtZW50cy4gKi9cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHF1ZXJ5Rm5OYW1lOiBzdHJpbmcsIGFsaWFzT3JGaWx0ZXI/OiBzdHJpbmcgfCBvYmplY3QpIHtcclxuICAgIGlmICh0eXBlb2YgYWxpYXNPckZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmFsaWFzID0gYWxpYXNPckZpbHRlcjtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGFsaWFzT3JGaWx0ZXIgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyKGFsaWFzT3JGaWx0ZXIpO1xyXG4gICAgfSBlbHNlIGlmICh1bmRlZmluZWQgPT09IGFsaWFzT3JGaWx0ZXIgJiYgMiA9PT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBZb3UgaGF2ZSBwYXNzZWQgdW5kZWZpbmVkIGFzIFNlY29uZCBhcmd1bWVudCB0byBcIlF1ZXJ5XCJgKTtcclxuICAgIH0gZWxzZSBpZiAodW5kZWZpbmVkICE9PSBhbGlhc09yRmlsdGVyKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFNlY29uZCBhcmd1bWVudCB0byBcIlF1ZXJ5XCIgc2hvdWxkIGJlIGFuIGFsaWFzIG5hbWUoU3RyaW5nKSBvciBmaWx0ZXIgYXJndW1lbnRzKE9iamVjdCkuIHdhcyBwYXNzZWQgJHthbGlhc09yRmlsdGVyfWApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHBhcmFtZXRlcnMgdG8gcnVuIHRoZSBxdWVyeSBhZ2FpbnN0LlxyXG4gICAqIEBwYXJhbSBmaWx0ZXJzIEFuIG9iamVjdCBtYXBwaW5nIGF0dHJpYnV0ZSB0byB2YWx1ZXNcclxuICAgKi9cclxuICBmaWx0ZXIoZmlsdGVyczogYW55KSB7XHJcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMoZmlsdGVycykpIHtcclxuICAgICAgaWYgKHR5cGVvZiBmaWx0ZXJzW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgdmFsID0gdGhpcy5nZXRHcmFwaFFMVmFsdWUoZmlsdGVyc1twcm9wXSk7XHJcbiAgICAgIGlmICh2YWwgPT09ICd7fScpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmhlYWQucHVzaChgJHtwcm9wfToke3ZhbH1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3V0bGluZXMgdGhlIHByb3BlcnRpZXMgeW91IHdpc2ggdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgcXVlcnkuXHJcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgcmVwcmVzZW50aW5nIGVhY2ggYXR0cmlidXRlIHlvdSB3YW50IFJldHVybmVkXHJcbiAgICovXHJcbiAgZmluZCguLi5zZWFyY2hlczogYW55W10pIHsgLy8gVEhJUyBORUVEIFRPIEJFIEEgXCJGVU5DVElPTlwiIHRvIHNjb3BlICdhcmd1bWVudHMnXHJcbiAgICBpZiAoIXNlYXJjaGVzKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYGZpbmQgdmFsdWUgY2FuIG5vdCBiZSA+PmZhbHN5PDxgKTtcclxuICAgIH1cclxuICAgIC8vIGlmIGl0cyBhIHN0cmluZy4uIGl0IG1heSBoYXZlIG90aGVyIHZhbHVlc1xyXG4gICAgLy8gZWxzZSBpdCBzb3VsZCBiZSBhbiBPYmplY3Qgb3IgQXJyYXkgb2YgbWFwZWQgdmFsdWVzXHJcbiAgICBjb25zdCBzZWFyY2hLZXlzID0gKHNlYXJjaGVzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaGVzWzBdKSkgPyBzZWFyY2hlc1swXSA6IHNlYXJjaGVzO1xyXG4gICAgdGhpcy5ib2R5ID0gdGhpcy5wYXJjZUZpbmQoc2VhcmNoS2V5cyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCBhbiBhbGlhcyBmb3IgdGhpcyByZXN1bHQuXHJcbiAgICogQHBhcmFtIGFsaWFzXHJcbiAgICovXHJcbiAgc2V0QWxpYXMoYWxpYXM6IHN0cmluZykge1xyXG4gICAgdGhpcy5hbGlhcyA9IGFsaWFzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRvIHRoZSBmb3JtYXR0ZWQgcXVlcnkgc3RyaW5nXHJcbiAgICogQHJldHVyblxyXG4gICAqL1xyXG4gIHRvU3RyaW5nKCkge1xyXG4gICAgaWYgKHRoaXMuYm9keSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgcmV0dXJuIHByb3BlcnRpZXMgYXJlIG5vdCBkZWZpbmVkLiB1c2UgdGhlICdmaW5kJyBmdW5jdGlvbiB0byBkZWZpbmVkIHRoZW1gKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYCR7KHRoaXMuYWxpYXMpID8gKHRoaXMuYWxpYXMgKyAnOicpIDogJyd9ICR7dGhpcy5xdWVyeUZuTmFtZX0gJHsodGhpcy5oZWFkLmxlbmd0aCA+IDApID8gJygnICsgdGhpcy5oZWFkLmpvaW4oJywnKSArICcpJyA6ICcnfSAgeyAke3RoaXMuYm9keX0gfWA7XHJcbiAgfVxyXG5cclxuICAvLyAtLVxyXG4gIC8vIFBSSVZBVEUgRlVOQ1RJT05TXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBwYXJjZUZpbmQoX2xldmVsQTogYW55W10pIHtcclxuICAgIGNvbnN0IHByb3BzQSA9IF9sZXZlbEEubWFwKChjdXJyZW50VmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGl0ZW1YID0gX2xldmVsQVtpbmRleF07XHJcblxyXG4gICAgICBpZiAoaXRlbVggaW5zdGFuY2VvZiBHcmFwaHFsUXVlcnlCdWlsZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1YLnRvU3RyaW5nKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbVgpICYmIHR5cGVvZiBpdGVtWCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjb25zdCBwcm9wc0FBID0gT2JqZWN0LmtleXMoaXRlbVgpO1xyXG4gICAgICAgIGlmICgxICE9PSBwcm9wc0FBLmxlbmd0aCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYEFsaWFzIG9iamVjdHMgc2hvdWxkIG9ubHkgaGF2ZSBvbmUgdmFsdWUuIHdhcyBwYXNzZWQ6ICR7SlNPTi5zdHJpbmdpZnkoaXRlbVgpfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwcm9wUyA9IHByb3BzQUFbMF07XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IGl0ZW1YW3Byb3BTXTtcclxuXHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcclxuICAgICAgICAgIHJldHVybiBuZXcgR3JhcGhxbFF1ZXJ5QnVpbGRlcihwcm9wUykuZmluZChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke3Byb3BTfSA6ICR7aXRlbX0gYDtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbVggPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1YO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBjYW5ub3QgaGFuZGxlIEZpbmQgdmFsdWUgb2YgJHtpdGVtWH1gKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHByb3BzQS5qb2luKCcsJyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEdyYXBoUUxWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0R3JhcGhRTFZhbHVlKGl0ZW0pO1xyXG4gICAgICB9KS5qb2luKCk7XHJcbiAgICAgIHZhbHVlID0gYFske3ZhbHVlfV1gO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdmFsdWUgPSB0aGlzLm9iamVjdFRvU3RyaW5nKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb2JqZWN0VG9TdHJpbmcob2JqOiBhbnkpIHtcclxuICAgIGNvbnN0IHNvdXJjZUEgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob2JqKSkge1xyXG4gICAgICBpZiAodHlwZW9mIG9ialtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHNvdXJjZUEucHVzaChgJHtwcm9wfToke3RoaXMuZ2V0R3JhcGhRTFZhbHVlKG9ialtwcm9wXSl9YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYHske3NvdXJjZUEuam9pbigpfX1gO1xyXG4gIH1cclxufVxyXG4iXX0=
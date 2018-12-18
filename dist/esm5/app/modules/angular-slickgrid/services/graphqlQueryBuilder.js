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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFF1ZXJ5QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvZ3JhcGhxbFF1ZXJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBUUE7Ozs7Ozs7OztJQUtFLG1GQUFtRjtJQUNuRiw2QkFBb0IsV0FBbUIsRUFBRSxhQUErQjtRQUFwRCxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUp2QyxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBS2YsSUFBSSxPQUFPLGFBQWEsS0FBSyxVQUFVLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7U0FDNUI7YUFBTSxJQUFJLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzVCO2FBQU0sSUFBSSxTQUFTLEtBQUssYUFBYSxJQUFJLENBQUMsS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2hFLE1BQU0sSUFBSSxTQUFTLENBQUMsMkRBQXlELENBQUMsQ0FBQztTQUNoRjthQUFNLElBQUksU0FBUyxLQUFLLGFBQWEsRUFBRTtZQUN0QyxNQUFNLElBQUksU0FBUyxDQUFDLDBHQUFzRyxhQUFlLENBQUMsQ0FBQztTQUM1STtJQUNILENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0gsb0NBQU07Ozs7Ozs7SUFBTixVQUFPLE9BQVk7OztZQUNqQixLQUFtQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBcEMsSUFBTSxJQUFJLFdBQUE7Z0JBQ2IsSUFBSSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ3ZDLFNBQVM7aUJBQ1Y7O29CQUNLLEdBQUcsR0FB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Q0FBQyxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7SUFFTyw0Q0FBYzs7Ozs7SUFBdEIsVUFBdUIsR0FBUTs7O1lBQ3ZCLE9BQU8sR0FBRyxFQUFFOztZQUVsQixLQUFtQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBaEMsSUFBTSxJQUFJLFdBQUE7Z0JBQ2IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ25DLFNBQVM7aUJBQ1Y7Z0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBSSxJQUFJLFNBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUcsQ0FBQyxDQUFDO2FBQzVEOzs7Ozs7Ozs7UUFDRCxPQUFPLE1BQUksT0FBTyxDQUFDLElBQUksRUFBRSxNQUFHLENBQUM7SUFDL0IsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQWxJRCxJQWtJQzs7Ozs7Ozs7Ozs7O0lBaklDLG9DQUF5Qjs7SUFDekIsbUNBQWlCOztJQUNqQixtQ0FBVTs7Ozs7SUFHRSwwQ0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgR3JhcGhxbFF1ZXJ5QnVpbGRlciBjbGFzcyBpcyBhIGxpYiB0aGF0IGFscmVhZHkgZXhpc3RcbiAqIGJ1dCB3YXMgY2F1c2luZyBpc3N1ZXMgd2l0aCBUeXBlU2NyaXB0LCBSZXF1aXJlSlMgYW5kIG90aGVyIGJ1bmRsZXIvcGFja2FnZXJzXG4gKiBhbmQgc28gSSByZXdyb3RlIGl0IGluIHB1cmUgVHlwZVNjcmlwdC5cbiAqXG4gKiBUaGUgcHJldmlvdXMgbGliIGNhbiBiZSB2aWV3ZWQgaGVyZSBhdCB0aGlzIEdpdGh1YlxuICogaHR0cHM6Ly9naXRodWIuY29tL2NvZGVtZWFzYW5kd2ljaC9ncmFwaHFsLXF1ZXJ5LWJ1aWxkZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhxbFF1ZXJ5QnVpbGRlciB7XG4gIGFsaWFzOiBzdHJpbmcgfCBGdW5jdGlvbjtcbiAgaGVhZDogYW55W10gPSBbXTtcbiAgYm9keTogYW55O1xuXG4gIC8qIENvbnN0cnVjdG9yLCBxdWVyeS9tdXRhdG9yIHlvdSB3aXNoIHRvIHVzZSwgYW5kIGFuIGFsaWFzIG9yIGZpbHRlciBhcmd1bWVudHMuICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcXVlcnlGbk5hbWU6IHN0cmluZywgYWxpYXNPckZpbHRlcj86IHN0cmluZyB8IG9iamVjdCkge1xuICAgIGlmICh0eXBlb2YgYWxpYXNPckZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5hbGlhcyA9IGFsaWFzT3JGaWx0ZXI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYWxpYXNPckZpbHRlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuZmlsdGVyKGFsaWFzT3JGaWx0ZXIpO1xuICAgIH0gZWxzZSBpZiAodW5kZWZpbmVkID09PSBhbGlhc09yRmlsdGVyICYmIDIgPT09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFlvdSBoYXZlIHBhc3NlZCB1bmRlZmluZWQgYXMgU2Vjb25kIGFyZ3VtZW50IHRvIFwiUXVlcnlcImApO1xuICAgIH0gZWxzZSBpZiAodW5kZWZpbmVkICE9PSBhbGlhc09yRmlsdGVyKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBTZWNvbmQgYXJndW1lbnQgdG8gXCJRdWVyeVwiIHNob3VsZCBiZSBhbiBhbGlhcyBuYW1lKFN0cmluZykgb3IgZmlsdGVyIGFyZ3VtZW50cyhPYmplY3QpLiB3YXMgcGFzc2VkICR7YWxpYXNPckZpbHRlcn1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIHBhcmFtZXRlcnMgdG8gcnVuIHRoZSBxdWVyeSBhZ2FpbnN0LlxuICAgKiBAcGFyYW0gZmlsdGVycyBBbiBvYmplY3QgbWFwcGluZyBhdHRyaWJ1dGUgdG8gdmFsdWVzXG4gICAqL1xuICBmaWx0ZXIoZmlsdGVyczogYW55KSB7XG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKGZpbHRlcnMpKSB7XG4gICAgICBpZiAodHlwZW9mIGZpbHRlcnNbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmdldEdyYXBoUUxWYWx1ZShmaWx0ZXJzW3Byb3BdKTtcbiAgICAgIGlmICh2YWwgPT09ICd7fScpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB0aGlzLmhlYWQucHVzaChgJHtwcm9wfToke3ZhbH1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogT3V0bGluZXMgdGhlIHByb3BlcnRpZXMgeW91IHdpc2ggdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgcXVlcnkuXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIHJlcHJlc2VudGluZyBlYWNoIGF0dHJpYnV0ZSB5b3Ugd2FudCBSZXR1cm5lZFxuICAgKi9cbiAgZmluZCguLi5zZWFyY2hlczogYW55W10pIHsgLy8gVEhJUyBORUVEIFRPIEJFIEEgXCJGVU5DVElPTlwiIHRvIHNjb3BlICdhcmd1bWVudHMnXG4gICAgaWYgKCFzZWFyY2hlcykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZmluZCB2YWx1ZSBjYW4gbm90IGJlID4+ZmFsc3k8PGApO1xuICAgIH1cbiAgICAvLyBpZiBpdHMgYSBzdHJpbmcuLiBpdCBtYXkgaGF2ZSBvdGhlciB2YWx1ZXNcbiAgICAvLyBlbHNlIGl0IHNvdWxkIGJlIGFuIE9iamVjdCBvciBBcnJheSBvZiBtYXBlZCB2YWx1ZXNcbiAgICBjb25zdCBzZWFyY2hLZXlzID0gKHNlYXJjaGVzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KHNlYXJjaGVzWzBdKSkgPyBzZWFyY2hlc1swXSA6IHNlYXJjaGVzO1xuICAgIHRoaXMuYm9keSA9IHRoaXMucGFyY2VGaW5kKHNlYXJjaEtleXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIHNldCBhbiBhbGlhcyBmb3IgdGhpcyByZXN1bHQuXG4gICAqIEBwYXJhbSBhbGlhc1xuICAgKi9cbiAgc2V0QWxpYXMoYWxpYXM6IHN0cmluZykge1xuICAgIHRoaXMuYWxpYXMgPSBhbGlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdG8gdGhlIGZvcm1hdHRlZCBxdWVyeSBzdHJpbmdcbiAgICogQHJldHVyblxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgaWYgKHRoaXMuYm9keSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoYHJldHVybiBwcm9wZXJ0aWVzIGFyZSBub3QgZGVmaW5lZC4gdXNlIHRoZSAnZmluZCcgZnVuY3Rpb24gdG8gZGVmaW5lZCB0aGVtYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAkeyh0aGlzLmFsaWFzKSA/ICh0aGlzLmFsaWFzICsgJzonKSA6ICcnfSAke3RoaXMucXVlcnlGbk5hbWV9ICR7KHRoaXMuaGVhZC5sZW5ndGggPiAwKSA/ICcoJyArIHRoaXMuaGVhZC5qb2luKCcsJykgKyAnKScgOiAnJ30gIHsgJHt0aGlzLmJvZHl9IH1gO1xuICB9XG5cbiAgLy8gLS1cbiAgLy8gUFJJVkFURSBGVU5DVElPTlNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwcml2YXRlIHBhcmNlRmluZChfbGV2ZWxBOiBhbnlbXSkge1xuICAgIGNvbnN0IHByb3BzQSA9IF9sZXZlbEEubWFwKChjdXJyZW50VmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpdGVtWCA9IF9sZXZlbEFbaW5kZXhdO1xuXG4gICAgICBpZiAoaXRlbVggaW5zdGFuY2VvZiBHcmFwaHFsUXVlcnlCdWlsZGVyKSB7XG4gICAgICAgIHJldHVybiBpdGVtWC50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShpdGVtWCkgJiYgdHlwZW9mIGl0ZW1YID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBwcm9wc0FBID0gT2JqZWN0LmtleXMoaXRlbVgpO1xuICAgICAgICBpZiAoMSAhPT0gcHJvcHNBQS5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgQWxpYXMgb2JqZWN0cyBzaG91bGQgb25seSBoYXZlIG9uZSB2YWx1ZS4gd2FzIHBhc3NlZDogJHtKU09OLnN0cmluZ2lmeShpdGVtWCl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJvcFMgPSBwcm9wc0FBWzBdO1xuICAgICAgICBjb25zdCBpdGVtID0gaXRlbVhbcHJvcFNdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHFsUXVlcnlCdWlsZGVyKHByb3BTKS5maW5kKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHtwcm9wU30gOiAke2l0ZW19IGA7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtWCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1YO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYGNhbm5vdCBoYW5kbGUgRmluZCB2YWx1ZSBvZiAke2l0ZW1YfWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb3BzQS5qb2luKCcsJyk7XG4gIH1cblxuICBwcml2YXRlIGdldEdyYXBoUUxWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUubWFwKGl0ZW0gPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRHcmFwaFFMVmFsdWUoaXRlbSk7XG4gICAgICB9KS5qb2luKCk7XG4gICAgICB2YWx1ZSA9IGBbJHt2YWx1ZX1dYDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMub2JqZWN0VG9TdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIG9iamVjdFRvU3RyaW5nKG9iajogYW55KSB7XG4gICAgY29uc3Qgc291cmNlQSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgc291cmNlQS5wdXNoKGAke3Byb3B9OiR7dGhpcy5nZXRHcmFwaFFMVmFsdWUob2JqW3Byb3BdKX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIGB7JHtzb3VyY2VBLmpvaW4oKX19YDtcbiAgfVxufVxuIl19
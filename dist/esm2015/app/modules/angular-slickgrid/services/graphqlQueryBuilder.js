/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This GraphqlQueryBuilder class is a lib that already exist
 * but was causing issues with TypeScript, RequireJS and other bundler/packagers
 * and so I rewrote it in pure TypeScript.
 *
 * The previous lib can be viewed here at this Github
 * https://github.com/codemeasandwich/graphql-query-builder
 */
export default class GraphqlQueryBuilder {
    /* Constructor, query/mutator you wish to use, and an alias or filter arguments. */
    /**
     * @param {?} queryFnName
     * @param {?=} aliasOrFilter
     */
    constructor(queryFnName, aliasOrFilter) {
        this.queryFnName = queryFnName;
        this.head = [];
        if (typeof aliasOrFilter === 'function') {
            this.alias = aliasOrFilter;
        }
        else if (typeof aliasOrFilter === 'object') {
            this.filter(aliasOrFilter);
        }
        else if (undefined === aliasOrFilter && 2 === arguments.length) {
            throw new TypeError(`You have passed undefined as Second argument to "Query"`);
        }
        else if (undefined !== aliasOrFilter) {
            throw new TypeError(`Second argument to "Query" should be an alias name(String) or filter arguments(Object). was passed ${aliasOrFilter}`);
        }
    }
    /**
     * The parameters to run the query against.
     * @template THIS
     * @this {THIS}
     * @param {?} filters An object mapping attribute to values
     * @return {THIS}
     */
    filter(filters) {
        for (const prop of Object.keys(filters)) {
            if (typeof filters[prop] === 'function') {
                continue;
            }
            /** @type {?} */
            const val = (/** @type {?} */ (this)).getGraphQLValue(filters[prop]);
            if (val === '{}') {
                continue;
            }
            (/** @type {?} */ (this)).head.push(`${prop}:${val}`);
        }
        return (/** @type {?} */ (this));
    }
    /**
     * Outlines the properties you wish to be returned from the query.
     * @template THIS
     * @this {THIS}
     * @param {...?} searches
     * @return {THIS}
     */
    find(...searches) {
        if (!searches) {
            throw new TypeError(`find value can not be >>falsy<<`);
        }
        // if its a string.. it may have other values
        // else it sould be an Object or Array of maped values
        /** @type {?} */
        const searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
        (/** @type {?} */ (this)).body = (/** @type {?} */ (this)).parceFind(searchKeys);
        return (/** @type {?} */ (this));
    }
    /**
     * set an alias for this result.
     * @param {?} alias
     * @return {?}
     */
    setAlias(alias) {
        this.alias = alias;
    }
    /**
     * Return to the formatted query string
     * @return {?}
     */
    toString() {
        if (this.body === undefined) {
            throw new ReferenceError(`return properties are not defined. use the 'find' function to defined them`);
        }
        return `${(this.alias) ? (this.alias + ':') : ''} ${this.queryFnName} ${(this.head.length > 0) ? '(' + this.head.join(',') + ')' : ''}  { ${this.body} }`;
    }
    // --
    // PRIVATE FUNCTIONS
    // -----------------
    /**
     * @private
     * @param {?} _levelA
     * @return {?}
     */
    parceFind(_levelA) {
        /** @type {?} */
        const propsA = _levelA.map((currentValue, index) => {
            /** @type {?} */
            const itemX = _levelA[index];
            if (itemX instanceof GraphqlQueryBuilder) {
                return itemX.toString();
            }
            else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                /** @type {?} */
                const propsAA = Object.keys(itemX);
                if (1 !== propsAA.length) {
                    throw new RangeError(`Alias objects should only have one value. was passed: ${JSON.stringify(itemX)}`);
                }
                /** @type {?} */
                const propS = propsAA[0];
                /** @type {?} */
                const item = itemX[propS];
                if (Array.isArray(item)) {
                    return new GraphqlQueryBuilder(propS).find(item);
                }
                return `${propS} : ${item} `;
            }
            else if (typeof itemX === 'string') {
                return itemX;
            }
            else {
                throw new RangeError(`cannot handle Find value of ${itemX}`);
            }
        });
        return propsA.join(',');
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getGraphQLValue(value) {
        if (typeof value === 'string') {
            value = JSON.stringify(value);
        }
        else if (Array.isArray(value)) {
            value = value.map(item => {
                return this.getGraphQLValue(item);
            }).join();
            value = `[${value}]`;
        }
        else if (value instanceof Date) {
            value = JSON.stringify(value);
        }
        else if (value !== null && typeof value === 'object') {
            value = this.objectToString(value);
        }
        return value;
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    objectToString(obj) {
        /** @type {?} */
        const sourceA = [];
        for (const prop of Object.keys(obj)) {
            if (typeof obj[prop] === 'function') {
                continue;
            }
            sourceA.push(`${prop}:${this.getGraphQLValue(obj[prop])}`);
        }
        return `{${sourceA.join()}}`;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFF1ZXJ5QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvZ3JhcGhxbFF1ZXJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFtQjs7Ozs7O0lBTXRDLFlBQW9CLFdBQW1CLEVBQUUsYUFBK0I7UUFBcEQsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFKdkMsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUtmLElBQUksT0FBTyxhQUFhLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1NBQzVCO2FBQU0sSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM1QjthQUFNLElBQUksU0FBUyxLQUFLLGFBQWEsSUFBSSxDQUFDLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNoRSxNQUFNLElBQUksU0FBUyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7U0FDaEY7YUFBTSxJQUFJLFNBQVMsS0FBSyxhQUFhLEVBQUU7WUFDdEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzR0FBc0csYUFBYSxFQUFFLENBQUMsQ0FBQztTQUM1STtJQUNILENBQUM7Ozs7Ozs7O0lBTUQsTUFBTSxDQUFDLE9BQVk7UUFDakIsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUN2QyxTQUFTO2FBQ1Y7O2tCQUNLLEdBQUcsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUks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Q25DLFNBQVM7YUFDVjtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7SUFDL0IsQ0FBQztDQUNGOzs7SUFqSUMsb0NBQXlCOztJQUN6QixtQ0FBaUI7O0lBQ2pCLG1DQUFVOzs7OztJQUdFLDBDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGlzIEdyYXBocWxRdWVyeUJ1aWxkZXIgY2xhc3MgaXMgYSBsaWIgdGhhdCBhbHJlYWR5IGV4aXN0XHJcbiAqIGJ1dCB3YXMgY2F1c2luZyBpc3N1ZXMgd2l0aCBUeXBlU2NyaXB0LCBSZXF1aXJlSlMgYW5kIG90aGVyIGJ1bmRsZXIvcGFja2FnZXJzXHJcbiAqIGFuZCBzbyBJIHJld3JvdGUgaXQgaW4gcHVyZSBUeXBlU2NyaXB0LlxyXG4gKlxyXG4gKiBUaGUgcHJldmlvdXMgbGliIGNhbiBiZSB2aWV3ZWQgaGVyZSBhdCB0aGlzIEdpdGh1YlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY29kZW1lYXNhbmR3aWNoL2dyYXBocWwtcXVlcnktYnVpbGRlclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhxbFF1ZXJ5QnVpbGRlciB7XHJcbiAgYWxpYXM6IHN0cmluZyB8IEZ1bmN0aW9uO1xyXG4gIGhlYWQ6IGFueVtdID0gW107XHJcbiAgYm9keTogYW55O1xyXG5cclxuICAvKiBDb25zdHJ1Y3RvciwgcXVlcnkvbXV0YXRvciB5b3Ugd2lzaCB0byB1c2UsIGFuZCBhbiBhbGlhcyBvciBmaWx0ZXIgYXJndW1lbnRzLiAqL1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcXVlcnlGbk5hbWU6IHN0cmluZywgYWxpYXNPckZpbHRlcj86IHN0cmluZyB8IG9iamVjdCkge1xyXG4gICAgaWYgKHR5cGVvZiBhbGlhc09yRmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuYWxpYXMgPSBhbGlhc09yRmlsdGVyO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYWxpYXNPckZpbHRlciA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhpcy5maWx0ZXIoYWxpYXNPckZpbHRlcik7XHJcbiAgICB9IGVsc2UgaWYgKHVuZGVmaW5lZCA9PT0gYWxpYXNPckZpbHRlciAmJiAyID09PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFlvdSBoYXZlIHBhc3NlZCB1bmRlZmluZWQgYXMgU2Vjb25kIGFyZ3VtZW50IHRvIFwiUXVlcnlcImApO1xyXG4gICAgfSBlbHNlIGlmICh1bmRlZmluZWQgIT09IGFsaWFzT3JGaWx0ZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgU2Vjb25kIGFyZ3VtZW50IHRvIFwiUXVlcnlcIiBzaG91bGQgYmUgYW4gYWxpYXMgbmFtZShTdHJpbmcpIG9yIGZpbHRlciBhcmd1bWVudHMoT2JqZWN0KS4gd2FzIHBhc3NlZCAke2FsaWFzT3JGaWx0ZXJ9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgcGFyYW1ldGVycyB0byBydW4gdGhlIHF1ZXJ5IGFnYWluc3QuXHJcbiAgICogQHBhcmFtIGZpbHRlcnMgQW4gb2JqZWN0IG1hcHBpbmcgYXR0cmlidXRlIHRvIHZhbHVlc1xyXG4gICAqL1xyXG4gIGZpbHRlcihmaWx0ZXJzOiBhbnkpIHtcclxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3Qua2V5cyhmaWx0ZXJzKSkge1xyXG4gICAgICBpZiAodHlwZW9mIGZpbHRlcnNbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB2YWwgPSB0aGlzLmdldEdyYXBoUUxWYWx1ZShmaWx0ZXJzW3Byb3BdKTtcclxuICAgICAgaWYgKHZhbCA9PT0gJ3t9Jykge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaGVhZC5wdXNoKGAke3Byb3B9OiR7dmFsfWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPdXRsaW5lcyB0aGUgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBiZSByZXR1cm5lZCBmcm9tIHRoZSBxdWVyeS5cclxuICAgKiBAcGFyYW0gcHJvcGVydGllcyByZXByZXNlbnRpbmcgZWFjaCBhdHRyaWJ1dGUgeW91IHdhbnQgUmV0dXJuZWRcclxuICAgKi9cclxuICBmaW5kKC4uLnNlYXJjaGVzOiBhbnlbXSkgeyAvLyBUSElTIE5FRUQgVE8gQkUgQSBcIkZVTkNUSU9OXCIgdG8gc2NvcGUgJ2FyZ3VtZW50cydcclxuICAgIGlmICghc2VhcmNoZXMpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgZmluZCB2YWx1ZSBjYW4gbm90IGJlID4+ZmFsc3k8PGApO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgaXRzIGEgc3RyaW5nLi4gaXQgbWF5IGhhdmUgb3RoZXIgdmFsdWVzXHJcbiAgICAvLyBlbHNlIGl0IHNvdWxkIGJlIGFuIE9iamVjdCBvciBBcnJheSBvZiBtYXBlZCB2YWx1ZXNcclxuICAgIGNvbnN0IHNlYXJjaEtleXMgPSAoc2VhcmNoZXMubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoZXNbMF0pKSA/IHNlYXJjaGVzWzBdIDogc2VhcmNoZXM7XHJcbiAgICB0aGlzLmJvZHkgPSB0aGlzLnBhcmNlRmluZChzZWFyY2hLZXlzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0IGFuIGFsaWFzIGZvciB0aGlzIHJlc3VsdC5cclxuICAgKiBAcGFyYW0gYWxpYXNcclxuICAgKi9cclxuICBzZXRBbGlhcyhhbGlhczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFsaWFzID0gYWxpYXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdG8gdGhlIGZvcm1hdHRlZCBxdWVyeSBzdHJpbmdcclxuICAgKiBAcmV0dXJuXHJcbiAgICovXHJcbiAgdG9TdHJpbmcoKSB7XHJcbiAgICBpZiAodGhpcy5ib2R5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKGByZXR1cm4gcHJvcGVydGllcyBhcmUgbm90IGRlZmluZWQuIHVzZSB0aGUgJ2ZpbmQnIGZ1bmN0aW9uIHRvIGRlZmluZWQgdGhlbWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgJHsodGhpcy5hbGlhcykgPyAodGhpcy5hbGlhcyArICc6JykgOiAnJ30gJHt0aGlzLnF1ZXJ5Rm5OYW1lfSAkeyh0aGlzLmhlYWQubGVuZ3RoID4gMCkgPyAnKCcgKyB0aGlzLmhlYWQuam9pbignLCcpICsgJyknIDogJyd9ICB7ICR7dGhpcy5ib2R5fSB9YDtcclxuICB9XHJcblxyXG4gIC8vIC0tXHJcbiAgLy8gUFJJVkFURSBGVU5DVElPTlNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwcml2YXRlIHBhcmNlRmluZChfbGV2ZWxBOiBhbnlbXSkge1xyXG4gICAgY29uc3QgcHJvcHNBID0gX2xldmVsQS5tYXAoKGN1cnJlbnRWYWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3QgaXRlbVggPSBfbGV2ZWxBW2luZGV4XTtcclxuXHJcbiAgICAgIGlmIChpdGVtWCBpbnN0YW5jZW9mIEdyYXBocWxRdWVyeUJ1aWxkZXIpIHtcclxuICAgICAgICByZXR1cm4gaXRlbVgudG9TdHJpbmcoKTtcclxuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShpdGVtWCkgJiYgdHlwZW9mIGl0ZW1YID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbnN0IHByb3BzQUEgPSBPYmplY3Qua2V5cyhpdGVtWCk7XHJcbiAgICAgICAgaWYgKDEgIT09IHByb3BzQUEubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgQWxpYXMgb2JqZWN0cyBzaG91bGQgb25seSBoYXZlIG9uZSB2YWx1ZS4gd2FzIHBhc3NlZDogJHtKU09OLnN0cmluZ2lmeShpdGVtWCl9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHByb3BTID0gcHJvcHNBQVswXTtcclxuICAgICAgICBjb25zdCBpdGVtID0gaXRlbVhbcHJvcFNdO1xyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xyXG4gICAgICAgICAgcmV0dXJuIG5ldyBHcmFwaHFsUXVlcnlCdWlsZGVyKHByb3BTKS5maW5kKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYCR7cHJvcFN9IDogJHtpdGVtfSBgO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtWCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICByZXR1cm4gaXRlbVg7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYGNhbm5vdCBoYW5kbGUgRmluZCB2YWx1ZSBvZiAke2l0ZW1YfWApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvcHNBLmpvaW4oJywnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0R3JhcGhRTFZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xyXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICB2YWx1ZSA9IHZhbHVlLm1hcChpdGVtID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRHcmFwaFFMVmFsdWUoaXRlbSk7XHJcbiAgICAgIH0pLmpvaW4oKTtcclxuICAgICAgdmFsdWUgPSBgWyR7dmFsdWV9XWA7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB2YWx1ZSA9IHRoaXMub2JqZWN0VG9TdHJpbmcodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvYmplY3RUb1N0cmluZyhvYmo6IGFueSkge1xyXG4gICAgY29uc3Qgc291cmNlQSA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBPYmplY3Qua2V5cyhvYmopKSB7XHJcbiAgICAgIGlmICh0eXBlb2Ygb2JqW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgc291cmNlQS5wdXNoKGAke3Byb3B9OiR7dGhpcy5nZXRHcmFwaFFMVmFsdWUob2JqW3Byb3BdKX1gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBgeyR7c291cmNlQS5qb2luKCl9fWA7XHJcbiAgfVxyXG59XHJcbiJdfQ==
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFF1ZXJ5QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvZ3JhcGhxbFF1ZXJ5QnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFtQjs7Ozs7O0lBTXRDLFlBQW9CLFdBQW1CLEVBQUUsYUFBK0I7UUFBcEQsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFKdkMsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQUtmLElBQUksT0FBTyxhQUFhLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1NBQzVCO2FBQU0sSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUU7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM1QjthQUFNLElBQUksU0FBUyxLQUFLLGFBQWEsSUFBSSxDQUFDLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNoRSxNQUFNLElBQUksU0FBUyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7U0FDaEY7YUFBTSxJQUFJLFNBQVMsS0FBSyxhQUFhLEVBQUU7WUFDdEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzR0FBc0csYUFBYSxFQUFFLENBQUMsQ0FBQztTQUM1STtJQUNILENBQUM7Ozs7Ozs7O0lBTUQsTUFBTSxDQUFDLE9BQVk7UUFDakIsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO2dCQUN2QyxTQUFTO2FBQ1Y7O2tCQUNLLEdBQUcsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUks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Q25DLFNBQVM7YUFDVjtZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7SUFDL0IsQ0FBQztDQUNGOzs7SUFqSUMsb0NBQXlCOztJQUN6QixtQ0FBaUI7O0lBQ2pCLG1DQUFVOzs7OztJQUdFLDBDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBHcmFwaHFsUXVlcnlCdWlsZGVyIGNsYXNzIGlzIGEgbGliIHRoYXQgYWxyZWFkeSBleGlzdFxuICogYnV0IHdhcyBjYXVzaW5nIGlzc3VlcyB3aXRoIFR5cGVTY3JpcHQsIFJlcXVpcmVKUyBhbmQgb3RoZXIgYnVuZGxlci9wYWNrYWdlcnNcbiAqIGFuZCBzbyBJIHJld3JvdGUgaXQgaW4gcHVyZSBUeXBlU2NyaXB0LlxuICpcbiAqIFRoZSBwcmV2aW91cyBsaWIgY2FuIGJlIHZpZXdlZCBoZXJlIGF0IHRoaXMgR2l0aHViXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY29kZW1lYXNhbmR3aWNoL2dyYXBocWwtcXVlcnktYnVpbGRlclxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaHFsUXVlcnlCdWlsZGVyIHtcbiAgYWxpYXM6IHN0cmluZyB8IEZ1bmN0aW9uO1xuICBoZWFkOiBhbnlbXSA9IFtdO1xuICBib2R5OiBhbnk7XG5cbiAgLyogQ29uc3RydWN0b3IsIHF1ZXJ5L211dGF0b3IgeW91IHdpc2ggdG8gdXNlLCBhbmQgYW4gYWxpYXMgb3IgZmlsdGVyIGFyZ3VtZW50cy4gKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBxdWVyeUZuTmFtZTogc3RyaW5nLCBhbGlhc09yRmlsdGVyPzogc3RyaW5nIHwgb2JqZWN0KSB7XG4gICAgaWYgKHR5cGVvZiBhbGlhc09yRmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmFsaWFzID0gYWxpYXNPckZpbHRlcjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhbGlhc09yRmlsdGVyID09PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5maWx0ZXIoYWxpYXNPckZpbHRlcik7XG4gICAgfSBlbHNlIGlmICh1bmRlZmluZWQgPT09IGFsaWFzT3JGaWx0ZXIgJiYgMiA9PT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgWW91IGhhdmUgcGFzc2VkIHVuZGVmaW5lZCBhcyBTZWNvbmQgYXJndW1lbnQgdG8gXCJRdWVyeVwiYCk7XG4gICAgfSBlbHNlIGlmICh1bmRlZmluZWQgIT09IGFsaWFzT3JGaWx0ZXIpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFNlY29uZCBhcmd1bWVudCB0byBcIlF1ZXJ5XCIgc2hvdWxkIGJlIGFuIGFsaWFzIG5hbWUoU3RyaW5nKSBvciBmaWx0ZXIgYXJndW1lbnRzKE9iamVjdCkuIHdhcyBwYXNzZWQgJHthbGlhc09yRmlsdGVyfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcGFyYW1ldGVycyB0byBydW4gdGhlIHF1ZXJ5IGFnYWluc3QuXG4gICAqIEBwYXJhbSBmaWx0ZXJzIEFuIG9iamVjdCBtYXBwaW5nIGF0dHJpYnV0ZSB0byB2YWx1ZXNcbiAgICovXG4gIGZpbHRlcihmaWx0ZXJzOiBhbnkpIHtcbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMoZmlsdGVycykpIHtcbiAgICAgIGlmICh0eXBlb2YgZmlsdGVyc1twcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZ2V0R3JhcGhRTFZhbHVlKGZpbHRlcnNbcHJvcF0pO1xuICAgICAgaWYgKHZhbCA9PT0gJ3t9Jykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaGVhZC5wdXNoKGAke3Byb3B9OiR7dmFsfWApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBPdXRsaW5lcyB0aGUgcHJvcGVydGllcyB5b3Ugd2lzaCB0byBiZSByZXR1cm5lZCBmcm9tIHRoZSBxdWVyeS5cbiAgICogQHBhcmFtIHByb3BlcnRpZXMgcmVwcmVzZW50aW5nIGVhY2ggYXR0cmlidXRlIHlvdSB3YW50IFJldHVybmVkXG4gICAqL1xuICBmaW5kKC4uLnNlYXJjaGVzOiBhbnlbXSkgeyAvLyBUSElTIE5FRUQgVE8gQkUgQSBcIkZVTkNUSU9OXCIgdG8gc2NvcGUgJ2FyZ3VtZW50cydcbiAgICBpZiAoIXNlYXJjaGVzKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBmaW5kIHZhbHVlIGNhbiBub3QgYmUgPj5mYWxzeTw8YCk7XG4gICAgfVxuICAgIC8vIGlmIGl0cyBhIHN0cmluZy4uIGl0IG1heSBoYXZlIG90aGVyIHZhbHVlc1xuICAgIC8vIGVsc2UgaXQgc291bGQgYmUgYW4gT2JqZWN0IG9yIEFycmF5IG9mIG1hcGVkIHZhbHVlc1xuICAgIGNvbnN0IHNlYXJjaEtleXMgPSAoc2VhcmNoZXMubGVuZ3RoID09PSAxICYmIEFycmF5LmlzQXJyYXkoc2VhcmNoZXNbMF0pKSA/IHNlYXJjaGVzWzBdIDogc2VhcmNoZXM7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy5wYXJjZUZpbmQoc2VhcmNoS2V5cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogc2V0IGFuIGFsaWFzIGZvciB0aGlzIHJlc3VsdC5cbiAgICogQHBhcmFtIGFsaWFzXG4gICAqL1xuICBzZXRBbGlhcyhhbGlhczogc3RyaW5nKSB7XG4gICAgdGhpcy5hbGlhcyA9IGFsaWFzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0byB0aGUgZm9ybWF0dGVkIHF1ZXJ5IHN0cmluZ1xuICAgKiBAcmV0dXJuXG4gICAqL1xuICB0b1N0cmluZygpIHtcbiAgICBpZiAodGhpcy5ib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihgcmV0dXJuIHByb3BlcnRpZXMgYXJlIG5vdCBkZWZpbmVkLiB1c2UgdGhlICdmaW5kJyBmdW5jdGlvbiB0byBkZWZpbmVkIHRoZW1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYCR7KHRoaXMuYWxpYXMpID8gKHRoaXMuYWxpYXMgKyAnOicpIDogJyd9ICR7dGhpcy5xdWVyeUZuTmFtZX0gJHsodGhpcy5oZWFkLmxlbmd0aCA+IDApID8gJygnICsgdGhpcy5oZWFkLmpvaW4oJywnKSArICcpJyA6ICcnfSAgeyAke3RoaXMuYm9keX0gfWA7XG4gIH1cblxuICAvLyAtLVxuICAvLyBQUklWQVRFIEZVTkNUSU9OU1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHByaXZhdGUgcGFyY2VGaW5kKF9sZXZlbEE6IGFueVtdKSB7XG4gICAgY29uc3QgcHJvcHNBID0gX2xldmVsQS5tYXAoKGN1cnJlbnRWYWx1ZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW1YID0gX2xldmVsQVtpbmRleF07XG5cbiAgICAgIGlmIChpdGVtWCBpbnN0YW5jZW9mIEdyYXBocWxRdWVyeUJ1aWxkZXIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW1YLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1YKSAmJiB0eXBlb2YgaXRlbVggPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHByb3BzQUEgPSBPYmplY3Qua2V5cyhpdGVtWCk7XG4gICAgICAgIGlmICgxICE9PSBwcm9wc0FBLmxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKGBBbGlhcyBvYmplY3RzIHNob3VsZCBvbmx5IGhhdmUgb25lIHZhbHVlLiB3YXMgcGFzc2VkOiAke0pTT04uc3RyaW5naWZ5KGl0ZW1YKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9wUyA9IHByb3BzQUFbMF07XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtWFtwcm9wU107XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEdyYXBocWxRdWVyeUJ1aWxkZXIocHJvcFMpLmZpbmQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3Byb3BTfSA6ICR7aXRlbX0gYDtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW1YID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gaXRlbVg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgY2Fubm90IGhhbmRsZSBGaW5kIHZhbHVlIG9mICR7aXRlbVh9YCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvcHNBLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R3JhcGhRTFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEdyYXBoUUxWYWx1ZShpdGVtKTtcbiAgICAgIH0pLmpvaW4oKTtcbiAgICAgIHZhbHVlID0gYFske3ZhbHVlfV1gO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5vYmplY3RUb1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgb2JqZWN0VG9TdHJpbmcob2JqOiBhbnkpIHtcbiAgICBjb25zdCBzb3VyY2VBID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgaWYgKHR5cGVvZiBvYmpbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBzb3VyY2VBLnB1c2goYCR7cHJvcH06JHt0aGlzLmdldEdyYXBoUUxWYWx1ZShvYmpbcHJvcF0pfWApO1xuICAgIH1cbiAgICByZXR1cm4gYHske3NvdXJjZUEuam9pbigpfX1gO1xuICB9XG59XG4iXX0=
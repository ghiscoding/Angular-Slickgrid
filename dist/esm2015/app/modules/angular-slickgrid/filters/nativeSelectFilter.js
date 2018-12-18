/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OperatorType, } from './../models/index';
export class NativeSelectFilter {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
    }
    /**
     * @return {?}
     */
    get operator() {
        return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
    }
    /**
     * Initialize the Filter
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        /** @type {?} */
        let searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
            searchTerm = `${searchTerm}`;
        }
        // step 1, create HTML string template
        /** @type {?} */
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change((e) => {
            /** @type {?} */
            const value = e && e.target && e.target.value || '';
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered });
                this._clearFilterTriggered = false; // reset flag for next use
                this.$filterElm.removeClass('filled');
            }
            else {
                this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value] });
            }
        });
    }
    /**
     * Clear the filter values
     * @return {?}
     */
    clear() {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('change');
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            this.$filterElm.val(values);
        }
    }
    //
    // private functions
    // ------------------
    /**
     * @private
     * @return {?}
     */
    buildTemplateHtmlString() {
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const optionCollection = this.columnDef.filter.collection || [];
        /** @type {?} */
        const labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        /** @type {?} */
        const valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        /** @type {?} */
        let options = '';
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(x => typeof x === 'string')) {
            optionCollection.forEach((option) => {
                options += `<option value="${option}" label="${option}">${option}</option>`;
            });
        }
        else {
            optionCollection.forEach((option) => {
                if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')`);
                }
                /** @type {?} */
                const labelKey = option.labelKey || option[labelName];
                /** @type {?} */
                const textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
                options += `<option value="${option[valueName]}">${textLabel}</option>`;
            });
        }
        return `<select class="form-control search-filter filter-${fieldId}">${options}</select>`;
    }
    /**
     * From the html template string, create a DOM element
     * @private
     * @param {?} filterTemplate
     * @param {?=} searchTerm
     * @return {?}
     */
    createDomElement(filterTemplate, searchTerm) {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        /** @type {?} */
        const $filterElm = $(filterTemplate);
        /** @type {?} */
        const searchTermInput = (/** @type {?} */ ((searchTerm || '')));
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', `filter-${fieldId}`);
        $filterElm.data('columnId', fieldId);
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    NativeSelectFilter.prototype._clearFilterTriggered;
    /** @type {?} */
    NativeSelectFilter.prototype.$filterElm;
    /** @type {?} */
    NativeSelectFilter.prototype.grid;
    /** @type {?} */
    NativeSelectFilter.prototype.searchTerms;
    /** @type {?} */
    NativeSelectFilter.prototype.columnDef;
    /** @type {?} */
    NativeSelectFilter.prototype.callback;
    /**
     * @type {?}
     * @private
     */
    NativeSelectFilter.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlU2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL25hdGl2ZVNlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUtMLFlBQVksR0FHYixNQUFNLG1CQUFtQixDQUFDO0FBSzNCLE1BQU0sT0FBTyxrQkFBa0I7Ozs7SUFRN0IsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFQdkMsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBT1ksQ0FBQzs7OztJQUVuRCxJQUFJLFFBQVE7UUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQzNHLENBQUM7Ozs7OztJQUtELElBQUksQ0FBQyxJQUFxQjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDOzs7WUFHdEMsVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7UUFDL0UsSUFBSSxPQUFPLFVBQVUsS0FBSyxTQUFTLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ3JFLFVBQVUs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QUFDO1lBQzFFLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLG9EQUFvRCxPQUFPLEtBQUssT0FBTyxXQUFXLENBQUM7SUFDNUYsQ0FBQzs7Ozs7Ozs7SUFNTyxnQkFBZ0IsQ0FBQyxjQUFzQixFQUFFLFVBQXVCOztjQUNoRSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O2NBQzdDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztRQUN4RCxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7OztjQUdoQixVQUFVLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQzs7Y0FDOUIsZUFBZSxHQUFHLG1CQUFBLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFVO1FBRXBELFVBQVUsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLCtDQUErQztRQUMvQyxJQUFJLFVBQVUsSUFBSSxPQUFPLFVBQVUsQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQzNELFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakM7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7Ozs7OztJQXpJQyxtREFBc0M7O0lBQ3RDLHdDQUFnQjs7SUFDaEIsa0NBQVU7O0lBQ1YseUNBQTBCOztJQUMxQix1Q0FBa0I7O0lBQ2xCLHNDQUF5Qjs7Ozs7SUFFYix1Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQge1xuICBDb2x1bW4sXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFjayxcbiAgT3BlcmF0b3JUeXBlLFxuICBPcGVyYXRvclN0cmluZyxcbiAgU2VhcmNoVGVybSxcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBOYXRpdmVTZWxlY3RGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xuICBwcml2YXRlIF9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xuICAkZmlsdGVyRWxtOiBhbnk7XG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge31cblxuICBnZXQgb3BlcmF0b3IoKTogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcge1xuICAgIHJldHVybiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvcikgfHwgT3BlcmF0b3JUeXBlLmVxdWFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxuICAgKi9cbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcbiAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcblxuICAgIC8vIGZpbHRlciBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcbiAgICBsZXQgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xuICAgIGlmICh0eXBlb2Ygc2VhcmNoVGVybSA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBzZWFyY2hUZXJtID09PSAnbnVtYmVyJykge1xuICAgICAgc2VhcmNoVGVybSA9IGAke3NlYXJjaFRlcm19YDtcbiAgICB9XG5cbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxuICAgIGNvbnN0IGZpbHRlclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZygpO1xuXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgJiBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlLCBzZWFyY2hUZXJtKTtcblxuICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBjaGFuZ2UgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcbiAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIHRoaXMuJGZpbHRlckVsbS5jaGFuZ2UoKGU6IGFueSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlIHx8ICcnO1xuICAgICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgfSk7XG4gICAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7IC8vIHJlc2V0IGZsYWcgZm9yIG5leHQgdXNlXG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBbdmFsdWVdIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVzXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IHRydWU7XG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKCcnKTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2NoYW5nZScpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XG4gICAqL1xuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtIHwgU2VhcmNoVGVybVtdKSB7XG4gICAgaWYgKHZhbHVlcykge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCh2YWx1ZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHByaXZhdGUgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKSB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbkRlZiB8fCAhdGhpcy5jb2x1bW5EZWYuZmlsdGVyIHx8ICF0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY29sbGVjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiBmb3IgdGhlIFNlbGVjdCBGaWx0ZXIgdG8gd29yayBjb3JyZWN0bHkuIEFsc28gZWFjaCBvcHRpb24gc2hvdWxkIGluY2x1ZGUgYSB2YWx1ZS9sYWJlbCBwYWlyIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkuIEZvciBleGFtcGxlOjogeyBmaWx0ZXI6IG1vZGVsOiBGaWx0ZXJzLnNlbGVjdCwgY29sbGVjdGlvbjogW3sgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZScgfSwgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfWApO1xuICAgIH1cblxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICBjb25zdCBvcHRpb25Db2xsZWN0aW9uID0gdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmNvbGxlY3Rpb24gfHwgW107XG4gICAgY29uc3QgbGFiZWxOYW1lID0gKHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmUpID8gdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZS5sYWJlbCA6ICdsYWJlbCc7XG4gICAgY29uc3QgdmFsdWVOYW1lID0gKHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmUpID8gdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSA6ICd2YWx1ZSc7XG5cbiAgICBsZXQgb3B0aW9ucyA9ICcnO1xuXG4gICAgLy8gY29sbGVjdGlvbiBjb3VsZCBiZSBhbiBBcnJheSBvZiBTdHJpbmdzIE9SIE9iamVjdHNcbiAgICBpZiAob3B0aW9uQ29sbGVjdGlvbi5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcbiAgICAgIG9wdGlvbkNvbGxlY3Rpb24uZm9yRWFjaCgob3B0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgb3B0aW9ucyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9ufVwiIGxhYmVsPVwiJHtvcHRpb259XCI+JHtvcHRpb259PC9vcHRpb24+YDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogYW55KSA9PiB7XG4gICAgICAgIGlmICghb3B0aW9uIHx8IChvcHRpb25bbGFiZWxOYW1lXSA9PT0gdW5kZWZpbmVkICYmIG9wdGlvbi5sYWJlbEtleSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQSBjb2xsZWN0aW9uIHdpdGggdmFsdWUvbGFiZWwgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKSBpcyByZXF1aXJlZCB0byBwb3B1bGF0ZSB0aGUgU2VsZWN0IGxpc3QsIGZvciBleGFtcGxlOjogeyBmaWx0ZXI6IG1vZGVsOiBGaWx0ZXJzLnNlbGVjdCwgY29sbGVjdGlvbjogWyB7IHZhbHVlOiAnMScsIGxhYmVsOiAnT25lJyB9IF0nKWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhYmVsS2V5ID0gb3B0aW9uLmxhYmVsS2V5IHx8IG9wdGlvbltsYWJlbE5hbWVdO1xuICAgICAgICBjb25zdCB0ZXh0TGFiZWwgPSAoKG9wdGlvbi5sYWJlbEtleSB8fCB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuZW5hYmxlVHJhbnNsYXRlTGFiZWwpICYmIHRoaXMudHJhbnNsYXRlICYmIHR5cGVvZiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50ID09PSAnZnVuY3Rpb24nKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQobGFiZWxLZXkgfHwgJyAnKSA6IGxhYmVsS2V5O1xuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb25bdmFsdWVOYW1lXX1cIj4ke3RleHRMYWJlbH08L29wdGlvbj5gO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+JHtvcHRpb25zfTwvc2VsZWN0PmA7XG4gIH1cblxuICAvKipcbiAgICogRnJvbSB0aGUgaHRtbCB0ZW1wbGF0ZSBzdHJpbmcsIGNyZWF0ZSBhIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSBmaWx0ZXJUZW1wbGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlOiBzdHJpbmcsIHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xuICAgIGNvbnN0ICRmaWx0ZXJFbG0gPSAkKGZpbHRlclRlbXBsYXRlKTtcbiAgICBjb25zdCBzZWFyY2hUZXJtSW5wdXQgPSAoc2VhcmNoVGVybSB8fCAnJykgYXMgc3RyaW5nO1xuXG4gICAgJGZpbHRlckVsbS52YWwoc2VhcmNoVGVybUlucHV0KTtcbiAgICAkZmlsdGVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XG4gICAgJGZpbHRlckVsbS5kYXRhKCdjb2x1bW5JZCcsIGZpZWxkSWQpO1xuXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcbiAgICBpZiAoJGZpbHRlckVsbSAmJiB0eXBlb2YgJGZpbHRlckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJGZpbHRlckVsbTtcbiAgfVxufVxuIl19
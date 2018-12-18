/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class InputFilter {
    constructor() {
        this._clearFilterTriggered = false;
        this._inputType = 'text';
    }
    /**
     * Getter of input type (text, number, password)
     * @return {?}
     */
    get inputType() {
        return this._inputType;
    }
    /**
     * Setter of input type (text, number, password)
     * @param {?} type
     * @return {?}
     */
    set inputType(type) {
        this._inputType = type;
    }
    /**
     * Getter of the Operator to use when doing the filter comparing
     * @return {?}
     */
    get operator() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || '';
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @private
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
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
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        /** @type {?} */
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.on('keyup input change', (e) => {
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
     * Clear the filter value
     * @return {?}
     */
    clear() {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('keyup');
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('keyup input change').remove();
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
     * Create the HTML template as a string
     * @private
     * @return {?}
     */
    buildTemplateHtmlString() {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        return `<input type="${this._inputType || 'text'}" class="form-control search-filter filter-${fieldId}" placeholder="${placeholder}">`;
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
        $filterElm.val(searchTerm);
        $filterElm.attr('id', `filter-${fieldId}`);
        $filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterElm.addClass('filled');
        }
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
    InputFilter.prototype._clearFilterTriggered;
    /**
     * @type {?}
     * @private
     */
    InputFilter.prototype._inputType;
    /**
     * @type {?}
     * @private
     */
    InputFilter.prototype.$filterElm;
    /** @type {?} */
    InputFilter.prototype.grid;
    /** @type {?} */
    InputFilter.prototype.searchTerms;
    /** @type {?} */
    InputFilter.prototype.columnDef;
    /** @type {?} */
    InputFilter.prototype.callback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRGaWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvaW5wdXRGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWNBLE1BQU0sT0FBTyxXQUFXO0lBU3RCO1FBUlEsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLGVBQVUsR0FBRyxNQUFNLENBQUM7SUFPYixDQUFDOzs7OztJQUdoQixJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBR0QsSUFBSSxTQUFTLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOzs7OztJQUdELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO0lBQ3pGLENBQUM7Ozs7OztJQUdELElBQVksV0FBVztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0UsQ0FBQzs7Ozs7O0lBS0QsSUFBSSxDQUFDLElBQXFCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxD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QyxFQUFFOztjQUM3QyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFDeEQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzs7Y0FHaEIsVUFBVSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUM7UUFFcEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0MsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFckMsZ0ZBQWdGO1FBQ2hGLElBQUksVUFBVSxFQUFFO1lBQ2QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMvQjtRQUVELCtDQUErQztRQUMvQyxJQUFJLFVBQVUsSUFBSSxPQUFPLFVBQVUsQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQzNELFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakM7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7Ozs7OztJQXRJQyw0Q0FBc0M7Ozs7O0lBQ3RDLGlDQUE0Qjs7Ozs7SUFDNUIsaUNBQXdCOztJQUN4QiwyQkFBVTs7SUFDVixrQ0FBMEI7O0lBQzFCLGdDQUFrQjs7SUFDbEIsK0JBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRmlsdGVyLFxyXG4gIEZpbHRlckFyZ3VtZW50cyxcclxuICBGaWx0ZXJDYWxsYmFjayxcclxuICBHcmlkT3B0aW9uLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBPcGVyYXRvclN0cmluZyxcclxuICBTZWFyY2hUZXJtXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfaW5wdXRUeXBlID0gJ3RleHQnO1xyXG4gIHByaXZhdGUgJGZpbHRlckVsbTogYW55O1xyXG4gIGdyaWQ6IGFueTtcclxuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xyXG4gIGNvbHVtbkRlZjogQ29sdW1uO1xyXG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKiogR2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXHJcbiAgZ2V0IGlucHV0VHlwZSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnB1dFR5cGU7XHJcbiAgfVxyXG5cclxuICAvKiogU2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXHJcbiAgc2V0IGlucHV0VHlwZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2lucHV0VHlwZSA9IHR5cGU7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIG9mIHRoZSBPcGVyYXRvciB0byB1c2Ugd2hlbiBkb2luZyB0aGUgZmlsdGVyIGNvbXBhcmluZyAqL1xyXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvciB8fCAnJztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xyXG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XHJcblxyXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxyXG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xyXG5cclxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXHJcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKTtcclxuXHJcbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcclxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSwgc2VhcmNoVGVybSk7XHJcblxyXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXHJcbiAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtLm9uKCdrZXl1cCBpbnB1dCBjaGFuZ2UnLCAoZTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSB8fCAnJztcclxuICAgICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCB9KTtcclxuICAgICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlOyAvLyByZXNldCBmbGFnIGZvciBuZXh0IHVzZVxyXG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBbdmFsdWVdIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwoJycpO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udHJpZ2dlcigna2V5dXAnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2tleXVwIGlucHV0IGNoYW5nZScpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxyXG4gICAqL1xyXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm0pIHtcclxuICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCh2YWx1ZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkge1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XHJcbiAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwiJHt0aGlzLl9pbnB1dFR5cGUgfHwgJ3RleHQnfVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCI+YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gdGhlIGh0bWwgdGVtcGxhdGUgc3RyaW5nLCBjcmVhdGUgYSBET00gZWxlbWVudFxyXG4gICAqIEBwYXJhbSBmaWx0ZXJUZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZTogc3RyaW5nLCBzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XHJcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXHJcbiAgICBjb25zdCAkZmlsdGVyRWxtID0gJChmaWx0ZXJUZW1wbGF0ZSk7XHJcblxyXG4gICAgJGZpbHRlckVsbS52YWwoc2VhcmNoVGVybSk7XHJcbiAgICAkZmlsdGVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2ZpZWxkSWR9YCk7XHJcbiAgICAkZmlsdGVyRWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgaWYgKHNlYXJjaFRlcm0pIHtcclxuICAgICAgJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcclxuICAgIGlmICgkZmlsdGVyRWxtICYmIHR5cGVvZiAkZmlsdGVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICRmaWx0ZXJFbG0uYXBwZW5kVG8oJGhlYWRlckVsbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICRmaWx0ZXJFbG07XHJcbiAgfVxyXG59XHJcbiJdfQ==
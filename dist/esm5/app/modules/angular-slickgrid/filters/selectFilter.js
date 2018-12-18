/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { OperatorType, } from './../models/index';
import { castToPromise, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import { Subject } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
/** @type {?} */
var DOMPurify = DOMPurify_;
var SelectFilter = /** @class */ (function () {
    /**
     * Initialize the Filter
     */
    function SelectFilter(translate, collectionService, isMultipleSelect) {
        if (isMultipleSelect === void 0) { isMultipleSelect = true; }
        var _this = this;
        this.translate = translate;
        this.collectionService = collectionService;
        this.isMultipleSelect = isMultipleSelect;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        this.subscriptions = [];
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        /** @type {?} */
        var options = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            // input search term on top of the select option list
            maxHeight: 275,
            single: true,
            textTemplate: function ($elm) {
                // render HTML code or not, by default it is sanitized and won't be rendered
                /** @type {?} */
                var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.filter && _this.columnDef.filter.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            },
            onClose: function () {
                // we will subscribe to the onClose event for triggering our callback
                // also add/remove "filled" class for styling purposes
                /** @type {?} */
                var selectedItems = _this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 0) {
                    _this.isFilled = true;
                    _this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    _this.isFilled = false;
                    _this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
                }
                _this.callback(undefined, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: selectedItems });
            }
        };
        if (this.isMultipleSelect) {
            options.single = false;
            options.okButton = true;
            options.addTitle = true; // show tooltip of all selected items while hovering the filter
            options.countSelected = this.translate.instant('X_OF_Y_SELECTED');
            options.allSelected = this.translate.instant('ALL_SELECTED');
            options.selectAllText = this.translate.instant('SELECT_ALL');
            options.selectAllDelimiter = ['', '']; // remove default square brackets of default text "[Select All]" => "Select All"
        }
        this.defaultOptions = options;
    }
    Object.defineProperty(SelectFilter.prototype, "columnFilter", {
        /** Getter for the Column Filter itself */
        get: /**
         * Getter for the Column Filter itself
         * @protected
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "collectionOptions", {
        /** Getter for the Collection Options */
        get: /**
         * Getter for the Collection Options
         * @protected
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "customStructure", {
        /** Getter for the Custom Structure if exist */
        get: /**
         * Getter for the Custom Structure if exist
         * @protected
         * @return {?}
         */
        function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: /**
         * Getter for the Grid Options pulled through the Grid Object
         * @protected
         * @return {?}
         */
        function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "operator", {
        /** Getter for the filter operator */
        get: /**
         * Getter for the filter operator
         * @return {?}
         */
        function () {
            if (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator;
            }
            return this.isMultipleSelect ? OperatorType.in : OperatorType.equal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the filter template
     */
    /**
     * Initialize the filter template
     * @param {?} args
     * @return {?}
     */
    SelectFilter.prototype.init = /**
     * Initialize the filter template
     * @param {?} args
     * @return {?}
     */
    function (args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this.translate || typeof this.translate.instant !== 'function')) {
            throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Filter to work correctly");
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        /** @type {?} */
        var newCollection = this.columnFilter.collection || [];
        this.renderDomElement(newCollection);
        // on every Filter which have a "collection" or a "collectionAsync"
        // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
        // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
        /** @type {?} */
        var collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
        if (collectionAsync) {
            this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
        }
    };
    /**
     * Clear the filter values
     */
    /**
     * Clear the filter values
     * @return {?}
     */
    SelectFilter.prototype.clear = /**
     * Clear the filter values
     * @return {?}
     */
    function () {
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            this.$filterElm.multipleSelect('setSelects', []);
            this.$filterElm.removeClass('filled');
            this.searchTerms = [];
            this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true });
        }
    };
    /**
     * destroy the filter
     */
    /**
     * destroy the filter
     * @return {?}
     */
    SelectFilter.prototype.destroy = /**
     * destroy the filter
     * @return {?}
     */
    function () {
        if (this.$filterElm) {
            // remove event watcher
            this.$filterElm.off().remove();
        }
        // also dispose of all Subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
    };
    /**
     * Set value(s) on the DOM element
     */
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    SelectFilter.prototype.setValues = /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values) {
            values = Array.isArray(values) ? values : [values];
            this.$filterElm.multipleSelect('setSelects', values);
        }
    };
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    SelectFilter.prototype.filterCollection = 
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    function (inputCollection) {
        /** @type {?} */
        var outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
            /** @type {?} */
            var filterBy = this.columnFilter.collectionFilterBy;
            /** @type {?} */
            var filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    };
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    SelectFilter.prototype.sortCollection = /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    function (inputCollection) {
        /** @type {?} */
        var outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
            /** @type {?} */
            var sortBy = this.columnFilter.collectionSortBy;
            outputCollection = this.collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    };
    /**
     * @protected
     * @param {?} collectionAsync
     * @return {?}
     */
    SelectFilter.prototype.renderOptionsAsync = /**
     * @protected
     * @param {?} collectionAsync
     * @return {?}
     */
    function (collectionAsync) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var awaitedCollection;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        awaitedCollection = [];
                        if (!collectionAsync) return [3 /*break*/, 2];
                        return [4 /*yield*/, castToPromise(collectionAsync)];
                    case 1:
                        awaitedCollection = _a.sent();
                        this.renderDomElementFromCollectionAsync(awaitedCollection);
                        // because we accept Promises & HttpClient Observable only execute once
                        // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                        // doing this provide the user a way to call a "collectionAsync.next()"
                        this.createCollectionAsyncSubject();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
    /**
     * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
     * @protected
     * @return {?}
     */
    SelectFilter.prototype.createCollectionAsyncSubject = /**
     * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var newCollectionAsync = new Subject();
        this.columnFilter.collectionAsync = newCollectionAsync;
        this.subscriptions.push(newCollectionAsync.subscribe(function (collection) { return _this.renderDomElementFromCollectionAsync(collection); }));
    };
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     */
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     * @protected
     * @param {?} collection
     * @return {?}
     */
    SelectFilter.prototype.renderDomElementFromCollectionAsync = /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     * @protected
     * @param {?} collection
     * @return {?}
     */
    function (collection) {
        if (this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the Select Filter, the collection is not a valid array.');
        }
        // copy over the array received from the async call to the "collection" as the new collection to use
        // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
        this.columnFilter.collection = collection;
        // recreate Multiple Select after getting async collection
        this.renderDomElement(collection);
    };
    /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    SelectFilter.prototype.renderDomElement = /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    function (collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Select Filter is not a valid array');
        }
        // user can optionally add a blank entry at the beginning of the collection
        if (this.collectionOptions && this.collectionOptions.addBlankEntry) {
            collection.unshift(this.createBlankEntry());
        }
        /** @type {?} */
        var newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        /** @type {?} */
        var filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);
        // step 2, create the DOM Element of the filter & pre-load search terms
        // also subscribe to the onClose event
        this.createDomElement(filterTemplate);
    };
    /**
     * Create the HTML template as a string
     */
    /**
     * Create the HTML template as a string
     * @protected
     * @param {?} optionCollection
     * @param {?} searchTerms
     * @return {?}
     */
    SelectFilter.prototype.buildTemplateHtmlString = /**
     * Create the HTML template as a string
     * @protected
     * @param {?} optionCollection
     * @param {?} searchTerms
     * @return {?}
     */
    function (optionCollection, searchTerms) {
        var _this = this;
        /** @type {?} */
        var options = '';
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        /** @type {?} */
        var isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
        /** @type {?} */
        var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(function (x) { return typeof x === 'string'; })) {
            optionCollection.forEach(function (option) {
                /** @type {?} */
                var selected = (searchTerms.findIndex(function (term) { return term === option; }) >= 0) ? 'selected' : '';
                options += "<option value=\"" + option + "\" label=\"" + option + "\" " + selected + ">" + option + "</option>";
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    _this.isFilled = true;
                }
            });
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            optionCollection.forEach(function (option) {
                if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error("[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')");
                }
                /** @type {?} */
                var labelKey = (/** @type {?} */ ((option.labelKey || option[_this.labelName])));
                /** @type {?} */
                var selected = (searchTerms.findIndex(function (term) { return term === option[_this.valueName]; }) >= 0) ? 'selected' : '';
                /** @type {?} */
                var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this.translate.instant(labelKey || ' ') : labelKey;
                /** @type {?} */
                var prefixText = option[_this.labelPrefixName] || '';
                /** @type {?} */
                var suffixText = option[_this.labelSuffixName] || '';
                /** @type {?} */
                var optionLabel = option[_this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this.translate.instant(prefixText || ' ') : prefixText;
                suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this.translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this.translate.instant(optionLabel || ' ') : optionLabel;
                // add to a temp array for joining purpose and filter out empty text
                /** @type {?} */
                var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                /** @type {?} */
                var optionText = tmpOptionArray.join(separatorBetweenLabels);
                // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                if (isRenderHtmlEnabled) {
                    // sanitize any unauthorized html tags like script and others
                    // for the remaining allowed tags we'll permit all attributes
                    /** @type {?} */
                    var sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
                    optionText = htmlEncode(sanitizedText);
                }
                // html text of each select option
                options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\" " + selected + ">" + optionText + "</option>";
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    _this.isFilled = true;
                }
            });
        }
        return "<select class=\"ms-filter search-filter filter-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
    };
    /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
    /**
     * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
     * @protected
     * @return {?}
     */
    SelectFilter.prototype.createBlankEntry = /**
     * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
     * @protected
     * @return {?}
     */
    function () {
        var _a;
        /** @type {?} */
        var blankEntry = (_a = {},
            _a[this.labelName] = '',
            _a[this.valueName] = '',
            _a);
        if (this.labelPrefixName) {
            blankEntry[this.labelPrefixName] = '';
        }
        if (this.labelSuffixName) {
            blankEntry[this.labelSuffixName] = '';
        }
        return blankEntry;
    };
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param filterTemplate
     */
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @protected
     * @param {?} filterTemplate
     * @return {?}
     */
    SelectFilter.prototype.createDomElement = /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @protected
     * @param {?} filterTemplate
     * @return {?}
     */
    function (filterTemplate) {
        /** @type {?} */
        var fieldId = this.columnDef && this.columnDef.id;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        this.elementName = "filter-" + fieldId;
        this.defaultOptions.name = this.elementName;
        /** @type {?} */
        var $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
        }
        this.$filterElm.attr('id', this.elementName);
        this.$filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (this.isFilled) {
            this.$filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        // merge options & attach multiSelect
        /** @type {?} */
        var elementOptions = tslib_1.__assign({}, this.defaultOptions, this.columnFilter.filterOptions);
        this.filterElmOptions = tslib_1.__assign({}, this.defaultOptions, elementOptions);
        this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
    };
    return SelectFilter;
}());
export { SelectFilter };
if (false) {
    /**
     * DOM Element Name, useful for auto-detecting positioning (dropup / dropdown)
     * @type {?}
     */
    SelectFilter.prototype.elementName;
    /**
     * Filter Multiple-Select options
     * @type {?}
     */
    SelectFilter.prototype.filterElmOptions;
    /**
     * The JQuery DOM element
     * @type {?}
     */
    SelectFilter.prototype.$filterElm;
    /** @type {?} */
    SelectFilter.prototype.grid;
    /** @type {?} */
    SelectFilter.prototype.searchTerms;
    /** @type {?} */
    SelectFilter.prototype.columnDef;
    /** @type {?} */
    SelectFilter.prototype.callback;
    /** @type {?} */
    SelectFilter.prototype.defaultOptions;
    /** @type {?} */
    SelectFilter.prototype.isFilled;
    /** @type {?} */
    SelectFilter.prototype.labelName;
    /** @type {?} */
    SelectFilter.prototype.labelPrefixName;
    /** @type {?} */
    SelectFilter.prototype.labelSuffixName;
    /** @type {?} */
    SelectFilter.prototype.optionLabel;
    /** @type {?} */
    SelectFilter.prototype.valueName;
    /** @type {?} */
    SelectFilter.prototype.enableTranslateLabel;
    /** @type {?} */
    SelectFilter.prototype.subscriptions;
    /**
     * @type {?}
     * @protected
     */
    SelectFilter.prototype.translate;
    /**
     * @type {?}
     * @protected
     */
    SelectFilter.prototype.collectionService;
    /**
     * @type {?}
     * @protected
     */
    SelectFilter.prototype.isMultipleSelect;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFVTCxZQUFZLEdBSWIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BILE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sS0FBSyxVQUFVLE1BQU0sV0FBVyxDQUFDOztJQUNsQyxTQUFTLEdBQUcsVUFBVTtBQUs1QjtJQXdCRTs7T0FFRztJQUNILHNCQUFzQixTQUEyQixFQUFZLGlCQUFvQyxFQUFZLGdCQUF1QjtRQUF2QixpQ0FBQSxFQUFBLHVCQUF1QjtRQUFwSSxpQkEyQ0M7UUEzQ3FCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFZLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBTztRQVpwSSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBTWpCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFtQixFQUFFLENBQUM7OztZQU8zQixPQUFPLEdBQXlCO1lBQ3BDLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1Qiw2QkFBNkIsRUFBRSxJQUFJO1lBQ25DLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLE1BQU0sRUFBRSxLQUFLOztZQUNiLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFFWixZQUFZLEVBQUUsVUFBQyxJQUFJOzs7b0JBRVgsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLFNBQVMsSUFBSSxLQUFJ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QUFrQjs7SUFDbEIsNENBQTZCOztJQUM3QixxQ0FBbUM7Ozs7O0lBS3ZCLGlDQUFxQzs7Ozs7SUFBRSx5Q0FBOEM7Ozs7O0lBQUUsd0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSxcbiAgQ29sbGVjdGlvbk9wdGlvbixcbiAgQ29sdW1uLFxuICBDb2x1bW5GaWx0ZXIsXG4gIEZpbHRlcixcbiAgRmlsdGVyQXJndW1lbnRzLFxuICBGaWx0ZXJDYWxsYmFjayxcbiAgR3JpZE9wdGlvbixcbiAgTXVsdGlwbGVTZWxlY3RPcHRpb24sXG4gIE9wZXJhdG9yVHlwZSxcbiAgT3BlcmF0b3JTdHJpbmcsXG4gIFNlYXJjaFRlcm0sXG4gIFNlbGVjdE9wdGlvbixcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2NvbGxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBjYXN0VG9Qcm9taXNlLCBnZXREZXNjZW5kYW50UHJvcGVydHksIGh0bWxFbmNvZGUsIHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXMgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBET01QdXJpZnlfIGZyb20gJ2RvbXB1cmlmeSc7XG5jb25zdCBET01QdXJpZnkgPSBET01QdXJpZnlfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0RmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcbiAgLyoqIERPTSBFbGVtZW50IE5hbWUsIHVzZWZ1bCBmb3IgYXV0by1kZXRlY3RpbmcgcG9zaXRpb25pbmcgKGRyb3B1cCAvIGRyb3Bkb3duKSAqL1xuICBlbGVtZW50TmFtZTogc3RyaW5nO1xuXG4gIC8qKiBGaWx0ZXIgTXVsdGlwbGUtU2VsZWN0IG9wdGlvbnMgKi9cbiAgZmlsdGVyRWxtT3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb247XG5cbiAgLyoqIFRoZSBKUXVlcnkgRE9NIGVsZW1lbnQgKi9cbiAgJGZpbHRlckVsbTogYW55O1xuXG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcbiAgZGVmYXVsdE9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uO1xuICBpc0ZpbGxlZCA9IGZhbHNlO1xuICBsYWJlbE5hbWU6IHN0cmluZztcbiAgbGFiZWxQcmVmaXhOYW1lOiBzdHJpbmc7XG4gIGxhYmVsU3VmZml4TmFtZTogc3RyaW5nO1xuICBvcHRpb25MYWJlbDogc3RyaW5nO1xuICB2YWx1ZU5hbWU6IHN0cmluZztcbiAgZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSBmYWxzZTtcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcm90ZWN0ZWQgY29sbGVjdGlvblNlcnZpY2U6IENvbGxlY3Rpb25TZXJ2aWNlLCBwcm90ZWN0ZWQgaXNNdWx0aXBsZVNlbGVjdCA9IHRydWUpIHtcbiAgICAvLyBkZWZhdWx0IG9wdGlvbnMgdXNlZCBieSB0aGlzIEZpbHRlciwgdXNlciBjYW4gb3ZlcndyaXRlIGFueSBvZiB0aGVzZSBieSBwYXNzaW5nIFwib3Rpb25zXCJcbiAgICBjb25zdCBvcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbiA9IHtcbiAgICAgIGF1dG9BZGp1c3REcm9wSGVpZ2h0OiB0cnVlLFxuICAgICAgYXV0b0FkanVzdERyb3BQb3NpdGlvbjogdHJ1ZSxcbiAgICAgIGF1dG9BZGp1c3REcm9wV2lkdGhCeVRleHRTaXplOiB0cnVlLFxuICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICBmaWx0ZXI6IGZhbHNlLCAgLy8gaW5wdXQgc2VhcmNoIHRlcm0gb24gdG9wIG9mIHRoZSBzZWxlY3Qgb3B0aW9uIGxpc3RcbiAgICAgIG1heEhlaWdodDogMjc1LFxuICAgICAgc2luZ2xlOiB0cnVlLFxuXG4gICAgICB0ZXh0VGVtcGxhdGU6ICgkZWxtKSA9PiB7XG4gICAgICAgIC8vIHJlbmRlciBIVE1MIGNvZGUgb3Igbm90LCBieSBkZWZhdWx0IGl0IGlzIHNhbml0aXplZCBhbmQgd29uJ3QgYmUgcmVuZGVyZWRcbiAgICAgICAgY29uc3QgaXNSZW5kZXJIdG1sRW5hYmxlZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuZW5hYmxlUmVuZGVySHRtbCB8fCBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGlzUmVuZGVySHRtbEVuYWJsZWQgPyAkZWxtLnRleHQoKSA6ICRlbG0uaHRtbCgpO1xuICAgICAgfSxcbiAgICAgIG9uQ2xvc2U6ICgpID0+IHtcbiAgICAgICAgLy8gd2Ugd2lsbCBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnQgZm9yIHRyaWdnZXJpbmcgb3VyIGNhbGxiYWNrXG4gICAgICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QoJ2dldFNlbGVjdHMnKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtcykgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5pc0ZpbGxlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKS5zaWJsaW5ncygnZGl2IC5zZWFyY2gtZmlsdGVyJykuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaXNGaWxsZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpLnNpYmxpbmdzKCdkaXYgLnNlYXJjaC1maWx0ZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbGxiYWNrKHVuZGVmaW5lZCwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IHNlbGVjdGVkSXRlbXMgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3QpIHtcbiAgICAgIG9wdGlvbnMuc2luZ2xlID0gZmFsc2U7XG4gICAgICBvcHRpb25zLm9rQnV0dG9uID0gdHJ1ZTtcbiAgICAgIG9wdGlvbnMuYWRkVGl0bGUgPSB0cnVlOyAvLyBzaG93IHRvb2x0aXAgb2YgYWxsIHNlbGVjdGVkIGl0ZW1zIHdoaWxlIGhvdmVyaW5nIHRoZSBmaWx0ZXJcbiAgICAgIG9wdGlvbnMuY291bnRTZWxlY3RlZCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1hfT0ZfWV9TRUxFQ1RFRCcpO1xuICAgICAgb3B0aW9ucy5hbGxTZWxlY3RlZCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0FMTF9TRUxFQ1RFRCcpO1xuICAgICAgb3B0aW9ucy5zZWxlY3RBbGxUZXh0ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU0VMRUNUX0FMTCcpO1xuICAgICAgb3B0aW9ucy5zZWxlY3RBbGxEZWxpbWl0ZXIgPSBbJycsICcnXTsgLy8gcmVtb3ZlIGRlZmF1bHQgc3F1YXJlIGJyYWNrZXRzIG9mIGRlZmF1bHQgdGV4dCBcIltTZWxlY3QgQWxsXVwiID0+IFwiU2VsZWN0IEFsbFwiXG4gICAgfVxuXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIEZpbHRlciBpdHNlbGYgKi9cbiAgcHJvdGVjdGVkIGdldCBjb2x1bW5GaWx0ZXIoKTogQ29sdW1uRmlsdGVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyO1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbGxlY3Rpb24gT3B0aW9ucyAqL1xuICBwcm90ZWN0ZWQgZ2V0IGNvbGxlY3Rpb25PcHRpb25zKCk6IENvbGxlY3Rpb25PcHRpb24ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmNvbGxlY3Rpb25PcHRpb25zO1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEN1c3RvbSBTdHJ1Y3R1cmUgaWYgZXhpc3QgKi9cbiAgcHJvdGVjdGVkIGdldCBjdXN0b21TdHJ1Y3R1cmUoKTogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlO1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJvdGVjdGVkIGdldCBncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgZmlsdGVyIG9wZXJhdG9yICovXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XG4gICAgaWYgKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yO1xuICAgIH1cbiAgICByZXR1cm4gIHRoaXMuaXNNdWx0aXBsZVNlbGVjdCA/IE9wZXJhdG9yVHlwZS5pbiA6IE9wZXJhdG9yVHlwZS5lcXVhbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBmaWx0ZXIgdGVtcGxhdGVcbiAgICovXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xuICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XG5cbiAgICBpZiAoIXRoaXMuZ3JpZCB8fCAhdGhpcy5jb2x1bW5EZWYgfHwgIXRoaXMuY29sdW1uRmlsdGVyIHx8ICghdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiAmJiAhdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkFzeW5jKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiAob3IgXCJjb2xsZWN0aW9uQXN5bmNcIikgZm9yIHRoZSBNdWx0aXBsZVNlbGVjdC9TaW5nbGVTZWxlY3QgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5LiBBbHNvIGVhY2ggb3B0aW9uIHNob3VsZCBpbmNsdWRlIGEgdmFsdWUvbGFiZWwgcGFpciAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpLiBGb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5tdWx0aXBsZVNlbGVjdCwgY29sbGVjdGlvbjogW3sgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZScgfSwgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfWApO1xuICAgIH1cblxuICAgIHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSB0aGlzLmNvbHVtbkZpbHRlci5lbmFibGVUcmFuc2xhdGVMYWJlbDtcbiAgICB0aGlzLmxhYmVsTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsIHx8ICdsYWJlbCc7XG4gICAgdGhpcy5sYWJlbFByZWZpeE5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5sYWJlbFByZWZpeCB8fCAnbGFiZWxQcmVmaXgnO1xuICAgIHRoaXMubGFiZWxTdWZmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxTdWZmaXggfHwgJ2xhYmVsU3VmZml4JztcbiAgICB0aGlzLm9wdGlvbkxhYmVsID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUub3B0aW9uTGFiZWwgfHwgJ3ZhbHVlJztcbiAgICB0aGlzLnZhbHVlTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLnZhbHVlIHx8ICd2YWx1ZSc7XG5cbiAgICBpZiAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiAoIXRoaXMudHJhbnNsYXRlIHx8IHR5cGVvZiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50ICE9PSAnZnVuY3Rpb24nKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbc2VsZWN0LWVkaXRvcl0gVGhlIG5neC10cmFuc2xhdGUgVHJhbnNsYXRlU2VydmljZSBpcyByZXF1aXJlZCBmb3IgdGhlIFNlbGVjdCBGaWx0ZXIgdG8gd29yayBjb3JyZWN0bHlgKTtcbiAgICB9XG5cbiAgICAvLyBhbHdheXMgcmVuZGVyIHRoZSBTZWxlY3QgKGRyb3Bkb3duKSBET00gZWxlbWVudCwgZXZlbiBpZiB1c2VyIHBhc3NlZCBhIFwiY29sbGVjdGlvbkFzeW5jXCIsXG4gICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgdGhlIFNlbGVjdCB3aWxsIHNpbXBseSBiZSB3aXRob3V0IGFueSBvcHRpb25zIGJ1dCB3ZSBzdGlsbCBoYXZlIHRvIHJlbmRlciBpdCAoZWxzZSBTbGlja0dyaWQgd291bGQgdGhyb3cgYW4gZXJyb3IpXG4gICAgY29uc3QgbmV3Q29sbGVjdGlvbiA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gfHwgW107XG4gICAgdGhpcy5yZW5kZXJEb21FbGVtZW50KG5ld0NvbGxlY3Rpb24pO1xuXG4gICAgLy8gb24gZXZlcnkgRmlsdGVyIHdoaWNoIGhhdmUgYSBcImNvbGxlY3Rpb25cIiBvciBhIFwiY29sbGVjdGlvbkFzeW5jXCJcbiAgICAvLyB3ZSB3aWxsIGFkZCAob3IgcmVwbGFjZSkgYSBTdWJqZWN0IHRvIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIHByb3BlcnR5IHNvIHRoYXQgdXNlciBoYXMgcG9zc2liaWxpdHkgdG8gY2hhbmdlIHRoZSBjb2xsZWN0aW9uXG4gICAgLy8gaWYgXCJjb2xsZWN0aW9uQXN5bmNcIiBpcyBhbHJlYWR5IHNldCBieSB0aGUgdXNlciwgaXQgd2lsbCByZXNvbHZlIGl0IGZpcnN0IHRoZW4gYWZ0ZXIgaXQgd2lsbCByZXBsYWNlIGl0IHdpdGggYSBTdWJqZWN0XG4gICAgY29uc3QgY29sbGVjdGlvbkFzeW5jID0gdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkFzeW5jO1xuICAgIGlmIChjb2xsZWN0aW9uQXN5bmMpIHtcbiAgICAgIHRoaXMucmVuZGVyT3B0aW9uc0FzeW5jKGNvbGxlY3Rpb25Bc3luYyk7IC8vIGNyZWF0ZSBTdWJqZWN0IGFmdGVyIHJlc29sdmUgKGNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVzXG4gICAqL1xuICBjbGVhcigpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtICYmIHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCkge1xuICAgICAgLy8gcmVsb2FkIHRoZSBmaWx0ZXIgZWxlbWVudCBieSBpdCdzIGlkLCB0byBtYWtlIHN1cmUgaXQncyBzdGlsbCBhIHZhbGlkIGVsZW1lbnQgKGJlY2F1c2Ugb2Ygc29tZSBpc3N1ZSBpbiB0aGUgR3JhcGhRTCBleGFtcGxlKVxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdzZXRTZWxlY3RzJywgW10pO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcbiAgICAgIHRoaXMuY2FsbGJhY2sodW5kZWZpbmVkLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgLy8gcmVtb3ZlIGV2ZW50IHdhdGNoZXJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyBhbHNvIGRpc3Bvc2Ugb2YgYWxsIFN1YnNjcmlwdGlvbnNcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuc3Vic2NyaXB0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybSB8IFNlYXJjaFRlcm1bXSkge1xuICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgIHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWVzKSA/IHZhbHVlcyA6IFt2YWx1ZXNdO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdzZXRTZWxlY3RzJywgdmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBwcm90ZWN0ZWQgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxuICAgKiBAcmV0dXJuIG91dHB1dENvbGxlY3Rpb24gZmlsdGVyZWQgYW5kL29yIHNvcnRlZCBjb2xsZWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgZmlsdGVyQ29sbGVjdGlvbihpbnB1dENvbGxlY3Rpb24pIHtcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcblxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxuICAgIGlmICh0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uRmlsdGVyQnkpIHtcbiAgICAgIGNvbnN0IGZpbHRlckJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5O1xuICAgICAgY29uc3QgZmlsdGVyQ29sbGVjdGlvbkJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbk9wdGlvbnMuZmlsdGVyUmVzdWx0QWZ0ZXJFYWNoUGFzcyB8fCBudWxsO1xuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvblNlcnZpY2UuZmlsdGVyQ29sbGVjdGlvbihvdXRwdXRDb2xsZWN0aW9uLCBmaWx0ZXJCeSwgZmlsdGVyQ29sbGVjdGlvbkJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvbiBpbiBhIGNlcnRhaW4gd2F5XG4gICAqIEBwYXJhbSBpbnB1dENvbGxlY3Rpb25cbiAgICogQHJldHVybiBvdXRwdXRDb2xsZWN0aW9uIGZpbHRlcmVkIGFuZC9vciBzb3J0ZWQgY29sbGVjdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIHNvcnRDb2xsZWN0aW9uKGlucHV0Q29sbGVjdGlvbikge1xuICAgIGxldCBvdXRwdXRDb2xsZWN0aW9uID0gaW5wdXRDb2xsZWN0aW9uO1xuXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIHNvcnQgdGhlIGNvbGxlY3Rpb25cbiAgICBpZiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvblNvcnRCeSkge1xuICAgICAgY29uc3Qgc29ydEJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvblNvcnRCeTtcbiAgICAgIG91dHB1dENvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25TZXJ2aWNlLnNvcnRDb2xsZWN0aW9uKG91dHB1dENvbGxlY3Rpb24sIHNvcnRCeSwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcmVuZGVyT3B0aW9uc0FzeW5jKGNvbGxlY3Rpb25Bc3luYzogUHJvbWlzZTxhbnk+IHwgT2JzZXJ2YWJsZTxhbnk+IHwgU3ViamVjdDxhbnk+KSB7XG4gICAgbGV0IGF3YWl0ZWRDb2xsZWN0aW9uOiBhbnkgPSBbXTtcblxuICAgIGlmIChjb2xsZWN0aW9uQXN5bmMpIHtcbiAgICAgIGF3YWl0ZWRDb2xsZWN0aW9uID0gYXdhaXQgY2FzdFRvUHJvbWlzZShjb2xsZWN0aW9uQXN5bmMpO1xuICAgICAgdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhhd2FpdGVkQ29sbGVjdGlvbik7XG5cbiAgICAgIC8vIGJlY2F1c2Ugd2UgYWNjZXB0IFByb21pc2VzICYgSHR0cENsaWVudCBPYnNlcnZhYmxlIG9ubHkgZXhlY3V0ZSBvbmNlXG4gICAgICAvLyB3ZSB3aWxsIHJlLWNyZWF0ZSBhbiBSeEpzIFN1YmplY3Qgd2hpY2ggd2lsbCByZXBsYWNlIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIHdoaWNoIGdvdCBleGVjdXRlZCBvbmNlIGFueXdheVxuICAgICAgLy8gZG9pbmcgdGhpcyBwcm92aWRlIHRoZSB1c2VyIGEgd2F5IHRvIGNhbGwgYSBcImNvbGxlY3Rpb25Bc3luYy5uZXh0KClcIlxuICAgICAgdGhpcy5jcmVhdGVDb2xsZWN0aW9uQXN5bmNTdWJqZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENyZWF0ZSBvciByZWNyZWF0ZSBhbiBPYnNlcnZhYmxlIFN1YmplY3QgYW5kIHJlYXNzaWduIGl0IHRvIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIG9iamVjdCBzbyB1c2VyIGNhbiBjYWxsIGEgXCJjb2xsZWN0aW9uQXN5bmMubmV4dCgpXCIgb24gaXQgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QoKSB7XG4gICAgY29uc3QgbmV3Q29sbGVjdGlvbkFzeW5jID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYyA9IG5ld0NvbGxlY3Rpb25Bc3luYztcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIG5ld0NvbGxlY3Rpb25Bc3luYy5zdWJzY3JpYmUoY29sbGVjdGlvbiA9PiB0aGlzLnJlbmRlckRvbUVsZW1lbnRGcm9tQ29sbGVjdGlvbkFzeW5jKGNvbGxlY3Rpb24pKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB1c2VyIHVzZSBhIENvbGxlY3Rpb25Bc3luYyB3ZSB3aWxsIHVzZSB0aGUgcmV0dXJuZWQgY29sbGVjdGlvbiB0byByZW5kZXIgdGhlIGZpbHRlciBET00gZWxlbWVudFxuICAgKiBhbmQgcmVpbml0aWFsaXplIGZpbHRlciBjb2xsZWN0aW9uIHdpdGggdGhpcyBuZXcgY29sbGVjdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIHJlbmRlckRvbUVsZW1lbnRGcm9tQ29sbGVjdGlvbkFzeW5jKGNvbGxlY3Rpb24pIHtcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KSB7XG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHB1bGwgdGhlIGNvbGxlY3Rpb24gZnJvbSB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBjYWxsIGluIHRoZSBTZWxlY3QgRmlsdGVyLCB0aGUgY29sbGVjdGlvbiBpcyBub3QgYSB2YWxpZCBhcnJheS4nKTtcbiAgICB9XG5cbiAgICAvLyBjb3B5IG92ZXIgdGhlIGFycmF5IHJlY2VpdmVkIGZyb20gdGhlIGFzeW5jIGNhbGwgdG8gdGhlIFwiY29sbGVjdGlvblwiIGFzIHRoZSBuZXcgY29sbGVjdGlvbiB0byB1c2VcbiAgICAvLyB0aGlzIGhhcyB0byBiZSBCRUZPUkUgdGhlIGBjb2xsZWN0aW9uT2JzZXJ2ZXIoKS5zdWJzY3JpYmVgIHRvIGF2b2lkIGdvaW5nIGludG8gYW4gaW5maW5pdGUgbG9vcFxuICAgIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuXG4gICAgLy8gcmVjcmVhdGUgTXVsdGlwbGUgU2VsZWN0IGFmdGVyIGdldHRpbmcgYXN5bmMgY29sbGVjdGlvblxuICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW5kZXJEb21FbGVtZW50KGNvbGxlY3Rpb24pIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KSB7XG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFwiY29sbGVjdGlvblwiIHBhc3NlZCB0byB0aGUgU2VsZWN0IEZpbHRlciBpcyBub3QgYSB2YWxpZCBhcnJheScpO1xuICAgIH1cblxuICAgIC8vIHVzZXIgY2FuIG9wdGlvbmFsbHkgYWRkIGEgYmxhbmsgZW50cnkgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgY29sbGVjdGlvblxuICAgIGlmICh0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuYWRkQmxhbmtFbnRyeSkge1xuICAgICAgY29sbGVjdGlvbi51bnNoaWZ0KHRoaXMuY3JlYXRlQmxhbmtFbnRyeSgpKTtcbiAgICB9XG5cbiAgICBsZXQgbmV3Q29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG5cbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGFuZC9vciBzb3J0IGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cbiAgICBuZXdDb2xsZWN0aW9uID0gdGhpcy5maWx0ZXJDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xuICAgIG5ld0NvbGxlY3Rpb24gPSB0aGlzLnNvcnRDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xuXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcobmV3Q29sbGVjdGlvbiwgdGhpcy5zZWFyY2hUZXJtcyk7XG5cbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIHByZS1sb2FkIHNlYXJjaCB0ZXJtc1xuICAgIC8vIGFsc28gc3Vic2NyaWJlIHRvIHRoZSBvbkNsb3NlIGV2ZW50XG4gICAgdGhpcy5jcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcbiAgICovXG4gIHByb3RlY3RlZCBidWlsZFRlbXBsYXRlSHRtbFN0cmluZyhvcHRpb25Db2xsZWN0aW9uOiBhbnlbXSwgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXSkge1xuICAgIGxldCBvcHRpb25zID0gJyc7XG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xuICAgIGNvbnN0IHNlcGFyYXRvckJldHdlZW5MYWJlbHMgPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuc2VwYXJhdG9yQmV0d2VlblRleHRMYWJlbHMgfHwgJyc7XG4gICAgY29uc3QgaXNSZW5kZXJIdG1sRW5hYmxlZCA9IHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVJlbmRlckh0bWwgfHwgZmFsc2U7XG4gICAgY29uc3Qgc2FuaXRpemVkT3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5zYW5pdGl6ZUh0bWxPcHRpb25zIHx8IHt9O1xuXG4gICAgLy8gY29sbGVjdGlvbiBjb3VsZCBiZSBhbiBBcnJheSBvZiBTdHJpbmdzIE9SIE9iamVjdHNcbiAgICBpZiAob3B0aW9uQ29sbGVjdGlvbi5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcbiAgICAgIG9wdGlvbkNvbGxlY3Rpb24uZm9yRWFjaCgob3B0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSAoc2VhcmNoVGVybXMuZmluZEluZGV4KCh0ZXJtKSA9PiB0ZXJtID09PSBvcHRpb24pID49IDApID8gJ3NlbGVjdGVkJyA6ICcnO1xuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb259XCIgbGFiZWw9XCIke29wdGlvbn1cIiAke3NlbGVjdGVkfT4ke29wdGlvbn08L29wdGlvbj5gO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYXQgbGVhc3QgMSBzZWFyY2ggdGVybSBmb3VuZCwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5pc0ZpbGxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhcnJheSBvZiBvYmplY3RzIHdpbGwgcmVxdWlyZSBhIGxhYmVsL3ZhbHVlIHBhaXIgdW5sZXNzIGEgY3VzdG9tU3RydWN0dXJlIGlzIHBhc3NlZFxuICAgICAgb3B0aW9uQ29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IFNlbGVjdE9wdGlvbikgPT4ge1xuICAgICAgICBpZiAoIW9wdGlvbiB8fCAob3B0aW9uW3RoaXMubGFiZWxOYW1lXSA9PT0gdW5kZWZpbmVkICYmIG9wdGlvbi5sYWJlbEtleSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW3NlbGVjdC1maWx0ZXJdIEEgY29sbGVjdGlvbiB3aXRoIHZhbHVlL2xhYmVsIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkgaXMgcmVxdWlyZWQgdG8gcG9wdWxhdGUgdGhlIFNlbGVjdCBsaXN0LCBmb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5tdWx0aXBsZVNlbGVjdCwgY29sbGVjdGlvbjogWyB7IHZhbHVlOiAnMScsIGxhYmVsOiAnT25lJyB9IF0nKWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhYmVsS2V5ID0gKG9wdGlvbi5sYWJlbEtleSB8fCBvcHRpb25bdGhpcy5sYWJlbE5hbWVdKSBhcyBzdHJpbmc7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gKHNlYXJjaFRlcm1zLmZpbmRJbmRleCgodGVybSkgPT4gdGVybSA9PT0gb3B0aW9uW3RoaXMudmFsdWVOYW1lXSkgPj0gMCkgPyAnc2VsZWN0ZWQnIDogJyc7XG4gICAgICAgIGNvbnN0IGxhYmVsVGV4dCA9ICgob3B0aW9uLmxhYmVsS2V5IHx8IHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwpICYmIGxhYmVsS2V5KSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQobGFiZWxLZXkgfHwgJyAnKSA6IGxhYmVsS2V5O1xuICAgICAgICBsZXQgcHJlZml4VGV4dCA9IG9wdGlvblt0aGlzLmxhYmVsUHJlZml4TmFtZV0gfHwgJyc7XG4gICAgICAgIGxldCBzdWZmaXhUZXh0ID0gb3B0aW9uW3RoaXMubGFiZWxTdWZmaXhOYW1lXSB8fCAnJztcbiAgICAgICAgbGV0IG9wdGlvbkxhYmVsID0gb3B0aW9uW3RoaXMub3B0aW9uTGFiZWxdIHx8ICcnO1xuICAgICAgICBvcHRpb25MYWJlbCA9IG9wdGlvbkxhYmVsLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxcIi9nLCAnXFwnJyk7IC8vIHJlcGxhY2UgZG91YmxlIHF1b3RlcyBieSBzaW5nbGUgcXVvdGVzIHRvIGF2b2lkIGludGVyZmVyaW5nIHdpdGggcmVndWxhciBodG1sXG5cbiAgICAgICAgLy8gYWxzbyB0cmFuc2xhdGUgcHJlZml4L3N1ZmZpeCBpZiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyB0cnVlIGFuZCB0ZXh0IGlzIGEgc3RyaW5nXG4gICAgICAgIHByZWZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBwcmVmaXhUZXh0ICYmIHR5cGVvZiBwcmVmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHByZWZpeFRleHQgfHwgJyAnKSA6IHByZWZpeFRleHQ7XG4gICAgICAgIHN1ZmZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBzdWZmaXhUZXh0ICYmIHR5cGVvZiBzdWZmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHN1ZmZpeFRleHQgfHwgJyAnKSA6IHN1ZmZpeFRleHQ7XG4gICAgICAgIG9wdGlvbkxhYmVsID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgb3B0aW9uTGFiZWwgJiYgdHlwZW9mIG9wdGlvbkxhYmVsID09PSAnc3RyaW5nJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KG9wdGlvbkxhYmVsIHx8ICcgJykgOiBvcHRpb25MYWJlbDtcblxuICAgICAgICAvLyBhZGQgdG8gYSB0ZW1wIGFycmF5IGZvciBqb2luaW5nIHB1cnBvc2UgYW5kIGZpbHRlciBvdXQgZW1wdHkgdGV4dFxuICAgICAgICBjb25zdCB0bXBPcHRpb25BcnJheSA9IFtwcmVmaXhUZXh0LCBsYWJlbFRleHQsIHN1ZmZpeFRleHRdLmZpbHRlcigodGV4dCkgPT4gdGV4dCk7XG4gICAgICAgIGxldCBvcHRpb25UZXh0ID0gdG1wT3B0aW9uQXJyYXkuam9pbihzZXBhcmF0b3JCZXR3ZWVuTGFiZWxzKTtcblxuICAgICAgICAvLyBpZiB1c2VyIHNwZWNpZmljYWxseSB3YW50cyB0byByZW5kZXIgaHRtbCB0ZXh0LCBoZSBuZWVkcyB0byBvcHQtaW4gZWxzZSBpdCB3aWxsIHN0cmlwcGVkIG91dCBieSBkZWZhdWx0XG4gICAgICAgIC8vIGFsc28sIHRoZSAzcmQgcGFydHkgbGliIHdpbGwgc2FuaW5pdHplIGFueSBodG1sIGNvZGUgdW5sZXNzIGl0J3MgZW5jb2RlZCwgc28gd2UnbGwgZG8gdGhhdFxuICAgICAgICBpZiAoaXNSZW5kZXJIdG1sRW5hYmxlZCkge1xuICAgICAgICAgIC8vIHNhbml0aXplIGFueSB1bmF1dGhvcml6ZWQgaHRtbCB0YWdzIGxpa2Ugc2NyaXB0IGFuZCBvdGhlcnNcbiAgICAgICAgICAvLyBmb3IgdGhlIHJlbWFpbmluZyBhbGxvd2VkIHRhZ3Mgd2UnbGwgcGVybWl0IGFsbCBhdHRyaWJ1dGVzXG4gICAgICAgICAgY29uc3Qgc2FuaXRpemVkVGV4dCA9IERPTVB1cmlmeS5zYW5pdGl6ZShvcHRpb25UZXh0LCBzYW5pdGl6ZWRPcHRpb25zKTtcbiAgICAgICAgICBvcHRpb25UZXh0ID0gaHRtbEVuY29kZShzYW5pdGl6ZWRUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0bWwgdGV4dCBvZiBlYWNoIHNlbGVjdCBvcHRpb25cbiAgICAgICAgb3B0aW9ucyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uW3RoaXMudmFsdWVOYW1lXX1cIiBsYWJlbD1cIiR7b3B0aW9uTGFiZWx9XCIgJHtzZWxlY3RlZH0+JHtvcHRpb25UZXh0fTwvb3B0aW9uPmA7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUncyBhdCBsZWFzdCAxIHNlYXJjaCB0ZXJtIGZvdW5kLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwibXMtZmlsdGVyIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIiAke3RoaXMuaXNNdWx0aXBsZVNlbGVjdCA/ICdtdWx0aXBsZT1cIm11bHRpcGxlXCInIDogJyd9PiR7b3B0aW9uc308L3NlbGVjdD5gO1xuICB9XG5cbiAgLyoqIENyZWF0ZSBhIGJsYW5rIGVudHJ5IHRoYXQgY2FuIGJlIGFkZGVkIHRvIHRoZSBjb2xsZWN0aW9uLiBJdCB3aWxsIGFsc28gcmV1c2UgdGhlIHNhbWUgY3VzdG9tU3RydWN0dXJlIGlmIG5lZWQgYmUgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZUJsYW5rRW50cnkoKSB7XG4gICAgY29uc3QgYmxhbmtFbnRyeSA9IHtcbiAgICAgIFt0aGlzLmxhYmVsTmFtZV06ICcnLFxuICAgICAgW3RoaXMudmFsdWVOYW1lXTogJydcbiAgICB9O1xuICAgIGlmICh0aGlzLmxhYmVsUHJlZml4TmFtZSkge1xuICAgICAgYmxhbmtFbnRyeVt0aGlzLmxhYmVsUHJlZml4TmFtZV0gPSAnJztcbiAgICB9XG4gICAgaWYgKHRoaXMubGFiZWxTdWZmaXhOYW1lKSB7XG4gICAgICBibGFua0VudHJ5W3RoaXMubGFiZWxTdWZmaXhOYW1lXSA9ICcnO1xuICAgIH1cbiAgICByZXR1cm4gYmxhbmtFbnRyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBvbkNsb3NlIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXG4gICAqIEBwYXJhbSBmaWx0ZXJUZW1wbGF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZykge1xuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcblxuICAgIC8vIHByb3ZpZGUgdGhlIG5hbWUgYXR0cmlidXRlIHRvIHRoZSBET00gZWxlbWVudCB3aGljaCB3aWxsIGJlIG5lZWRlZCB0byBhdXRvLWFkanVzdCBkcm9wIHBvc2l0aW9uIChkcm9wdXAgLyBkcm9wZG93bilcbiAgICB0aGlzLmVsZW1lbnROYW1lID0gYGZpbHRlci0ke2ZpZWxkSWR9YDtcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zLm5hbWUgPSB0aGlzLmVsZW1lbnROYW1lO1xuXG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gJChmaWx0ZXJUZW1wbGF0ZSk7XG4gICAgaWYgKHR5cGVvZiB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbXVsdGlwbGUtc2VsZWN0LmpzIHdhcyBub3QgZm91bmQsIG1ha2Ugc3VyZSB0byBtb2RpZnkgeW91ciBcImFuZ3VsYXItY2xpLmpzb25cIiBmaWxlIGFuZCBpbmNsdWRlIFwiLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2xpYi9tdWx0aXBsZS1zZWxlY3QvbXVsdGlwbGUtc2VsZWN0LmpzXCIgYW5kIGl0J3MgY3NzIG9yIFNBU1MgZmlsZWApO1xuICAgIH1cbiAgICB0aGlzLiRmaWx0ZXJFbG0uYXR0cignaWQnLCB0aGlzLmVsZW1lbnROYW1lKTtcbiAgICB0aGlzLiRmaWx0ZXJFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcblxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICBpZiAodGhpcy5pc0ZpbGxlZCkge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0gJiYgdHlwZW9mIHRoaXMuJGZpbHRlckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIC8vIG1lcmdlIG9wdGlvbnMgJiBhdHRhY2ggbXVsdGlTZWxlY3RcbiAgICBjb25zdCBlbGVtZW50T3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb24gPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLnRoaXMuY29sdW1uRmlsdGVyLmZpbHRlck9wdGlvbnMgfTtcbiAgICB0aGlzLmZpbHRlckVsbU9wdGlvbnMgPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLmVsZW1lbnRPcHRpb25zIH07XG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KHRoaXMuZmlsdGVyRWxtT3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFVTCxZQUFZLEdBSWIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BILE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sS0FBSyxVQUFVLE1BQU0sV0FBVyxDQUFDOztJQUNsQyxTQUFTLEdBQUcsVUFBVTtBQUs1QjtJQXdCRTs7T0FFRztJQUNILHNCQUFzQixTQUEyQixFQUFZLGlCQUFvQyxFQUFZLGdCQUF1QjtRQUF2QixpQ0FBQSxFQUFBLHVCQUF1QjtRQUFwSSxpQkEyQ0M7UUEzQ3FCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFZLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBTztRQVpwSSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBTWpCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFtQixFQUFFLENBQUM7OztZQU8zQixPQUFPLEdBQXlCO1lBQ3BDLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsc0JBQXNCLEVBQUUsSUFBSTtZQUM1Qiw2QkFBNkIsRUFBRSxJQUFJO1lBQ25DLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLE1BQU0sRUFBRSxLQUFLOztZQUNiLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFFWixZQUFZLEVBQUUsVUFBQyxJQUFJOzs7b0JBRVgsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLFNBQVMsSUFBSSxLQUFJ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QUFrQjs7SUFDbEIsNENBQTZCOztJQUM3QixxQ0FBbUM7Ozs7O0lBS3ZCLGlDQUFxQzs7Ozs7SUFBRSx5Q0FBOEM7Ozs7O0lBQUUsd0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUsXHJcbiAgQ29sbGVjdGlvbk9wdGlvbixcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2ssXHJcbiAgR3JpZE9wdGlvbixcclxuICBNdWx0aXBsZVNlbGVjdE9wdGlvbixcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgT3BlcmF0b3JTdHJpbmcsXHJcbiAgU2VhcmNoVGVybSxcclxuICBTZWxlY3RPcHRpb24sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvY29sbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSwgZ2V0RGVzY2VuZGFudFByb3BlcnR5LCBodG1sRW5jb2RlLCB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIERPTVB1cmlmeV8gZnJvbSAnZG9tcHVyaWZ5JztcclxuY29uc3QgRE9NUHVyaWZ5ID0gRE9NUHVyaWZ5XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCB0byB3b3JrXHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIC8qKiBET00gRWxlbWVudCBOYW1lLCB1c2VmdWwgZm9yIGF1dG8tZGV0ZWN0aW5nIHBvc2l0aW9uaW5nIChkcm9wdXAgLyBkcm9wZG93bikgKi9cclxuICBlbGVtZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogRmlsdGVyIE11bHRpcGxlLVNlbGVjdCBvcHRpb25zICovXHJcbiAgZmlsdGVyRWxtT3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb247XHJcblxyXG4gIC8qKiBUaGUgSlF1ZXJ5IERPTSBlbGVtZW50ICovXHJcbiAgJGZpbHRlckVsbTogYW55O1xyXG5cclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcbiAgZGVmYXVsdE9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uO1xyXG4gIGlzRmlsbGVkID0gZmFsc2U7XHJcbiAgbGFiZWxOYW1lOiBzdHJpbmc7XHJcbiAgbGFiZWxQcmVmaXhOYW1lOiBzdHJpbmc7XHJcbiAgbGFiZWxTdWZmaXhOYW1lOiBzdHJpbmc7XHJcbiAgb3B0aW9uTGFiZWw6IHN0cmluZztcclxuICB2YWx1ZU5hbWU6IHN0cmluZztcclxuICBlbmFibGVUcmFuc2xhdGVMYWJlbCA9IGZhbHNlO1xyXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsIHByb3RlY3RlZCBjb2xsZWN0aW9uU2VydmljZTogQ29sbGVjdGlvblNlcnZpY2UsIHByb3RlY3RlZCBpc011bHRpcGxlU2VsZWN0ID0gdHJ1ZSkge1xyXG4gICAgLy8gZGVmYXVsdCBvcHRpb25zIHVzZWQgYnkgdGhpcyBGaWx0ZXIsIHVzZXIgY2FuIG92ZXJ3cml0ZSBhbnkgb2YgdGhlc2UgYnkgcGFzc2luZyBcIm90aW9uc1wiXHJcbiAgICBjb25zdCBvcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbiA9IHtcclxuICAgICAgYXV0b0FkanVzdERyb3BIZWlnaHQ6IHRydWUsXHJcbiAgICAgIGF1dG9BZGp1c3REcm9wUG9zaXRpb246IHRydWUsXHJcbiAgICAgIGF1dG9BZGp1c3REcm9wV2lkdGhCeVRleHRTaXplOiB0cnVlLFxyXG4gICAgICBjb250YWluZXI6ICdib2R5JyxcclxuICAgICAgZmlsdGVyOiBmYWxzZSwgIC8vIGlucHV0IHNlYXJjaCB0ZXJtIG9uIHRvcCBvZiB0aGUgc2VsZWN0IG9wdGlvbiBsaXN0XHJcbiAgICAgIG1heEhlaWdodDogMjc1LFxyXG4gICAgICBzaW5nbGU6IHRydWUsXHJcblxyXG4gICAgICB0ZXh0VGVtcGxhdGU6ICgkZWxtKSA9PiB7XHJcbiAgICAgICAgLy8gcmVuZGVyIEhUTUwgY29kZSBvciBub3QsIGJ5IGRlZmF1bHQgaXQgaXMgc2FuaXRpemVkIGFuZCB3b24ndCBiZSByZW5kZXJlZFxyXG4gICAgICAgIGNvbnN0IGlzUmVuZGVySHRtbEVuYWJsZWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmVuYWJsZVJlbmRlckh0bWwgfHwgZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGlzUmVuZGVySHRtbEVuYWJsZWQgPyAkZWxtLnRleHQoKSA6ICRlbG0uaHRtbCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gd2Ugd2lsbCBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnQgZm9yIHRyaWdnZXJpbmcgb3VyIGNhbGxiYWNrXHJcbiAgICAgICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdnZXRTZWxlY3RzJyk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtcykgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykuc2libGluZ3MoJ2RpdiAuc2VhcmNoLWZpbHRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pc0ZpbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKS5zaWJsaW5ncygnZGl2IC5zZWFyY2gtZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayh1bmRlZmluZWQsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3QpIHtcclxuICAgICAgb3B0aW9ucy5zaW5nbGUgPSBmYWxzZTtcclxuICAgICAgb3B0aW9ucy5va0J1dHRvbiA9IHRydWU7XHJcbiAgICAgIG9wdGlvbnMuYWRkVGl0bGUgPSB0cnVlOyAvLyBzaG93IHRvb2x0aXAgb2YgYWxsIHNlbGVjdGVkIGl0ZW1zIHdoaWxlIGhvdmVyaW5nIHRoZSBmaWx0ZXJcclxuICAgICAgb3B0aW9ucy5jb3VudFNlbGVjdGVkID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnWF9PRl9ZX1NFTEVDVEVEJyk7XHJcbiAgICAgIG9wdGlvbnMuYWxsU2VsZWN0ZWQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdBTExfU0VMRUNURUQnKTtcclxuICAgICAgb3B0aW9ucy5zZWxlY3RBbGxUZXh0ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU0VMRUNUX0FMTCcpO1xyXG4gICAgICBvcHRpb25zLnNlbGVjdEFsbERlbGltaXRlciA9IFsnJywgJyddOyAvLyByZW1vdmUgZGVmYXVsdCBzcXVhcmUgYnJhY2tldHMgb2YgZGVmYXVsdCB0ZXh0IFwiW1NlbGVjdCBBbGxdXCIgPT4gXCJTZWxlY3QgQWxsXCJcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRmlsdGVyIGl0c2VsZiAqL1xyXG4gIHByb3RlY3RlZCBnZXQgY29sdW1uRmlsdGVyKCk6IENvbHVtbkZpbHRlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbGxlY3Rpb24gT3B0aW9ucyAqL1xyXG4gIHByb3RlY3RlZCBnZXQgY29sbGVjdGlvbk9wdGlvbnMoKTogQ29sbGVjdGlvbk9wdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDdXN0b20gU3RydWN0dXJlIGlmIGV4aXN0ICovXHJcbiAgcHJvdGVjdGVkIGdldCBjdXN0b21TdHJ1Y3R1cmUoKTogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmU7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByb3RlY3RlZCBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgZmlsdGVyIG9wZXJhdG9yICovXHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICB0aGlzLmlzTXVsdGlwbGVTZWxlY3QgPyBPcGVyYXRvclR5cGUuaW4gOiBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xyXG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XHJcblxyXG4gICAgaWYgKCF0aGlzLmdyaWQgfHwgIXRoaXMuY29sdW1uRGVmIHx8ICF0aGlzLmNvbHVtbkZpbHRlciB8fCAoIXRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gJiYgIXRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiAob3IgXCJjb2xsZWN0aW9uQXN5bmNcIikgZm9yIHRoZSBNdWx0aXBsZVNlbGVjdC9TaW5nbGVTZWxlY3QgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5LiBBbHNvIGVhY2ggb3B0aW9uIHNob3VsZCBpbmNsdWRlIGEgdmFsdWUvbGFiZWwgcGFpciAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpLiBGb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5tdWx0aXBsZVNlbGVjdCwgY29sbGVjdGlvbjogW3sgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZScgfSwgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSB0aGlzLmNvbHVtbkZpbHRlci5lbmFibGVUcmFuc2xhdGVMYWJlbDtcclxuICAgIHRoaXMubGFiZWxOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWwgfHwgJ2xhYmVsJztcclxuICAgIHRoaXMubGFiZWxQcmVmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxQcmVmaXggfHwgJ2xhYmVsUHJlZml4JztcclxuICAgIHRoaXMubGFiZWxTdWZmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxTdWZmaXggfHwgJ2xhYmVsU3VmZml4JztcclxuICAgIHRoaXMub3B0aW9uTGFiZWwgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5vcHRpb25MYWJlbCB8fCAndmFsdWUnO1xyXG4gICAgdGhpcy52YWx1ZU5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSB8fCAndmFsdWUnO1xyXG5cclxuICAgIGlmICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmICghdGhpcy50cmFuc2xhdGUgfHwgdHlwZW9mIHRoaXMudHJhbnNsYXRlLmluc3RhbnQgIT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW3NlbGVjdC1lZGl0b3JdIFRoZSBuZ3gtdHJhbnNsYXRlIFRyYW5zbGF0ZVNlcnZpY2UgaXMgcmVxdWlyZWQgZm9yIHRoZSBTZWxlY3QgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWx3YXlzIHJlbmRlciB0aGUgU2VsZWN0IChkcm9wZG93bikgRE9NIGVsZW1lbnQsIGV2ZW4gaWYgdXNlciBwYXNzZWQgYSBcImNvbGxlY3Rpb25Bc3luY1wiLFxyXG4gICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgdGhlIFNlbGVjdCB3aWxsIHNpbXBseSBiZSB3aXRob3V0IGFueSBvcHRpb25zIGJ1dCB3ZSBzdGlsbCBoYXZlIHRvIHJlbmRlciBpdCAoZWxzZSBTbGlja0dyaWQgd291bGQgdGhyb3cgYW4gZXJyb3IpXHJcbiAgICBjb25zdCBuZXdDb2xsZWN0aW9uID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiB8fCBbXTtcclxuICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudChuZXdDb2xsZWN0aW9uKTtcclxuXHJcbiAgICAvLyBvbiBldmVyeSBGaWx0ZXIgd2hpY2ggaGF2ZSBhIFwiY29sbGVjdGlvblwiIG9yIGEgXCJjb2xsZWN0aW9uQXN5bmNcIlxyXG4gICAgLy8gd2Ugd2lsbCBhZGQgKG9yIHJlcGxhY2UpIGEgU3ViamVjdCB0byB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBwcm9wZXJ0eSBzbyB0aGF0IHVzZXIgaGFzIHBvc3NpYmlsaXR5IHRvIGNoYW5nZSB0aGUgY29sbGVjdGlvblxyXG4gICAgLy8gaWYgXCJjb2xsZWN0aW9uQXN5bmNcIiBpcyBhbHJlYWR5IHNldCBieSB0aGUgdXNlciwgaXQgd2lsbCByZXNvbHZlIGl0IGZpcnN0IHRoZW4gYWZ0ZXIgaXQgd2lsbCByZXBsYWNlIGl0IHdpdGggYSBTdWJqZWN0XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uQXN5bmMgPSB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uQXN5bmM7XHJcbiAgICBpZiAoY29sbGVjdGlvbkFzeW5jKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyT3B0aW9uc0FzeW5jKGNvbGxlY3Rpb25Bc3luYyk7IC8vIGNyZWF0ZSBTdWJqZWN0IGFmdGVyIHJlc29sdmUgKGNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlc1xyXG4gICAqL1xyXG4gIGNsZWFyKCkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QpIHtcclxuICAgICAgLy8gcmVsb2FkIHRoZSBmaWx0ZXIgZWxlbWVudCBieSBpdCdzIGlkLCB0byBtYWtlIHN1cmUgaXQncyBzdGlsbCBhIHZhbGlkIGVsZW1lbnQgKGJlY2F1c2Ugb2Ygc29tZSBpc3N1ZSBpbiB0aGUgR3JhcGhRTCBleGFtcGxlKVxyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QoJ3NldFNlbGVjdHMnLCBbXSk7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcclxuICAgICAgdGhpcy5jYWxsYmFjayh1bmRlZmluZWQsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xyXG4gICAgICAvLyByZW1vdmUgZXZlbnQgd2F0Y2hlclxyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBkaXNwb3NlIG9mIGFsbCBTdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuc3Vic2NyaXB0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybSB8IFNlYXJjaFRlcm1bXSkge1xyXG4gICAgaWYgKHZhbHVlcykge1xyXG4gICAgICB2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiBbdmFsdWVzXTtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdzZXRTZWxlY3RzJywgdmFsdWVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJvdGVjdGVkIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gaW5wdXRDb2xsZWN0aW9uXHJcbiAgICogQHJldHVybiBvdXRwdXRDb2xsZWN0aW9uIGZpbHRlcmVkIGFuZC9vciBzb3J0ZWQgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBmaWx0ZXJDb2xsZWN0aW9uKGlucHV0Q29sbGVjdGlvbikge1xyXG4gICAgbGV0IG91dHB1dENvbGxlY3Rpb24gPSBpbnB1dENvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5KSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlckJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5O1xyXG4gICAgICBjb25zdCBmaWx0ZXJDb2xsZWN0aW9uQnkgPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucy5maWx0ZXJSZXN1bHRBZnRlckVhY2hQYXNzIHx8IG51bGw7XHJcbiAgICAgIG91dHB1dENvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25TZXJ2aWNlLmZpbHRlckNvbGxlY3Rpb24ob3V0cHV0Q29sbGVjdGlvbiwgZmlsdGVyQnksIGZpbHRlckNvbGxlY3Rpb25CeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvbiBpbiBhIGNlcnRhaW4gd2F5XHJcbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxyXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBmaWx0ZXJlZCBhbmQvb3Igc29ydGVkIGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc29ydENvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvblxyXG4gICAgaWYgKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Tb3J0QnkpIHtcclxuICAgICAgY29uc3Qgc29ydEJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvblNvcnRCeTtcclxuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvblNlcnZpY2Uuc29ydENvbGxlY3Rpb24ob3V0cHV0Q29sbGVjdGlvbiwgc29ydEJ5LCB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhc3luYyByZW5kZXJPcHRpb25zQXN5bmMoY29sbGVjdGlvbkFzeW5jOiBQcm9taXNlPGFueT4gfCBPYnNlcnZhYmxlPGFueT4gfCBTdWJqZWN0PGFueT4pIHtcclxuICAgIGxldCBhd2FpdGVkQ29sbGVjdGlvbjogYW55ID0gW107XHJcblxyXG4gICAgaWYgKGNvbGxlY3Rpb25Bc3luYykge1xyXG4gICAgICBhd2FpdGVkQ29sbGVjdGlvbiA9IGF3YWl0IGNhc3RUb1Byb21pc2UoY29sbGVjdGlvbkFzeW5jKTtcclxuICAgICAgdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhhd2FpdGVkQ29sbGVjdGlvbik7XHJcblxyXG4gICAgICAvLyBiZWNhdXNlIHdlIGFjY2VwdCBQcm9taXNlcyAmIEh0dHBDbGllbnQgT2JzZXJ2YWJsZSBvbmx5IGV4ZWN1dGUgb25jZVxyXG4gICAgICAvLyB3ZSB3aWxsIHJlLWNyZWF0ZSBhbiBSeEpzIFN1YmplY3Qgd2hpY2ggd2lsbCByZXBsYWNlIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIHdoaWNoIGdvdCBleGVjdXRlZCBvbmNlIGFueXdheVxyXG4gICAgICAvLyBkb2luZyB0aGlzIHByb3ZpZGUgdGhlIHVzZXIgYSB3YXkgdG8gY2FsbCBhIFwiY29sbGVjdGlvbkFzeW5jLm5leHQoKVwiXHJcbiAgICAgIHRoaXMuY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSBvciByZWNyZWF0ZSBhbiBPYnNlcnZhYmxlIFN1YmplY3QgYW5kIHJlYXNzaWduIGl0IHRvIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIG9iamVjdCBzbyB1c2VyIGNhbiBjYWxsIGEgXCJjb2xsZWN0aW9uQXN5bmMubmV4dCgpXCIgb24gaXQgKi9cclxuICBwcm90ZWN0ZWQgY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdCgpIHtcclxuICAgIGNvbnN0IG5ld0NvbGxlY3Rpb25Bc3luYyA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYyA9IG5ld0NvbGxlY3Rpb25Bc3luYztcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICBuZXdDb2xsZWN0aW9uQXN5bmMuc3Vic2NyaWJlKGNvbGxlY3Rpb24gPT4gdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhjb2xsZWN0aW9uKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHVzZXIgdXNlIGEgQ29sbGVjdGlvbkFzeW5jIHdlIHdpbGwgdXNlIHRoZSByZXR1cm5lZCBjb2xsZWN0aW9uIHRvIHJlbmRlciB0aGUgZmlsdGVyIERPTSBlbGVtZW50XHJcbiAgICogYW5kIHJlaW5pdGlhbGl6ZSBmaWx0ZXIgY29sbGVjdGlvbiB3aXRoIHRoaXMgbmV3IGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudEZyb21Db2xsZWN0aW9uQXN5bmMoY29sbGVjdGlvbikge1xyXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHB1bGwgdGhlIGNvbGxlY3Rpb24gZnJvbSB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBjYWxsIGluIHRoZSBTZWxlY3QgRmlsdGVyLCB0aGUgY29sbGVjdGlvbiBpcyBub3QgYSB2YWxpZCBhcnJheS4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb3B5IG92ZXIgdGhlIGFycmF5IHJlY2VpdmVkIGZyb20gdGhlIGFzeW5jIGNhbGwgdG8gdGhlIFwiY29sbGVjdGlvblwiIGFzIHRoZSBuZXcgY29sbGVjdGlvbiB0byB1c2VcclxuICAgIC8vIHRoaXMgaGFzIHRvIGJlIEJFRk9SRSB0aGUgYGNvbGxlY3Rpb25PYnNlcnZlcigpLnN1YnNjcmliZWAgdG8gYXZvaWQgZ29pbmcgaW50byBhbiBpbmZpbml0ZSBsb29wXHJcbiAgICB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyByZWNyZWF0ZSBNdWx0aXBsZSBTZWxlY3QgYWZ0ZXIgZ2V0dGluZyBhc3luYyBjb2xsZWN0aW9uXHJcbiAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnQoY29sbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgIGNvbGxlY3Rpb24gPSBnZXREZXNjZW5kYW50UHJvcGVydHkoY29sbGVjdGlvbiwgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJjb2xsZWN0aW9uXCIgcGFzc2VkIHRvIHRoZSBTZWxlY3QgRmlsdGVyIGlzIG5vdCBhIHZhbGlkIGFycmF5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlciBjYW4gb3B0aW9uYWxseSBhZGQgYSBibGFuayBlbnRyeSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmFkZEJsYW5rRW50cnkpIHtcclxuICAgICAgY29sbGVjdGlvbi51bnNoaWZ0KHRoaXMuY3JlYXRlQmxhbmtFbnRyeSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV3Q29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBhbmQvb3Igc29ydCBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBuZXdDb2xsZWN0aW9uID0gdGhpcy5maWx0ZXJDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xyXG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuc29ydENvbGxlY3Rpb24obmV3Q29sbGVjdGlvbik7XHJcblxyXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcclxuICAgIGNvbnN0IGZpbHRlclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZyhuZXdDb2xsZWN0aW9uLCB0aGlzLnNlYXJjaFRlcm1zKTtcclxuXHJcbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIHByZS1sb2FkIHNlYXJjaCB0ZXJtc1xyXG4gICAgLy8gYWxzbyBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnRcclxuICAgIHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcob3B0aW9uQ29sbGVjdGlvbjogYW55W10sIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10pIHtcclxuICAgIGxldCBvcHRpb25zID0gJyc7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBzZXBhcmF0b3JCZXR3ZWVuTGFiZWxzID0gdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLnNlcGFyYXRvckJldHdlZW5UZXh0TGFiZWxzIHx8ICcnO1xyXG4gICAgY29uc3QgaXNSZW5kZXJIdG1sRW5hYmxlZCA9IHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVJlbmRlckh0bWwgfHwgZmFsc2U7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRPcHRpb25zID0gdGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLnNhbml0aXplSHRtbE9wdGlvbnMgfHwge307XHJcblxyXG4gICAgLy8gY29sbGVjdGlvbiBjb3VsZCBiZSBhbiBBcnJheSBvZiBTdHJpbmdzIE9SIE9iamVjdHNcclxuICAgIGlmIChvcHRpb25Db2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSAoc2VhcmNoVGVybXMuZmluZEluZGV4KCh0ZXJtKSA9PiB0ZXJtID09PSBvcHRpb24pID49IDApID8gJ3NlbGVjdGVkJyA6ICcnO1xyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIiBsYWJlbD1cIiR7b3B0aW9ufVwiICR7c2VsZWN0ZWR9PiR7b3B0aW9ufTwvb3B0aW9uPmA7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYXQgbGVhc3QgMSBzZWFyY2ggdGVybSBmb3VuZCwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuaXNGaWxsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBhcnJheSBvZiBvYmplY3RzIHdpbGwgcmVxdWlyZSBhIGxhYmVsL3ZhbHVlIHBhaXIgdW5sZXNzIGEgY3VzdG9tU3RydWN0dXJlIGlzIHBhc3NlZFxyXG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogU2VsZWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKCFvcHRpb24gfHwgKG9wdGlvblt0aGlzLmxhYmVsTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBvcHRpb24ubGFiZWxLZXkgPT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW3NlbGVjdC1maWx0ZXJdIEEgY29sbGVjdGlvbiB3aXRoIHZhbHVlL2xhYmVsIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkgaXMgcmVxdWlyZWQgdG8gcG9wdWxhdGUgdGhlIFNlbGVjdCBsaXN0LCBmb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5tdWx0aXBsZVNlbGVjdCwgY29sbGVjdGlvbjogWyB7IHZhbHVlOiAnMScsIGxhYmVsOiAnT25lJyB9IF0nKWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsYWJlbEtleSA9IChvcHRpb24ubGFiZWxLZXkgfHwgb3B0aW9uW3RoaXMubGFiZWxOYW1lXSkgYXMgc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gKHNlYXJjaFRlcm1zLmZpbmRJbmRleCgodGVybSkgPT4gdGVybSA9PT0gb3B0aW9uW3RoaXMudmFsdWVOYW1lXSkgPj0gMCkgPyAnc2VsZWN0ZWQnIDogJyc7XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gKChvcHRpb24ubGFiZWxLZXkgfHwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCkgJiYgbGFiZWxLZXkpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChsYWJlbEtleSB8fCAnICcpIDogbGFiZWxLZXk7XHJcbiAgICAgICAgbGV0IHByZWZpeFRleHQgPSBvcHRpb25bdGhpcy5sYWJlbFByZWZpeE5hbWVdIHx8ICcnO1xyXG4gICAgICAgIGxldCBzdWZmaXhUZXh0ID0gb3B0aW9uW3RoaXMubGFiZWxTdWZmaXhOYW1lXSB8fCAnJztcclxuICAgICAgICBsZXQgb3B0aW9uTGFiZWwgPSBvcHRpb25bdGhpcy5vcHRpb25MYWJlbF0gfHwgJyc7XHJcbiAgICAgICAgb3B0aW9uTGFiZWwgPSBvcHRpb25MYWJlbC50b1N0cmluZygpLnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpOyAvLyByZXBsYWNlIGRvdWJsZSBxdW90ZXMgYnkgc2luZ2xlIHF1b3RlcyB0byBhdm9pZCBpbnRlcmZlcmluZyB3aXRoIHJlZ3VsYXIgaHRtbFxyXG5cclxuICAgICAgICAvLyBhbHNvIHRyYW5zbGF0ZSBwcmVmaXgvc3VmZml4IGlmIGVuYWJsZVRyYW5zbGF0ZUxhYmVsIGlzIHRydWUgYW5kIHRleHQgaXMgYSBzdHJpbmdcclxuICAgICAgICBwcmVmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgcHJlZml4VGV4dCAmJiB0eXBlb2YgcHJlZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChwcmVmaXhUZXh0IHx8ICcgJykgOiBwcmVmaXhUZXh0O1xyXG4gICAgICAgIHN1ZmZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBzdWZmaXhUZXh0ICYmIHR5cGVvZiBzdWZmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHN1ZmZpeFRleHQgfHwgJyAnKSA6IHN1ZmZpeFRleHQ7XHJcbiAgICAgICAgb3B0aW9uTGFiZWwgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBvcHRpb25MYWJlbCAmJiB0eXBlb2Ygb3B0aW9uTGFiZWwgPT09ICdzdHJpbmcnKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQob3B0aW9uTGFiZWwgfHwgJyAnKSA6IG9wdGlvbkxhYmVsO1xyXG5cclxuICAgICAgICAvLyBhZGQgdG8gYSB0ZW1wIGFycmF5IGZvciBqb2luaW5nIHB1cnBvc2UgYW5kIGZpbHRlciBvdXQgZW1wdHkgdGV4dFxyXG4gICAgICAgIGNvbnN0IHRtcE9wdGlvbkFycmF5ID0gW3ByZWZpeFRleHQsIGxhYmVsVGV4dCwgc3VmZml4VGV4dF0uZmlsdGVyKCh0ZXh0KSA9PiB0ZXh0KTtcclxuICAgICAgICBsZXQgb3B0aW9uVGV4dCA9IHRtcE9wdGlvbkFycmF5LmpvaW4oc2VwYXJhdG9yQmV0d2VlbkxhYmVscyk7XHJcblxyXG4gICAgICAgIC8vIGlmIHVzZXIgc3BlY2lmaWNhbGx5IHdhbnRzIHRvIHJlbmRlciBodG1sIHRleHQsIGhlIG5lZWRzIHRvIG9wdC1pbiBlbHNlIGl0IHdpbGwgc3RyaXBwZWQgb3V0IGJ5IGRlZmF1bHRcclxuICAgICAgICAvLyBhbHNvLCB0aGUgM3JkIHBhcnR5IGxpYiB3aWxsIHNhbmluaXR6ZSBhbnkgaHRtbCBjb2RlIHVubGVzcyBpdCdzIGVuY29kZWQsIHNvIHdlJ2xsIGRvIHRoYXRcclxuICAgICAgICBpZiAoaXNSZW5kZXJIdG1sRW5hYmxlZCkge1xyXG4gICAgICAgICAgLy8gc2FuaXRpemUgYW55IHVuYXV0aG9yaXplZCBodG1sIHRhZ3MgbGlrZSBzY3JpcHQgYW5kIG90aGVyc1xyXG4gICAgICAgICAgLy8gZm9yIHRoZSByZW1haW5pbmcgYWxsb3dlZCB0YWdzIHdlJ2xsIHBlcm1pdCBhbGwgYXR0cmlidXRlc1xyXG4gICAgICAgICAgY29uc3Qgc2FuaXRpemVkVGV4dCA9IERPTVB1cmlmeS5zYW5pdGl6ZShvcHRpb25UZXh0LCBzYW5pdGl6ZWRPcHRpb25zKTtcclxuICAgICAgICAgIG9wdGlvblRleHQgPSBodG1sRW5jb2RlKHNhbml0aXplZFRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaHRtbCB0ZXh0IG9mIGVhY2ggc2VsZWN0IG9wdGlvblxyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvblt0aGlzLnZhbHVlTmFtZV19XCIgbGFiZWw9XCIke29wdGlvbkxhYmVsfVwiICR7c2VsZWN0ZWR9PiR7b3B0aW9uVGV4dH08L29wdGlvbj5gO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGVyZSdzIGF0IGxlYXN0IDEgc2VhcmNoIHRlcm0gZm91bmQsIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cIm1zLWZpbHRlciBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCIgJHt0aGlzLmlzTXVsdGlwbGVTZWxlY3QgPyAnbXVsdGlwbGU9XCJtdWx0aXBsZVwiJyA6ICcnfT4ke29wdGlvbnN9PC9zZWxlY3Q+YDtcclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGUgYSBibGFuayBlbnRyeSB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgY29sbGVjdGlvbi4gSXQgd2lsbCBhbHNvIHJldXNlIHRoZSBzYW1lIGN1c3RvbVN0cnVjdHVyZSBpZiBuZWVkIGJlICovXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZUJsYW5rRW50cnkoKSB7XHJcbiAgICBjb25zdCBibGFua0VudHJ5ID0ge1xyXG4gICAgICBbdGhpcy5sYWJlbE5hbWVdOiAnJyxcclxuICAgICAgW3RoaXMudmFsdWVOYW1lXTogJydcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5sYWJlbFByZWZpeE5hbWUpIHtcclxuICAgICAgYmxhbmtFbnRyeVt0aGlzLmxhYmVsUHJlZml4TmFtZV0gPSAnJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxhYmVsU3VmZml4TmFtZSkge1xyXG4gICAgICBibGFua0VudHJ5W3RoaXMubGFiZWxTdWZmaXhOYW1lXSA9ICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJsYW5rRW50cnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcclxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcclxuICAgKiBAcGFyYW0gZmlsdGVyVGVtcGxhdGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcblxyXG4gICAgLy8gcHJvdmlkZSB0aGUgbmFtZSBhdHRyaWJ1dGUgdG8gdGhlIERPTSBlbGVtZW50IHdoaWNoIHdpbGwgYmUgbmVlZGVkIHRvIGF1dG8tYWRqdXN0IGRyb3AgcG9zaXRpb24gKGRyb3B1cCAvIGRyb3Bkb3duKVxyXG4gICAgdGhpcy5lbGVtZW50TmFtZSA9IGBmaWx0ZXItJHtmaWVsZElkfWA7XHJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zLm5hbWUgPSB0aGlzLmVsZW1lbnROYW1lO1xyXG5cclxuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gJChmaWx0ZXJUZW1wbGF0ZSk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYG11bHRpcGxlLXNlbGVjdC5qcyB3YXMgbm90IGZvdW5kLCBtYWtlIHN1cmUgdG8gbW9kaWZ5IHlvdXIgXCJhbmd1bGFyLWNsaS5qc29uXCIgZmlsZSBhbmQgaW5jbHVkZSBcIi4uL25vZGVfbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9saWIvbXVsdGlwbGUtc2VsZWN0L211bHRpcGxlLXNlbGVjdC5qc1wiIGFuZCBpdCdzIGNzcyBvciBTQVNTIGZpbGVgKTtcclxuICAgIH1cclxuICAgIHRoaXMuJGZpbHRlckVsbS5hdHRyKCdpZCcsIHRoaXMuZWxlbWVudE5hbWUpO1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgaWYgKHRoaXMuaXNGaWxsZWQpIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0eXBlb2YgdGhpcy4kZmlsdGVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtZXJnZSBvcHRpb25zICYgYXR0YWNoIG11bHRpU2VsZWN0XHJcbiAgICBjb25zdCBlbGVtZW50T3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb24gPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLnRoaXMuY29sdW1uRmlsdGVyLmZpbHRlck9wdGlvbnMgfTtcclxuICAgIHRoaXMuZmlsdGVyRWxtT3B0aW9ucyA9IHsgLi4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4uZWxlbWVudE9wdGlvbnMgfTtcclxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCh0aGlzLmZpbHRlckVsbU9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=
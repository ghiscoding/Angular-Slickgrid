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
const DOMPurify = DOMPurify_;
export class SelectFilter {
    /**
     * Initialize the Filter
     * @param {?} translate
     * @param {?} collectionService
     * @param {?=} isMultipleSelect
     */
    constructor(translate, collectionService, isMultipleSelect = true) {
        this.translate = translate;
        this.collectionService = collectionService;
        this.isMultipleSelect = isMultipleSelect;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        this.subscriptions = [];
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        /** @type {?} */
        const options = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            // input search term on top of the select option list
            maxHeight: 275,
            single: true,
            textTemplate: ($elm) => {
                // render HTML code or not, by default it is sanitized and won't be rendered
                /** @type {?} */
                const isRenderHtmlEnabled = this.columnDef && this.columnDef.filter && this.columnDef.filter.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            },
            onClose: () => {
                // we will subscribe to the onClose event for triggering our callback
                // also add/remove "filled" class for styling purposes
                /** @type {?} */
                const selectedItems = this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 0) {
                    this.isFilled = true;
                    this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    this.isFilled = false;
                    this.$filterElm.removeClass('filled').siblings('div .search-filter').removeClass('filled');
                }
                this.callback(undefined, { columnDef: this.columnDef, operator: this.operator, searchTerms: selectedItems });
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
    /**
     * Getter for the Column Filter itself
     * @protected
     * @return {?}
     */
    get columnFilter() {
        return this.columnDef && this.columnDef.filter;
    }
    /**
     * Getter for the Collection Options
     * @protected
     * @return {?}
     */
    get collectionOptions() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
    }
    /**
     * Getter for the Custom Structure if exist
     * @protected
     * @return {?}
     */
    get customStructure() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
    }
    /**
     * Getter for the Grid Options pulled through the Grid Object
     * @protected
     * @return {?}
     */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /**
     * Getter for the filter operator
     * @return {?}
     */
    get operator() {
        if (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator;
        }
        return this.isMultipleSelect ? OperatorType.in : OperatorType.equal;
    }
    /**
     * Initialize the filter template
     * @param {?} args
     * @return {?}
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this.translate || typeof this.translate.instant !== 'function')) {
            throw new Error(`[select-editor] The ngx-translate TranslateService is required for the Select Filter to work correctly`);
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        /** @type {?} */
        const newCollection = this.columnFilter.collection || [];
        this.renderDomElement(newCollection);
        // on every Filter which have a "collection" or a "collectionAsync"
        // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
        // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
        /** @type {?} */
        const collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
        if (collectionAsync) {
            this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
        }
    }
    /**
     * Clear the filter values
     * @return {?}
     */
    clear() {
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            this.$filterElm.multipleSelect('setSelects', []);
            this.$filterElm.removeClass('filled');
            this.searchTerms = [];
            this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true });
        }
    }
    /**
     * destroy the filter
     * @return {?}
     */
    destroy() {
        if (this.$filterElm) {
            // remove event watcher
            this.$filterElm.off().remove();
        }
        // also dispose of all Subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
    }
    /**
     * Set value(s) on the DOM element
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        if (values) {
            values = Array.isArray(values) ? values : [values];
            this.$filterElm.multipleSelect('setSelects', values);
        }
    }
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    filterCollection(inputCollection) {
        /** @type {?} */
        let outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
            /** @type {?} */
            const filterBy = this.columnFilter.collectionFilterBy;
            /** @type {?} */
            const filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    }
    /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection filtered and/or sorted collection
     */
    sortCollection(inputCollection) {
        /** @type {?} */
        let outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
            /** @type {?} */
            const sortBy = this.columnFilter.collectionSortBy;
            outputCollection = this.collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    }
    /**
     * @protected
     * @param {?} collectionAsync
     * @return {?}
     */
    renderOptionsAsync(collectionAsync) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let awaitedCollection = [];
            if (collectionAsync) {
                awaitedCollection = yield castToPromise(collectionAsync);
                this.renderDomElementFromCollectionAsync(awaitedCollection);
                // because we accept Promises & HttpClient Observable only execute once
                // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                // doing this provide the user a way to call a "collectionAsync.next()"
                this.createCollectionAsyncSubject();
            }
        });
    }
    /**
     * Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it
     * @protected
     * @return {?}
     */
    createCollectionAsyncSubject() {
        /** @type {?} */
        const newCollectionAsync = new Subject();
        this.columnFilter.collectionAsync = newCollectionAsync;
        this.subscriptions.push(newCollectionAsync.subscribe(collection => this.renderDomElementFromCollectionAsync(collection)));
    }
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     * @protected
     * @param {?} collection
     * @return {?}
     */
    renderDomElementFromCollectionAsync(collection) {
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
    }
    /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    renderDomElement(collection) {
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
        let newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        /** @type {?} */
        const filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);
        // step 2, create the DOM Element of the filter & pre-load search terms
        // also subscribe to the onClose event
        this.createDomElement(filterTemplate);
    }
    /**
     * Create the HTML template as a string
     * @protected
     * @param {?} optionCollection
     * @param {?} searchTerms
     * @return {?}
     */
    buildTemplateHtmlString(optionCollection, searchTerms) {
        /** @type {?} */
        let options = '';
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        /** @type {?} */
        const isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
        /** @type {?} */
        const sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(x => typeof x === 'string')) {
            optionCollection.forEach((option) => {
                /** @type {?} */
                const selected = (searchTerms.findIndex((term) => term === option) >= 0) ? 'selected' : '';
                options += `<option value="${option}" label="${option}" ${selected}>${option}</option>`;
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    this.isFilled = true;
                }
            });
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            optionCollection.forEach((option) => {
                if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
                }
                /** @type {?} */
                const labelKey = (/** @type {?} */ ((option.labelKey || option[this.labelName])));
                /** @type {?} */
                const selected = (searchTerms.findIndex((term) => term === option[this.valueName]) >= 0) ? 'selected' : '';
                /** @type {?} */
                const labelText = ((option.labelKey || this.enableTranslateLabel) && labelKey) ? this.translate.instant(labelKey || ' ') : labelKey;
                /** @type {?} */
                let prefixText = option[this.labelPrefixName] || '';
                /** @type {?} */
                let suffixText = option[this.labelSuffixName] || '';
                /** @type {?} */
                let optionLabel = option[this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this.translate.instant(prefixText || ' ') : prefixText;
                suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this.translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? this.translate.instant(optionLabel || ' ') : optionLabel;
                // add to a temp array for joining purpose and filter out empty text
                /** @type {?} */
                const tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
                /** @type {?} */
                let optionText = tmpOptionArray.join(separatorBetweenLabels);
                // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                if (isRenderHtmlEnabled) {
                    // sanitize any unauthorized html tags like script and others
                    // for the remaining allowed tags we'll permit all attributes
                    /** @type {?} */
                    const sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
                    optionText = htmlEncode(sanitizedText);
                }
                // html text of each select option
                options += `<option value="${option[this.valueName]}" label="${optionLabel}" ${selected}>${optionText}</option>`;
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    this.isFilled = true;
                }
            });
        }
        return `<select class="ms-filter search-filter filter-${fieldId}" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
    }
    /**
     * Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be
     * @protected
     * @return {?}
     */
    createBlankEntry() {
        /** @type {?} */
        const blankEntry = {
            [this.labelName]: '',
            [this.valueName]: ''
        };
        if (this.labelPrefixName) {
            blankEntry[this.labelPrefixName] = '';
        }
        if (this.labelSuffixName) {
            blankEntry[this.labelSuffixName] = '';
        }
        return blankEntry;
    }
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @protected
     * @param {?} filterTemplate
     * @return {?}
     */
    createDomElement(filterTemplate) {
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        this.elementName = `filter-${fieldId}`;
        this.defaultOptions.name = this.elementName;
        /** @type {?} */
        const $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error(`multiple-select.js was not found, make sure to modify your "angular-cli.json" file and include "../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js" and it's css or SASS file`);
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
        const elementOptions = Object.assign({}, this.defaultOptions, this.columnFilter.filterOptions);
        this.filterElmOptions = Object.assign({}, this.defaultOptions, elementOptions);
        this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFVTCxZQUFZLEdBSWIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BILE9BQU8sRUFBYyxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sS0FBSyxVQUFVLE1BQU0sV0FBVyxDQUFDOztNQUNsQyxTQUFTLEdBQUcsVUFBVTtBQUs1QixNQUFNLE9BQU8sWUFBWTs7Ozs7OztJQTJCdkIsWUFBc0IsU0FBMkIsRUFBWSxpQkFBb0MsRUFBWSxtQkFBbUIsSUFBSTtRQUE5RyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUFZLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFBWSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQU87UUFacEksYUFBUSxHQUFHLEtBQUssQ0FBQztRQU1qQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDN0Isa0JBQWEsR0FBbUIsRUFBRSxDQUFDOzs7Y0FPM0IsT0FBTyxHQUF5QjtZQUNwQyxvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsNkJBQTZCLEVBQUUsSUFBSTtZQUNuQyxTQUFTLEVBQUUsTUFBTTtZQUNqQixNQUFNLEVBQUUsS0FBSzs7WUFDYixTQUFTLEVBQUUsR0FBRztZQUNkLE1BQU0sRUFBRSxJQUFJO1lBRVosWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7OztzQkFFZixtQkFBbUIsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixJQUFJLEtBQUs7Z0JBQ3RILE9BQU8sbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pELENBQUM7WUFDRCxPQUFPLEVBQUUsR0FBRyxFQUFFOzs7O3NCQUdOLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUM7Z0JBQ2xFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdEY7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDNUY7Z0JBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUMvRyxDQUFDO1NBQ0Y7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN2QixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN4QixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLCtEQUErRDtZQUN4RixPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDbEUsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3RCxPQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdELE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdGQUFnRjtTQUN4SDtRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUdELElBQWMsWUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBR0QsSUFBYyxpQkFBaUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0lBQzVGLENBQUM7Ozs7OztJQUdELElBQWMsZUFBZTtRQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQzFGLENBQUM7Ozs7OztJQUdELElBQWMsV0FBVztRQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFHRCxJQUFJLFFBQVE7UUFDVixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQzdFLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDbEY7UUFDRCxPQUFRLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUN2RSxDQUFDOzs7Ozs7SUFLRCxJQUFJLENBQUMsSUFBcUI7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDaEksTUFBTSxJQUFJLEtBQUssQ0FBQywyV0FBMlcsQ0FBQyxDQUFDO1NBQzlYO1FBRUQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQztRQUMvRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksYUFBYSxDQUFDO1FBQ2pHLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsSUFBSSxhQUFhLENBQUM7UUFDakcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQztRQUN2RixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDO1FBRS9FLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssVUFBVSxDQUFDLEVBQUU7WUFDbEcsTUFBTSxJQUFJLEtBQUssQ0FBQyx3R0FBd0csQ0FBQyxDQUFDO1NBQzNIOzs7O2NBSUssYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxJQUFJLEVBQUU7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7OztjQUsvQixlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWU7UUFDOUUsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsOERBQThEO1NBQ3pHO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO1lBQ3JELCtIQUErSDtZQUMvSCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3JGO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2hDO1FBRUQsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Ozs7OztJQUtELFNBQVMsQ0FBQyxNQUFpQztRQUN6QyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQzs7Ozs7Ozs7OztJQVdTLGdCQUFnQixDQUFDLGVBQWU7O1lBQ3BDLGdCQUFnQixHQUFHLGVBQWU7UUFFdEMsNERBQTREO1FBQzVELElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUU7O2tCQUN6RSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0I7O2tCQUMvQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMseUJBQXlCLElBQUksSUFBSTtZQUN2SSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDNUc7UUFFRCxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7Ozs7Ozs7SUFPUyxjQUFjLENBQUMsZUFBZTs7WUFDbEMsZ0JBQWdCLEdBQUcsZUFBZTtRQUV0Qyx5Q0FBeUM7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTs7a0JBQ3ZFLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQjtZQUNqRCxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUMvRztRQUVELE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRWUsa0JBQWtCLENBQUMsZUFBOEQ7OztnQkFDM0YsaUJBQWlCLEdBQVEsRUFBRTtZQUUvQixJQUFJLGVBQWUsRUFBRTtnQkFDbkIsaUJBQWlCLEdBQUcsTUFBTSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUU1RCx1RUFBdUU7Z0JBQ3ZFLDRHQUE0RztnQkFDNUcsdUVBQXVFO2dCQUN2RSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQzthQUNyQztRQUNILENBQUM7S0FBQTs7Ozs7O0lBR1MsNEJBQTRCOztjQUM5QixrQkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBTztRQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztRQUN2RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQ2pHLENBQUM7SUFDSixDQUFDOzs7Ozs7OztJQU1TLG1DQUFtQyxDQUFDLFVBQVU7UUFDdEQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLDBCQUEwQixFQUFFO1lBQy9FLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDbkc7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHFKQUFxSixDQUFDLENBQUM7U0FDeEs7UUFFRCxvR0FBb0c7UUFDcEcsa0dBQWtHO1FBQ2xHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUUxQywwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVTLGdCQUFnQixDQUFDLFVBQVU7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywwQkFBMEIsRUFBRTtZQUM3RyxVQUFVLEdBQUcscUJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQ25HO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO1NBQ3RGO1FBRUQsMkVBQTJFO1FBQzNFLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUU7WUFDbEUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1NBQzdDOztZQUVHLGFBQWEsR0FBRyxVQUFVO1FBRTlCLHdFQUF3RTtRQUN4RSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7Y0FHN0MsY0FBYyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVwRix1RUFBdUU7UUFDdkUsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7Ozs7OztJQUtTLHVCQUF1QixDQUFDLGdCQUF1QixFQUFFLFdBQXlCOztZQUM5RSxPQUFPLEdBQUcsRUFBRTs7Y0FDVixPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O2NBQzdDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsMEJBQTBCLElBQUksRUFBRTs7Y0FDMUcsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixJQUFJLEtBQUs7O2NBQ3RGLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFO1FBRXZGLHFEQUFxRDtRQUNyRCxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxFQUFFO1lBQ3RELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFOztzQkFDcEMsUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFGLE9BQU8sSUFBSSxrQkFBa0IsTUFBTSxZQUFZLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxXQUFXLENBQUM7Z0JBRXhGLCtGQUErRjtnQkFDL0YsSUFBSSxRQUFRLEVBQUU7b0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ3RCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsc0ZBQXNGO1lBQ3RGLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQW9CLEVBQUUsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLEVBQUU7b0JBQ3RGLE1BQU0sSUFBSSxLQUFLLENBQUMsb09BQW9PLENBQUMsQ0FBQztpQkFDdlA7O3NCQUNLLFFBQVEsR0FBRyxtQkFBQSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFVOztzQkFDaEUsUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFOztzQkFDcEcsU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVE7O29CQUMvSCxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFOztvQkFDL0MsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTs7b0JBQy9DLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hELFdBQVcsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGdGQUFnRjtnQkFFM0ksb0ZBQW9GO2dCQUNwRixVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztnQkFDbEosVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixJQUFJLFVBQVUsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7Z0JBQ2xKLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxXQUFXLElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDOzs7c0JBR2pKLGNBQWMsR0FBRyxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7O29CQUM3RSxVQUFVLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztnQkFFNUQsMEdBQTBHO2dCQUMxRyw2RkFBNkY7Z0JBQzdGLElBQUksbUJBQW1CLEVBQUU7Ozs7MEJBR2pCLGFBQWEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQztvQkFDdEUsVUFBVSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDeEM7Z0JBRUQsa0NBQWtDO2dCQUNsQyxPQUFPLElBQUksa0JBQWtCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksV0FBVyxLQUFLLFFBQVEsSUFBSSxVQUFVLFdBQVcsQ0FBQztnQkFFakgsK0ZBQStGO2dCQUMvRixJQUFJLFFBQVEsRUFBRTtvQkFDWixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDdEI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxpREFBaUQsT0FBTyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLFdBQVcsQ0FBQztJQUMvSSxDQUFDOzs7Ozs7SUFHUyxnQkFBZ0I7O2NBQ2xCLFVBQVUsR0FBRztZQUNqQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQ3BCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7U0FDckI7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDdkM7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDdkM7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7OztJQU9TLGdCQUFnQixDQUFDLGNBQXNCOztjQUN6QyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFFbkQsc0hBQXNIO1FBQ3RILElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDOztjQUV0QyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7UUFDeEQsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXRCLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwQyxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEtBQUssVUFBVSxFQUFFO1lBQ3hELE1BQU0sSUFBSSxLQUFLLENBQUMscU1BQXFNLENBQUMsQ0FBQztTQUN4TjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTFDLGdGQUFnRjtRQUNoRixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDcEM7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3RDOzs7Y0FHSyxjQUFjLHFCQUE4QixJQUFJLENBQUMsY0FBYyxFQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFFO1FBQzNHLElBQUksQ0FBQyxnQkFBZ0IscUJBQVEsSUFBSSxDQUFDLGNBQWMsRUFBSyxjQUFjLENBQUUsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FDRjs7Ozs7O0lBaFpDLG1DQUFvQjs7Ozs7SUFHcEIsd0NBQXVDOzs7OztJQUd2QyxrQ0FBZ0I7O0lBRWhCLDRCQUFVOztJQUNWLG1DQUEwQjs7SUFDMUIsaUNBQWtCOztJQUNsQixnQ0FBeUI7O0lBQ3pCLHNDQUFxQzs7SUFDckMsZ0NBQWlCOztJQUNqQixpQ0FBa0I7O0lBQ2xCLHVDQUF3Qjs7SUFDeEIsdUNBQXdCOztJQUN4QixtQ0FBb0I7O0lBQ3BCLGlDQUFrQjs7SUFDbEIsNENBQTZCOztJQUM3QixxQ0FBbUM7Ozs7O0lBS3ZCLGlDQUFxQzs7Ozs7SUFBRSx5Q0FBOEM7Ozs7O0lBQUUsd0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUsXHJcbiAgQ29sbGVjdGlvbk9wdGlvbixcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2ssXHJcbiAgR3JpZE9wdGlvbixcclxuICBNdWx0aXBsZVNlbGVjdE9wdGlvbixcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgT3BlcmF0b3JTdHJpbmcsXHJcbiAgU2VhcmNoVGVybSxcclxuICBTZWxlY3RPcHRpb24sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvY29sbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSwgZ2V0RGVzY2VuZGFudFByb3BlcnR5LCBodG1sRW5jb2RlLCB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIERPTVB1cmlmeV8gZnJvbSAnZG9tcHVyaWZ5JztcclxuY29uc3QgRE9NUHVyaWZ5ID0gRE9NUHVyaWZ5XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCB0byB3b3JrXHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIC8qKiBET00gRWxlbWVudCBOYW1lLCB1c2VmdWwgZm9yIGF1dG8tZGV0ZWN0aW5nIHBvc2l0aW9uaW5nIChkcm9wdXAgLyBkcm9wZG93bikgKi9cclxuICBlbGVtZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogRmlsdGVyIE11bHRpcGxlLVNlbGVjdCBvcHRpb25zICovXHJcbiAgZmlsdGVyRWxtT3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb247XHJcblxyXG4gIC8qKiBUaGUgSlF1ZXJ5IERPTSBlbGVtZW50ICovXHJcbiAgJGZpbHRlckVsbTogYW55O1xyXG5cclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcbiAgZGVmYXVsdE9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uO1xyXG4gIGlzRmlsbGVkID0gZmFsc2U7XHJcbiAgbGFiZWxOYW1lOiBzdHJpbmc7XHJcbiAgbGFiZWxQcmVmaXhOYW1lOiBzdHJpbmc7XHJcbiAgbGFiZWxTdWZmaXhOYW1lOiBzdHJpbmc7XHJcbiAgb3B0aW9uTGFiZWw6IHN0cmluZztcclxuICB2YWx1ZU5hbWU6IHN0cmluZztcclxuICBlbmFibGVUcmFuc2xhdGVMYWJlbCA9IGZhbHNlO1xyXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsIHByb3RlY3RlZCBjb2xsZWN0aW9uU2VydmljZTogQ29sbGVjdGlvblNlcnZpY2UsIHByb3RlY3RlZCBpc011bHRpcGxlU2VsZWN0ID0gdHJ1ZSkge1xyXG4gICAgLy8gZGVmYXVsdCBvcHRpb25zIHVzZWQgYnkgdGhpcyBGaWx0ZXIsIHVzZXIgY2FuIG92ZXJ3cml0ZSBhbnkgb2YgdGhlc2UgYnkgcGFzc2luZyBcIm90aW9uc1wiXHJcbiAgICBjb25zdCBvcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbiA9IHtcclxuICAgICAgYXV0b0FkanVzdERyb3BIZWlnaHQ6IHRydWUsXHJcbiAgICAgIGF1dG9BZGp1c3REcm9wUG9zaXRpb246IHRydWUsXHJcbiAgICAgIGF1dG9BZGp1c3REcm9wV2lkdGhCeVRleHRTaXplOiB0cnVlLFxyXG4gICAgICBjb250YWluZXI6ICdib2R5JyxcclxuICAgICAgZmlsdGVyOiBmYWxzZSwgIC8vIGlucHV0IHNlYXJjaCB0ZXJtIG9uIHRvcCBvZiB0aGUgc2VsZWN0IG9wdGlvbiBsaXN0XHJcbiAgICAgIG1heEhlaWdodDogMjc1LFxyXG4gICAgICBzaW5nbGU6IHRydWUsXHJcblxyXG4gICAgICB0ZXh0VGVtcGxhdGU6ICgkZWxtKSA9PiB7XHJcbiAgICAgICAgLy8gcmVuZGVyIEhUTUwgY29kZSBvciBub3QsIGJ5IGRlZmF1bHQgaXQgaXMgc2FuaXRpemVkIGFuZCB3b24ndCBiZSByZW5kZXJlZFxyXG4gICAgICAgIGNvbnN0IGlzUmVuZGVySHRtbEVuYWJsZWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmVuYWJsZVJlbmRlckh0bWwgfHwgZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGlzUmVuZGVySHRtbEVuYWJsZWQgPyAkZWxtLnRleHQoKSA6ICRlbG0uaHRtbCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gd2Ugd2lsbCBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnQgZm9yIHRyaWdnZXJpbmcgb3VyIGNhbGxiYWNrXHJcbiAgICAgICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdnZXRTZWxlY3RzJyk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtcykgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykuc2libGluZ3MoJ2RpdiAuc2VhcmNoLWZpbHRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pc0ZpbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKS5zaWJsaW5ncygnZGl2IC5zZWFyY2gtZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayh1bmRlZmluZWQsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBzZWxlY3RlZEl0ZW1zIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3QpIHtcclxuICAgICAgb3B0aW9ucy5zaW5nbGUgPSBmYWxzZTtcclxuICAgICAgb3B0aW9ucy5va0J1dHRvbiA9IHRydWU7XHJcbiAgICAgIG9wdGlvbnMuYWRkVGl0bGUgPSB0cnVlOyAvLyBzaG93IHRvb2x0aXAgb2YgYWxsIHNlbGVjdGVkIGl0ZW1zIHdoaWxlIGhvdmVyaW5nIHRoZSBmaWx0ZXJcclxuICAgICAgb3B0aW9ucy5jb3VudFNlbGVjdGVkID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnWF9PRl9ZX1NFTEVDVEVEJyk7XHJcbiAgICAgIG9wdGlvbnMuYWxsU2VsZWN0ZWQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdBTExfU0VMRUNURUQnKTtcclxuICAgICAgb3B0aW9ucy5zZWxlY3RBbGxUZXh0ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU0VMRUNUX0FMTCcpO1xyXG4gICAgICBvcHRpb25zLnNlbGVjdEFsbERlbGltaXRlciA9IFsnJywgJyddOyAvLyByZW1vdmUgZGVmYXVsdCBzcXVhcmUgYnJhY2tldHMgb2YgZGVmYXVsdCB0ZXh0IFwiW1NlbGVjdCBBbGxdXCIgPT4gXCJTZWxlY3QgQWxsXCJcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRmlsdGVyIGl0c2VsZiAqL1xyXG4gIHByb3RlY3RlZCBnZXQgY29sdW1uRmlsdGVyKCk6IENvbHVtbkZpbHRlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbGxlY3Rpb24gT3B0aW9ucyAqL1xyXG4gIHByb3RlY3RlZCBnZXQgY29sbGVjdGlvbk9wdGlvbnMoKTogQ29sbGVjdGlvbk9wdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDdXN0b20gU3RydWN0dXJlIGlmIGV4aXN0ICovXHJcbiAgcHJvdGVjdGVkIGdldCBjdXN0b21TdHJ1Y3R1cmUoKTogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmU7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByb3RlY3RlZCBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgZmlsdGVyIG9wZXJhdG9yICovXHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICB0aGlzLmlzTXVsdGlwbGVTZWxlY3QgPyBPcGVyYXRvclR5cGUuaW4gOiBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xyXG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XHJcblxyXG4gICAgaWYgKCF0aGlzLmdyaWQgfHwgIXRoaXMuY29sdW1uRGVmIHx8ICF0aGlzLmNvbHVtbkZpbHRlciB8fCAoIXRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gJiYgIXRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiAob3IgXCJjb2xsZWN0aW9uQXN5bmNcIikgZm9yIHRoZSBNdWx0aXBsZVNlbGVjdC9TaW5nbGVTZWxlY3QgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5LiBBbHNvIGVhY2ggb3B0aW9uIHNob3VsZCBpbmNsdWRlIGEgdmFsdWUvbGFiZWwgcGFpciAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpLiBGb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5tdWx0aXBsZVNlbGVjdCwgY29sbGVjdGlvbjogW3sgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZScgfSwgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSB0aGlzLmNvbHVtbkZpbHRlci5lbmFibGVUcmFuc2xhdGVMYWJlbDtcclxuICAgIHRoaXMubGFiZWxOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWwgfHwgJ2xhYmVsJztcclxuICAgIHRoaXMubGFiZWxQcmVmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxQcmVmaXggfHwgJ2xhYmVsUHJlZml4JztcclxuICAgIHRoaXMubGFiZWxTdWZmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxTdWZmaXggfHwgJ2xhYmVsU3VmZml4JztcclxuICAgIHRoaXMub3B0aW9uTGFiZWwgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5vcHRpb25MYWJlbCB8fCAndmFsdWUnO1xyXG4gICAgdGhpcy52YWx1ZU5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSB8fCAndmFsdWUnO1xyXG5cclxuICAgIGlmICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmICghdGhpcy50cmFuc2xhdGUgfHwgdHlwZW9mIHRoaXMudHJhbnNsYXRlLmluc3RhbnQgIT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW3NlbGVjdC1lZGl0b3JdIFRoZSBuZ3gtdHJhbnNsYXRlIFRyYW5zbGF0ZVNlcnZpY2UgaXMgcmVxdWlyZWQgZm9yIHRoZSBTZWxlY3QgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWx3YXlzIHJlbmRlciB0aGUgU2VsZWN0IChkcm9wZG93bikgRE9NIGVsZW1lbnQsIGV2ZW4gaWYgdXNlciBwYXNzZWQgYSBcImNvbGxlY3Rpb25Bc3luY1wiLFxyXG4gICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgdGhlIFNlbGVjdCB3aWxsIHNpbXBseSBiZSB3aXRob3V0IGFueSBvcHRpb25zIGJ1dCB3ZSBzdGlsbCBoYXZlIHRvIHJlbmRlciBpdCAoZWxzZSBTbGlja0dyaWQgd291bGQgdGhyb3cgYW4gZXJyb3IpXHJcbiAgICBjb25zdCBuZXdDb2xsZWN0aW9uID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiB8fCBbXTtcclxuICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudChuZXdDb2xsZWN0aW9uKTtcclxuXHJcbiAgICAvLyBvbiBldmVyeSBGaWx0ZXIgd2hpY2ggaGF2ZSBhIFwiY29sbGVjdGlvblwiIG9yIGEgXCJjb2xsZWN0aW9uQXN5bmNcIlxyXG4gICAgLy8gd2Ugd2lsbCBhZGQgKG9yIHJlcGxhY2UpIGEgU3ViamVjdCB0byB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBwcm9wZXJ0eSBzbyB0aGF0IHVzZXIgaGFzIHBvc3NpYmlsaXR5IHRvIGNoYW5nZSB0aGUgY29sbGVjdGlvblxyXG4gICAgLy8gaWYgXCJjb2xsZWN0aW9uQXN5bmNcIiBpcyBhbHJlYWR5IHNldCBieSB0aGUgdXNlciwgaXQgd2lsbCByZXNvbHZlIGl0IGZpcnN0IHRoZW4gYWZ0ZXIgaXQgd2lsbCByZXBsYWNlIGl0IHdpdGggYSBTdWJqZWN0XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uQXN5bmMgPSB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uQXN5bmM7XHJcbiAgICBpZiAoY29sbGVjdGlvbkFzeW5jKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyT3B0aW9uc0FzeW5jKGNvbGxlY3Rpb25Bc3luYyk7IC8vIGNyZWF0ZSBTdWJqZWN0IGFmdGVyIHJlc29sdmUgKGNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlc1xyXG4gICAqL1xyXG4gIGNsZWFyKCkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QpIHtcclxuICAgICAgLy8gcmVsb2FkIHRoZSBmaWx0ZXIgZWxlbWVudCBieSBpdCdzIGlkLCB0byBtYWtlIHN1cmUgaXQncyBzdGlsbCBhIHZhbGlkIGVsZW1lbnQgKGJlY2F1c2Ugb2Ygc29tZSBpc3N1ZSBpbiB0aGUgR3JhcGhRTCBleGFtcGxlKVxyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QoJ3NldFNlbGVjdHMnLCBbXSk7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcclxuICAgICAgdGhpcy5jYWxsYmFjayh1bmRlZmluZWQsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xyXG4gICAgICAvLyByZW1vdmUgZXZlbnQgd2F0Y2hlclxyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCkucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBkaXNwb3NlIG9mIGFsbCBTdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuc3Vic2NyaXB0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybSB8IFNlYXJjaFRlcm1bXSkge1xyXG4gICAgaWYgKHZhbHVlcykge1xyXG4gICAgICB2YWx1ZXMgPSBBcnJheS5pc0FycmF5KHZhbHVlcykgPyB2YWx1ZXMgOiBbdmFsdWVzXTtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdzZXRTZWxlY3RzJywgdmFsdWVzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJvdGVjdGVkIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gaW5wdXRDb2xsZWN0aW9uXHJcbiAgICogQHJldHVybiBvdXRwdXRDb2xsZWN0aW9uIGZpbHRlcmVkIGFuZC9vciBzb3J0ZWQgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBmaWx0ZXJDb2xsZWN0aW9uKGlucHV0Q29sbGVjdGlvbikge1xyXG4gICAgbGV0IG91dHB1dENvbGxlY3Rpb24gPSBpbnB1dENvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5KSB7XHJcbiAgICAgIGNvbnN0IGZpbHRlckJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5O1xyXG4gICAgICBjb25zdCBmaWx0ZXJDb2xsZWN0aW9uQnkgPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucy5maWx0ZXJSZXN1bHRBZnRlckVhY2hQYXNzIHx8IG51bGw7XHJcbiAgICAgIG91dHB1dENvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25TZXJ2aWNlLmZpbHRlckNvbGxlY3Rpb24ob3V0cHV0Q29sbGVjdGlvbiwgZmlsdGVyQnksIGZpbHRlckNvbGxlY3Rpb25CeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvbiBpbiBhIGNlcnRhaW4gd2F5XHJcbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxyXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBmaWx0ZXJlZCBhbmQvb3Igc29ydGVkIGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc29ydENvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvblxyXG4gICAgaWYgKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Tb3J0QnkpIHtcclxuICAgICAgY29uc3Qgc29ydEJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvblNvcnRCeTtcclxuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvblNlcnZpY2Uuc29ydENvbGxlY3Rpb24ob3V0cHV0Q29sbGVjdGlvbiwgc29ydEJ5LCB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhc3luYyByZW5kZXJPcHRpb25zQXN5bmMoY29sbGVjdGlvbkFzeW5jOiBQcm9taXNlPGFueT4gfCBPYnNlcnZhYmxlPGFueT4gfCBTdWJqZWN0PGFueT4pIHtcclxuICAgIGxldCBhd2FpdGVkQ29sbGVjdGlvbjogYW55ID0gW107XHJcblxyXG4gICAgaWYgKGNvbGxlY3Rpb25Bc3luYykge1xyXG4gICAgICBhd2FpdGVkQ29sbGVjdGlvbiA9IGF3YWl0IGNhc3RUb1Byb21pc2UoY29sbGVjdGlvbkFzeW5jKTtcclxuICAgICAgdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhhd2FpdGVkQ29sbGVjdGlvbik7XHJcblxyXG4gICAgICAvLyBiZWNhdXNlIHdlIGFjY2VwdCBQcm9taXNlcyAmIEh0dHBDbGllbnQgT2JzZXJ2YWJsZSBvbmx5IGV4ZWN1dGUgb25jZVxyXG4gICAgICAvLyB3ZSB3aWxsIHJlLWNyZWF0ZSBhbiBSeEpzIFN1YmplY3Qgd2hpY2ggd2lsbCByZXBsYWNlIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIHdoaWNoIGdvdCBleGVjdXRlZCBvbmNlIGFueXdheVxyXG4gICAgICAvLyBkb2luZyB0aGlzIHByb3ZpZGUgdGhlIHVzZXIgYSB3YXkgdG8gY2FsbCBhIFwiY29sbGVjdGlvbkFzeW5jLm5leHQoKVwiXHJcbiAgICAgIHRoaXMuY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSBvciByZWNyZWF0ZSBhbiBPYnNlcnZhYmxlIFN1YmplY3QgYW5kIHJlYXNzaWduIGl0IHRvIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIG9iamVjdCBzbyB1c2VyIGNhbiBjYWxsIGEgXCJjb2xsZWN0aW9uQXN5bmMubmV4dCgpXCIgb24gaXQgKi9cclxuICBwcm90ZWN0ZWQgY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdCgpIHtcclxuICAgIGNvbnN0IG5ld0NvbGxlY3Rpb25Bc3luYyA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYyA9IG5ld0NvbGxlY3Rpb25Bc3luYztcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICBuZXdDb2xsZWN0aW9uQXN5bmMuc3Vic2NyaWJlKGNvbGxlY3Rpb24gPT4gdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhjb2xsZWN0aW9uKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHVzZXIgdXNlIGEgQ29sbGVjdGlvbkFzeW5jIHdlIHdpbGwgdXNlIHRoZSByZXR1cm5lZCBjb2xsZWN0aW9uIHRvIHJlbmRlciB0aGUgZmlsdGVyIERPTSBlbGVtZW50XHJcbiAgICogYW5kIHJlaW5pdGlhbGl6ZSBmaWx0ZXIgY29sbGVjdGlvbiB3aXRoIHRoaXMgbmV3IGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudEZyb21Db2xsZWN0aW9uQXN5bmMoY29sbGVjdGlvbikge1xyXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHB1bGwgdGhlIGNvbGxlY3Rpb24gZnJvbSB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBjYWxsIGluIHRoZSBTZWxlY3QgRmlsdGVyLCB0aGUgY29sbGVjdGlvbiBpcyBub3QgYSB2YWxpZCBhcnJheS4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb3B5IG92ZXIgdGhlIGFycmF5IHJlY2VpdmVkIGZyb20gdGhlIGFzeW5jIGNhbGwgdG8gdGhlIFwiY29sbGVjdGlvblwiIGFzIHRoZSBuZXcgY29sbGVjdGlvbiB0byB1c2VcclxuICAgIC8vIHRoaXMgaGFzIHRvIGJlIEJFRk9SRSB0aGUgYGNvbGxlY3Rpb25PYnNlcnZlcigpLnN1YnNjcmliZWAgdG8gYXZvaWQgZ29pbmcgaW50byBhbiBpbmZpbml0ZSBsb29wXHJcbiAgICB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyByZWNyZWF0ZSBNdWx0aXBsZSBTZWxlY3QgYWZ0ZXIgZ2V0dGluZyBhc3luYyBjb2xsZWN0aW9uXHJcbiAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnQoY29sbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgIGNvbGxlY3Rpb24gPSBnZXREZXNjZW5kYW50UHJvcGVydHkoY29sbGVjdGlvbiwgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJjb2xsZWN0aW9uXCIgcGFzc2VkIHRvIHRoZSBTZWxlY3QgRmlsdGVyIGlzIG5vdCBhIHZhbGlkIGFycmF5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlciBjYW4gb3B0aW9uYWxseSBhZGQgYSBibGFuayBlbnRyeSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmFkZEJsYW5rRW50cnkpIHtcclxuICAgICAgY29sbGVjdGlvbi51bnNoaWZ0KHRoaXMuY3JlYXRlQmxhbmtFbnRyeSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbmV3Q29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBhbmQvb3Igc29ydCBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBuZXdDb2xsZWN0aW9uID0gdGhpcy5maWx0ZXJDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xyXG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuc29ydENvbGxlY3Rpb24obmV3Q29sbGVjdGlvbik7XHJcblxyXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcclxuICAgIGNvbnN0IGZpbHRlclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZyhuZXdDb2xsZWN0aW9uLCB0aGlzLnNlYXJjaFRlcm1zKTtcclxuXHJcbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIHByZS1sb2FkIHNlYXJjaCB0ZXJtc1xyXG4gICAgLy8gYWxzbyBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnRcclxuICAgIHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcob3B0aW9uQ29sbGVjdGlvbjogYW55W10sIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10pIHtcclxuICAgIGxldCBvcHRpb25zID0gJyc7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBzZXBhcmF0b3JCZXR3ZWVuTGFiZWxzID0gdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLnNlcGFyYXRvckJldHdlZW5UZXh0TGFiZWxzIHx8ICcnO1xyXG4gICAgY29uc3QgaXNSZW5kZXJIdG1sRW5hYmxlZCA9IHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVJlbmRlckh0bWwgfHwgZmFsc2U7XHJcbiAgICBjb25zdCBzYW5pdGl6ZWRPcHRpb25zID0gdGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLnNhbml0aXplSHRtbE9wdGlvbnMgfHwge307XHJcblxyXG4gICAgLy8gY29sbGVjdGlvbiBjb3VsZCBiZSBhbiBBcnJheSBvZiBTdHJpbmdzIE9SIE9iamVjdHNcclxuICAgIGlmIChvcHRpb25Db2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSAoc2VhcmNoVGVybXMuZmluZEluZGV4KCh0ZXJtKSA9PiB0ZXJtID09PSBvcHRpb24pID49IDApID8gJ3NlbGVjdGVkJyA6ICcnO1xyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIiBsYWJlbD1cIiR7b3B0aW9ufVwiICR7c2VsZWN0ZWR9PiR7b3B0aW9ufTwvb3B0aW9uPmA7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYXQgbGVhc3QgMSBzZWFyY2ggdGVybSBmb3VuZCwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuaXNGaWxsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBhcnJheSBvZiBvYmplY3RzIHdpbGwgcmVxdWlyZSBhIGxhYmVsL3ZhbHVlIHBhaXIgdW5sZXNzIGEgY3VzdG9tU3RydWN0dXJlIGlzIHBhc3NlZFxyXG4gICAgICBvcHRpb25Db2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogU2VsZWN0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYgKCFvcHRpb24gfHwgKG9wdGlvblt0aGlzLmxhYmVsTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBvcHRpb24ubGFiZWxLZXkgPT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgW3NlbGVjdC1maWx0ZXJdIEEgY29sbGVjdGlvbiB3aXRoIHZhbHVlL2xhYmVsIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkgaXMgcmVxdWlyZWQgdG8gcG9wdWxhdGUgdGhlIFNlbGVjdCBsaXN0LCBmb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5tdWx0aXBsZVNlbGVjdCwgY29sbGVjdGlvbjogWyB7IHZhbHVlOiAnMScsIGxhYmVsOiAnT25lJyB9IF0nKWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsYWJlbEtleSA9IChvcHRpb24ubGFiZWxLZXkgfHwgb3B0aW9uW3RoaXMubGFiZWxOYW1lXSkgYXMgc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gKHNlYXJjaFRlcm1zLmZpbmRJbmRleCgodGVybSkgPT4gdGVybSA9PT0gb3B0aW9uW3RoaXMudmFsdWVOYW1lXSkgPj0gMCkgPyAnc2VsZWN0ZWQnIDogJyc7XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gKChvcHRpb24ubGFiZWxLZXkgfHwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCkgJiYgbGFiZWxLZXkpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChsYWJlbEtleSB8fCAnICcpIDogbGFiZWxLZXk7XHJcbiAgICAgICAgbGV0IHByZWZpeFRleHQgPSBvcHRpb25bdGhpcy5sYWJlbFByZWZpeE5hbWVdIHx8ICcnO1xyXG4gICAgICAgIGxldCBzdWZmaXhUZXh0ID0gb3B0aW9uW3RoaXMubGFiZWxTdWZmaXhOYW1lXSB8fCAnJztcclxuICAgICAgICBsZXQgb3B0aW9uTGFiZWwgPSBvcHRpb25bdGhpcy5vcHRpb25MYWJlbF0gfHwgJyc7XHJcbiAgICAgICAgb3B0aW9uTGFiZWwgPSBvcHRpb25MYWJlbC50b1N0cmluZygpLnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpOyAvLyByZXBsYWNlIGRvdWJsZSBxdW90ZXMgYnkgc2luZ2xlIHF1b3RlcyB0byBhdm9pZCBpbnRlcmZlcmluZyB3aXRoIHJlZ3VsYXIgaHRtbFxyXG5cclxuICAgICAgICAvLyBhbHNvIHRyYW5zbGF0ZSBwcmVmaXgvc3VmZml4IGlmIGVuYWJsZVRyYW5zbGF0ZUxhYmVsIGlzIHRydWUgYW5kIHRleHQgaXMgYSBzdHJpbmdcclxuICAgICAgICBwcmVmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgcHJlZml4VGV4dCAmJiB0eXBlb2YgcHJlZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChwcmVmaXhUZXh0IHx8ICcgJykgOiBwcmVmaXhUZXh0O1xyXG4gICAgICAgIHN1ZmZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBzdWZmaXhUZXh0ICYmIHR5cGVvZiBzdWZmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHN1ZmZpeFRleHQgfHwgJyAnKSA6IHN1ZmZpeFRleHQ7XHJcbiAgICAgICAgb3B0aW9uTGFiZWwgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBvcHRpb25MYWJlbCAmJiB0eXBlb2Ygb3B0aW9uTGFiZWwgPT09ICdzdHJpbmcnKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQob3B0aW9uTGFiZWwgfHwgJyAnKSA6IG9wdGlvbkxhYmVsO1xyXG5cclxuICAgICAgICAvLyBhZGQgdG8gYSB0ZW1wIGFycmF5IGZvciBqb2luaW5nIHB1cnBvc2UgYW5kIGZpbHRlciBvdXQgZW1wdHkgdGV4dFxyXG4gICAgICAgIGNvbnN0IHRtcE9wdGlvbkFycmF5ID0gW3ByZWZpeFRleHQsIGxhYmVsVGV4dCwgc3VmZml4VGV4dF0uZmlsdGVyKCh0ZXh0KSA9PiB0ZXh0KTtcclxuICAgICAgICBsZXQgb3B0aW9uVGV4dCA9IHRtcE9wdGlvbkFycmF5LmpvaW4oc2VwYXJhdG9yQmV0d2VlbkxhYmVscyk7XHJcblxyXG4gICAgICAgIC8vIGlmIHVzZXIgc3BlY2lmaWNhbGx5IHdhbnRzIHRvIHJlbmRlciBodG1sIHRleHQsIGhlIG5lZWRzIHRvIG9wdC1pbiBlbHNlIGl0IHdpbGwgc3RyaXBwZWQgb3V0IGJ5IGRlZmF1bHRcclxuICAgICAgICAvLyBhbHNvLCB0aGUgM3JkIHBhcnR5IGxpYiB3aWxsIHNhbmluaXR6ZSBhbnkgaHRtbCBjb2RlIHVubGVzcyBpdCdzIGVuY29kZWQsIHNvIHdlJ2xsIGRvIHRoYXRcclxuICAgICAgICBpZiAoaXNSZW5kZXJIdG1sRW5hYmxlZCkge1xyXG4gICAgICAgICAgLy8gc2FuaXRpemUgYW55IHVuYXV0aG9yaXplZCBodG1sIHRhZ3MgbGlrZSBzY3JpcHQgYW5kIG90aGVyc1xyXG4gICAgICAgICAgLy8gZm9yIHRoZSByZW1haW5pbmcgYWxsb3dlZCB0YWdzIHdlJ2xsIHBlcm1pdCBhbGwgYXR0cmlidXRlc1xyXG4gICAgICAgICAgY29uc3Qgc2FuaXRpemVkVGV4dCA9IERPTVB1cmlmeS5zYW5pdGl6ZShvcHRpb25UZXh0LCBzYW5pdGl6ZWRPcHRpb25zKTtcclxuICAgICAgICAgIG9wdGlvblRleHQgPSBodG1sRW5jb2RlKHNhbml0aXplZFRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaHRtbCB0ZXh0IG9mIGVhY2ggc2VsZWN0IG9wdGlvblxyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvblt0aGlzLnZhbHVlTmFtZV19XCIgbGFiZWw9XCIke29wdGlvbkxhYmVsfVwiICR7c2VsZWN0ZWR9PiR7b3B0aW9uVGV4dH08L29wdGlvbj5gO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGVyZSdzIGF0IGxlYXN0IDEgc2VhcmNoIHRlcm0gZm91bmQsIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgPHNlbGVjdCBjbGFzcz1cIm1zLWZpbHRlciBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCIgJHt0aGlzLmlzTXVsdGlwbGVTZWxlY3QgPyAnbXVsdGlwbGU9XCJtdWx0aXBsZVwiJyA6ICcnfT4ke29wdGlvbnN9PC9zZWxlY3Q+YDtcclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGUgYSBibGFuayBlbnRyeSB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgY29sbGVjdGlvbi4gSXQgd2lsbCBhbHNvIHJldXNlIHRoZSBzYW1lIGN1c3RvbVN0cnVjdHVyZSBpZiBuZWVkIGJlICovXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZUJsYW5rRW50cnkoKSB7XHJcbiAgICBjb25zdCBibGFua0VudHJ5ID0ge1xyXG4gICAgICBbdGhpcy5sYWJlbE5hbWVdOiAnJyxcclxuICAgICAgW3RoaXMudmFsdWVOYW1lXTogJydcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5sYWJlbFByZWZpeE5hbWUpIHtcclxuICAgICAgYmxhbmtFbnRyeVt0aGlzLmxhYmVsUHJlZml4TmFtZV0gPSAnJztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxhYmVsU3VmZml4TmFtZSkge1xyXG4gICAgICBibGFua0VudHJ5W3RoaXMubGFiZWxTdWZmaXhOYW1lXSA9ICcnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJsYW5rRW50cnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcclxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcclxuICAgKiBAcGFyYW0gZmlsdGVyVGVtcGxhdGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcblxyXG4gICAgLy8gcHJvdmlkZSB0aGUgbmFtZSBhdHRyaWJ1dGUgdG8gdGhlIERPTSBlbGVtZW50IHdoaWNoIHdpbGwgYmUgbmVlZGVkIHRvIGF1dG8tYWRqdXN0IGRyb3AgcG9zaXRpb24gKGRyb3B1cCAvIGRyb3Bkb3duKVxyXG4gICAgdGhpcy5lbGVtZW50TmFtZSA9IGBmaWx0ZXItJHtmaWVsZElkfWA7XHJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb25zLm5hbWUgPSB0aGlzLmVsZW1lbnROYW1lO1xyXG5cclxuICAgIGNvbnN0ICRoZWFkZXJFbG0gPSB0aGlzLmdyaWQuZ2V0SGVhZGVyUm93Q29sdW1uKGZpZWxkSWQpO1xyXG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gJChmaWx0ZXJUZW1wbGF0ZSk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYG11bHRpcGxlLXNlbGVjdC5qcyB3YXMgbm90IGZvdW5kLCBtYWtlIHN1cmUgdG8gbW9kaWZ5IHlvdXIgXCJhbmd1bGFyLWNsaS5qc29uXCIgZmlsZSBhbmQgaW5jbHVkZSBcIi4uL25vZGVfbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9saWIvbXVsdGlwbGUtc2VsZWN0L211bHRpcGxlLXNlbGVjdC5qc1wiIGFuZCBpdCdzIGNzcyBvciBTQVNTIGZpbGVgKTtcclxuICAgIH1cclxuICAgIHRoaXMuJGZpbHRlckVsbS5hdHRyKCdpZCcsIHRoaXMuZWxlbWVudE5hbWUpO1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgaWYgKHRoaXMuaXNGaWxsZWQpIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0eXBlb2YgdGhpcy4kZmlsdGVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtZXJnZSBvcHRpb25zICYgYXR0YWNoIG11bHRpU2VsZWN0XHJcbiAgICBjb25zdCBlbGVtZW50T3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb24gPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLnRoaXMuY29sdW1uRmlsdGVyLmZpbHRlck9wdGlvbnMgfTtcclxuICAgIHRoaXMuZmlsdGVyRWxtT3B0aW9ucyA9IHsgLi4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4uZWxlbWVudE9wdGlvbnMgfTtcclxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCh0aGlzLmZpbHRlckVsbU9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CollectionService } from '../services/index';
import { arraysEqual, findOrDefault, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import * as DOMPurify_ from 'dompurify';
/** @type {?} */
const DOMPurify = DOMPurify_;
/**
 * Slickgrid editor class for multiple/single select lists
 */
export class SelectEditor {
    /**
     * @param {?} args
     * @param {?} isMultipleSelect
     */
    constructor(args, isMultipleSelect) {
        this.args = args;
        this.isMultipleSelect = isMultipleSelect;
        /**
         * Observable Subscriptions
         */
        this._subscriptions = [];
        // flag to signal that the editor is destroying itself, helps prevent
        // commit changes from being called twice and erroring
        this._destroying = false;
        this.gridOptions = (/** @type {?} */ (this.args.grid.getOptions()));
        /** @type {?} */
        const gridOptions = this.gridOptions || this.args.column.params || {};
        this._translate = gridOptions.i18n;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        this.elementName = `editor-${fieldId}`;
        /** @type {?} */
        const libOptions = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            maxHeight: 275,
            name: this.elementName,
            single: true,
            textTemplate: ($elm) => {
                // render HTML code or not, by default it is sanitized and won't be rendered
                /** @type {?} */
                const isRenderHtmlEnabled = this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            },
            onBlur: () => this.destroy(),
            onClose: () => {
                if (!this._destroying && args.grid.getOptions().autoCommitEdit) {
                    // do not use args.commitChanges() as this sets the focus to the next
                    // row. Also the select list will stay shown when clicking off the grid
                    args.grid.getEditorLock().commitCurrentEdit();
                }
            }
        };
        if (isMultipleSelect) {
            libOptions.single = false;
            libOptions.addTitle = true;
            libOptions.okButton = true;
            libOptions.selectAllDelimiter = ['', ''];
            if (this._translate) {
                libOptions.countSelected = this._translate.instant('X_OF_Y_SELECTED');
                libOptions.allSelected = this._translate.instant('ALL_SELECTED');
                libOptions.selectAllText = this._translate.instant('SELECT_ALL');
            }
        }
        // assign the multiple select lib options
        this.defaultOptions = libOptions;
        this.init();
    }
    /**
     * Get the Collection
     * @return {?}
     */
    get collection() {
        return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
    }
    /**
     * Getter for the Collection Options
     * @return {?}
     */
    get collectionOptions() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionOptions;
    }
    /**
     * Get Column Definition object
     * @return {?}
     */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /**
     * Get Column Editor object
     * @return {?}
     */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
    }
    /**
     * Getter for the Custom Structure if exist
     * @protected
     * @return {?}
     */
    get customStructure() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
    }
    /**
     * The current selected values (multiple select) from the collection
     * @return {?}
     */
    get currentValues() {
        // collection of strings, just return the filtered string that are equals
        if (this.collection.every(x => typeof x === 'string')) {
            return this.collection.filter(c => this.$editorElm.val().indexOf(c.toString()) !== -1);
        }
        // collection of label/value pair
        /** @type {?} */
        const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        /** @type {?} */
        const isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
        return this.collection
            .filter(c => this.$editorElm.val().indexOf(c[this.valueName].toString()) !== -1)
            .map(c => {
            /** @type {?} */
            const labelText = c[this.valueName];
            /** @type {?} */
            let prefixText = c[this.labelPrefixName] || '';
            /** @type {?} */
            let suffixText = c[this.labelSuffixName] || '';
            // also translate prefix/suffix if enableTranslateLabel is true and text is a string
            prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
            suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
            if (isIncludingPrefixSuffix) {
                /** @type {?} */
                const tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
                return tmpOptionArray.join(separatorBetweenLabels);
            }
            return labelText;
        });
    }
    /**
     * The current selected values (single select) from the collection
     * @return {?}
     */
    get currentValue() {
        // collection of strings, just return the filtered string that are equals
        if (this.collection.every(x => typeof x === 'string')) {
            return findOrDefault(this.collection, (c) => c.toString() === this.$editorElm.val());
        }
        // collection of label/value pair
        /** @type {?} */
        const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        /** @type {?} */
        const isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
        /** @type {?} */
        const itemFound = findOrDefault(this.collection, (c) => c[this.valueName].toString() === this.$editorElm.val());
        if (itemFound) {
            /** @type {?} */
            const labelText = itemFound[this.valueName];
            if (isIncludingPrefixSuffix) {
                /** @type {?} */
                let prefixText = itemFound[this.labelPrefixName] || '';
                /** @type {?} */
                let suffixText = itemFound[this.labelSuffixName] || '';
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
                suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
                // add to a temp array for joining purpose and filter out empty text
                /** @type {?} */
                const tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
                return tmpOptionArray.join(separatorBetweenLabels);
            }
            return labelText;
        }
        return '';
    }
    /**
     * Get the Validator function, can be passed in Editor property or Column Definition
     * @return {?}
     */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    /**
     * @return {?}
     */
    init() {
        if (!this.args) {
            throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
        }
        if (!this.columnDef || !this.columnDef.internalColumnEditor || (!this.columnDef.internalColumnEditor.collection && !this.columnDef.internalColumnEditor.collectionAsync)) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.
      Also each option should include a value/label pair (or value/labelKey when using Locale).
      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }`);
        }
        this._collectionService = new CollectionService(this._translate);
        this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this._translate || typeof this._translate.instant !== 'function')) {
            throw new Error(`[select-editor] The ngx-translate TranslateService is required for the Select Editor to work correctly`);
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        this.renderDomElement(this.collection);
    }
    /**
     * @param {?} item
     * @param {?} state
     * @return {?}
     */
    applyValue(item, state) {
        item[this.columnDef.field] = state;
    }
    /**
     * @return {?}
     */
    destroy() {
        this._destroying = true;
        if (this.$editorElm && this.$editorElm.multipleSelect) {
            this.$editorElm.multipleSelect('close');
            this.$editorElm.remove();
        }
        this._subscriptions = unsubscribeAllObservables(this._subscriptions);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadValue(item) {
        if (this.isMultipleSelect) {
            this.loadMultipleValues(item);
        }
        else {
            this.loadSingleValue(item);
        }
        this.refresh();
    }
    /**
     * @param {?} items
     * @return {?}
     */
    loadMultipleValues(items) {
        // convert to string because that is how the DOM will return these values
        this.defaultValue = items[this.columnDef.field].map((i) => i.toString());
        this.$editorElm.find('option').each((i, $e) => {
            $e.selected = (this.defaultValue.indexOf($e.value) !== -1);
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    loadSingleValue(item) {
        // convert to string because that is how the DOM will return these values
        // make sure the prop exists first
        this.defaultValue = item[this.columnDef.field] && item[this.columnDef.field].toString();
        this.$editorElm.find('option').each((i, $e) => {
            $e.selected = (this.defaultValue === $e.value);
        });
    }
    /**
     * @return {?}
     */
    serializeValue() {
        return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
    }
    /**
     * @return {?}
     */
    focus() {
        if (this.$editorElm && this.$editorElm.multipleSelect) {
            this.$editorElm.multipleSelect('focus');
        }
    }
    /**
     * @return {?}
     */
    isValueChanged() {
        if (this.isMultipleSelect) {
            return !arraysEqual(this.$editorElm.val(), this.defaultValue);
        }
        return this.$editorElm.val() !== this.defaultValue;
    }
    /**
     * @return {?}
     */
    validate() {
        if (this.validator) {
            /** @type {?} */
            const value = this.isMultipleSelect ? this.currentValues : this.currentValue;
            /** @type {?} */
            const validationResults = this.validator(value, this.args);
            if (!validationResults.valid) {
                return validationResults;
            }
        }
        // by default the editor is always valid
        // if user want it to be a required checkbox, he would have to provide his own validator
        return {
            valid: true,
            msg: null
        };
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
        if (this.columnEditor && this.columnEditor.collectionFilterBy) {
            /** @type {?} */
            const filterBy = this.columnEditor.collectionFilterBy;
            /** @type {?} */
            const filterCollectionBy = this.columnEditor.collectionOptions && this.columnEditor.collectionOptions.filterAfterEachPass || null;
            outputCollection = this._collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    }
    /**
     * user might want to sort the collection in a certain way
     * @protected
     * @param {?} inputCollection
     * @return {?} outputCollection sorted collection
     */
    sortCollection(inputCollection) {
        /** @type {?} */
        let outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
            /** @type {?} */
            const sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
            outputCollection = this._collectionService.sortCollection(outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
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
            throw new Error('The "collection" passed to the Select Editor is not a valid array');
        }
        // user can optionally add a blank entry at the beginning of the collection
        if (this.collectionOptions && this.collectionOptions.addBlankEntry) {
            collection.unshift(this.createBlankEntry());
        }
        /** @type {?} */
        let newCollection = collection || [];
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        /** @type {?} */
        const editorTemplate = this.buildTemplateHtmlString(newCollection);
        // step 2, create the DOM Element of the editor
        // also subscribe to the onClose event
        this.createDomElement(editorTemplate);
    }
    /**
     * @protected
     * @param {?} collection
     * @return {?}
     */
    buildTemplateHtmlString(collection) {
        /** @type {?} */
        let options = '';
        /** @type {?} */
        const fieldId = this.columnDef && this.columnDef.id;
        /** @type {?} */
        const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        /** @type {?} */
        const isRenderHtmlEnabled = this.columnDef.internalColumnEditor.enableRenderHtml || false;
        /** @type {?} */
        const sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (collection.every(x => typeof x === 'string')) {
            collection.forEach((option) => {
                options += `<option value="${option}" label="${option}">${option}</option>`;
            });
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            collection.forEach((option) => {
                if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])`);
                }
                /** @type {?} */
                const labelKey = (/** @type {?} */ ((option.labelKey || option[this.labelName])));
                /** @type {?} */
                const labelText = ((option.labelKey || this.enableTranslateLabel) && labelKey) ? this._translate.instant(labelKey || ' ') : labelKey;
                /** @type {?} */
                let prefixText = option[this.labelPrefixName] || '';
                /** @type {?} */
                let suffixText = option[this.labelSuffixName] || '';
                /** @type {?} */
                let optionLabel = option[this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
                suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? this._translate.instant(optionLabel || ' ') : optionLabel;
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
                options += `<option value="${option[this.valueName]}" label="${optionLabel}">${optionText}</option>`;
            });
        }
        return `<select id="${this.elementName}" class="ms-filter search-filter editor-${fieldId}" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
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
     * Build the template HTML string
     * @protected
     * @param {?} editorTemplate
     * @return {?}
     */
    createDomElement(editorTemplate) {
        this.$editorElm = $(editorTemplate);
        if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
            this.$editorElm.appendTo(this.args.container);
        }
        if (typeof this.$editorElm.multipleSelect !== 'function') {
            // fallback to bootstrap
            this.$editorElm.addClass('form-control');
        }
        else {
            /** @type {?} */
            const elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
            this.editorElmOptions = Object.assign({}, this.defaultOptions, elementOptions);
            this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
            setTimeout(() => this.$editorElm.multipleSelect('open'));
        }
    }
    // refresh the jquery object because the selected checkboxes were already set
    // prior to this method being called
    /**
     * @protected
     * @return {?}
     */
    refresh() {
        if (typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('refresh');
        }
    }
}
if (false) {
    /**
     * The JQuery DOM element
     * @type {?}
     */
    SelectEditor.prototype.$editorElm;
    /**
     * Editor Multiple-Select options
     * @type {?}
     */
    SelectEditor.prototype.editorElmOptions;
    /**
     * DOM Element Name, useful for auto-detecting positioning (dropup / dropdown)
     * @type {?}
     */
    SelectEditor.prototype.elementName;
    /**
     * The multiple-select options for a multiple select list
     * @type {?}
     */
    SelectEditor.prototype.defaultOptions;
    /**
     * The default item values that are set
     * @type {?}
     */
    SelectEditor.prototype.defaultValue;
    /**
     * The property name for values in the collection
     * @type {?}
     */
    SelectEditor.prototype.valueName;
    /**
     * The property name for labels in the collection
     * @type {?}
     */
    SelectEditor.prototype.labelName;
    /**
     * The property name for a prefix that can be added to the labels in the collection
     * @type {?}
     */
    SelectEditor.prototype.labelPrefixName;
    /**
     * The property name for a suffix that can be added to the labels in the collection
     * @type {?}
     */
    SelectEditor.prototype.labelSuffixName;
    /**
     * A label that can be added to each option and can be used as an alternative to display selected options
     * @type {?}
     */
    SelectEditor.prototype.optionLabel;
    /**
     * Grid options
     * @type {?}
     */
    SelectEditor.prototype.gridOptions;
    /**
     * Do we translate the label?
     * @type {?}
     */
    SelectEditor.prototype.enableTranslateLabel;
    /**
     * Observable Subscriptions
     * @type {?}
     */
    SelectEditor.prototype._subscriptions;
    /**
     * @type {?}
     * @protected
     */
    SelectEditor.prototype._destroying;
    /**
     * Collection Service
     * @type {?}
     * @protected
     */
    SelectEditor.prototype._collectionService;
    /**
     * The translate library
     * @type {?}
     * @protected
     */
    SelectEditor.prototype._translate;
    /**
     * @type {?}
     * @protected
     */
    SelectEditor.prototype.args;
    /**
     * @type {?}
     * @protected
     */
    SelectEditor.prototype.isMultipleSelect;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL3NlbGVjdEVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBWUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFakksT0FBTyxLQUFLLFVBQVUsTUFBTSxXQUFXLENBQUM7O01BQ2xDLFNBQVMsR0FBRyxVQUFVOzs7O0FBUTVCLE1BQU0sT0FBTyxZQUFZOzs7OztJQWtEdkIsWUFBc0IsSUFBUyxFQUFZLGdCQUFnQjtRQUFyQyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQVkscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFBOzs7O1FBWjNELG1CQUFjLEdBQW1CLEVBQUUsQ0FBQzs7O1FBSTFCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBUzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQWMsQ0FBQzs7Y0FDdkQsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUU7UUFDckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDOzs7Y0FHN0IsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ25ELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxPQUFPLEVBQUUsQ0FBQzs7Y0FFakMsVUFBVSxHQUF5QjtZQUN2QyxvQkFBb0IsRUFBRSxJQUFJO1lBQzFC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SUFHaEQsa0NBQXVDOzs7OztJQUUzQiw0QkFBbUI7Ozs7O0lBQUUsd0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSxcbiAgQ29sbGVjdGlvbk9wdGlvbixcbiAgQ29sdW1uLFxuICBFZGl0b3IsXG4gIEVkaXRvclZhbGlkYXRvcixcbiAgRWRpdG9yVmFsaWRhdG9yT3V0cHV0LFxuICBHcmlkT3B0aW9uLFxuICBNdWx0aXBsZVNlbGVjdE9wdGlvbixcbiAgU2VsZWN0T3B0aW9uLFxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2luZGV4JztcbmltcG9ydCB7IGFycmF5c0VxdWFsLCBmaW5kT3JEZWZhdWx0LCBnZXREZXNjZW5kYW50UHJvcGVydHksIGh0bWxFbmNvZGUsIHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXMgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgKiBhcyBET01QdXJpZnlfIGZyb20gJ2RvbXB1cmlmeSc7XG5jb25zdCBET01QdXJpZnkgPSBET01QdXJpZnlfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG4vKipcbiAqIFNsaWNrZ3JpZCBlZGl0b3IgY2xhc3MgZm9yIG11bHRpcGxlL3NpbmdsZSBzZWxlY3QgbGlzdHNcbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdEVkaXRvciBpbXBsZW1lbnRzIEVkaXRvciB7XG4gIC8qKiBUaGUgSlF1ZXJ5IERPTSBlbGVtZW50ICovXG4gICRlZGl0b3JFbG06IGFueTtcblxuICAvKiogRWRpdG9yIE11bHRpcGxlLVNlbGVjdCBvcHRpb25zICovXG4gIGVkaXRvckVsbU9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uO1xuXG4gIC8qKiBET00gRWxlbWVudCBOYW1lLCB1c2VmdWwgZm9yIGF1dG8tZGV0ZWN0aW5nIHBvc2l0aW9uaW5nIChkcm9wdXAgLyBkcm9wZG93bikgKi9cbiAgZWxlbWVudE5hbWU6IHN0cmluZztcblxuICAvKiogVGhlIG11bHRpcGxlLXNlbGVjdCBvcHRpb25zIGZvciBhIG11bHRpcGxlIHNlbGVjdCBsaXN0ICovXG4gIGRlZmF1bHRPcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbjtcblxuICAvKiogVGhlIGRlZmF1bHQgaXRlbSB2YWx1ZXMgdGhhdCBhcmUgc2V0ICovXG4gIGRlZmF1bHRWYWx1ZTogYW55W107XG5cbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB2YWx1ZXMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cbiAgdmFsdWVOYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciBsYWJlbHMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cbiAgbGFiZWxOYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciBhIHByZWZpeCB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgbGFiZWxzIGluIHRoZSBjb2xsZWN0aW9uICovXG4gIGxhYmVsUHJlZml4TmFtZTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgYSBzdWZmaXggdGhhdCBjYW4gYmUgYWRkZWQgdG8gdGhlIGxhYmVscyBpbiB0aGUgY29sbGVjdGlvbiAqL1xuICBsYWJlbFN1ZmZpeE5hbWU6IHN0cmluZztcblxuICAvKiogQSBsYWJlbCB0aGF0IGNhbiBiZSBhZGRlZCB0byBlYWNoIG9wdGlvbiBhbmQgY2FuIGJlIHVzZWQgYXMgYW4gYWx0ZXJuYXRpdmUgdG8gZGlzcGxheSBzZWxlY3RlZCBvcHRpb25zICovXG4gIG9wdGlvbkxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqIEdyaWQgb3B0aW9ucyAqL1xuICBncmlkT3B0aW9uczogR3JpZE9wdGlvbjtcblxuICAvKiogRG8gd2UgdHJhbnNsYXRlIHRoZSBsYWJlbD8gKi9cbiAgZW5hYmxlVHJhbnNsYXRlTGFiZWw6IGJvb2xlYW47XG5cbiAgLyoqIE9ic2VydmFibGUgU3Vic2NyaXB0aW9ucyAqL1xuICBfc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvLyBmbGFnIHRvIHNpZ25hbCB0aGF0IHRoZSBlZGl0b3IgaXMgZGVzdHJveWluZyBpdHNlbGYsIGhlbHBzIHByZXZlbnRcbiAgLy8gY29tbWl0IGNoYW5nZXMgZnJvbSBiZWluZyBjYWxsZWQgdHdpY2UgYW5kIGVycm9yaW5nXG4gIHByb3RlY3RlZCBfZGVzdHJveWluZyA9IGZhbHNlO1xuXG4gIC8qKiBDb2xsZWN0aW9uIFNlcnZpY2UgKi9cbiAgcHJvdGVjdGVkIF9jb2xsZWN0aW9uU2VydmljZTogQ29sbGVjdGlvblNlcnZpY2U7XG5cbiAgLyoqIFRoZSB0cmFuc2xhdGUgbGlicmFyeSAqL1xuICBwcm90ZWN0ZWQgX3RyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgYXJnczogYW55LCBwcm90ZWN0ZWQgaXNNdWx0aXBsZVNlbGVjdCkge1xuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkgYXMgR3JpZE9wdGlvbjtcbiAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgfHwgdGhpcy5hcmdzLmNvbHVtbi5wYXJhbXMgfHwge307XG4gICAgdGhpcy5fdHJhbnNsYXRlID0gZ3JpZE9wdGlvbnMuaTE4bjtcblxuICAgIC8vIHByb3ZpZGUgdGhlIG5hbWUgYXR0cmlidXRlIHRvIHRoZSBET00gZWxlbWVudCB3aGljaCB3aWxsIGJlIG5lZWRlZCB0byBhdXRvLWFkanVzdCBkcm9wIHBvc2l0aW9uIChkcm9wdXAgLyBkcm9wZG93bilcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgdGhpcy5lbGVtZW50TmFtZSA9IGBlZGl0b3ItJHtmaWVsZElkfWA7XG5cbiAgICBjb25zdCBsaWJPcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbiA9IHtcbiAgICAgIGF1dG9BZGp1c3REcm9wSGVpZ2h0OiB0cnVlLFxuICAgICAgYXV0b0FkanVzdERyb3BQb3NpdGlvbjogdHJ1ZSxcbiAgICAgIGF1dG9BZGp1c3REcm9wV2lkdGhCeVRleHRTaXplOiB0cnVlLFxuICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICBmaWx0ZXI6IGZhbHNlLFxuICAgICAgbWF4SGVpZ2h0OiAyNzUsXG4gICAgICBuYW1lOiB0aGlzLmVsZW1lbnROYW1lLFxuICAgICAgc2luZ2xlOiB0cnVlLFxuICAgICAgdGV4dFRlbXBsYXRlOiAoJGVsbSkgPT4ge1xuICAgICAgICAvLyByZW5kZXIgSFRNTCBjb2RlIG9yIG5vdCwgYnkgZGVmYXVsdCBpdCBpcyBzYW5pdGl6ZWQgYW5kIHdvbid0IGJlIHJlbmRlcmVkXG4gICAgICAgIGNvbnN0IGlzUmVuZGVySHRtbEVuYWJsZWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5lbmFibGVSZW5kZXJIdG1sIHx8IGZhbHNlO1xuICAgICAgICByZXR1cm4gaXNSZW5kZXJIdG1sRW5hYmxlZCA/ICRlbG0udGV4dCgpIDogJGVsbS5odG1sKCk7XG4gICAgICB9LFxuICAgICAgb25CbHVyOiAoKSA9PiB0aGlzLmRlc3Ryb3koKSxcbiAgICAgIG9uQ2xvc2U6ICgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9kZXN0cm95aW5nICYmIGFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQpIHtcbiAgICAgICAgICAvLyBkbyBub3QgdXNlIGFyZ3MuY29tbWl0Q2hhbmdlcygpIGFzIHRoaXMgc2V0cyB0aGUgZm9jdXMgdG8gdGhlIG5leHRcbiAgICAgICAgICAvLyByb3cuIEFsc28gdGhlIHNlbGVjdCBsaXN0IHdpbGwgc3RheSBzaG93biB3aGVuIGNsaWNraW5nIG9mZiB0aGUgZ3JpZFxuICAgICAgICAgIGFyZ3MuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoaXNNdWx0aXBsZVNlbGVjdCkge1xuICAgICAgbGliT3B0aW9ucy5zaW5nbGUgPSBmYWxzZTtcbiAgICAgIGxpYk9wdGlvbnMuYWRkVGl0bGUgPSB0cnVlO1xuICAgICAgbGliT3B0aW9ucy5va0J1dHRvbiA9IHRydWU7XG4gICAgICBsaWJPcHRpb25zLnNlbGVjdEFsbERlbGltaXRlciA9IFsnJywgJyddO1xuXG4gICAgICBpZiAodGhpcy5fdHJhbnNsYXRlKSB7XG4gICAgICAgIGxpYk9wdGlvbnMuY291bnRTZWxlY3RlZCA9IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KCdYX09GX1lfU0VMRUNURUQnKTtcbiAgICAgICAgbGliT3B0aW9ucy5hbGxTZWxlY3RlZCA9IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KCdBTExfU0VMRUNURUQnKTtcbiAgICAgICAgbGliT3B0aW9ucy5zZWxlY3RBbGxUZXh0ID0gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoJ1NFTEVDVF9BTEwnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhc3NpZ24gdGhlIG11bHRpcGxlIHNlbGVjdCBsaWIgb3B0aW9uc1xuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBsaWJPcHRpb25zO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKiogR2V0IHRoZSBDb2xsZWN0aW9uICovXG4gIGdldCBjb2xsZWN0aW9uKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbiB8fCBbXTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2xsZWN0aW9uIE9wdGlvbnMgKi9cbiAgZ2V0IGNvbGxlY3Rpb25PcHRpb25zKCk6IENvbGxlY3Rpb25PcHRpb24ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5jb2xsZWN0aW9uT3B0aW9ucztcbiAgfVxuXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5jb2x1bW4gfHwge307XG4gIH1cblxuICAvKiogR2V0IENvbHVtbiBFZGl0b3Igb2JqZWN0ICovXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgQ3VzdG9tIFN0cnVjdHVyZSBpZiBleGlzdCAqL1xuICBwcm90ZWN0ZWQgZ2V0IGN1c3RvbVN0cnVjdHVyZSgpOiBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY3VzdG9tU3RydWN0dXJlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHNlbGVjdGVkIHZhbHVlcyAobXVsdGlwbGUgc2VsZWN0KSBmcm9tIHRoZSBjb2xsZWN0aW9uXG4gICAqL1xuICBnZXQgY3VycmVudFZhbHVlcygpIHtcbiAgICAvLyBjb2xsZWN0aW9uIG9mIHN0cmluZ3MsIGp1c3QgcmV0dXJuIHRoZSBmaWx0ZXJlZCBzdHJpbmcgdGhhdCBhcmUgZXF1YWxzXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbi5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uZmlsdGVyKGMgPT4gdGhpcy4kZWRpdG9yRWxtLnZhbCgpLmluZGV4T2YoYy50b1N0cmluZygpKSAhPT0gLTEpO1xuICAgIH1cblxuICAgIC8vIGNvbGxlY3Rpb24gb2YgbGFiZWwvdmFsdWUgcGFpclxuICAgIGNvbnN0IHNlcGFyYXRvckJldHdlZW5MYWJlbHMgPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuc2VwYXJhdG9yQmV0d2VlblRleHRMYWJlbHMgfHwgJyc7XG4gICAgY29uc3QgaXNJbmNsdWRpbmdQcmVmaXhTdWZmaXggPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuaW5jbHVkZVByZWZpeFN1ZmZpeFRvU2VsZWN0ZWRWYWx1ZXMgfHwgZmFsc2U7XG5cbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uXG4gICAgICAuZmlsdGVyKGMgPT4gdGhpcy4kZWRpdG9yRWxtLnZhbCgpLmluZGV4T2YoY1t0aGlzLnZhbHVlTmFtZV0udG9TdHJpbmcoKSkgIT09IC0xKVxuICAgICAgLm1hcChjID0+IHtcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gY1t0aGlzLnZhbHVlTmFtZV07XG4gICAgICAgIGxldCBwcmVmaXhUZXh0ID0gY1t0aGlzLmxhYmVsUHJlZml4TmFtZV0gfHwgJyc7XG4gICAgICAgIGxldCBzdWZmaXhUZXh0ID0gY1t0aGlzLmxhYmVsU3VmZml4TmFtZV0gfHwgJyc7XG5cbiAgICAgICAgLy8gYWxzbyB0cmFuc2xhdGUgcHJlZml4L3N1ZmZpeCBpZiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyB0cnVlIGFuZCB0ZXh0IGlzIGEgc3RyaW5nXG4gICAgICAgIHByZWZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBwcmVmaXhUZXh0ICYmIHR5cGVvZiBwcmVmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLl90cmFuc2xhdGUuaW5zdGFudChwcmVmaXhUZXh0IHx8ICcgJykgOiBwcmVmaXhUZXh0O1xuICAgICAgICBzdWZmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgc3VmZml4VGV4dCAmJiB0eXBlb2Ygc3VmZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoc3VmZml4VGV4dCB8fCAnICcpIDogc3VmZml4VGV4dDtcblxuICAgICAgICBpZiAoaXNJbmNsdWRpbmdQcmVmaXhTdWZmaXgpIHtcbiAgICAgICAgICBjb25zdCB0bXBPcHRpb25BcnJheSA9IFtwcmVmaXhUZXh0LCBsYWJlbFRleHQsIHN1ZmZpeFRleHRdLmZpbHRlcigodGV4dCkgPT4gdGV4dCk7IC8vIGFkZCB0byBhIHRlbXAgYXJyYXkgZm9yIGpvaW5pbmcgcHVycG9zZSBhbmQgZmlsdGVyIG91dCBlbXB0eSB0ZXh0XG4gICAgICAgICAgcmV0dXJuIHRtcE9wdGlvbkFycmF5LmpvaW4oc2VwYXJhdG9yQmV0d2VlbkxhYmVscyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhYmVsVGV4dDtcbiAgICAgIH0pO1xuICB9XG5cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgc2VsZWN0ZWQgdmFsdWVzIChzaW5nbGUgc2VsZWN0KSBmcm9tIHRoZSBjb2xsZWN0aW9uXG4gICAqL1xuICBnZXQgY3VycmVudFZhbHVlKCkge1xuICAgIC8vIGNvbGxlY3Rpb24gb2Ygc3RyaW5ncywganVzdCByZXR1cm4gdGhlIGZpbHRlcmVkIHN0cmluZyB0aGF0IGFyZSBlcXVhbHNcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xuICAgICAgcmV0dXJuIGZpbmRPckRlZmF1bHQodGhpcy5jb2xsZWN0aW9uLCAoYzogYW55KSA9PiBjLnRvU3RyaW5nKCkgPT09IHRoaXMuJGVkaXRvckVsbS52YWwoKSk7XG4gICAgfVxuXG4gICAgLy8gY29sbGVjdGlvbiBvZiBsYWJlbC92YWx1ZSBwYWlyXG4gICAgY29uc3Qgc2VwYXJhdG9yQmV0d2VlbkxhYmVscyA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5zZXBhcmF0b3JCZXR3ZWVuVGV4dExhYmVscyB8fCAnJztcbiAgICBjb25zdCBpc0luY2x1ZGluZ1ByZWZpeFN1ZmZpeCA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5pbmNsdWRlUHJlZml4U3VmZml4VG9TZWxlY3RlZFZhbHVlcyB8fCBmYWxzZTtcbiAgICBjb25zdCBpdGVtRm91bmQgPSBmaW5kT3JEZWZhdWx0KHRoaXMuY29sbGVjdGlvbiwgKGM6IGFueSkgPT4gY1t0aGlzLnZhbHVlTmFtZV0udG9TdHJpbmcoKSA9PT0gdGhpcy4kZWRpdG9yRWxtLnZhbCgpKTtcblxuICAgIGlmIChpdGVtRm91bmQpIHtcbiAgICAgIGNvbnN0IGxhYmVsVGV4dCA9IGl0ZW1Gb3VuZFt0aGlzLnZhbHVlTmFtZV07XG5cbiAgICAgIGlmIChpc0luY2x1ZGluZ1ByZWZpeFN1ZmZpeCkge1xuICAgICAgICBsZXQgcHJlZml4VGV4dCA9IGl0ZW1Gb3VuZFt0aGlzLmxhYmVsUHJlZml4TmFtZV0gfHwgJyc7XG4gICAgICAgIGxldCBzdWZmaXhUZXh0ID0gaXRlbUZvdW5kW3RoaXMubGFiZWxTdWZmaXhOYW1lXSB8fCAnJztcblxuICAgICAgICAvLyBhbHNvIHRyYW5zbGF0ZSBwcmVmaXgvc3VmZml4IGlmIGVuYWJsZVRyYW5zbGF0ZUxhYmVsIGlzIHRydWUgYW5kIHRleHQgaXMgYSBzdHJpbmdcbiAgICAgICAgcHJlZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHByZWZpeFRleHQgJiYgdHlwZW9mIHByZWZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KHByZWZpeFRleHQgfHwgJyAnKSA6IHByZWZpeFRleHQ7XG4gICAgICAgIHN1ZmZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBzdWZmaXhUZXh0ICYmIHR5cGVvZiBzdWZmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLl90cmFuc2xhdGUuaW5zdGFudChzdWZmaXhUZXh0IHx8ICcgJykgOiBzdWZmaXhUZXh0O1xuXG4gICAgICAgIC8vIGFkZCB0byBhIHRlbXAgYXJyYXkgZm9yIGpvaW5pbmcgcHVycG9zZSBhbmQgZmlsdGVyIG91dCBlbXB0eSB0ZXh0XG4gICAgICAgIGNvbnN0IHRtcE9wdGlvbkFycmF5ID0gW3ByZWZpeFRleHQsIGxhYmVsVGV4dCwgc3VmZml4VGV4dF0uZmlsdGVyKCh0ZXh0KSA9PiB0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHRtcE9wdGlvbkFycmF5LmpvaW4oc2VwYXJhdG9yQmV0d2VlbkxhYmVscyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsYWJlbFRleHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG5cblxuICAvKiogR2V0IHRoZSBWYWxpZGF0b3IgZnVuY3Rpb24sIGNhbiBiZSBwYXNzZWQgaW4gRWRpdG9yIHByb3BlcnR5IG9yIENvbHVtbiBEZWZpbml0aW9uICovXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmFyZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0FuZ3VsYXItU2xpY2tHcmlkXSBBbiBlZGl0b3IgbXVzdCBhbHdheXMgaGF2ZSBhbiBcImluaXQoKVwiIHdpdGggdmFsaWQgYXJndW1lbnRzLicpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb2x1bW5EZWYgfHwgIXRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8ICghdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbiAmJiAhdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbkFzeW5jKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiAob3IgXCJjb2xsZWN0aW9uQXN5bmNcIikgaW5zaWRlIENvbHVtbiBEZWZpbml0aW9uIEVkaXRvciBmb3IgdGhlIE11bHRpcGxlU2VsZWN0L1NpbmdsZVNlbGVjdCBFZGl0b3IgdG8gd29yayBjb3JyZWN0bHkuXG4gICAgICBBbHNvIGVhY2ggb3B0aW9uIHNob3VsZCBpbmNsdWRlIGEgdmFsdWUvbGFiZWwgcGFpciAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpLlxuICAgICAgRm9yIGV4YW1wbGU6IHsgZWRpdG9yOiB7IGNvbGxlY3Rpb246IFt7IHZhbHVlOiB0cnVlLCBsYWJlbDogJ1RydWUnIH0seyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfSB9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5fY29sbGVjdGlvblNlcnZpY2UgPSBuZXcgQ29sbGVjdGlvblNlcnZpY2UodGhpcy5fdHJhbnNsYXRlKTtcbiAgICB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsID0gKHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmVuYWJsZVRyYW5zbGF0ZUxhYmVsKSA/IHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmVuYWJsZVRyYW5zbGF0ZUxhYmVsIDogZmFsc2U7XG4gICAgdGhpcy5sYWJlbE5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5sYWJlbCB8fCAnbGFiZWwnO1xuICAgIHRoaXMubGFiZWxQcmVmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxQcmVmaXggfHwgJ2xhYmVsUHJlZml4JztcbiAgICB0aGlzLmxhYmVsU3VmZml4TmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsU3VmZml4IHx8ICdsYWJlbFN1ZmZpeCc7XG4gICAgdGhpcy5vcHRpb25MYWJlbCA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLm9wdGlvbkxhYmVsIHx8ICd2YWx1ZSc7XG4gICAgdGhpcy52YWx1ZU5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSB8fCAndmFsdWUnO1xuXG4gICAgaWYgKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgKCF0aGlzLl90cmFuc2xhdGUgfHwgdHlwZW9mIHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50ICE9PSAnZnVuY3Rpb24nKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbc2VsZWN0LWVkaXRvcl0gVGhlIG5neC10cmFuc2xhdGUgVHJhbnNsYXRlU2VydmljZSBpcyByZXF1aXJlZCBmb3IgdGhlIFNlbGVjdCBFZGl0b3IgdG8gd29yayBjb3JyZWN0bHlgKTtcbiAgICB9XG5cbiAgICAvLyBhbHdheXMgcmVuZGVyIHRoZSBTZWxlY3QgKGRyb3Bkb3duKSBET00gZWxlbWVudCwgZXZlbiBpZiB1c2VyIHBhc3NlZCBhIFwiY29sbGVjdGlvbkFzeW5jXCIsXG4gICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgdGhlIFNlbGVjdCB3aWxsIHNpbXBseSBiZSB3aXRob3V0IGFueSBvcHRpb25zIGJ1dCB3ZSBzdGlsbCBoYXZlIHRvIHJlbmRlciBpdCAoZWxzZSBTbGlja0dyaWQgd291bGQgdGhyb3cgYW4gZXJyb3IpXG4gICAgdGhpcy5yZW5kZXJEb21FbGVtZW50KHRoaXMuY29sbGVjdGlvbik7XG4gIH1cblxuICBhcHBseVZhbHVlKGl0ZW06IGFueSwgc3RhdGU6IGFueSk6IHZvaWQge1xuICAgIGl0ZW1bdGhpcy5jb2x1bW5EZWYuZmllbGRdID0gc3RhdGU7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3lpbmcgPSB0cnVlO1xuICAgIGlmICh0aGlzLiRlZGl0b3JFbG0gJiYgdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0KSB7XG4gICAgICB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QoJ2Nsb3NlJyk7XG4gICAgICB0aGlzLiRlZGl0b3JFbG0ucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuX3N1YnNjcmlwdGlvbnMpO1xuICB9XG5cbiAgbG9hZFZhbHVlKGl0ZW06IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3QpIHtcbiAgICAgIHRoaXMubG9hZE11bHRpcGxlVmFsdWVzKGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvYWRTaW5nbGVWYWx1ZShpdGVtKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIGxvYWRNdWx0aXBsZVZhbHVlcyhpdGVtczogYW55W10pIHtcbiAgICAvLyBjb252ZXJ0IHRvIHN0cmluZyBiZWNhdXNlIHRoYXQgaXMgaG93IHRoZSBET00gd2lsbCByZXR1cm4gdGhlc2UgdmFsdWVzXG4gICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBpdGVtc1t0aGlzLmNvbHVtbkRlZi5maWVsZF0ubWFwKChpOiBhbnkpID0+IGkudG9TdHJpbmcoKSk7XG4gICAgdGhpcy4kZWRpdG9yRWxtLmZpbmQoJ29wdGlvbicpLmVhY2goKGk6IG51bWJlciwgJGU6IGFueSkgPT4ge1xuICAgICAgJGUuc2VsZWN0ZWQgPSAodGhpcy5kZWZhdWx0VmFsdWUuaW5kZXhPZigkZS52YWx1ZSkgIT09IC0xKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRTaW5nbGVWYWx1ZShpdGVtOiBhbnkpIHtcbiAgICAvLyBjb252ZXJ0IHRvIHN0cmluZyBiZWNhdXNlIHRoYXQgaXMgaG93IHRoZSBET00gd2lsbCByZXR1cm4gdGhlc2UgdmFsdWVzXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBwcm9wIGV4aXN0cyBmaXJzdFxuICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gaXRlbVt0aGlzLmNvbHVtbkRlZi5maWVsZF0gJiYgaXRlbVt0aGlzLmNvbHVtbkRlZi5maWVsZF0udG9TdHJpbmcoKTtcblxuICAgIHRoaXMuJGVkaXRvckVsbS5maW5kKCdvcHRpb24nKS5lYWNoKChpOiBudW1iZXIsICRlOiBhbnkpID0+IHtcbiAgICAgICRlLnNlbGVjdGVkID0gKHRoaXMuZGVmYXVsdFZhbHVlID09PSAkZS52YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXJpYWxpemVWYWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiAodGhpcy5pc011bHRpcGxlU2VsZWN0KSA/IHRoaXMuY3VycmVudFZhbHVlcyA6IHRoaXMuY3VycmVudFZhbHVlO1xuICB9XG5cbiAgZm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuJGVkaXRvckVsbSAmJiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QpIHtcbiAgICAgIHRoaXMuJGVkaXRvckVsbS5tdWx0aXBsZVNlbGVjdCgnZm9jdXMnKTtcbiAgICB9XG4gIH1cblxuICBpc1ZhbHVlQ2hhbmdlZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0KSB7XG4gICAgICByZXR1cm4gIWFycmF5c0VxdWFsKHRoaXMuJGVkaXRvckVsbS52YWwoKSwgdGhpcy5kZWZhdWx0VmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy4kZWRpdG9yRWxtLnZhbCgpICE9PSB0aGlzLmRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIHZhbGlkYXRlKCk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XG4gICAgaWYgKHRoaXMudmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaXNNdWx0aXBsZVNlbGVjdCA/IHRoaXMuY3VycmVudFZhbHVlcyA6IHRoaXMuY3VycmVudFZhbHVlO1xuICAgICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdHMgPSB0aGlzLnZhbGlkYXRvcih2YWx1ZSwgdGhpcy5hcmdzKTtcbiAgICAgIGlmICghdmFsaWRhdGlvblJlc3VsdHMudmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbHdheXMgdmFsaWRcbiAgICAvLyBpZiB1c2VyIHdhbnQgaXQgdG8gYmUgYSByZXF1aXJlZCBjaGVja2JveCwgaGUgd291bGQgaGF2ZSB0byBwcm92aWRlIGhpcyBvd24gdmFsaWRhdG9yXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgbXNnOiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIC8vXG4gIC8vIHByb3RlY3RlZCBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLyoqXG4gICAqIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaW5wdXRDb2xsZWN0aW9uXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBmaWx0ZXJlZCBhbmQvb3Igc29ydGVkIGNvbGxlY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCBmaWx0ZXJDb2xsZWN0aW9uKGlucHV0Q29sbGVjdGlvbikge1xuICAgIGxldCBvdXRwdXRDb2xsZWN0aW9uID0gaW5wdXRDb2xsZWN0aW9uO1xuXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAgaWYgKHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLmNvbGxlY3Rpb25GaWx0ZXJCeSkge1xuICAgICAgY29uc3QgZmlsdGVyQnkgPSB0aGlzLmNvbHVtbkVkaXRvci5jb2xsZWN0aW9uRmlsdGVyQnk7XG4gICAgICBjb25zdCBmaWx0ZXJDb2xsZWN0aW9uQnkgPSB0aGlzLmNvbHVtbkVkaXRvci5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbHVtbkVkaXRvci5jb2xsZWN0aW9uT3B0aW9ucy5maWx0ZXJBZnRlckVhY2hQYXNzIHx8IG51bGw7XG4gICAgICBvdXRwdXRDb2xsZWN0aW9uID0gdGhpcy5fY29sbGVjdGlvblNlcnZpY2UuZmlsdGVyQ29sbGVjdGlvbihvdXRwdXRDb2xsZWN0aW9uLCBmaWx0ZXJCeSwgZmlsdGVyQ29sbGVjdGlvbkJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvbiBpbiBhIGNlcnRhaW4gd2F5XG4gICAqIEBwYXJhbSBpbnB1dENvbGxlY3Rpb25cbiAgICogQHJldHVybiBvdXRwdXRDb2xsZWN0aW9uIHNvcnRlZCBjb2xsZWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgc29ydENvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uKSB7XG4gICAgbGV0IG91dHB1dENvbGxlY3Rpb24gPSBpbnB1dENvbGxlY3Rpb247XG5cbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvblxuICAgIGlmICh0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5jb2xsZWN0aW9uU29ydEJ5KSB7XG4gICAgICBjb25zdCBzb3J0QnkgPSB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5jb2xsZWN0aW9uU29ydEJ5O1xuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb25TZXJ2aWNlLnNvcnRDb2xsZWN0aW9uKG91dHB1dENvbGxlY3Rpb24sIHNvcnRCeSwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uOiBhbnlbXSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpIHtcbiAgICAgIGNvbGxlY3Rpb24gPSBnZXREZXNjZW5kYW50UHJvcGVydHkoY29sbGVjdGlvbiwgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSk7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJjb2xsZWN0aW9uXCIgcGFzc2VkIHRvIHRoZSBTZWxlY3QgRWRpdG9yIGlzIG5vdCBhIHZhbGlkIGFycmF5Jyk7XG4gICAgfVxuXG4gICAgLy8gdXNlciBjYW4gb3B0aW9uYWxseSBhZGQgYSBibGFuayBlbnRyeSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5hZGRCbGFua0VudHJ5KSB7XG4gICAgICBjb2xsZWN0aW9uLnVuc2hpZnQodGhpcy5jcmVhdGVCbGFua0VudHJ5KCkpO1xuICAgIH1cblxuICAgIGxldCBuZXdDb2xsZWN0aW9uID0gY29sbGVjdGlvbiB8fCBbXTtcblxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgYW5kL29yIHNvcnQgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxuICAgIG5ld0NvbGxlY3Rpb24gPSB0aGlzLmZpbHRlckNvbGxlY3Rpb24obmV3Q29sbGVjdGlvbik7XG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuc29ydENvbGxlY3Rpb24obmV3Q29sbGVjdGlvbik7XG5cbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxuICAgIGNvbnN0IGVkaXRvclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZyhuZXdDb2xsZWN0aW9uKTtcblxuICAgIC8vIHN0ZXAgMiwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZWRpdG9yXG4gICAgLy8gYWxzbyBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnRcbiAgICB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZWRpdG9yVGVtcGxhdGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKGNvbGxlY3Rpb246IGFueVtdKSB7XG4gICAgbGV0IG9wdGlvbnMgPSAnJztcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgY29uc3Qgc2VwYXJhdG9yQmV0d2VlbkxhYmVscyA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5zZXBhcmF0b3JCZXR3ZWVuVGV4dExhYmVscyB8fCAnJztcbiAgICBjb25zdCBpc1JlbmRlckh0bWxFbmFibGVkID0gdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuZW5hYmxlUmVuZGVySHRtbCB8fCBmYWxzZTtcbiAgICBjb25zdCBzYW5pdGl6ZWRPcHRpb25zID0gdGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLnNhbml0aXplSHRtbE9wdGlvbnMgfHwge307XG5cbiAgICAvLyBjb2xsZWN0aW9uIGNvdWxkIGJlIGFuIEFycmF5IG9mIFN0cmluZ3MgT1IgT2JqZWN0c1xuICAgIGlmIChjb2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IHN0cmluZykgPT4ge1xuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb259XCIgbGFiZWw9XCIke29wdGlvbn1cIj4ke29wdGlvbn08L29wdGlvbj5gO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFycmF5IG9mIG9iamVjdHMgd2lsbCByZXF1aXJlIGEgbGFiZWwvdmFsdWUgcGFpciB1bmxlc3MgYSBjdXN0b21TdHJ1Y3R1cmUgaXMgcGFzc2VkXG4gICAgICBjb2xsZWN0aW9uLmZvckVhY2goKG9wdGlvbjogU2VsZWN0T3B0aW9uKSA9PiB7XG4gICAgICAgIGlmICghb3B0aW9uIHx8IChvcHRpb25bdGhpcy5sYWJlbE5hbWVdID09PSB1bmRlZmluZWQgJiYgb3B0aW9uLmxhYmVsS2V5ID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbc2VsZWN0LWVkaXRvcl0gQSBjb2xsZWN0aW9uIHdpdGggdmFsdWUvbGFiZWwgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKSBpcyByZXF1aXJlZCB0byBwb3B1bGF0ZSB0aGUgU2VsZWN0IGxpc3QsIGZvciBleGFtcGxlOiB7IGNvbGxlY3Rpb246IFsgeyB2YWx1ZTogJzEnLCBsYWJlbDogJ09uZScgfSBdKWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhYmVsS2V5ID0gKG9wdGlvbi5sYWJlbEtleSB8fCBvcHRpb25bdGhpcy5sYWJlbE5hbWVdKSBhcyBzdHJpbmc7XG4gICAgICAgIGNvbnN0IGxhYmVsVGV4dCA9ICgob3B0aW9uLmxhYmVsS2V5IHx8IHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwpICYmIGxhYmVsS2V5KSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KGxhYmVsS2V5IHx8ICcgJykgOiBsYWJlbEtleTtcbiAgICAgICAgbGV0IHByZWZpeFRleHQgPSBvcHRpb25bdGhpcy5sYWJlbFByZWZpeE5hbWVdIHx8ICcnO1xuICAgICAgICBsZXQgc3VmZml4VGV4dCA9IG9wdGlvblt0aGlzLmxhYmVsU3VmZml4TmFtZV0gfHwgJyc7XG4gICAgICAgIGxldCBvcHRpb25MYWJlbCA9IG9wdGlvblt0aGlzLm9wdGlvbkxhYmVsXSB8fCAnJztcbiAgICAgICAgb3B0aW9uTGFiZWwgPSBvcHRpb25MYWJlbC50b1N0cmluZygpLnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpOyAvLyByZXBsYWNlIGRvdWJsZSBxdW90ZXMgYnkgc2luZ2xlIHF1b3RlcyB0byBhdm9pZCBpbnRlcmZlcmluZyB3aXRoIHJlZ3VsYXIgaHRtbFxuXG4gICAgICAgIC8vIGFsc28gdHJhbnNsYXRlIHByZWZpeC9zdWZmaXggaWYgZW5hYmxlVHJhbnNsYXRlTGFiZWwgaXMgdHJ1ZSBhbmQgdGV4dCBpcyBhIHN0cmluZ1xuICAgICAgICBwcmVmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgcHJlZml4VGV4dCAmJiB0eXBlb2YgcHJlZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQocHJlZml4VGV4dCB8fCAnICcpIDogcHJlZml4VGV4dDtcbiAgICAgICAgc3VmZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHN1ZmZpeFRleHQgJiYgdHlwZW9mIHN1ZmZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KHN1ZmZpeFRleHQgfHwgJyAnKSA6IHN1ZmZpeFRleHQ7XG4gICAgICAgIG9wdGlvbkxhYmVsID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgb3B0aW9uTGFiZWwgJiYgdHlwZW9mIG9wdGlvbkxhYmVsID09PSAnc3RyaW5nJykgPyB0aGlzLl90cmFuc2xhdGUuaW5zdGFudChvcHRpb25MYWJlbCB8fCAnICcpIDogb3B0aW9uTGFiZWw7XG5cbiAgICAgICAgLy8gYWRkIHRvIGEgdGVtcCBhcnJheSBmb3Igam9pbmluZyBwdXJwb3NlIGFuZCBmaWx0ZXIgb3V0IGVtcHR5IHRleHRcbiAgICAgICAgY29uc3QgdG1wT3B0aW9uQXJyYXkgPSBbcHJlZml4VGV4dCwgbGFiZWxUZXh0LCBzdWZmaXhUZXh0XS5maWx0ZXIoKHRleHQpID0+IHRleHQpO1xuICAgICAgICBsZXQgb3B0aW9uVGV4dCA9IHRtcE9wdGlvbkFycmF5LmpvaW4oc2VwYXJhdG9yQmV0d2VlbkxhYmVscyk7XG5cbiAgICAgICAgLy8gaWYgdXNlciBzcGVjaWZpY2FsbHkgd2FudHMgdG8gcmVuZGVyIGh0bWwgdGV4dCwgaGUgbmVlZHMgdG8gb3B0LWluIGVsc2UgaXQgd2lsbCBzdHJpcHBlZCBvdXQgYnkgZGVmYXVsdFxuICAgICAgICAvLyBhbHNvLCB0aGUgM3JkIHBhcnR5IGxpYiB3aWxsIHNhbmluaXR6ZSBhbnkgaHRtbCBjb2RlIHVubGVzcyBpdCdzIGVuY29kZWQsIHNvIHdlJ2xsIGRvIHRoYXRcbiAgICAgICAgaWYgKGlzUmVuZGVySHRtbEVuYWJsZWQpIHtcbiAgICAgICAgICAvLyBzYW5pdGl6ZSBhbnkgdW5hdXRob3JpemVkIGh0bWwgdGFncyBsaWtlIHNjcmlwdCBhbmQgb3RoZXJzXG4gICAgICAgICAgLy8gZm9yIHRoZSByZW1haW5pbmcgYWxsb3dlZCB0YWdzIHdlJ2xsIHBlcm1pdCBhbGwgYXR0cmlidXRlc1xuICAgICAgICAgIGNvbnN0IHNhbml0aXplZFRleHQgPSBET01QdXJpZnkuc2FuaXRpemUob3B0aW9uVGV4dCwgc2FuaXRpemVkT3B0aW9ucyk7XG4gICAgICAgICAgb3B0aW9uVGV4dCA9IGh0bWxFbmNvZGUoc2FuaXRpemVkVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb25bdGhpcy52YWx1ZU5hbWVdfVwiIGxhYmVsPVwiJHtvcHRpb25MYWJlbH1cIj4ke29wdGlvblRleHR9PC9vcHRpb24+YDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBgPHNlbGVjdCBpZD1cIiR7dGhpcy5lbGVtZW50TmFtZX1cIiBjbGFzcz1cIm1zLWZpbHRlciBzZWFyY2gtZmlsdGVyIGVkaXRvci0ke2ZpZWxkSWR9XCIgJHt0aGlzLmlzTXVsdGlwbGVTZWxlY3QgPyAnbXVsdGlwbGU9XCJtdWx0aXBsZVwiJyA6ICcnfT4ke29wdGlvbnN9PC9zZWxlY3Q+YDtcbiAgfVxuXG4gIC8qKiBDcmVhdGUgYSBibGFuayBlbnRyeSB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgY29sbGVjdGlvbi4gSXQgd2lsbCBhbHNvIHJldXNlIHRoZSBzYW1lIGN1c3RvbVN0cnVjdHVyZSBpZiBuZWVkIGJlICovXG4gIHByb3RlY3RlZCBjcmVhdGVCbGFua0VudHJ5KCkge1xuICAgIGNvbnN0IGJsYW5rRW50cnkgPSB7XG4gICAgICBbdGhpcy5sYWJlbE5hbWVdOiAnJyxcbiAgICAgIFt0aGlzLnZhbHVlTmFtZV06ICcnXG4gICAgfTtcbiAgICBpZiAodGhpcy5sYWJlbFByZWZpeE5hbWUpIHtcbiAgICAgIGJsYW5rRW50cnlbdGhpcy5sYWJlbFByZWZpeE5hbWVdID0gJyc7XG4gICAgfVxuICAgIGlmICh0aGlzLmxhYmVsU3VmZml4TmFtZSkge1xuICAgICAgYmxhbmtFbnRyeVt0aGlzLmxhYmVsU3VmZml4TmFtZV0gPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIGJsYW5rRW50cnk7XG4gIH1cblxuICAvKiogQnVpbGQgdGhlIHRlbXBsYXRlIEhUTUwgc3RyaW5nICovXG4gIHByb3RlY3RlZCBjcmVhdGVEb21FbGVtZW50KGVkaXRvclRlbXBsYXRlOiBzdHJpbmcpIHtcbiAgICB0aGlzLiRlZGl0b3JFbG0gPSAkKGVkaXRvclRlbXBsYXRlKTtcblxuICAgIGlmICh0aGlzLiRlZGl0b3JFbG0gJiYgdHlwZW9mIHRoaXMuJGVkaXRvckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy4kZWRpdG9yRWxtLmFwcGVuZFRvKHRoaXMuYXJncy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBmYWxsYmFjayB0byBib290c3RyYXBcbiAgICAgIHRoaXMuJGVkaXRvckVsbS5hZGRDbGFzcygnZm9ybS1jb250cm9sJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRPcHRpb25zID0gKHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yKSA/IHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmVsZW1lbnRPcHRpb25zIDoge307XG4gICAgICB0aGlzLmVkaXRvckVsbU9wdGlvbnMgPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLmVsZW1lbnRPcHRpb25zIH07XG4gICAgICB0aGlzLiRlZGl0b3JFbG0gPSB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QodGhpcy5lZGl0b3JFbG1PcHRpb25zKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0KCdvcGVuJykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHJlZnJlc2ggdGhlIGpxdWVyeSBvYmplY3QgYmVjYXVzZSB0aGUgc2VsZWN0ZWQgY2hlY2tib3hlcyB3ZXJlIGFscmVhZHkgc2V0XG4gIC8vIHByaW9yIHRvIHRoaXMgbWV0aG9kIGJlaW5nIGNhbGxlZFxuICBwcm90ZWN0ZWQgcmVmcmVzaCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuJGVkaXRvckVsbS5tdWx0aXBsZVNlbGVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0KCdyZWZyZXNoJyk7XG4gICAgfVxuICB9XG59XG4iXX0=
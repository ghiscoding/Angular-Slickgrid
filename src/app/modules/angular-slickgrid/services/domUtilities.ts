import { TranslateService } from '@ngx-translate/core';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

import { Column, SearchTerm, SelectOption, SlickGrid } from '../models/index';
import { htmlEncode } from './utilities';

/**
 * Create the HTML DOM Element for a Select Editor or Filter, this is specific to these 2 types only and the unit tests are directly under them
 * @param {String} type - type of select DOM element to build, can be either 'editor' or 'filter'
 * @param {Array<Object>} collection - array of items to build the select html options
 * @param {Array<Object>} columnDef - column definition object
 * @param {Object} grid - Slick Grid object
 * @param {Boolean} isMultiSelect - are we building a multiple select element (false means it's a single select)
 * @param {Object} translaterService - optional Translater Service
 * @param {Array<*>} searchTerms - optional array of search term (used by the "filter" type only)
 * @returns object with 2 properties for the select element & a boolean value telling us if any of the search terms were found and selected in the dropdown
 */
export function buildSelectEditorOrFilterDomElement(type: 'editor' | 'filter', collection: any[], columnDef: Column, grid: SlickGrid, isMultiSelect = false, translateService?: TranslateService, searchTerms?: SearchTerm[]): { selectElement: HTMLSelectElement; hasFoundSearchTerm: boolean; } {
  const columnId = columnDef?.id ?? '';
  const gridOptions = grid.getOptions();
  const columnFilterOrEditor = (type === 'editor' ? columnDef?.internalColumnEditor : columnDef?.filter) ?? {};
  const collectionOptions = columnFilterOrEditor?.collectionOptions ?? {};
  const separatorBetweenLabels = collectionOptions?.separatorBetweenTextLabels ?? '';
  const enableTranslateLabel = columnFilterOrEditor?.enableTranslateLabel ?? false;
  const isTranslateEnabled = gridOptions?.enableTranslate ?? false;
  const isRenderHtmlEnabled = columnFilterOrEditor?.enableRenderHtml ?? false;
  const sanitizedOptions = gridOptions?.sanitizeHtmlOptions ?? {};
  const labelName = columnFilterOrEditor?.customStructure?.label ?? 'label';
  const labelPrefixName = columnFilterOrEditor?.customStructure?.labelPrefix ?? 'labelPrefix';
  const labelSuffixName = columnFilterOrEditor?.customStructure?.labelSuffix ?? 'labelSuffix';
  const optionLabel = columnFilterOrEditor?.customStructure?.optionLabel ?? 'value';
  const valueName = columnFilterOrEditor?.customStructure?.value ?? 'value';

  const selectElement = document.createElement('select');
  selectElement.className = 'ms-filter search-filter';
  const extraCssClasses = type === 'filter' ? ['search-filter', `filter-${columnId}`] : ['select-editor', `editor-${columnId}`];
  selectElement.classList.add(...extraCssClasses);

  selectElement.multiple = isMultiSelect;

  // use an HTML Fragment for performance reason, MDN explains it well as shown below::
  // The key difference is that because the document fragment isn't part of the actual DOM's structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made.
  const selectOptionsFragment = document.createDocumentFragment();

  let hasFoundSearchTerm = false;

  // collection could be an Array of Strings OR Objects
  if (Array.isArray(collection)) {
    if (collection.every((x: any) => typeof x === 'string')) {
      for (const option of collection) {
        const selectOptionElm = document.createElement('option');
        if (type === 'filter' && Array.isArray(searchTerms)) {
          selectOptionElm.selected = (searchTerms.findIndex(term => term === option) >= 0); // when filter search term is found then select it in dropdown
        }
        selectOptionElm.value = option;
        selectOptionElm.label = option;
        selectOptionElm.textContent = option;
        selectOptionsFragment.appendChild(selectOptionElm);

        // if there's at least 1 Filter search term found, we will add the "filled" class for styling purposes
        // on a single select, we'll also make sure the single value is not an empty string to consider this being filled
        if ((selectOptionElm.selected && isMultiSelect) || (selectOptionElm.selected && !isMultiSelect && option !== '')) {
          hasFoundSearchTerm = true;
        }
      }
    } else {
      // array of objects will require a label/value pair unless a customStructure is passed
      collection.forEach((option: SelectOption) => {
        if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
          throw new Error(`[Angular-Slickgrid] Select Filter/Editor collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
        }
        const selectOptionElm = document.createElement('option');
        const labelKey = (option.labelKey || option[labelName]) as string;
        const labelText = ((option.labelKey || (enableTranslateLabel && translateService)) && labelKey && isTranslateEnabled) ? translateService?.instant(labelKey || ' ') : labelKey;
        let prefixText = option[labelPrefixName] || '';
        let suffixText = option[labelSuffixName] || '';
        let selectOptionLabel = option.hasOwnProperty(optionLabel) ? option[optionLabel] : '';
        if (selectOptionLabel?.toString) {
          selectOptionLabel = selectOptionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
        }

        // also translate prefix/suffix if enableTranslateLabel is true and text is a string
        prefixText = (enableTranslateLabel && translateService && prefixText && typeof prefixText === 'string') ? translateService.instant(prefixText || ' ') : prefixText;
        suffixText = (enableTranslateLabel && translateService && suffixText && typeof suffixText === 'string') ? translateService.instant(suffixText || ' ') : suffixText;
        selectOptionLabel = (enableTranslateLabel && translateService && selectOptionLabel && typeof selectOptionLabel === 'string') ? translateService.instant(selectOptionLabel || ' ') : selectOptionLabel;

        // add to a temp array for joining purpose and filter out empty text
        const tmpOptionArray = [prefixText, (typeof labelText === 'string' || typeof labelText === 'number') ? labelText.toString() : labelText, suffixText].filter((text) => text);
        let optionText = tmpOptionArray.join(separatorBetweenLabels);

        // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
        // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
        if (isRenderHtmlEnabled) {
          // sanitize any unauthorized html tags like script and others
          // for the remaining allowed tags we'll permit all attributes
          const sanitizedText = (DOMPurify.sanitize(optionText, sanitizedOptions) || '').toString();
          optionText = htmlEncode(sanitizedText);
          selectOptionElm.innerHTML = optionText;
        } else {
          selectOptionElm.textContent = optionText;
        }

        // html text of each select option
        let selectOptionValue = option[valueName];
        if (selectOptionValue === undefined || selectOptionValue === null) {
          selectOptionValue = '';
        }

        if (type === 'filter' && Array.isArray(searchTerms)) {
          selectOptionElm.selected = (searchTerms.findIndex(term => `${term}` === `${option[valueName]}`) >= 0); // when filter search term is found then select it in dropdown
        }
        selectOptionElm.value = `${selectOptionValue}`;
        selectOptionElm.label = `${selectOptionLabel ?? ''}`;
        selectOptionsFragment.appendChild(selectOptionElm);

        // if there's a search term, we will add the "filled" class for styling purposes
        // on a single select, we'll also make sure the single value is not an empty string to consider this being filled
        if ((selectOptionElm.selected && isMultiSelect) || (selectOptionElm.selected && !isMultiSelect && option[valueName] !== '')) {
          hasFoundSearchTerm = true;
        }
      });
    }
  }

  // last step append the HTML fragment to the final select DOM element
  selectElement.appendChild(selectOptionsFragment);

  return { selectElement, hasFoundSearchTerm };
}
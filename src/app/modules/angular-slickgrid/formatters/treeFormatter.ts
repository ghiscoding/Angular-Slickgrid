import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work

import { Formatter } from './../models/index';
import { parseFormatterWhenExist } from './formatterUtilities';
import { getDescendantProperty } from '../services/utilities';

/** Formatter that must be use with a Tree Data column */
export const treeFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  const dataView = grid.getData();
  const gridOptions = grid.getOptions();
  const treeDataOptions = gridOptions?.treeDataOptions;
  const collapsedPropName = treeDataOptions?.collapsedPropName ?? '__collapsed';
  const indentMarginLeft = treeDataOptions?.indentMarginLeft ?? 15;
  const treeLevelPropName = treeDataOptions?.levelPropName ?? '__treeLevel';
  let outputValue = value;

  if (typeof columnDef.queryFieldNameGetterFn === 'function') {
    const fieldName = columnDef.queryFieldNameGetterFn(dataContext);
    if (fieldName?.indexOf('.') >= 0) {
      outputValue = getDescendantProperty(dataContext, fieldName);
    } else {
      outputValue = dataContext.hasOwnProperty(fieldName) ? dataContext[fieldName] : value;
    }
  }
  if (outputValue === null || outputValue === undefined || dataContext === undefined) {
    return '';
  }

  if (!dataContext.hasOwnProperty(treeLevelPropName)) {
    throw new Error('[Angular-Slickgrid] You must provide valid "treeDataOptions" in your Grid Options, however it seems that we could not find any tree level info on the current item datacontext row.');
  }

  if (dataView?.getItemByIdx) {
    const identifierPropName = dataView.getIdPropertyName() ?? 'id';
    const treeLevel = dataContext?.[treeLevelPropName] ?? 0;
    const indentSpacer = `<span style="display:inline-block; width:${indentMarginLeft * treeLevel}px;"></span>`;
    const idx = dataView.getIdxById(dataContext[identifierPropName]);
    const nextItemRow = dataView.getItemByIdx((idx || 0) + 1);
    const slickTreeLevelClass = `slick-tree-level-${treeLevel}`;
    let toggleClass = '';

    if (nextItemRow?.[treeLevelPropName] > treeLevel) {
      toggleClass = dataContext?.[collapsedPropName] ? 'collapsed' : 'expanded'; // parent with child will have a toggle icon
    }

    if (treeDataOptions?.titleFormatter) {
      outputValue = parseFormatterWhenExist(treeDataOptions.titleFormatter, row, cell, columnDef, dataContext, grid);
    }
    const sanitizedOutputValue = DOMPurify.sanitize(outputValue, { ADD_ATTR: ['target'] });
    const spanToggleClass = `slick-group-toggle ${toggleClass}`.trim();
    const outputHtml = `${indentSpacer}<span class="${spanToggleClass}"></span><span class="slick-tree-title" level="${treeLevel}">${sanitizedOutputValue}</span>`;
    return { addClasses: slickTreeLevelClass, text: outputHtml };
  }
  return '';
};

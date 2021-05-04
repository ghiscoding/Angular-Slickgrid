import { Column, Formatter, GridOption } from './../models/index';
import { getDescendantProperty, htmlEncode } from '../services/utilities';

/** Formatter that must be use with a Tree Data column */
export const treeFormatter: Formatter = (_row, _cell, value, columnDef, dataContext, grid) => {
  const dataView = grid?.getData();
  const gridOptions = grid?.getOptions();
  const treeDataOptions = gridOptions?.treeDataOptions;
  const treeLevelPropName = treeDataOptions?.levelPropName ?? '__treeLevel';
  const indentMarginLeft = treeDataOptions?.indentMarginLeft ?? 15;
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
    throw new Error('You must provide valid "treeDataOptions" in your Grid Options and it seems that there are no tree level found in this row');
  }

  if (dataView?.getItemByIdx) {
    if (typeof outputValue === 'string') {
      outputValue = htmlEncode(outputValue);
    }
    const identifierPropName = dataView.getIdPropertyName() || 'id';
    const treeLevel = dataContext[treeLevelPropName] || 0;
    const spacer = `<span style="display:inline-block; width:${indentMarginLeft * treeLevel}px;"></span>`;
    const idx = dataView.getIdxById(dataContext[identifierPropName]);
    const nextItemRow = dataView.getItemByIdx((idx || 0) + 1);

    if (nextItemRow?.[treeLevelPropName] > treeLevel) {
      if (dataContext.__collapsed) {
        return `${spacer}<span class="slick-group-toggle collapsed"></span>&nbsp;${outputValue}`;
      } else {
        return `${spacer}<span class="slick-group-toggle expanded"></span>&nbsp;${outputValue}`;
      }
    }
    return `${spacer}<span class="slick-group-toggle"></span>&nbsp;${outputValue}`;
  }
  return '';
};

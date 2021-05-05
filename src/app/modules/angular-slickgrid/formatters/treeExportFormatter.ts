import { Formatter } from './../models/index';
import { addWhiteSpaces, getDescendantProperty } from '../services/utilities';

/** Formatter that must be use with a Tree Data column */
export const treeExportFormatter: Formatter = (_row, _cell, value, columnDef, dataContext, grid) => {
  const dataView = grid?.getData();
  const gridOptions = grid?.getOptions();
  const treeDataOptions = gridOptions?.treeDataOptions;
  const treeLevelPropName = treeDataOptions?.levelPropName ?? '__treeLevel';
  const indentMarginLeft = treeDataOptions?.exportIndentMarginLeft ?? 4;
  const groupCollapsedSymbol = gridOptions?.excelExportOptions?.groupCollapsedSymbol ?? '⮞';
  const groupExpandedSymbol = gridOptions?.excelExportOptions?.groupExpandedSymbol ?? '⮟';
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
    const identifierPropName = dataView.getIdPropertyName() || 'id';
    const treeLevel = dataContext[treeLevelPropName] || 0;
    const spacer = addWhiteSpaces(indentMarginLeft * treeLevel);
    const idx = dataView.getIdxById(dataContext[identifierPropName]);
    const nextItemRow = dataView.getItemByIdx((idx || 0) + 1);

    if (nextItemRow?.[treeLevelPropName] > treeLevel) {
      if (dataContext.__collapsed) {
        return `${groupCollapsedSymbol} ${spacer} ${outputValue}`;
      } else {
        return `${groupExpandedSymbol} ${spacer} ${outputValue}`;
      }
    }
    return treeLevel === 0 ? outputValue : `.${spacer} ${outputValue}`;
  }
  return '';
};

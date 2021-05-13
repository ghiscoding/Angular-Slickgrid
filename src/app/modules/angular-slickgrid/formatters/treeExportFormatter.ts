import { Formatter } from './../models/index';
import { parseFormatterWhenExist } from './formatterUtilities';
import { addWhiteSpaces, getDescendantProperty, sanitizeHtmlToText } from '../services/utilities';

/** Formatter that must be use with a Tree Data column */
export const treeExportFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  const dataView = grid.getData();
  const gridOptions = grid.getOptions();
  const treeDataOptions = gridOptions?.treeDataOptions;
  const collapsedPropName = treeDataOptions?.collapsedPropName ?? '__collapsed';
  const treeLevelPropName = treeDataOptions?.levelPropName ?? '__treeLevel';
  const indentMarginLeft = treeDataOptions?.exportIndentMarginLeft ?? 5;
  const exportIndentationLeadingChar = treeDataOptions?.exportIndentationLeadingChar ?? '.';
  const exportIndentationLeadingSpaceCount = treeDataOptions?.exportIndentationLeadingSpaceCount ?? 3;
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
    throw new Error('[Angular-Slickgrid] You must provide valid "treeDataOptions" in your Grid Options, however it seems that we could not find any tree level info on the current item datacontext row.');
  }

  if (dataView?.getItemByIdx) {
    const identifierPropName = dataView.getIdPropertyName() ?? 'id';
    const treeLevel = dataContext?.[treeLevelPropName] ?? 0;
    const idx = dataView.getIdxById(dataContext[identifierPropName]);
    const nextItemRow = dataView.getItemByIdx((idx || 0) + 1);
    let toggleSymbol = '';
    let indentation = 0;

    if (nextItemRow?.[treeLevelPropName] > treeLevel) {
      toggleSymbol = dataContext?.[collapsedPropName] ? groupCollapsedSymbol : groupExpandedSymbol; // parent with child will have a toggle icon
      indentation = treeLevel === 0 ? 0 : (indentMarginLeft * treeLevel);
    } else {
      indentation = (indentMarginLeft * (treeLevel === 0 ? 0 : treeLevel + 1));
    }
    const indentSpacer = addWhiteSpaces(indentation);

    if (treeDataOptions?.titleFormatter) {
      outputValue = parseFormatterWhenExist(treeDataOptions.titleFormatter, row, cell, columnDef, dataContext, grid);
    }

    const leadingChar = (treeLevel === 0 && toggleSymbol) ? '' : (treeLevel === 0 ? `${exportIndentationLeadingChar}${addWhiteSpaces(exportIndentationLeadingSpaceCount)}` : exportIndentationLeadingChar);
    outputValue = `${leadingChar}${indentSpacer}${toggleSymbol} ${outputValue}`;
    const sanitizedOutputValue = sanitizeHtmlToText(outputValue); // also remove any html tags that might exist

    return sanitizedOutputValue;
  }
  return '';
};

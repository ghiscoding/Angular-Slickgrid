import { Constants } from '../constants';
import { Formatter } from './../models/index';
import { addWhiteSpaces, getDescendantProperty, sanitizeHtmlToText, } from '../services/utilities';
import { parseFormatterWhenExist } from './formatterUtilities';

/** Formatter that must be use with a Tree Data column */
export const treeExportFormatter: Formatter = (row, cell, value, columnDef, dataContext, grid) => {
  const gridOptions = grid.getOptions();
  const treeDataOptions = gridOptions?.treeDataOptions;
  const collapsedPropName = treeDataOptions?.collapsedPropName ?? Constants.treeDataProperties.COLLAPSED_PROP;
  const hasChildrenPropName = treeDataOptions?.hasChildrenPropName ?? Constants.treeDataProperties.HAS_CHILDREN_PROP;
  const treeLevelPropName = treeDataOptions?.levelPropName ?? Constants.treeDataProperties.TREE_LEVEL_PROP;
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
    throw new Error('[Slickgrid-Universal] You must provide valid "treeDataOptions" in your Grid Options, however it seems that we could not find any tree level info on the current item datacontext row.');
  }

  const treeLevel = dataContext?.[treeLevelPropName] ?? 0;
  let toggleSymbol = '';
  let indentation = 0;

  if (dataContext[hasChildrenPropName]) {
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
};

import { Column, Formatter, GridOption, SlickGrid } from './../models/index';
import { getDescendantProperty, htmlEncode } from '../services/utilities';

export const treeFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: SlickGrid) => {
  const dataView = grid && grid.getData();
  const gridOptions = grid && grid.getOptions() as GridOption;
  const treeDataOptions = gridOptions && gridOptions.treeDataOptions;
  const treeLevelPropName = treeDataOptions && treeDataOptions.levelPropName || '__treeLevel';
  const indentMarginLeft = treeDataOptions && treeDataOptions.indentMarginLeft || 15;
  let outputValue = value;

  if (typeof columnDef.queryFieldNameGetterFn === 'function') {
    const fieldName = columnDef.queryFieldNameGetterFn(dataContext);
    if (fieldName && fieldName.indexOf('.') >= 0) {
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

  if (dataView && dataView.getIdxById && dataView.getItemByIdx) {
    if (typeof outputValue === 'string') {
      outputValue = htmlEncode(outputValue);
    }
    const identifierPropName = dataView.getIdPropertyName() || 'id';
    const spacer = `<span style="display:inline-block; width:${indentMarginLeft * dataContext[treeLevelPropName]}px;"></span>`;
    const idx = dataView.getIdxById(dataContext[identifierPropName]);
    const nextItemRow = dataView.getItemByIdx(idx + 1);

    if (nextItemRow && nextItemRow[treeLevelPropName] > dataContext[treeLevelPropName]) {
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

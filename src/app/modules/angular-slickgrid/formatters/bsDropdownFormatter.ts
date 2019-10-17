import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const bsDropdownFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const columnParams = columnDef && columnDef.params || {};
  const label = columnParams.label || columnParams.formatterLabel;

  if (!label) {
    throw new Error(`You must provide the "label" or "formatterLabel" via the generic "params" options (e.g.: { formatter: Formatters.bsDropdown, params: { formatterLabel: 'Label' }}`);
  }

  return `<div id="myDrop-r${row}-c${cell}" class="dropdown pointer">
    <a class="dropdown-toggle">
      ${label}
      <span class="caret"></span>
    </a>
  </div>`;
};

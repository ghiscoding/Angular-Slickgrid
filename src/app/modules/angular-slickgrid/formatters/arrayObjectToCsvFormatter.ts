import { Column } from './../models/column.interface';
import { Formatter } from './../models/formatter.interface';

export const arrayObjectToCsvFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any) => {
  const columnParams = columnDef && columnDef.params || {};
  const propertyNames = columnParams.propertyNames;
  let parentObjectKeyName = columnParams.dataContextProperty;
  if (!parentObjectKeyName) {
    parentObjectKeyName = columnDef && columnDef.field && columnDef.field.split('.')[0]; // e.g. "users.roles" would be "users"
  }

  if (!propertyNames || !Array.isArray(propertyNames) || !parentObjectKeyName) {
    throw new Error(`Formatters.arrayObjectToCsv requires you to pass an array of "propertyNames" (declared in "params") that you want to pull the data from.
      For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition:: { params: { propertyNames: ['firtName'] }}.
      Optionally, you can also pass the "dataContextProperty" if you wish to run this on another completely different field of the dataContext object.`);
  }

  // the dataContext holds all the data, so we can find the values we want even when "value" argument might be null
  // e.g. if we want to use the propertyNames of ['firstName', 'lastName'] from the "users" array of objects
  if (dataContext[parentObjectKeyName] && Array.isArray(dataContext[parentObjectKeyName])) {
    // we will 1st get the object from the dataContext, then
    if (Array.isArray(dataContext[parentObjectKeyName]) && dataContext[parentObjectKeyName].length > 0) {
      const outputStrings = [];
      dataContext[parentObjectKeyName].forEach((data: any) => {
        const strings = [];

        // 2nd from that data loop through all propertyNames we want to use (e.g.: ['firstName', 'lastName'])
        propertyNames.forEach((prop) => {
          strings.push(data[prop]);
        });
        // we will join these strings with spaces (e.g. 'John Doe' where 'John' was firstName and 'Doe' was lastName)
        outputStrings.push(strings.join(' '));
      });

      // finally join all the output strings by CSV (e.g.: 'John Doe, Jane Doe')
      const output = outputStrings.join(', ');
      return `<span title="${output}">${output}</span>`;
    }
  }
  return value;
};

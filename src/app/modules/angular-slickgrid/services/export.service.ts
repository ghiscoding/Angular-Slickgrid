import { Injectable } from '@angular/core';
import {
  CellArgs,
  CustomGridMenu,
  Column,
  ExportOption,
  GraphqlResult,
  GridMenu,
  GridOption,
  HeaderButtonOnCommandArgs,
  HeaderMenuOnCommandArgs,
  HeaderMenuOnBeforeMenuShowArgs
} from './../models';
import $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { addWhiteSpaces, htmlEntityDecode } from './../services/utilities';
import { TextEncoder } from 'text-encoding';

// using external js modules in Angular
declare let Slick: any;
declare let $: any;

@Injectable()
export class ExportService {
  private _dataView: any;
  private _grid: any;
  private _gridOptions: GridOption;
  private _groupingDefinition: any;
  exportOptions: ExportOption;

  constructor(private translate: TranslateService) { }

  /**
   * Initialize the Export Service
   * @param grid
   * @param gridOptions
   * @param dataView
   */
  init(grid: any, gridOptions: GridOption, dataView: any): void {
    this._grid = grid;
    this._gridOptions = gridOptions;
    this._dataView = dataView;
    this.exportOptions = {
      delimiter: ',',
      filename: 'export',
      format: 'csv',
      isIdColumnIncluded: false
    };
  }

  /** Function to export the Grid result to an Excel CSV format, this has to use AJAX/PHP for it to produce the CSV file
     * It will first pass through all rows of data to produce 1 full String of data, which we'll then pass to the PHP file using AJAX.
     * The PHP script will then eleminate any unecessary text (backslashes, null, etc...) and shoot it to the web client.
     * Why not do that directly in the JavaScript code? Because of security purposes, no browser client are permitting this.

     * NOTES: The column position needs to match perfectly the JSON Object position because of the way we are pulling the data,
     * which means that if any column(s) moved, it has to be reflected on the JSON array side as well (AJAX file)
     *   # Example: exportToFile({ isIdColumnIncluded: true, skipColumns: ['Item Category Code','Sell-to Customer No'], format: 'csv', exportDelimiter: ',' })
     */
  exportToFile(options: ExportOption) {
    let groupItemId = '';
    const nbColumns = this._grid.getColumns().length;
    const exportOptions = (this._gridOptions && this._gridOptions.exportOptions) ? this._gridOptions.exportOptions : this.exportOptions;
    let exportDelimiter = exportOptions.delimiter || ',';
    let exportFilename = (exportOptions.filename) ? 'export' : exportOptions.filename;
    let exportFormat = (exportOptions.format) ? 'csv' : exportOptions.format.toLowerCase();

    // Export extra options: skipColumns,.isIdColumnIncluded
    const skipColumns = (options === undefined || options.skipColumns === undefined) ? [] : options.skipColumns;
    if ((options === undefined || !options.isIdColumnIncluded)) {
      skipColumns.push('id');
    }

    // do we have a extra argument for the export?
    // Arguments passed by the options object have precedence over the options passed to the this._gridOptions object
    if (options !== undefined && options.format !== undefined) {
      exportFormat = options.format.toLowerCase();
    }
    if (options !== undefined && options.delimiter !== undefined) {
      exportDelimiter = options.delimiter;
    }
    if (options !== undefined && options.filename !== undefined) {
      exportFilename = options.filename;
    }

    // a CSV will take double quotes, the other has no wrapper
    // we also have problems with some text that are transformed into Scientific Notation (exponential), if we had a '=' if fixes as a text in excel
    // for example: "1E06" in Excel would change into 1.00E+06 ... to make sure it doesn't change the text we add equal in front ="1E06"
    const exportQuoteWrapper = (exportFormat === 'csv') ? '"' : '';
    let exportExponentialWrapper = '';

    let isGroupedItem = false;
    if ($.isEmptyObject(this._groupingDefinition)) {
      isGroupedItem = false;
    } else {
      isGroupedItem = true;
      groupItemId = $(`#${this._groupingDefinition.dropdownOptionsIds[0]}`).val();
    }

    // data variable which will hold all the fields data of a row
    // store as well in a temporary array, all the IDs of each column
    let data = '';
    const tabColumnHeaderIds = [];

    // find all the Aggregators that exist inside SlickGrid
    let nbExistingSlickAggregators = 0;
    const existingSlickAggregators = [];
    for (const key in Slick.Data.Aggregators) {
      if (Slick.Data.Aggregators.hasOwnProperty(key)) {
        nbExistingSlickAggregators++;
        existingSlickAggregators.push(key.toLowerCase());
      }
    }

    // If we are Grouping, then pull the name of the grouped item and display it as 1st column
    for (let i = 0; i < nbColumns; i++) {
      if (isGroupedItem && this._grid.getColumns()[i].id === groupItemId) {
        const groupTxt = this.translate.instant('GROUP_BY');
        data += `${groupTxt} [${this._grid.getColumns()[i].name}]${exportDelimiter}`;
      }
    }

    // Populate the Column Header, pull the name defined
    for (let i = 0; i < nbColumns; i++) {
      const fieldId = this._grid.getColumns()[i].id;
      const fieldName = this._grid.getColumns()[i].name;
      let isSkippedField = false;

      // we might want to skip some columns
      for (let k = 0; k < skipColumns.length; k++) {
        if (fieldId === skipColumns[k]) {
          isSkippedField = true;
        }
      }

      // if width is 0 then it's not considered as a displayed column and should not be part of the export
      if (this._grid.getColumns()[i].width > 0) {
        // column header to be displayed inside the export
        if (this._grid.getColumns()[i] !== undefined && !isSkippedField) {
          data += exportQuoteWrapper + fieldName + exportQuoteWrapper + exportDelimiter;
        }

        // keep the names of all header columns IDs inside a temp array
        tabColumnHeaderIds.push(this._grid.getColumns()[i].id);
      }
    }

    // headers row is complete, change line in Excel
    data += `\n`;

    // Populate the rest of the Grid Data
    for (let i = 0, ln = this._dataView.getLength(); i < ln; i++) {
      const itemObj = this._dataView.getItem(i);

      if (itemObj != null) {
        // Normal row (not grouped by anything) would have an ID which was predefined in the Grid Columns definition
        if (itemObj.id != null) {
          let idx = 0;
          for (let ikey = 0; ikey < tabColumnHeaderIds.length; ikey++) {
            const key = tabColumnHeaderIds[ikey];

            // we might want to skip certain columns too
            const skipColArrayLn = skipColumns.length;
            if (skipColArrayLn > 0) {
              let bSkipField = false;
              for (let k = 0; k < skipColArrayLn; k++) {
                if (key === skipColumns[k]) {
                  bSkipField = true;
                  break;
                }
              }
              if (bSkipField || $.inArray(key, tabColumnHeaderIds) < 0) {
                continue;
              }
            }
            if (isGroupedItem && idx === 0) {
              data += `""` + exportDelimiter; // if we are grouping we need to skip the 1st column
            }
            let itemData = (itemObj[key] === null || itemObj[key] === undefined) ? '' : itemObj[key];
            if (exportFormat === 'csv') {
              // when CSV we also need to escape double quotes twice, so " becomes ""
              // and if we have a text of (number)E(number),
              // we don't want excel to transform it into exponential (1.0E06) to cancel that effect we can had = in front, ex: ="1E06"
              itemData = itemData.toString().replace(/"/gi, `""`);
              exportExponentialWrapper = (itemData.match(/^\s*\d+E\d+\s*$/i)) ? '=' : '';
            }
            data += exportExponentialWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper + exportDelimiter;
            idx++;
          }
          data += `\n`;
        } else if (isGroupedItem && itemObj.__groupTotals === undefined) {
          // get the group row
          let groupName = itemObj.value;
          groupName = addWhiteSpaces(5 * itemObj.level) + groupName;

          if (exportFormat === 'csv') {
            // when CSV we also need to escape double quotes twice, so " becomes ""
            // and if we have a text of (number)E(number),
            // we don't want excel to transform it into exponential (1.0E06) and to cancel that effect we can add '=' in front, ex: ="1E06"
            groupName = groupName.toString().replace(/"/gi, `""`);
            exportExponentialWrapper = (groupName.match(/^\s*\d+E\d+\s*$/i)) ? '=' : '';
          }
          data += exportExponentialWrapper + exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper + exportDelimiter;
          data += `\n`;
        } else if (itemObj.__groupTotals) {
          // else if the row is a Group By and we have agreggators, then a property of '__groupTotals' would exist under that object
          data += exportQuoteWrapper + '..' + exportQuoteWrapper + exportDelimiter;
          for (let j = 0; j < nbColumns; j++) {
            const fieldId = this._grid.getColumns()[j].id;
            let itemData = '';

            // cycle through all possible SlickGrid Aggregators and get their values
            for (let k = 0; k < nbExistingSlickAggregators; k++) {
              if (itemObj[existingSlickAggregators[k]] !== undefined) {
                if (fieldId in itemObj[existingSlickAggregators[k]]) {
                  const aggregatorName = existingSlickAggregators[k];
                  const val = itemObj[existingSlickAggregators[k]][fieldId];
                  if (aggregatorName.toLowerCase() === 'avg') {
                    itemData = aggregatorName + ': ' + Math.round(val);
                  } else if (aggregatorName.toLowerCase() === 'min' || aggregatorName.toLowerCase() === 'max' || aggregatorName.toLowerCase() === 'sum') {
                    itemData = aggregatorName + ': ' + Math.round(parseFloat(val) * 1000000) / 1000000;
                  } else {
                    itemData = val;
                  }
                }
              }
            }
            if (exportFormat === 'csv') {
              // when CSV we also need to escape double quotes twice, so " becomes ""
              // and if we have a text of (number)E(number),
              // we don't want excel to transform it into exponential (1.0E06) to cancel that effect we can had = in front, ex: ="1E06"
              itemData = itemData.toString().replace(/"/gi, `""`);
              exportExponentialWrapper = (itemData.match(/^\s*\d+E\d+\s*$/i)) ? '=' : '';
            }
            data += exportQuoteWrapper + itemData + exportQuoteWrapper + exportDelimiter;
          }
          data += `\n`;
        }
      }
    }

    // if we are using IE(6-10), we have to make a round trip to the Web Server for exporting
    // though any other browsers (IE11+, Firefox, Chrome, etc) will use plain javascript all on client side.
    if (navigator.appName === 'Microsoft Internet Explorer') {
      throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
    } else {
      // else, IE11+, Firefox, Chrome, etc... will directly use javascript to export
      const filename = `${exportFilename}.${exportFormat}`;
      let blobType = (exportFormat === 'csv') ? 'text/csv' : 'text/plain';
      blobType += ';charset=utf-8;';

      // make sure no html entities exist in the data
      data = htmlEntityDecode(data);

      // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
      // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
      // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
      // Option#2: use a 3rd party extension to javascript encode into UTF-16
      let outputData = '';
      if (exportFormat === 'csv') {
        outputData = new TextEncoder('utf-16be').encode(data);
      } else {
        outputData = data;
      }

      // create a Blob object for the download
      const blob = new Blob([exportOptions.exporterOlderExcelCompatibility ? '\uFEFF' : '', outputData], {
        type: blobType
      });

      // when using IE/Edge, then use different download call
      if (typeof navigator.msSaveOrOpenBlob === 'function') {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // this trick will generate a temp <a /> tag that you can trigger a hidden click for it to start downloading
        const link = document.createElement('a');
        const csvUrl = URL.createObjectURL(blob);

        link.textContent = 'download';
        link.href = csvUrl;
        link.setAttribute('download', filename);

        // set the visibility hidden so there is no effect on your web-layout
        link.style.visibility = 'hidden';

        // this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}

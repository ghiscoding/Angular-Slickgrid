import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ExcelExportService } from '@slickgrid-universal/excel-export';
import { type Column, type GridOption, toCamelCase } from './../modules/angular-slickgrid';

const sampleDataRoot = 'assets/data';

@Component({
  styles: ['.file-upload { max-width: 300px; }'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './grid18.component.html',
})
export class Grid18Component {
  columnDefinitions: Column[] = [];
  gridOptions!: GridOption;
  dataset: any[] = [];
  gridCreated = false;
  hideSubTitle = false;
  uploadFileRef = '';
  templateUrl = `${sampleDataRoot}/users.csv`;

  constructor(private readonly cd: ChangeDetectorRef) {}

  handleFileImport(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        this.dynamicallyCreateGrid(content);
      };
      reader.readAsText(file);
    }
  }

  handleDefaultCsv() {
    const staticDataCsv = `First Name,Last Name,Age,Type\nBob,Smith,33,Teacher\nJohn,Doe,20,Student\nJane,Doe,21,Student`;
    this.dynamicallyCreateGrid(staticDataCsv);
    this.uploadFileRef = '';
  }

  destroyGrid() {
    this.gridCreated = false;
  }

  dynamicallyCreateGrid(csvContent: string) {
    // dispose of any previous grid before creating a new one
    this.gridCreated = false;
    this.cd.detectChanges();

    const dataRows = csvContent?.split('\n');
    const colDefs: Column[] = [];
    const outputData: any[] = [];

    // create column definitions
    dataRows.forEach((dataRow, rowIndex) => {
      const cellValues = dataRow.split(',');
      const dataEntryObj: any = {};

      if (rowIndex === 0) {
        // the 1st row is considered to be the header titles, we can create the column definitions from it
        for (const cellVal of cellValues) {
          const camelFieldName = toCamelCase(cellVal);
          colDefs.push({
            id: camelFieldName,
            name: cellVal,
            field: camelFieldName,
            filterable: true,
            sortable: true,
          });
        }
      } else {
        // at this point all column defs were created and we can loop through them and
        // we can now start adding data as an object and then simply push it to the dataset array
        cellValues.forEach((cellVal, colIndex) => {
          dataEntryObj[colDefs[colIndex].id] = cellVal;
        });

        // a unique "id" must be provided, if not found then use the row index and push it to the dataset
        if ('id' in dataEntryObj) {
          outputData.push(dataEntryObj);
        } else {
          outputData.push({ ...dataEntryObj, id: rowIndex });
        }
      }
    });

    this.gridOptions = {
      gridHeight: 300,
      gridWidth: 800,
      enableFiltering: true,
      enableExcelExport: true,
      externalResources: [new ExcelExportService()],
      headerRowHeight: 35,
      rowHeight: 33,
    };

    this.dataset = outputData;
    this.columnDefinitions = colDefs;
    this.gridCreated = true;
    this.cd.detectChanges();
  }
}

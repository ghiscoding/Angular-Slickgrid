import { Component} from '@angular/core';

@Component({
  template: `
  <div id="myDrop" class="dropdown pointer" style="position:relative; z-index:12000;">
    <button class="btn btn-default dropdown-toggle" type="button"
       id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Actions
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu padding10" aria-labelledby="dropdownMenu1">
      <li><span class="text-primary text-center" >{{dataContext.title}}</span></li>
      <li role="separator" class="divider"></li>
      <li><span>Another action</span></li>
      <li><span>Something else here</span></li>
      <li role="separator" class="divider"></li>
      <li><a class="text-danger" (click)="parent.deleteCell(row)">Delete Row</a></li>
    </ul>
  </div>
  `

})
export class CustomActionFormatterComponent{

  parent: any;
  row: number;
  dataContext : any
}

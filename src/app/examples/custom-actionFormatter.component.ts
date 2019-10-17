import { Component } from '@angular/core';

@Component({
  template: `
  <div id="{{dropdownId}}" class="dropdown" style="position:absolute; z-index:12000;">
    <a class="dropdown-toggle"
       id="{{dropDownToggleId}}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Actions
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu padding10">
      <li><span class="text-primary text-center" >{{dataContext.title}}</span></li>
      <li role="separator" class="divider"></li>
      <li><span class='pointer'>Another action</span></li>
      <li><span class='pointer'>Something else here</span></li>
      <li role="separator" class="divider"></li>
      <li><a class="text-danger pointer" (click)="parent.deleteCell(row)">Delete Row</a></li>
    </ul>
  </div>
  `
})
export class CustomActionFormatterComponent {
  parent: any; // parent component context
  row: number;
  dataContext: any;
  dropdownId = 'myDrop';
  dropDownToggleId = 'toggleDrop';
}

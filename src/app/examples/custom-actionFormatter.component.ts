import { Component } from '@angular/core';

@Component({
  template: `
  <div id="{{dropdownId}}" class="dropdown" style="position:absolute; z-index:12000;">
    <a class="dropdown-toggle" id="{{dropDownToggleId}}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Actions
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item text-primary text-center">{{dataContext.title}}</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item">Another action</a></li>
      <li><a class="dropdown-item">Something else here</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item text-danger pointer" (click)="parent.deleteCell(row)">Delete Row</a></li>
    </ul>
  </div>
  `
})
export class CustomActionFormatterComponent {
  parent: any; // parent component context
  row!: number;
  dataContext: any;
  dropdownId = 'myDrop';
  dropDownToggleId = 'toggleDrop';
}

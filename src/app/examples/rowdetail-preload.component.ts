import { Component } from '@angular/core';

@Component({
  templateUrl: './rowdetail-preload.component.html'
})
export class RowDetailPreloadComponent {
  constructor() {}

  alertAssignee(name: string) {
    if (typeof name === 'string') {
      alert(`Assignee on this task is: ${name.toUpperCase()}`);
    } else {
      alert('No one is assigned to this task.');
    }
  }
}

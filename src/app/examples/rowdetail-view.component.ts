import { Component } from '@angular/core';

@Component({
  templateUrl: './rowdetail-view.component.html'
})
export class RowDetailViewComponent {
  model: {
    duration: Date;
    percentComplete: number;
    reporter: string;
    start: Date;
    finish: Date;
    effortDriven: boolean;
    assignee: string; title: string;
  };

  constructor() {}

  alertAssignee(name: string) {
    if (typeof name === 'string') {
      alert(`Assignee on this task is: ${name.toUpperCase()}`);
    } else {
      alert('No one is assigned to this task.');
    }
  }
}

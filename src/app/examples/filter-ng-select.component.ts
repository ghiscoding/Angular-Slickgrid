import { Component } from '@angular/core';
import { Subject } from 'rxjs';

// the appendTo="body" (necessary for SlickGrid filter) requires the body to be position relative like so
// <body style="position: relative">
@Component({
  template: `
  <ng-select class="custom no-style-select"
      [items]="collection"
      bindValue="id"
      bindLabel="name"
      appendTo="body"
      [clearable]="false"
      (change)="onChange($event)"
      [(ngModel)]="selectedId"
		>
			<ng-template ng-label-tmp ng-option-tmp let-item="item">
				{{ item?.name }}
			</ng-template>
		</ng-select>`
})
export class FilterNgSelectComponent {
  selectedId: string;
  selectedItem: any;
  collection; // this will be filled by the collection of your column definition
  onItemChanged = new Subject<any>();    // object

  onChange(item: any) {
    this.selectedItem = item;
    this.onItemChanged.next(item);
  }
}

import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: `
  <ng-select class="no-style-select"
      [items]="collection"
      autofocus
      bindValue="id"
      bindLabel="name"
      [clearable]="false"
      (change)="onChange($event)"
      [(ngModel)]="selectedId"
		>
			<ng-template ng-label-tmp ng-option-tmp let-item="item">
				{{ item?.name }}
			</ng-template>
		</ng-select>`
})
export class EditorNgSelectComponent {
  selectedId: string;
  selectedItem: any;
  collection; // this will be filled by the collection of your column definition
  onItemChanged = new Subject<any>();    // object

  onChange(item: any) {
    this.selectedItem = item;
    this.onItemChanged.next(item);
  }

  focus() {
    // do a focus
  }
}

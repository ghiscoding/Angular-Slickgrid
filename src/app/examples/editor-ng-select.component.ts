import { Component } from '@angular/core';

@Component({
  template: `
  <ng-select class="no-style-select"
			[items]="collection"
      bindValue="id"
      bindLabel="name"
      [clearable]="false"
      [(ngModel)]="selectedPersonId"
		>
			<ng-template ng-label-tmp ng-option-tmp let-item="item">
				{{ item?.name }}
			</ng-template>
		</ng-select>`
})
export class EditorNgSelectComponent {
  selectedPersonId: string;
  collection; // this will be filled by the collection of your column definition
}

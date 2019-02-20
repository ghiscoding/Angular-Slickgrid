import { Component } from '@angular/core';

@Component({
  template: `<b>{{item?.assignee?.name}}</b>`
})
export class CustomTitleFormatterComponent {
  item: any;
}

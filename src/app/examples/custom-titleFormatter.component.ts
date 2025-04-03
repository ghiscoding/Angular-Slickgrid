import { Component } from '@angular/core';

@Component({
  template: `<b>{{ item?.assignee?.name }}</b>`,
  standalone: false,
})
export class CustomTitleFormatterComponent {
  item: any;
}

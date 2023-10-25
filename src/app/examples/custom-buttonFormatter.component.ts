import { Component } from '@angular/core';

@Component({
  template: `<button (click)="sayHello(item?.title)">{{item?.title}}</button>`
})
export class CustomButtonFormatterComponent {
  item: any;

  sayHello(title: string) {
    alert(`Hello ${title}`);
  }
}

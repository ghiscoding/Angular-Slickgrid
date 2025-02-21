import { Component, OnDestroy } from '@angular/core';

@Component({
  template: `<div class="container-fluid d-flex align-items-center" style="margin-top: 10px">
    <i class="mdi mdi-sync mdi-spin mdi-50px"></i>
    <h4>Loading...</h4>
  </div>`,
})
export class RowDetailPreloadComponent implements OnDestroy {
  ngOnDestroy(): void {
    console.log('preload destroyed');
  }
}

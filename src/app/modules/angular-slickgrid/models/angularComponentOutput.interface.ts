import type { ComponentRef } from '@angular/core';

export interface AngularComponentOutput {
  componentRef: ComponentRef<any>;
  domElement: HTMLElement;
}

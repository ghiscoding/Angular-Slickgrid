import { EmbeddedViewRef, Injectable, Type, ViewContainerRef } from '@angular/core';

import type { AngularComponentOutput } from '../models/angularComponentOutput.interface';

@Injectable()
export class AngularUtilService {

  constructor(private vcr: ViewContainerRef) { }

  createAngularComponent<C>(component: Type<C>, target?: HTMLElement, data?: any): AngularComponentOutput {
    // Create a component reference from the component
    const componentRef = this.vcr.createComponent(component);

    // user could provide data to assign to the component instance

    if (data) {
      Object.assign(componentRef.instance as any, data);

      // NOTE: detectChanges() MUST be doene BEFORE returning the DOM element in the next step,
      // because if we do it only after returning the rootNodes (domElement) then it won't have the instance data yet
      // and we would have to wait an extra cycle to see the result, this basically helps with Example22
      componentRef.changeDetectorRef.detectChanges();
    }

    // Get DOM element from component
    let domElem: HTMLElement | null = null;
    const viewRef = (componentRef.hostView as EmbeddedViewRef<any>);

    // get DOM element from the new dynamic Component, make sure this is read after any data and detectChanges()
    if (viewRef && Array.isArray(viewRef.rootNodes) && viewRef.rootNodes[0]) {
      domElem = viewRef.rootNodes[0] as HTMLElement;

      // when user provides the DOM element target, we will read the new Component html and use it to replace the target html
      if (target && domElem) {
        target.innerHTML = domElem.innerHTML;
      }
    }

    return { componentRef, domElement: domElem as HTMLElement };
  }

  createAngularComponentAppendToDom(component: any, targetElement?: HTMLElement | Element, clearTargetContent = false): AngularComponentOutput {
    const componentOutput = this.createAngularComponent(component);

    // Append DOM element to the HTML element specified
    if (targetElement?.appendChild) {
      if (clearTargetContent && targetElement.innerHTML) {
        targetElement.innerHTML = '';
      }
      targetElement.appendChild(componentOutput.domElement);
    } else {
      document.body.appendChild(componentOutput.domElement); // when no target provided, we'll simply add it to the HTML Body
    }

    return componentOutput;
  }
}

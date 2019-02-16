import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';

@Injectable()
export class AngularUtilService {
  constructor(
    private compFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) { }

  // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
  appendAngularComponentToDom(component: any, targetElement?: HTMLElement | Element) {
    // Create a component reference from the component
    const componentRef = this.compFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the HTML element specified
    if (targetElement && targetElement.appendChild) {
      targetElement.appendChild(domElem);
    } else {
      document.body.appendChild(domElem); // when no target provided, we'll simply add it to the HTML Body
    }

    return componentRef;
  }
}

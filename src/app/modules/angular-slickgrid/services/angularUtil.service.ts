import { Injectable, ViewContainerRef } from '@angular/core';
import type { EmbeddedViewRef, EnvironmentInjector, Injector, NgModuleRef, Type } from '@angular/core';

import type { AngularComponentOutput } from '../models/angularComponentOutput.interface';

interface CreateComponentOption {
  index?: number;
  injector?: Injector;
  ngModuleRef?: NgModuleRef<unknown>;
  environmentInjector?: EnvironmentInjector | NgModuleRef<unknown>;
  projectableNodes?: Node[][];
  sanitizer?: (dirtyHtml: string) => string;
}

@Injectable()
export class AngularUtilService {
  constructor(private vcr: ViewContainerRef) {}

  createInteractiveAngularComponent<C>(
    component: Type<C>,
    targetElement: Element,
    data?: any,
    createCompOptions?: CreateComponentOption
  ): AngularComponentOutput {
    // Create a component reference from the component
    const componentRef = this.vcr.createComponent(component, createCompOptions);

    // user could provide data to assign to the component instance
    if (componentRef?.instance && data) {
      Object.assign(componentRef.instance as any, data);
    }

    // Get DOM element from component
    let domElem: HTMLElement | null = null;
    const viewRef = componentRef.hostView as EmbeddedViewRef<any>;

    if (viewRef && Array.isArray(viewRef.rootNodes) && viewRef.rootNodes[0]) {
      domElem = viewRef.rootNodes[0] as HTMLElement;

      // when user provides the DOM element target, we will move the dynamic component into that target (aka portal-ing it)
      if (targetElement && domElem) {
        targetElement.replaceChildren(componentRef.location.nativeElement);
      }
    }

    return { componentRef, domElement: domElem as HTMLElement };
  }

  /**
   * Dynamically create an Angular component, user could also provide optional arguments for target, data & createComponent options
   * @param {Component} component
   * @param {HTMLElement} [targetElement]
   * @param {*} [data]
   * @param {CreateComponentOption} [createCompOptions]
   * @returns
   */
  createAngularComponent<C>(
    component: Type<C>,
    targetElement?: Element,
    data?: any,
    createCompOptions?: CreateComponentOption
  ): AngularComponentOutput {
    // Create a component reference from the component
    const componentRef = this.vcr.createComponent(component, createCompOptions);

    // user could provide data to assign to the component instance
    if (componentRef?.instance && data) {
      Object.assign(componentRef.instance as any, data);

      // NOTE: detectChanges() MUST be done BEFORE returning the DOM element in the next step,
      // because if we do it only after returning the rootNodes (domElement) then it won't have the instance data yet
      // and we would have to wait an extra cycle to see the result, this basically helps with Example22
      componentRef.changeDetectorRef.detectChanges();
    }

    // Get DOM element from component
    let domElem: HTMLElement | null = null;
    const viewRef = componentRef.hostView as EmbeddedViewRef<any>;

    // get DOM element from the new dynamic Component, make sure this is read after any data and detectChanges()
    if (viewRef && Array.isArray(viewRef.rootNodes) && viewRef.rootNodes[0]) {
      domElem = viewRef.rootNodes[0] as HTMLElement;

      // when user provides the DOM element target, we will read the new Component html and use it to replace the target html
      if (targetElement && domElem) {
        targetElement.innerHTML =
          typeof createCompOptions?.sanitizer === 'function'
            ? createCompOptions.sanitizer(domElem.innerHTML || '')
            : domElem.innerHTML;
      }
    }

    return { componentRef, domElement: domElem as HTMLElement };
  }

  /**
   * Dynamically create an Angular component and append it to the DOM unless a target element is provided,
   * user could also provide other optional arguments for data & createComponent options.
   * @param {Component} component
   * @param {HTMLElement} [targetElement]
   * @param {*} [data]
   * @param {CreateComponentOption} [createCompOptions]
   * @returns
   */
  createAngularComponentAppendToDom<C>(
    component: Type<C>,
    targetElement?: Element,
    data?: any,
    createCompOptions?: CreateComponentOption
  ): AngularComponentOutput {
    const componentOutput = this.createAngularComponent(component, targetElement, data, createCompOptions);

    // Append DOM element to the HTML element specified
    if (targetElement?.replaceChildren) {
      targetElement.replaceChildren(componentOutput.domElement);
    } else {
      document.body.appendChild(componentOutput.domElement); // when no target provided, we'll simply add it to the HTML Body
    }

    return componentOutput;
  }
}

import { Injectable } from '@angular/core';
import { ContainerInstance, ContainerService as UniversalContainerService } from '@slickgrid-universal/common';

@Injectable()
export class ContainerService implements UniversalContainerService {
  dependencies: ContainerInstance[] = [];

  constructor() { }

  get<T = any>(key: string): T | null {
    const dependency = this.dependencies.find(dep => dep.key === key);
    if (dependency?.instance) {
      return dependency.instance;
    }
    return null;
  }

  registerInstance(key: string, instance: any) {
    const dependency = this.dependencies.some(dep => dep.key === key);
    if (!dependency) {
      this.dependencies.push({ key, instance });
    }
  }
}

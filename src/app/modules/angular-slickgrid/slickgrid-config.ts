import { Injectable } from "@angular/core";

import { GridOption } from './models/gridOption.interface';
import { GlobalGridOptions } from './global-grid-options';

@Injectable()
export class SlickgridConfig {
  options: Partial<GridOption>;

  constructor() {
    this.options = GlobalGridOptions;
  }
}

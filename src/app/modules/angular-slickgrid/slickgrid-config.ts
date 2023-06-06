import type { GridOption } from './models/gridOption.interface';
import { GlobalGridOptions } from './global-grid-options';

export class SlickgridConfig {
  options: Partial<GridOption>;

  constructor() {
    this.options = GlobalGridOptions;
  }
}

import { Extension } from './extension.interface';
import { ExtensionName } from './extensionName.enum';

export interface ExtensionModel {
  /** Name of the Angular-Slickgrid Extension */
  name: ExtensionName;

  /** @deprecated (please use "instance" instead) Addon is the object instance of the 3rd party SlickGrid Control or Plugin */
  addon: any;

  /** Instance of the Addon (3rd party SlickGrid Control or Plugin) */
  instance: any;

  /** Extension Service (in Angular-Slickgrid) */
  class: Extension | null;
}

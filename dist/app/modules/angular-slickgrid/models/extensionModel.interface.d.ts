import { Extension } from './extension.interface';
import { ExtensionName } from './extensionName.enum';
export interface ExtensionModel {
    /** Name of the Extension */
    name: ExtensionName;
    /** Extension is the Control/Plugin coming from SlickGrid */
    extension: any;
    /** Extension Service (in Aurelia-Slickgrid) */
    class: Extension | null;
}

import { ExtensionName } from './extensionName.enum';

export interface Extension {
  name: ExtensionName;
  service: any;
}

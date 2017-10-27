export interface Editor {
  init: () => void;
  applyValue: (item: any, state: any) => void;
  handleKeyDown?: (e) => void;
  save?: () => void;
  cancel?: () => void;
  hide?: () => void;
  show?: () => void;
  position?: (position: any) => void;
  destroy: () => void;
  focus: () => void;
  loadValue: (item: any) => void;
  serializeValue: () => string | number;
  isValueChanged: () => boolean;
  validate: () => { valid: boolean, msg: string | null };
}

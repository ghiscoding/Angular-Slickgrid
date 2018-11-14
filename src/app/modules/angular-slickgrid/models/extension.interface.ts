export interface Extension {
  dispose: () => void;
  register: () => any;
}

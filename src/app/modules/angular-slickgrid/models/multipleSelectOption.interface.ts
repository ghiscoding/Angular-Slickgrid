export interface MultipleSelectOption {
  /** Add a title. By default this option is set to false. */
  addTitle?: boolean;

  /** Use animation, options are ('none', 'fade', 'slide'). By default this option is set to 'none'  */
  animate?: 'none' | 'fade' | 'slide';

  /** The text displays when the select all selected.By default this option is set to "All selected". */
  allSelected?: boolean | string;

  /** Drop menu to automatically get same width as the input select element */
  autoDropWidth?: boolean;

  /** HTML container to use for the drop menu, e.g. 'body' */
  container?: string;

  /** `#` is replaced with the count of selected items, `%` is replaces with total items.By default this option is set to # of % selected. */
  countSelected?: string;

  /** Delimiter to use when display the selected options. By default this option is set to `,` */
  delimiter?: string;

  /** Display selected values on the element. By default this option is set to false. */
  displayValues?: boolean;

  /** Define the width of the dropdown list */
  dropWidth?: number;

  /** Add `…` after selected options if minimumCountSelected is set. Overrides countSelected option.By default this option is set to false. */
  ellipsis?: boolean;

  /** Whether or not Multiple Select show a search field to search through checkbox items.By default this option is set to false. */
  filter?: boolean;

  /** Accept a filter by typing Enter on the keyboard. By default this option is set to false. */
  filterAcceptOnEnter?: boolean;

  /** Hide the option groupd checkboses. By default this is set to false. */
  hideOptgroupCheckboxes?: boolean;

  /** Whether or not Multiple Select open the select dropdown. */
  isOpen?: boolean;

  /** Keep the select dropdown always open.By default this option is set to false. */
  keepOpen?: boolean;

  /** Define the maximum height property of the dropdown list.By default this option is set to 250. */
  maxHeight?: number;

  /** countSelected will be shown only if more than X items where selected.By default this option is set to 3. */
  minimumCountSelected?: number;

  /** Whether or not Multiple Select show multiple items in a row.By default this option is set to false. */
  multiple?: boolean;

  /** Multiple Select show multiple items width.By default this option is set to 80. */
  multipleWidth?: number;

  /** Provide a name to the multiple select element. By default this option is set to ''. */
  name?: string;

  /** Text to display when nothing is found. By default the text is "No matches found" */
  noMatchesFound?: string;

  /** Add an offset to the dropdown menu list. By default this option is set to 0. */
  offsetLeft?: number;

  /** Display the OK button at bottom of the list. By default this is set to false. */
  okButton?: boolean;

  /** Text to display on the bottom OK button. By default the text is "OK" */
  okButtonText?: string;

  /** A placeholder value can be defined and will be displayed until you select a item. */
  placeholder?: string;

  /** Defines the position of select dropdown, can only be bottom or top.By default this option is set to bottom. */
  position?: string;

  /** Whether or not Multiple Select show select all checkbox. */
  selectAll?: boolean;

  /** Multiple Select select all checkbox delimiter. By default this option is set to ['[',']']. */
  selectAllDelimiter?: string[];

  /** Multiple Select select all checkbox text. By default this option is set to "Select all" */
  selectAllText?: string;

  /** Whether or not Multiple Select allows you to select only one option.By default this option is set to false. */
  single?: boolean;

  /** Define the width property of the dropdown list, support a percentage setting.By default this option is set to undefined. Which is the same as the select input field. */
  width?: number;

  // --
  // Methods
  // ------------

  /** Blur the multiple select. */
  blur?: () => void;

  /** Enables Select. */
  enable?: () => void;

  /** Focus the multiple select. */
  focus?: () => void;

  /** Disables Select. During this mode the user is not allowed to manipulate the selection. */
  disable?: () => void;

  /** Check all checkboxes. */
  checkAll?: () => void;

  /** Uncheck all checkboxes. */
  uncheckAll?: () => void;

  /** Reloads the Multiple Select. If you’re dynamically adding/removing option tags on the original select via AJAX or DOM manipulation methods, call refresh to reflect the changes. */
  refresh?: () => void;

  /** Gets the selected values. */
  getSelects?: () => string | string[];

  /** Sets the selected values. */
  setSelects?: (value: string | string[]) => void;

  /** The item styler function, return style string to custom the item style such as background: red. The function take one parameter: value. */
  styler?: () => void;

  /** Returns HTML label attribute of a DOM element */
  labelTemplate?: (elm: any) => any;

  /** Returns HTML text template of a DOM element */
  textTemplate?: (elm: any) => any;

  // --
  // Events
  // ------------

  /** Fires when the dropdown list is open. */
  onOpen?: () => void;

  /** Fires when the dropdown list is close. */
  onClose?: () => void;

  /** Fires when all the options are checked by either clicking the `Select all` checkbox, or when the `checkall` method is programatically called. */
  onCheckAll?: () => void;

  /** Fires when all the options are unchecked by either clicking the `Select all` checkbox, or when the `uncheckall` method is programatically called. */
  onUncheckAll?: () => void;

  /** Bind an event handler to the “focus”. */
  onFocus?: () => void;

  /** Bind an event handler to the “blur” */
  onBlur?: () => void;

  /** Fires when a an optgroup label is clicked on. */
  onOptgroupClick?: () => void;

  /** Fires when a checkbox is checked or unchecked. */
  onClick?: () => void;

  /** Fires when a checkbox filter is changed. */
  onFilter?: () => void;
}

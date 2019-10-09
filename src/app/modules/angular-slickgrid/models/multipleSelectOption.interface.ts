export interface MultipleSelectOption {
  /** Add a title. By default this option is set to false. */
  addTitle?: boolean;

  /** defaults to 20, when using "autoAdjustDropHeight" we might want to add a bottom (or top) padding instead of taking the entire available space */
  adjustHeightPadding?: number;

  /** Use animation, options are ('none', 'fade', 'slide'). By default this option is set to 'none'  */
  animate?: 'none' | 'fade' | 'slide';

  /** The text displays when the select all selected.By default this option is set to "All selected". */
  allSelected?: boolean | string;

  /** Auto-adjust the Drop menu height to fit with available space */
  autoAdjustDropHeight?: boolean;

  /** Auto-adjust the Drop position on the side with the most available space (dropup / dropdown) */
  autoAdjustDropPosition?: boolean;

  /** Drop menu to automatically set same width as the input select element */
  autoDropWidth?: boolean;

  /** Drop menu to automatically set it's width as the maximum available width of text */
  autoAdjustDropWidthByTextSize?: boolean;

  /** HTML container to use for the drop menu, e.g. 'body' */
  container?: string;

  /** `#` is replaced with the count of selected items, `%` is replaces with total items.By default this option is set to # of % selected. */
  countSelected?: string;

  /** Delimiter to use when display the selected options. By default this option is set to `,` */
  delimiter?: string;

  /** Display selected values on the element. By default this option is set to false. */
  displayValues?: boolean;

  /** Defaults to 26 (as per CSS), that is the "OK" button element height in pixels inside the drop when using multiple-selection */
  domElmOkButtonHeight?: number;

  /** Defaults to 26 (as per CSS), that is the select DOM element padding in pixels (that is not the drop but the select itself, how tall is it) */
  domElmSelectSidePadding?: number;

  /** Defaults to 39 (as per CSS), that is the DOM element of the "Select All" text area */
  domElmSelectAllHeight?: number;

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

  /** Defaults to 250, define the maximum height property of the dropdown list. */
  maxHeight?: number;

  /** Defaults to 500, define the maximum width of the drop when using the "autoAdjustDropWidthByTextSize: true" flag. */
  maxWidth?: number;

  /** Define the minimum width of the drop when using the "autoAdjustDropWidthByTextSize: true" flag. */
  minWidth?: number;

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

  /** Defaults to false, when set to True it will use the "title" that were defined in each select option */
  useSelectOptionTitle?: boolean;

  /** Defaults to False, when set to True it will use the <option label=""> that can be used to display selected options */
  useSelectOptionLabel?: boolean;

  /** Defaults to False, same as "useSelectOptionLabel" but will also render html */
  useSelectOptionLabelToHtml?: boolean;

  /** Define the width property of the dropdown list, support a percentage setting.By default this option is set to undefined. Which is the same as the select input field. */
  width?: number | string;

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
  styler?: (value: string) => void;

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
  onOptgroupClick?: (view: MultipleSelectView) => void;

  /** Fires when a checkbox is checked or unchecked. */
  onClick?: (view: MultipleSelectView) => void;

  /** Fires when a checkbox filter is changed. */
  onFilter?: () => void;
}

export interface MultipleSelectView {
  label: string;
  value: any;
  checked: boolean;
  instance: any;
}

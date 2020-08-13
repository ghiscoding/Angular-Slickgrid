import {
  CollectionCustomStructure,
  CollectionFilterBy,
  CollectionOption,
  CollectionSortBy,
  EditorValidator,
  FieldType,
  MultipleSelectOption,
} from './index';

export interface ColumnEditor {
  /**
   * Defaults to false, when set to True and user presses the ENTER key (on Editors that supports it),
   * it will always call a Save regardless if the current value is null and/or previous value was null
   */
  alwaysSaveOnEnterKey?: boolean;

  /**
   * Some Editor could support callbacks from their jQuery instance (for now only AutoComplete supports this), for example:
   * editor: { model:{ Editors.autoComplete }, callbacks: { _renderItem: (ul, item) => { ... } }}
   *
   * will be interpreted as $(#element).autocomplete("instance")._renderItem = (ul, item) => { ... }
   * from jQuery UI doc: https://jqueryui.com/autocomplete/#custom-data
   */
  callbacks?: any;

  /**
   * A collection of items/options (commonly used with a Select/Multi-Select Editor)
   * It can be a collection of string or label/value pair (the pair can be customized via the "customStructure" option)
   */
  collection?: any[];

  /** A collection of items/options that will be loaded asynchronously (commonly used with a Select/Multi-Select Editor) */
  collectionAsync?: Promise<any>;

  /** Options to change the behavior of the "collection" */
  collectionOptions?: CollectionOption;

  /** We could filter 1 or more items from the collection */
  collectionFilterBy?: CollectionFilterBy | CollectionFilterBy[];

  /** We could sort the collection by 1 or more properties, or by translated value(s) when enableTranslateLabel is True */
  collectionSortBy?: CollectionSortBy | CollectionSortBy[];

  /**
   * When providing a dot (.) notation in the "field" property of a column definition, we might want to use a different path for the editable object itself
   * For example if we provide a coldef = { field: 'user.name' } but we use a SingleSelect Editor with object values, we could override the path to simply 'user'
   * NOTE: Currently only used in the Single/MultipleSelect Editors, we could potentially use it for more Editors in the future if need be.
   */
  complexObjectPath?: string;

  /** A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Editor */
  customStructure?: CollectionCustomStructure;

  /** number of decimal places, works only with Editors supporting it (input float, integer, range, slider) */
  decimal?: number;

  /**
   * Options that could be provided to the Editor, example: { container: 'body', maxHeight: 250}
   *
   * Please note that if you use options that have existed model interfaces, you should cast with "as X",
   * for example { editorOptions: {maxHeight: 250} as MultipleSelectOption }
   */
  editorOptions?: MultipleSelectOption | any;

  /**
   * @deprecated please use "editorOptions" property instead.
   * DOM element extra options.
   */
  elementOptions?: any;

  /**
   * Defaults to false, when set it will render any HTML code instead of removing it (sanitized)
   * Currently only supported by the following Editors: AutoComplete, MultipleSelect & SingleSelect
   */
  enableRenderHtml?: boolean;

  /** Do we want the Editor to handle translation (localization)? */
  enableTranslateLabel?: boolean;

  /** Error message to display when validation fails */
  errorMessage?: string;

  /** Maximum length of the text value, works only with Editors supporting it (autoComplete, text, longText) */
  maxLength?: number;

  /** Maximum value of the editor, works only with Editors supporting it (number, float, slider) */
  maxValue?: number | string;

  /** Minimum length of the text value, works only with Editors supporting it (autoComplete, text, longText) */
  minLength?: number;

  /** Minimum value of the editor, works only with Editors supporting it (number, float, slider) */
  minValue?: number | string;

  /** Any inline editor function that implements Editor for the cell */
  model?: any;

  /**
   * Placeholder text that can be used by some Editors.
   * Note that this will override the default placeholder configured in the global config
   */
  placeholder?: string;

  /** Defaults to "inclusive", operator should be (inclusive or exclusive) when executing validation condition check against the minValue/maxValue. */
  operatorConditionalType?: 'inclusive' | 'exclusive';

  /**
   * Useful when you want to display a certain field to the UI, but you want to use another field to query when Filtering/Sorting.
   * Please note that it has higher precendence over the "field" property.
   */
  queryField?: string;

  /**
   * Defaults to false, is the field required to be valid?
   * Only on Editors that supports it.
   */
  required?: boolean;

  /**
   * Title attribute that can be used in some Editors as tooltip (usually the "input" editors).
   *
   * To use this as a Tooltip, Aurelia-Slickgrid doesn't (and will never) use any Aurelia 3rd party lib to display a real Tooltip,
   * for that you can use any jQuery 3rd party lib like tipsy for example (we use it in our own project and it works)
   * https://www.npmjs.com/package/jquery.tipsy
   */
  title?: string;

  /** What is the Field Type that can be used by the Editor (as precedence over the "type" set the column definition) */
  type?: FieldType;

  /** Editor Validator */
  validator?: EditorValidator;

  /** Step value of the editor, works only with Editors supporting it (input text, number, float, range, slider) */
  valueStep?: number | string;

  /**
   * Use "params" to pass any type of arguments to your Custom Editor
   * or regular Editor like the Editors.float
   * for example, to pass the option collection to a select Editor we can type this:
   * params: { decimalPlaces: 2 }
   */
  params?: any;
}

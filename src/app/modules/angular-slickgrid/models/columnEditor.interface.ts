import {
  CollectionCustomStructure,
  CollectionFilterBy,
  CollectionOption,
  CollectionSortBy,
  EditorValidator,
  MultipleSelectOption,
} from './../models/index';
import { Observable } from 'rxjs';

export interface ColumnEditor {
  /** A collection of items/options that will be loaded asynchronously (commonly used with a Select/Multi-Select Editor) */
  collectionAsync?: Promise<any> | Observable<any>;

  /**
   * A collection of items/options (commonly used with a Select/Multi-Select Editor)
   * It can be a collection of string or label/value pair (the pair can be customized via the "customStructure" option)
   */
  collection?: any[];

  /** We could filter some 1 or more items from the collection */
  collectionFilterBy?: CollectionFilterBy | CollectionFilterBy[];

  /** Options to change the behavior of the "collection" */
  collectionOptions?: CollectionOption;

  /** We could sort the collection by 1 or more properties, or by translated value(s) when enableTranslateLabel is True */
  collectionSortBy?: CollectionSortBy | CollectionSortBy[];

  /** A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Editor */
  customStructure?: CollectionCustomStructure;

  /** Options that could be provided to the Editor, example: { container: 'body', maxHeight: 250} */
  editorOptions?: MultipleSelectOption | any;

  /**
   * Defaults to false, when set it will render any HTML code instead of removing it (sanitized)
   * Only used so far in the MultipleSelect & SingleSelect Filters will support it
   */
  enableRenderHtml?: boolean;

  /** Do we want the Editor to handle translation (localization)? */
  enableTranslateLabel?: boolean;

  /** Error message to display when validation fails */
  errorMessage?: string;

  /** Maximum value of the filter, works only with Filters supporting it (text, number, float, slider) */
  maxValue?: number | string;

  /** Minimum value of the filter, works only with Filters supporting it (text, number, float, slider) */
  minValue?: number | string;

  /** Any inline editor function that implements Editor for the cell */
  model?: any;

  /** Editor Validator */
  validator?: EditorValidator;

  /** Step value of the filter, works only with Filters supporting it (input text, number, float, range, slider) */
  valueStep?: number | string;

  /** DOM element extra options */
  elementOptions?: any;

  /**
   * Use "params" to pass any type of arguments to your Custom Editor
   * or regular Editor like the Editors.float
   * for example, to pass the option collection to a select Filter we can type this:
   * params: { decimalPlaces: 2 }
   */
  params?: any;
}

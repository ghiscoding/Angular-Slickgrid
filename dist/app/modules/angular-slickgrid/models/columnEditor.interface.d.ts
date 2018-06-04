import { EditorType } from './editorType.enum';
import { CollectionFilterBy, CollectionSortBy, MultipleSelectOption } from './../models/index';
export interface ColumnEditor {
    /** Custom Editor */
    customEditor?: any;
    /** Editor Type to use (input, multipleSelect, singleSelect, select, custom) */
    type?: EditorType;
    collection?: any[];
    /** We could filter some items from the collection */
    collectionFilterBy?: CollectionFilterBy;
    /** We could sort the collection by their value, or by translated value when enableTranslateLabel is True */
    collectionSortBy?: CollectionSortBy;
    /** Options that could be provided to the Editor, example: { container: 'body', maxHeight: 250} */
    editorOptions?: MultipleSelectOption | any;
    /** Do we want the Editor to handle translation (localization)? */
    enableTranslateLabel?: boolean;
    /** A custom structure can be used instead of the default label/value pair. Commonly used with Select/Multi-Select Editor */
    customStructure?: {
        label: string;
        value: string;
    };
    /** DOM element extra options */
    elementOptions?: any;
    /**
     * Use "params" to pass any type of arguments to your Custom Editor (type: EditorType.custom)
     * or regular Editor like the EditorType.float
     * for example, to pass the option collection to a select Filter we can type this:
     * params: { decimalPlaces: 2 }
     */
    params?: any;
}

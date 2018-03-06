import { InputFilter } from './inputFilter';
import { InputNoPlaceholderFilter } from './inputNoPlaceholderFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { SelectFilter } from './selectFilter';
import { SingleSelectFilter } from './singleSelectFilter';
export declare const Filters: {
    input: typeof InputFilter;
    inputNoPlaceholder: typeof InputNoPlaceholderFilter;
    multipleSelect: typeof MultipleSelectFilter;
    singleSelect: typeof SingleSelectFilter;
    select: typeof SelectFilter;
};

import { Column, Filter } from './../models/index';
import { AutoCompleteFilter } from './autoCompleteFilter';
import { CompoundDateFilter } from './compoundDateFilter';
import { CompoundInputFilter } from './compoundInputFilter';
import { CompoundInputNumberFilter } from './compoundInputNumberFilter';
import { CompoundInputPasswordFilter } from './compoundInputPasswordFilter';
import { CompoundSliderFilter } from './compoundSliderFilter';
import { InputFilter } from './inputFilter';
import { InputMaskFilter } from './inputMaskFilter';
import { InputNumberFilter } from './inputNumberFilter';
import { InputPasswordFilter } from './inputPasswordFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { NativeSelectFilter } from './nativeSelectFilter';
import { DateRangeFilter } from './dateRangeFilter';
import { SingleSelectFilter } from './singleSelectFilter';
import { SliderFilter } from './sliderFilter';
import { SliderRangeFilter } from './sliderRangeFilter';

export const Filters = {
  /** AutoComplete Filter (using jQuery UI autocomplete feature) */
  autoComplete: AutoCompleteFilter,

  /** Compound Date Filter (compound of Operator + Date picker) */
  compoundDate: CompoundDateFilter,

  /** Alias to compoundInputText to Compound Input Filter (compound of Operator + Input Text) */
  compoundInput: CompoundInputFilter,

  /** Compound Input Number Filter (compound of Operator + Input of type Number) */
  compoundInputNumber: CompoundInputNumberFilter,

  /** Compound Input Password Filter (compound of Operator + Input of type Password, also note that only the text shown in the UI will be masked, filter query is still plain text) */
  compoundInputPassword: CompoundInputPasswordFilter,

  /** Compound Input Text Filter (compound of Operator + Input Text) */
  compoundInputText: CompoundInputFilter,

  /** Compound Slider Filter (compound of Operator + Slider) */
  compoundSlider: CompoundSliderFilter,

  /** Range Date Filter (uses the Flactpickr Date picker with range option) */
  dateRange: DateRangeFilter,

  /** Alias to inputText, input type text filter */
  input: InputFilter,

  /**
   * Input Filter of type text that will be formatted with a mask output
   * e.g.: column: { filter: { model: Filters.inputMask }, params: { mask: '(000) 000-0000' }}
   */
  inputMask: InputMaskFilter,

  /** Input Filter of type Number */
  inputNumber: InputNumberFilter,

  /** Input Filter of type Password (note that only the text shown in the UI will be masked, filter query is still plain text) */
  inputPassword: InputPasswordFilter,

  /** Default Filter, input type text filter */
  inputText: InputFilter,

  /** Multiple Select filter, which uses 3rd party lib "multiple-select.js" */
  multipleSelect: MultipleSelectFilter,

  /** Select filter, which uses native DOM element select */
  select: NativeSelectFilter,

  /** Single Select filter, which uses 3rd party lib "multiple-select.js" */
  singleSelect: SingleSelectFilter,

  /** Slider Filter (only 1 value) */
  slider: SliderFilter,

  /** Slider Range Filter, uses jQuery UI Range Slider (2 values, lowest/highest search range) */
  sliderRange: SliderRangeFilter,
};

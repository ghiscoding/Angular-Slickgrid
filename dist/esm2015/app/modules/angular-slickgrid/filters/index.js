/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CompoundDateFilter } from './compoundDateFilter';
import { CompoundInputFilter } from './compoundInputFilter';
import { CompoundInputNumberFilter } from './compoundInputNumberFilter';
import { CompoundInputPasswordFilter } from './compoundInputPasswordFilter';
import { CompoundSliderFilter } from './compoundSliderFilter';
import { InputFilter } from './inputFilter';
import { InputNumberFilter } from './inputNumberFilter';
import { InputPasswordFilter } from './inputPasswordFilter';
import { MultipleSelectFilter } from './multipleSelectFilter';
import { NativeSelectFilter } from './nativeSelectFilter';
import { SingleSelectFilter } from './singleSelectFilter';
import { SliderFilter } from './sliderFilter';
/** @type {?} */
export const Filters = {
    /**
     * Compound Date Filter (compound of Operator + Date picker)
     */
    compoundDate: CompoundDateFilter,
    /**
     * Alias to compoundInputText to Compound Input Filter (compound of Operator + Input Text)
     */
    compoundInput: CompoundInputFilter,
    /**
     * Compound Input Number Filter (compound of Operator + Input of type Number)
     */
    compoundInputNumber: CompoundInputNumberFilter,
    /**
     * Compound Input Password Filter (compound of Operator + Input of type Password, also note that only the text shown in the UI will be masked, filter query is still plain text)
     */
    compoundInputPassword: CompoundInputPasswordFilter,
    /**
     * Compound Input Text Filter (compound of Operator + Input Text)
     */
    compoundInputText: CompoundInputFilter,
    /**
     * Compound Slider Filter (compound of Operator + Slider)
     */
    compoundSlider: CompoundSliderFilter,
    /**
     * Alias to inputText, input type text filter
     */
    input: InputFilter,
    /**
     * Input Filter of type Number
     */
    inputNumber: InputNumberFilter,
    /**
     * Input Filter of type Password (note that only the text shown in the UI will be masked, filter query is still plain text)
     */
    inputPassword: InputPasswordFilter,
    /**
     * Default Filter, input type text filter
     */
    inputText: InputFilter,
    /**
     * Multiple Select filter, which uses 3rd party lib "multiple-select.js"
     */
    multipleSelect: MultipleSelectFilter,
    /**
     * Select filter, which uses native DOM element select
     */
    select: NativeSelectFilter,
    /**
     * Single Select filter, which uses 3rd party lib "multiple-select.js"
     */
    singleSelect: SingleSelectFilter,
    /**
     * Slider Filter
     */
    slider: SliderFilter,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU5QyxNQUFNLE9BQU8sT0FBTyxHQUFHOzs7O0lBRXJCLFlBQVksRUFBRSxrQkFBa0I7Ozs7SUFHaEMsYUFBYSxFQUFFLG1CQUFtQjs7OztJQUdsQyxtQkFBbUIsRUFBRSx5QkFBeUI7Ozs7SUFHOUMscUJBQXFCLEVBQUUsMkJBQTJCOzs7O0lBR2xELGlCQUFpQixFQUFFLG1CQUFtQjs7OztJQUd0QyxjQUFjLEVBQUUsb0JBQW9COzs7O0lBR3BDLEtBQUssRUFBRSxXQUFXOzs7O0lBR2xCLFdBQVcsRUFBRSxpQkFBaUI7Ozs7SUFHOUIsYUFBYSxFQUFFLG1CQUFtQjs7OztJQUdsQyxTQUFTLEVBQUUsV0FBVzs7OztJQUd0QixjQUFjLEVBQUUsb0JBQW9COzs7O0lBR3BDLE1BQU0sRUFBRSxrQkFBa0I7Ozs7SUFHMUIsWUFBWSxFQUFFLGtCQUFrQjs7OztJQUdoQyxNQUFNLEVBQUUsWUFBWTtDQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRmlsdGVyIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBDb21wb3VuZERhdGVGaWx0ZXIgfSBmcm9tICcuL2NvbXBvdW5kRGF0ZUZpbHRlcic7XHJcbmltcG9ydCB7IENvbXBvdW5kSW5wdXRGaWx0ZXIgfSBmcm9tICcuL2NvbXBvdW5kSW5wdXRGaWx0ZXInO1xyXG5pbXBvcnQgeyBDb21wb3VuZElucHV0TnVtYmVyRmlsdGVyIH0gZnJvbSAnLi9jb21wb3VuZElucHV0TnVtYmVyRmlsdGVyJztcclxuaW1wb3J0IHsgQ29tcG91bmRJbnB1dFBhc3N3b3JkRmlsdGVyIH0gZnJvbSAnLi9jb21wb3VuZElucHV0UGFzc3dvcmRGaWx0ZXInO1xyXG5pbXBvcnQgeyBDb21wb3VuZFNsaWRlckZpbHRlciB9IGZyb20gJy4vY29tcG91bmRTbGlkZXJGaWx0ZXInO1xyXG5pbXBvcnQgeyBJbnB1dEZpbHRlciB9IGZyb20gJy4vaW5wdXRGaWx0ZXInO1xyXG5pbXBvcnQgeyBJbnB1dE51bWJlckZpbHRlciB9IGZyb20gJy4vaW5wdXROdW1iZXJGaWx0ZXInO1xyXG5pbXBvcnQgeyBJbnB1dFBhc3N3b3JkRmlsdGVyIH0gZnJvbSAnLi9pbnB1dFBhc3N3b3JkRmlsdGVyJztcclxuaW1wb3J0IHsgTXVsdGlwbGVTZWxlY3RGaWx0ZXIgfSBmcm9tICcuL211bHRpcGxlU2VsZWN0RmlsdGVyJztcclxuaW1wb3J0IHsgTmF0aXZlU2VsZWN0RmlsdGVyIH0gZnJvbSAnLi9uYXRpdmVTZWxlY3RGaWx0ZXInO1xyXG5pbXBvcnQgeyBTaW5nbGVTZWxlY3RGaWx0ZXIgfSBmcm9tICcuL3NpbmdsZVNlbGVjdEZpbHRlcic7XHJcbmltcG9ydCB7IFNsaWRlckZpbHRlciB9IGZyb20gJy4vc2xpZGVyRmlsdGVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBGaWx0ZXJzID0ge1xyXG4gIC8qKiBDb21wb3VuZCBEYXRlIEZpbHRlciAoY29tcG91bmQgb2YgT3BlcmF0b3IgKyBEYXRlIHBpY2tlcikgKi9cclxuICBjb21wb3VuZERhdGU6IENvbXBvdW5kRGF0ZUZpbHRlcixcclxuXHJcbiAgLyoqIEFsaWFzIHRvIGNvbXBvdW5kSW5wdXRUZXh0IHRvIENvbXBvdW5kIElucHV0IEZpbHRlciAoY29tcG91bmQgb2YgT3BlcmF0b3IgKyBJbnB1dCBUZXh0KSAqL1xyXG4gIGNvbXBvdW5kSW5wdXQ6IENvbXBvdW5kSW5wdXRGaWx0ZXIsXHJcblxyXG4gIC8qKiBDb21wb3VuZCBJbnB1dCBOdW1iZXIgRmlsdGVyIChjb21wb3VuZCBvZiBPcGVyYXRvciArIElucHV0IG9mIHR5cGUgTnVtYmVyKSAqL1xyXG4gIGNvbXBvdW5kSW5wdXROdW1iZXI6IENvbXBvdW5kSW5wdXROdW1iZXJGaWx0ZXIsXHJcblxyXG4gIC8qKiBDb21wb3VuZCBJbnB1dCBQYXNzd29yZCBGaWx0ZXIgKGNvbXBvdW5kIG9mIE9wZXJhdG9yICsgSW5wdXQgb2YgdHlwZSBQYXNzd29yZCwgYWxzbyBub3RlIHRoYXQgb25seSB0aGUgdGV4dCBzaG93biBpbiB0aGUgVUkgd2lsbCBiZSBtYXNrZWQsIGZpbHRlciBxdWVyeSBpcyBzdGlsbCBwbGFpbiB0ZXh0KSAqL1xyXG4gIGNvbXBvdW5kSW5wdXRQYXNzd29yZDogQ29tcG91bmRJbnB1dFBhc3N3b3JkRmlsdGVyLFxyXG5cclxuICAvKiogQ29tcG91bmQgSW5wdXQgVGV4dCBGaWx0ZXIgKGNvbXBvdW5kIG9mIE9wZXJhdG9yICsgSW5wdXQgVGV4dCkgKi9cclxuICBjb21wb3VuZElucHV0VGV4dDogQ29tcG91bmRJbnB1dEZpbHRlcixcclxuXHJcbiAgLyoqIENvbXBvdW5kIFNsaWRlciBGaWx0ZXIgKGNvbXBvdW5kIG9mIE9wZXJhdG9yICsgU2xpZGVyKSAqL1xyXG4gIGNvbXBvdW5kU2xpZGVyOiBDb21wb3VuZFNsaWRlckZpbHRlcixcclxuXHJcbiAgLyoqIEFsaWFzIHRvIGlucHV0VGV4dCwgaW5wdXQgdHlwZSB0ZXh0IGZpbHRlciAqL1xyXG4gIGlucHV0OiBJbnB1dEZpbHRlcixcclxuXHJcbiAgLyoqIElucHV0IEZpbHRlciBvZiB0eXBlIE51bWJlciAqL1xyXG4gIGlucHV0TnVtYmVyOiBJbnB1dE51bWJlckZpbHRlcixcclxuXHJcbiAgLyoqIElucHV0IEZpbHRlciBvZiB0eXBlIFBhc3N3b3JkIChub3RlIHRoYXQgb25seSB0aGUgdGV4dCBzaG93biBpbiB0aGUgVUkgd2lsbCBiZSBtYXNrZWQsIGZpbHRlciBxdWVyeSBpcyBzdGlsbCBwbGFpbiB0ZXh0KSAqL1xyXG4gIGlucHV0UGFzc3dvcmQ6IElucHV0UGFzc3dvcmRGaWx0ZXIsXHJcblxyXG4gIC8qKiBEZWZhdWx0IEZpbHRlciwgaW5wdXQgdHlwZSB0ZXh0IGZpbHRlciAqL1xyXG4gIGlucHV0VGV4dDogSW5wdXRGaWx0ZXIsXHJcblxyXG4gIC8qKiBNdWx0aXBsZSBTZWxlY3QgZmlsdGVyLCB3aGljaCB1c2VzIDNyZCBwYXJ0eSBsaWIgXCJtdWx0aXBsZS1zZWxlY3QuanNcIiAqL1xyXG4gIG11bHRpcGxlU2VsZWN0OiBNdWx0aXBsZVNlbGVjdEZpbHRlcixcclxuXHJcbiAgLyoqIFNlbGVjdCBmaWx0ZXIsIHdoaWNoIHVzZXMgbmF0aXZlIERPTSBlbGVtZW50IHNlbGVjdCAqL1xyXG4gIHNlbGVjdDogTmF0aXZlU2VsZWN0RmlsdGVyLFxyXG5cclxuICAvKiogU2luZ2xlIFNlbGVjdCBmaWx0ZXIsIHdoaWNoIHVzZXMgM3JkIHBhcnR5IGxpYiBcIm11bHRpcGxlLXNlbGVjdC5qc1wiICovXHJcbiAgc2luZ2xlU2VsZWN0OiBTaW5nbGVTZWxlY3RGaWx0ZXIsXHJcblxyXG4gIC8qKiBTbGlkZXIgRmlsdGVyICovXHJcbiAgc2xpZGVyOiBTbGlkZXJGaWx0ZXIsXHJcbn07XHJcbiJdfQ==
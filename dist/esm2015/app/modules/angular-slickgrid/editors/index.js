/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CheckboxEditor } from './checkboxEditor';
import { DateEditor } from './dateEditor';
import { FloatEditor } from './floatEditor';
import { IntegerEditor } from './integerEditor';
import { LongTextEditor } from './longTextEditor';
import { MultipleSelectEditor } from './multipleSelectEditor';
import { SingleSelectEditor } from './singleSelectEditor';
import { SliderEditor } from './sliderEditor';
import { TextEditor } from './textEditor';
/** @type {?} */
export const Editors = {
    /**
     * Checkbox Editor (uses native checkbox DOM element)
     */
    checkbox: CheckboxEditor,
    /**
     * Date Picker Editor (which uses 3rd party lib "flatpickr")
     */
    date: DateEditor,
    /**
     * Float Number Editor
     */
    float: FloatEditor,
    /**
     * Integer Editor
     */
    integer: IntegerEditor,
    /**
     * Long Text Editor (uses a textarea)
     */
    longText: LongTextEditor,
    /**
     * Multiple Select editor (which uses 3rd party lib "multiple-select.js")
     */
    multipleSelect: MultipleSelectEditor,
    /**
     * Single Select editor (which uses 3rd party lib "multiple-select.js")
     */
    singleSelect: SingleSelectEditor,
    /**
     * Slider Editor
     */
    slider: SliderEditor,
    /**
     * Text Editor
     */
    text: TextEditor
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFFMUMsTUFBTSxPQUFPLE9BQU8sR0FBRzs7OztJQUVyQixRQUFRLEVBQUUsY0FBYzs7OztJQUd4QixJQUFJLEVBQUUsVUFBVTs7OztJQUdoQixLQUFLLEVBQUUsV0FBVzs7OztJQUdsQixPQUFPLEVBQUUsYUFBYTs7OztJQUd0QixRQUFRLEVBQUUsY0FBYzs7OztJQUd4QixjQUFjLEVBQUUsb0JBQW9COzs7O0lBR3BDLFlBQVksRUFBRSxrQkFBa0I7Ozs7SUFHaEMsTUFBTSxFQUFFLFlBQVk7Ozs7SUFHcEIsSUFBSSxFQUFFLFVBQVU7Q0FDakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGVja2JveEVkaXRvciB9IGZyb20gJy4vY2hlY2tib3hFZGl0b3InO1xyXG5pbXBvcnQgeyBEYXRlRWRpdG9yIH0gZnJvbSAnLi9kYXRlRWRpdG9yJztcclxuaW1wb3J0IHsgRmxvYXRFZGl0b3IgfSBmcm9tICcuL2Zsb2F0RWRpdG9yJztcclxuaW1wb3J0IHsgSW50ZWdlckVkaXRvciB9IGZyb20gJy4vaW50ZWdlckVkaXRvcic7XHJcbmltcG9ydCB7IExvbmdUZXh0RWRpdG9yIH0gZnJvbSAnLi9sb25nVGV4dEVkaXRvcic7XHJcbmltcG9ydCB7IE11bHRpcGxlU2VsZWN0RWRpdG9yIH0gZnJvbSAnLi9tdWx0aXBsZVNlbGVjdEVkaXRvcic7XHJcbmltcG9ydCB7IFNpbmdsZVNlbGVjdEVkaXRvciB9IGZyb20gJy4vc2luZ2xlU2VsZWN0RWRpdG9yJztcclxuaW1wb3J0IHsgU2xpZGVyRWRpdG9yIH0gZnJvbSAnLi9zbGlkZXJFZGl0b3InO1xyXG5pbXBvcnQgeyBUZXh0RWRpdG9yIH0gZnJvbSAnLi90ZXh0RWRpdG9yJztcclxuXHJcbmV4cG9ydCBjb25zdCBFZGl0b3JzID0ge1xyXG4gIC8qKiBDaGVja2JveCBFZGl0b3IgKHVzZXMgbmF0aXZlIGNoZWNrYm94IERPTSBlbGVtZW50KSAqL1xyXG4gIGNoZWNrYm94OiBDaGVja2JveEVkaXRvcixcclxuXHJcbiAgLyoqIERhdGUgUGlja2VyIEVkaXRvciAod2hpY2ggdXNlcyAzcmQgcGFydHkgbGliIFwiZmxhdHBpY2tyXCIpICovXHJcbiAgZGF0ZTogRGF0ZUVkaXRvcixcclxuXHJcbiAgLyoqIEZsb2F0IE51bWJlciBFZGl0b3IgKi9cclxuICBmbG9hdDogRmxvYXRFZGl0b3IsXHJcblxyXG4gIC8qKiBJbnRlZ2VyIEVkaXRvciAqL1xyXG4gIGludGVnZXI6IEludGVnZXJFZGl0b3IsXHJcblxyXG4gIC8qKiBMb25nIFRleHQgRWRpdG9yICh1c2VzIGEgdGV4dGFyZWEpICovXHJcbiAgbG9uZ1RleHQ6IExvbmdUZXh0RWRpdG9yLFxyXG5cclxuICAvKiogTXVsdGlwbGUgU2VsZWN0IGVkaXRvciAod2hpY2ggdXNlcyAzcmQgcGFydHkgbGliIFwibXVsdGlwbGUtc2VsZWN0LmpzXCIpICovXHJcbiAgbXVsdGlwbGVTZWxlY3Q6IE11bHRpcGxlU2VsZWN0RWRpdG9yLFxyXG5cclxuICAvKiogU2luZ2xlIFNlbGVjdCBlZGl0b3IgKHdoaWNoIHVzZXMgM3JkIHBhcnR5IGxpYiBcIm11bHRpcGxlLXNlbGVjdC5qc1wiKSAqL1xyXG4gIHNpbmdsZVNlbGVjdDogU2luZ2xlU2VsZWN0RWRpdG9yLFxyXG5cclxuICAvKiogU2xpZGVyIEVkaXRvciAqL1xyXG4gIHNsaWRlcjogU2xpZGVyRWRpdG9yLFxyXG5cclxuICAvKiogVGV4dCBFZGl0b3IgKi9cclxuICB0ZXh0OiBUZXh0RWRpdG9yXHJcbn07XHJcbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { arrayObjectToCsvFormatter } from './arrayObjectToCsvFormatter';
import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { boldFormatter } from './boldFormatter';
import { checkboxFormatter } from './checkboxFormatter';
import { checkmarkFormatter } from './checkmarkFormatter';
import { collectionFormatter } from './collectionFormatter';
import { collectionEditorFormatter } from './collectionEditorFormatter';
import { complexObjectFormatter } from './complexObjectFormatter';
import { dateIsoFormatter } from './dateIsoFormatter';
import { dateTimeIsoFormatter } from './dateTimeIsoFormatter';
import { dateTimeIsoAmPmFormatter } from './dateTimeIsoAmPmFormatter';
import { dateTimeUsAmPmFormatter } from './dateTimeUsAmPmFormatter';
import { dateTimeUsFormatter } from './dateTimeUsFormatter';
import { dateTimeShortIsoFormatter } from './dateTimeShortIsoFormatter';
import { dateTimeShortUsFormatter } from './dateTimeShortUsFormatter';
import { dateUsFormatter } from './dateUsFormatter';
import { decimalFormatter } from './decimalFormatter';
import { deleteIconFormatter } from './deleteIconFormatter';
import { dollarColoredBoldFormatter } from './dollarColoredBoldFormatter';
import { dollarColoredFormatter } from './dollarColoredFormatter';
import { dollarFormatter } from './dollarFormatter';
import { editIconFormatter } from './editIconFormatter';
import { hyperlinkFormatter } from './hyperlinkFormatter';
import { hyperlinkUriPrefixFormatter } from './hyperlinkUriPrefixFormatter';
import { infoIconFormatter } from './infoIconFormatter';
import { lowercaseFormatter } from './lowercaseFormatter';
import { maskFormatter } from './maskFormatter';
import { multipleFormatter } from './multipleFormatter';
import { percentFormatter } from './percentFormatter';
import { percentCompleteBarFormatter } from './percentCompleteBarFormatter';
import { percentCompleteFormatter } from './percentCompleteFormatter';
import { percentSymbolFormatter } from './percentSymbolFormatter';
import { progressBarFormatter } from './progressBarFormatter';
import { translateFormatter } from './translateFormatter';
import { translateBooleanFormatter } from './translateBooleanFormatter';
import { uppercaseFormatter } from './uppercaseFormatter';
import { yesNoFormatter } from './yesNoFormatter';
/**
 * Provides a list of different Formatters that will change the cell value displayed in the UI
 * @type {?}
 */
export const Formatters = {
    /**
     * Takes an array of complex objects converts it to a comma delimited string.
     * Requires to pass an array of "propertyNames" in the column definition the generic "params" property
     * For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition::
     * { params: { propertyNames: ['firtName'] }}
     */
    arrayObjectToCsv: arrayObjectToCsvFormatter,
    /**
     * Takes an array of string and converts it to a comma delimited string
     */
    arrayToCsv: arrayToCsvFormatter,
    /**
     * show value in bold font weight as well
     */
    bold: boldFormatter,
    /**
     * When value is filled (true), it will display a checkbox Unicode icon
     */
    checkbox: checkboxFormatter,
    /**
     * When value is filled (true), it will display a Font-Awesome icon (fa-check)
     */
    checkmark: checkmarkFormatter,
    /**
     * Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John")
     */
    complexObject: complexObjectFormatter,
    /**
     * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
     * \@example
     * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
     * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
     * const dataset = [{ value: 1 },{ value: 2 }];
     */
    collection: collectionFormatter,
    /**
     * Looks up values from the columnDefinition.editor.collection property and displays the label in CSV or string format
     * \@example
     * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
     * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
     * const dataset = [{ value: 1 },{ value: 2 }];
     */
    collectionEditor: collectionEditorFormatter,
    /**
     * Takes a Date object and displays it as an ISO Date format
     */
    dateIso: dateIsoFormatter,
    /**
     * Takes a Date object and displays it as an ISO Date+Time format
     */
    dateTimeIso: dateTimeIsoFormatter,
    /**
     * Takes a Date object and displays it as an ISO Date+Time (without seconds) format
     */
    dateTimeShortIso: dateTimeShortIsoFormatter,
    /**
     * Takes a Date object and displays it as an ISO Date+Time+(am/pm) format
     */
    dateTimeIsoAmPm: dateTimeIsoAmPmFormatter,
    /**
     * Takes a Date object and displays it as an US Date format
     */
    dateUs: dateUsFormatter,
    /**
     * Takes a Date object and displays it as an US Date+Time format
     */
    dateTimeUs: dateTimeUsFormatter,
    /**
     * Takes a Date object and displays it as an US Date+Time (without seconds) format
     */
    dateTimeShortUs: dateTimeShortUsFormatter,
    /**
     * Takes a Date object and displays it as an US Date+Time+(am/pm) format
     */
    dateTimeUsAmPm: dateTimeUsAmPmFormatter,
    /**
     * Displays a Font-Awesome delete icon (fa-trash)
     */
    deleteIcon: deleteIconFormatter,
    /**
     * Display the value as x decimals formatted, defaults to 2 decimals.
     * You can pass "decimalPlaces" or "minDecimalPlaces" and/or "maxDecimalPlaces" to the "params" property.
     * For example:: `{ formatter: Formatters.decimal, params: { decimalPlaces: 3 }}`
     * The property "decimalPlaces" is an alias of "minDecimalPlaces"
     */
    decimal: decimalFormatter,
    /**
     * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value
     */
    dollar: dollarFormatter,
    /**
     * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value
     */
    dollarColored: dollarColoredFormatter,
    /**
     * Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well
     */
    dollarColoredBold: dollarColoredBoldFormatter,
    /**
     * Displays a Font-Awesome edit icon (fa-pencil)
     */
    editIcon: editIconFormatter,
    /**
     * Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https). The structure will be "<a href="hyperlink">hyperlink</a>"
     */
    hyperlink: hyperlinkFormatter,
    /**
     * Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"
     */
    hyperlinkUriPrefix: hyperlinkUriPrefixFormatter,
    /**
     * Displays a Font-Awesome edit icon (fa-info-circle)
     */
    infoIcon: infoIconFormatter,
    /**
     * Takes a value and displays it all lowercase
     */
    lowercase: lowercaseFormatter,
    /**
     * Takes a value display it according to a mask provided
     * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
     */
    mask: maskFormatter,
    /**
     * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters.
     * Requires to pass an array of "formatters" in the column definition the generic "params" property
     * For example::
     * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
     */
    multiple: multipleFormatter,
    /**
     * Takes a cell value number (between 0.0-1.0) and displays a red (<50) or green (>=50) bar
     */
    percent: percentFormatter,
    /**
     * Takes a cell value number (between 0.0-100) and displays a red (<50) or green (>=50) bar
     */
    percentComplete: percentCompleteFormatter,
    /**
     * Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar
     */
    percentCompleteBar: percentCompleteBarFormatter,
    /**
     * Takes a cell value number (between 0-100) and add the "%" after the number
     */
    percentSymbol: percentSymbolFormatter,
    /**
     * Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar
     */
    progressBar: progressBarFormatter,
    /**
     * Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `i18n: this.translate
     */
    translate: translateFormatter,
    /**
     * Takes a boolean value, cast it to upperCase string and finally translates it (i18n).
     */
    translateBoolean: translateBooleanFormatter,
    /**
     * Takes a value and displays it all uppercase
     */
    uppercase: uppercaseFormatter,
    /**
     * Takes a boolean value and display a string 'Yes' or 'No'
     */
    yesNo: yesNoFormatter
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBR2xELE1BQU0sT0FBTyxVQUFVLEdBQUc7Ozs7Ozs7SUFPeEIsZ0JBQWdCLEVBQUUseUJBQXlCOzs7O0lBRzNDLFVBQVUsRUFBRSxtQkFBbUI7Ozs7SUFHL0IsSUFBSSxFQUFFLGFBQWE7Ozs7SUFHbkIsUUFBUSxFQUFFLGlCQUFpQjs7OztJQUczQixTQUFTLEVBQUUsa0JBQWtCOzs7O0lBRzdCLGFBQWEsRUFBRSxzQkFBc0I7Ozs7Ozs7O0lBU3JDLFVBQVUsRUFBRSxtQkFBbUI7Ozs7Ozs7O0lBUy9CLGdCQUFnQixFQUFFLHlCQUF5Qjs7OztJQUczQyxPQUFPLEVBQUUsZ0JBQWdCOzs7O0lBR3pCLFdBQVcsRUFBRSxvQkFBb0I7Ozs7SUFHakMsZ0JBQWdCLEVBQUUseUJBQXlCOzs7O0lBRzNDLGVBQWUsRUFBRSx3QkFBd0I7Ozs7SUFHekMsTUFBTSxFQUFFLGVBQWU7Ozs7SUFHdkIsVUFBVSxFQUFFLG1CQUFtQjs7OztJQUcvQixlQUFlLEVBQUUsd0JBQXdCOzs7O0lBR3pDLGNBQWMsRUFBRSx1QkFBdUI7Ozs7SUFHdkMsVUFBVSxFQUFFLG1CQUFtQjs7Ozs7OztJQVEvQixPQUFPLEVBQUUsZ0JBQWdCOzs7O0lBR3pCLE1BQU0sRUFBRSxlQUFlOzs7O0lBR3ZCLGFBQWEsRUFBRSxzQkFBc0I7Ozs7SUFHckMsaUJBQWlCLEVBQUUsMEJBQTBCOzs7O0lBRzdDLFFBQVEsRUFBRSxpQkFBaUI7Ozs7SUFHM0IsU0FBUyxFQUFFLGtCQUFrQjs7OztJQUc3QixrQkFBa0IsRUFBRSwyQkFBMkI7Ozs7SUFHL0MsUUFBUSxFQUFFLGlCQUFpQjs7OztJQUczQixTQUFTLEVBQUUsa0JBQWtCOzs7OztJQU03QixJQUFJLEVBQUUsYUFBYTs7Ozs7OztJQVFuQixRQUFRLEVBQUUsaUJBQWlCOzs7O0lBRzNCLE9BQU8sRUFBRSxnQkFBZ0I7Ozs7SUFHekIsZUFBZSxFQUFFLHdCQUF3Qjs7OztJQUd6QyxrQkFBa0IsRUFBRSwyQkFBMkI7Ozs7SUFHL0MsYUFBYSxFQUFFLHNCQUFzQjs7OztJQUdyQyxXQUFXLEVBQUUsb0JBQW9COzs7O0lBR2pDLFNBQVMsRUFBRSxrQkFBa0I7Ozs7SUFHN0IsZ0JBQWdCLEVBQUUseUJBQXlCOzs7O0lBRzNDLFNBQVMsRUFBRSxrQkFBa0I7Ozs7SUFHN0IsS0FBSyxFQUFFLGNBQWM7Q0FDdEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGFycmF5T2JqZWN0VG9Dc3ZGb3JtYXR0ZXIgfSBmcm9tICcuL2FycmF5T2JqZWN0VG9Dc3ZGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBhcnJheVRvQ3N2Rm9ybWF0dGVyIH0gZnJvbSAnLi9hcnJheVRvQ3N2Rm9ybWF0dGVyJztcclxuaW1wb3J0IHsgYm9sZEZvcm1hdHRlciB9IGZyb20gJy4vYm9sZEZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGNoZWNrYm94Rm9ybWF0dGVyIH0gZnJvbSAnLi9jaGVja2JveEZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGNoZWNrbWFya0Zvcm1hdHRlciB9IGZyb20gJy4vY2hlY2ttYXJrRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgY29sbGVjdGlvbkZvcm1hdHRlciB9IGZyb20gJy4vY29sbGVjdGlvbkZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGNvbGxlY3Rpb25FZGl0b3JGb3JtYXR0ZXIgfSBmcm9tICcuL2NvbGxlY3Rpb25FZGl0b3JGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBjb21wbGV4T2JqZWN0Rm9ybWF0dGVyIH0gZnJvbSAnLi9jb21wbGV4T2JqZWN0Rm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZGF0ZUlzb0Zvcm1hdHRlciB9IGZyb20gJy4vZGF0ZUlzb0Zvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRhdGVUaW1lSXNvRm9ybWF0dGVyIH0gZnJvbSAnLi9kYXRlVGltZUlzb0Zvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRhdGVUaW1lSXNvQW1QbUZvcm1hdHRlciB9IGZyb20gJy4vZGF0ZVRpbWVJc29BbVBtRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZGF0ZVRpbWVVc0FtUG1Gb3JtYXR0ZXIgfSBmcm9tICcuL2RhdGVUaW1lVXNBbVBtRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZGF0ZVRpbWVVc0Zvcm1hdHRlciB9IGZyb20gJy4vZGF0ZVRpbWVVc0Zvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRhdGVUaW1lU2hvcnRJc29Gb3JtYXR0ZXIgfSBmcm9tICcuL2RhdGVUaW1lU2hvcnRJc29Gb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBkYXRlVGltZVNob3J0VXNGb3JtYXR0ZXIgfSBmcm9tICcuL2RhdGVUaW1lU2hvcnRVc0Zvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRhdGVVc0Zvcm1hdHRlciB9IGZyb20gJy4vZGF0ZVVzRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZGVjaW1hbEZvcm1hdHRlciB9IGZyb20gJy4vZGVjaW1hbEZvcm1hdHRlcic7XHJcbmltcG9ydCB7IGRlbGV0ZUljb25Gb3JtYXR0ZXIgfSBmcm9tICcuL2RlbGV0ZUljb25Gb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBkb2xsYXJDb2xvcmVkQm9sZEZvcm1hdHRlciB9IGZyb20gJy4vZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBkb2xsYXJDb2xvcmVkRm9ybWF0dGVyIH0gZnJvbSAnLi9kb2xsYXJDb2xvcmVkRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgZG9sbGFyRm9ybWF0dGVyIH0gZnJvbSAnLi9kb2xsYXJGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBlZGl0SWNvbkZvcm1hdHRlciB9IGZyb20gJy4vZWRpdEljb25Gb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBoeXBlcmxpbmtGb3JtYXR0ZXIgfSBmcm9tICcuL2h5cGVybGlua0Zvcm1hdHRlcic7XHJcbmltcG9ydCB7IGh5cGVybGlua1VyaVByZWZpeEZvcm1hdHRlciB9IGZyb20gJy4vaHlwZXJsaW5rVXJpUHJlZml4Rm9ybWF0dGVyJztcclxuaW1wb3J0IHsgaW5mb0ljb25Gb3JtYXR0ZXIgfSBmcm9tICcuL2luZm9JY29uRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgbG93ZXJjYXNlRm9ybWF0dGVyIH0gZnJvbSAnLi9sb3dlcmNhc2VGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBtYXNrRm9ybWF0dGVyIH0gZnJvbSAnLi9tYXNrRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgbXVsdGlwbGVGb3JtYXR0ZXIgfSBmcm9tICcuL211bHRpcGxlRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgcGVyY2VudEZvcm1hdHRlciB9IGZyb20gJy4vcGVyY2VudEZvcm1hdHRlcic7XHJcbmltcG9ydCB7IHBlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlciB9IGZyb20gJy4vcGVyY2VudENvbXBsZXRlQmFyRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgcGVyY2VudENvbXBsZXRlRm9ybWF0dGVyIH0gZnJvbSAnLi9wZXJjZW50Q29tcGxldGVGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBwZXJjZW50U3ltYm9sRm9ybWF0dGVyIH0gZnJvbSAnLi9wZXJjZW50U3ltYm9sRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgcHJvZ3Jlc3NCYXJGb3JtYXR0ZXIgfSBmcm9tICcuL3Byb2dyZXNzQmFyRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgdHJhbnNsYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi90cmFuc2xhdGVGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyB0cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyIH0gZnJvbSAnLi90cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgdXBwZXJjYXNlRm9ybWF0dGVyIH0gZnJvbSAnLi91cHBlcmNhc2VGb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyB5ZXNOb0Zvcm1hdHRlciB9IGZyb20gJy4veWVzTm9Gb3JtYXR0ZXInO1xyXG5cclxuLyoqIFByb3ZpZGVzIGEgbGlzdCBvZiBkaWZmZXJlbnQgRm9ybWF0dGVycyB0aGF0IHdpbGwgY2hhbmdlIHRoZSBjZWxsIHZhbHVlIGRpc3BsYXllZCBpbiB0aGUgVUkgKi9cclxuZXhwb3J0IGNvbnN0IEZvcm1hdHRlcnMgPSB7XHJcbiAgLyoqXHJcbiAgICogVGFrZXMgYW4gYXJyYXkgb2YgY29tcGxleCBvYmplY3RzIGNvbnZlcnRzIGl0IHRvIGEgY29tbWEgZGVsaW1pdGVkIHN0cmluZy5cclxuICAgKiBSZXF1aXJlcyB0byBwYXNzIGFuIGFycmF5IG9mIFwicHJvcGVydHlOYW1lc1wiIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiB0aGUgZ2VuZXJpYyBcInBhcmFtc1wiIHByb3BlcnR5XHJcbiAgICogRm9yIGV4YW1wbGUsIGlmIHdlIGhhdmUgYW4gYXJyYXkgb2YgdXNlciBvYmplY3RzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydHkgb2YgZmlyc3ROYW1lICYgbGFzdE5hbWUgdGhlbiB3ZSBuZWVkIHRvIHBhc3MgaW4geW91ciBjb2x1bW4gZGVmaW5pdGlvbjo6XHJcbiAgICogeyBwYXJhbXM6IHsgcHJvcGVydHlOYW1lczogWydmaXJ0TmFtZSddIH19XHJcbiAgICovXHJcbiAgYXJyYXlPYmplY3RUb0NzdjogYXJyYXlPYmplY3RUb0NzdkZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGFuIGFycmF5IG9mIHN0cmluZyBhbmQgY29udmVydHMgaXQgdG8gYSBjb21tYSBkZWxpbWl0ZWQgc3RyaW5nICovXHJcbiAgYXJyYXlUb0NzdjogYXJyYXlUb0NzdkZvcm1hdHRlcixcclxuXHJcbiAgLyoqIHNob3cgdmFsdWUgaW4gYm9sZCBmb250IHdlaWdodCBhcyB3ZWxsICovXHJcbiAgYm9sZDogYm9sZEZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFdoZW4gdmFsdWUgaXMgZmlsbGVkICh0cnVlKSwgaXQgd2lsbCBkaXNwbGF5IGEgY2hlY2tib3ggVW5pY29kZSBpY29uICovXHJcbiAgY2hlY2tib3g6IGNoZWNrYm94Rm9ybWF0dGVyLFxyXG5cclxuICAvKiogV2hlbiB2YWx1ZSBpcyBmaWxsZWQgKHRydWUpLCBpdCB3aWxsIGRpc3BsYXkgYSBGb250LUF3ZXNvbWUgaWNvbiAoZmEtY2hlY2spICovXHJcbiAgY2hlY2ttYXJrOiBjaGVja21hcmtGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIGNvbXBsZXggZGF0YSBvYmplY3QgYW5kIHJldHVybiB0aGUgZGF0YSB1bmRlciB0aGF0IHByb3BlcnR5IChmb3IgZXhhbXBsZTogXCJ1c2VyLmZpcnN0TmFtZVwiIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBuYW1lIFwiSm9oblwiKSAqL1xyXG4gIGNvbXBsZXhPYmplY3Q6IGNvbXBsZXhPYmplY3RGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIExvb2tzIHVwIHZhbHVlcyBmcm9tIHRoZSBjb2x1bW5EZWZpbml0aW9uLnBhcmFtcy5jb2xsZWN0aW9uIHByb3BlcnR5IGFuZCBkaXNwbGF5cyB0aGUgbGFiZWwgaW4gQ1NWIG9yIHN0cmluZyBmb3JtYXRcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIC8vIHRoZSBncmlkIHdpbGwgZGlzcGxheSAnZm9vJyBhbmQgJ2JhcicgYW5kIG5vdCAxIGFuZCAyIGZyb20geW91ciBkYXRhc2V0XHJcbiAgICogeyBwYXJhbXM6IHsgY29sbGVjdGlvbjogW3sgdmFsdWU6IDEsIGxhYmVsOiAnZm9vJ30sIHt2YWx1ZTogMiwgbGFiZWw6ICdiYXInIH1dIH19XHJcbiAgICogY29uc3QgZGF0YXNldCA9IFt7IHZhbHVlOiAxIH0seyB2YWx1ZTogMiB9XTtcclxuICAgKi9cclxuICBjb2xsZWN0aW9uOiBjb2xsZWN0aW9uRm9ybWF0dGVyLFxyXG5cclxuICAvKipcclxuICAgKiBMb29rcyB1cCB2YWx1ZXMgZnJvbSB0aGUgY29sdW1uRGVmaW5pdGlvbi5lZGl0b3IuY29sbGVjdGlvbiBwcm9wZXJ0eSBhbmQgZGlzcGxheXMgdGhlIGxhYmVsIGluIENTViBvciBzdHJpbmcgZm9ybWF0XHJcbiAgICogQGV4YW1wbGVcclxuICAgKiAvLyB0aGUgZ3JpZCB3aWxsIGRpc3BsYXkgJ2ZvbycgYW5kICdiYXInIGFuZCBub3QgMSBhbmQgMiBmcm9tIHlvdXIgZGF0YXNldFxyXG4gICAqIHsgcGFyYW1zOiB7IGNvbGxlY3Rpb246IFt7IHZhbHVlOiAxLCBsYWJlbDogJ2Zvbyd9LCB7dmFsdWU6IDIsIGxhYmVsOiAnYmFyJyB9XSB9fVxyXG4gICAqIGNvbnN0IGRhdGFzZXQgPSBbeyB2YWx1ZTogMSB9LHsgdmFsdWU6IDIgfV07XHJcbiAgICovXHJcbiAgY29sbGVjdGlvbkVkaXRvcjogY29sbGVjdGlvbkVkaXRvckZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIElTTyBEYXRlIGZvcm1hdCAqL1xyXG4gIGRhdGVJc286IGRhdGVJc29Gb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIERhdGUgb2JqZWN0IGFuZCBkaXNwbGF5cyBpdCBhcyBhbiBJU08gRGF0ZStUaW1lIGZvcm1hdCAqL1xyXG4gIGRhdGVUaW1lSXNvOiBkYXRlVGltZUlzb0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIElTTyBEYXRlK1RpbWUgKHdpdGhvdXQgc2Vjb25kcykgZm9ybWF0ICovXHJcbiAgZGF0ZVRpbWVTaG9ydElzbzogZGF0ZVRpbWVTaG9ydElzb0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIElTTyBEYXRlK1RpbWUrKGFtL3BtKSBmb3JtYXQgKi9cclxuICBkYXRlVGltZUlzb0FtUG06IGRhdGVUaW1lSXNvQW1QbUZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIFVTIERhdGUgZm9ybWF0ICovXHJcbiAgZGF0ZVVzOiBkYXRlVXNGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIERhdGUgb2JqZWN0IGFuZCBkaXNwbGF5cyBpdCBhcyBhbiBVUyBEYXRlK1RpbWUgZm9ybWF0ICovXHJcbiAgZGF0ZVRpbWVVczogZGF0ZVRpbWVVc0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIFVTIERhdGUrVGltZSAod2l0aG91dCBzZWNvbmRzKSBmb3JtYXQgKi9cclxuICBkYXRlVGltZVNob3J0VXM6IGRhdGVUaW1lU2hvcnRVc0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIFVTIERhdGUrVGltZSsoYW0vcG0pIGZvcm1hdCAqL1xyXG4gIGRhdGVUaW1lVXNBbVBtOiBkYXRlVGltZVVzQW1QbUZvcm1hdHRlcixcclxuXHJcbiAgLyoqIERpc3BsYXlzIGEgRm9udC1Bd2Vzb21lIGRlbGV0ZSBpY29uIChmYS10cmFzaCkgKi9cclxuICBkZWxldGVJY29uOiBkZWxldGVJY29uRm9ybWF0dGVyLFxyXG5cclxuICAvKipcclxuICAgKiBEaXNwbGF5IHRoZSB2YWx1ZSBhcyB4IGRlY2ltYWxzIGZvcm1hdHRlZCwgZGVmYXVsdHMgdG8gMiBkZWNpbWFscy5cclxuICAgKiBZb3UgY2FuIHBhc3MgXCJkZWNpbWFsUGxhY2VzXCIgb3IgXCJtaW5EZWNpbWFsUGxhY2VzXCIgYW5kL29yIFwibWF4RGVjaW1hbFBsYWNlc1wiIHRvIHRoZSBcInBhcmFtc1wiIHByb3BlcnR5LlxyXG4gICAqIEZvciBleGFtcGxlOjogYHsgZm9ybWF0dGVyOiBGb3JtYXR0ZXJzLmRlY2ltYWwsIHBhcmFtczogeyBkZWNpbWFsUGxhY2VzOiAzIH19YFxyXG4gICAqIFRoZSBwcm9wZXJ0eSBcImRlY2ltYWxQbGFjZXNcIiBpcyBhbiBhbGlhcyBvZiBcIm1pbkRlY2ltYWxQbGFjZXNcIlxyXG4gICAqL1xyXG4gIGRlY2ltYWw6IGRlY2ltYWxGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBEaXNwbGF5IHRoZSB2YWx1ZSBhcyAyIGRlY2ltYWxzIGZvcm1hdHRlZCB3aXRoIGRvbGxhciBzaWduICckJyBhdCB0aGUgZW5kIG9mIG9mIHRoZSB2YWx1ZSAqL1xyXG4gIGRvbGxhcjogZG9sbGFyRm9ybWF0dGVyLFxyXG5cclxuICAvKiogRGlzcGxheSB0aGUgdmFsdWUgYXMgMiBkZWNpbWFscyBmb3JtYXR0ZWQgd2l0aCBkb2xsYXIgc2lnbiAnJCcgYXQgdGhlIGVuZCBvZiBvZiB0aGUgdmFsdWUsIGNoYW5nZSBjb2xvciBvZiB0ZXh0IHRvIHJlZC9ncmVlbiBvbiBuZWdhdGl2ZS9wb3NpdGl2ZSB2YWx1ZSAqL1xyXG4gIGRvbGxhckNvbG9yZWQ6IGRvbGxhckNvbG9yZWRGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBEaXNwbGF5IHRoZSB2YWx1ZSBhcyAyIGRlY2ltYWxzIGZvcm1hdHRlZCB3aXRoIGRvbGxhciBzaWduICckJyBhdCB0aGUgZW5kIG9mIG9mIHRoZSB2YWx1ZSwgY2hhbmdlIGNvbG9yIG9mIHRleHQgdG8gcmVkL2dyZWVuIG9uIG5lZ2F0aXZlL3Bvc2l0aXZlIHZhbHVlLCBzaG93IGl0IGluIGJvbGQgZm9udCB3ZWlnaHQgYXMgd2VsbCAqL1xyXG4gIGRvbGxhckNvbG9yZWRCb2xkOiBkb2xsYXJDb2xvcmVkQm9sZEZvcm1hdHRlcixcclxuXHJcbiAgLyoqIERpc3BsYXlzIGEgRm9udC1Bd2Vzb21lIGVkaXQgaWNvbiAoZmEtcGVuY2lsKSAqL1xyXG4gIGVkaXRJY29uOiBlZGl0SWNvbkZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGFuIGh5cGVybGluayBjZWxsIHZhbHVlIGFuZCB0cmFuc2Zvcm1zIGl0IGludG8gYSByZWFsIGh5cGVybGluaywgZ2l2ZW4gdGhhdCB0aGUgdmFsdWUgc3RhcnRzIHdpdGggMSBvZiB0aGVzZSAoaHR0cHxmdHB8aHR0cHMpLiBUaGUgc3RydWN0dXJlIHdpbGwgYmUgXCI8YSBocmVmPVwiaHlwZXJsaW5rXCI+aHlwZXJsaW5rPC9hPlwiICovXHJcbiAgaHlwZXJsaW5rOiBoeXBlcmxpbmtGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhbiBoeXBlcmxpbmsgVVJJIHByZWZpeCAocGFzc2VkIGluIGNvbHVtbiBkZWZpbml0aW9uIFwicGFyYW1zLnVyaVByZWZpeFwiKSBhbmQgYWRkcyB0aGUgY2VsbCB2YWx1ZS4gVGhlIHN0cnVjdHVyZSB3aWxsIGJlIFwiPGEgaHJlZj1cInVyaVByZWZpeFwiPnZhbHVlPC9hPlwiICAqL1xyXG4gIGh5cGVybGlua1VyaVByZWZpeDogaHlwZXJsaW5rVXJpUHJlZml4Rm9ybWF0dGVyLFxyXG5cclxuICAvKiogRGlzcGxheXMgYSBGb250LUF3ZXNvbWUgZWRpdCBpY29uIChmYS1pbmZvLWNpcmNsZSkgKi9cclxuICBpbmZvSWNvbjogaW5mb0ljb25Gb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIHZhbHVlIGFuZCBkaXNwbGF5cyBpdCBhbGwgbG93ZXJjYXNlICovXHJcbiAgbG93ZXJjYXNlOiBsb3dlcmNhc2VGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKlxyXG4gICAqIFRha2VzIGEgdmFsdWUgZGlzcGxheSBpdCBhY2NvcmRpbmcgdG8gYSBtYXNrIHByb3ZpZGVkXHJcbiAgICogZS46IDEyMzQ1Njc4OTAgd2l0aCBtYXNrIFwiKDAwMCkgMDAwLTAwMDBcIiB3aWxsIGRpc3BsYXkgXCIoMTIzKSA0NTYtNzg5MFwiXHJcbiAgICovXHJcbiAgbWFzazogbWFza0Zvcm1hdHRlcixcclxuXHJcbiAgLyoqXHJcbiAgICogWW91IGNhbiBwaXBlIG11bHRpcGxlIGZvcm1hdHRlcnMgKGV4ZWN1dGVkIGluIHNlcXVlbmNlKSwgdXNlIHBhcmFtcyB0byBwYXNzIHRoZSBsaXN0IG9mIGZvcm1hdHRlcnMuXHJcbiAgICogUmVxdWlyZXMgdG8gcGFzcyBhbiBhcnJheSBvZiBcImZvcm1hdHRlcnNcIiBpbiB0aGUgY29sdW1uIGRlZmluaXRpb24gdGhlIGdlbmVyaWMgXCJwYXJhbXNcIiBwcm9wZXJ0eVxyXG4gICAqIEZvciBleGFtcGxlOjpcclxuICAgKiB7IGZpZWxkOiAndGl0bGUnLCBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMubXVsdGlwbGUsIHBhcmFtczogeyBmb3JtYXR0ZXJzOiBbIEZvcm1hdHRlcnMubG93ZXJjYXNlLCBGb3JtYXR0ZXJzLnVwcGVyY2FzZSBdIH1cclxuICAgKi9cclxuICBtdWx0aXBsZTogbXVsdGlwbGVGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIGNlbGwgdmFsdWUgbnVtYmVyIChiZXR3ZWVuIDAuMC0xLjApIGFuZCBkaXNwbGF5cyBhIHJlZCAoPDUwKSBvciBncmVlbiAoPj01MCkgYmFyICovXHJcbiAgcGVyY2VudDogcGVyY2VudEZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgY2VsbCB2YWx1ZSBudW1iZXIgKGJldHdlZW4gMC4wLTEwMCkgYW5kIGRpc3BsYXlzIGEgcmVkICg8NTApIG9yIGdyZWVuICg+PTUwKSBiYXIgKi9cclxuICBwZXJjZW50Q29tcGxldGU6IHBlcmNlbnRDb21wbGV0ZUZvcm1hdHRlcixcclxuXHJcbiAgLyoqIFRha2VzIGEgY2VsbCB2YWx1ZSBudW1iZXIgKGJldHdlZW4gMC0xMDApIGFuZCBkaXNwbGF5cyBCb290c3RyYXAgXCJwZXJjZW50LWNvbXBsZXRlLWJhclwiIGEgcmVkICg8MzApLCBzaWx2ZXIgKD4zMCAmIDw3MCkgb3IgZ3JlZW4gKD49NzApIGJhciAqL1xyXG4gIHBlcmNlbnRDb21wbGV0ZUJhcjogcGVyY2VudENvbXBsZXRlQmFyRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBjZWxsIHZhbHVlIG51bWJlciAoYmV0d2VlbiAwLTEwMCkgYW5kIGFkZCB0aGUgXCIlXCIgYWZ0ZXIgdGhlIG51bWJlciAqL1xyXG4gIHBlcmNlbnRTeW1ib2w6IHBlcmNlbnRTeW1ib2xGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIGNlbGwgdmFsdWUgbnVtYmVyIChiZXR3ZWVuIDAtMTAwKSBhbmQgZGlzcGxheXMgQm9vdHN0cmFwIFwicHJvZ3Jlc3MtYmFyXCIgYSByZWQgKDwzMCksIHNpbHZlciAoPjMwICYgPDcwKSBvciBncmVlbiAoPj03MCkgYmFyICovXHJcbiAgcHJvZ3Jlc3NCYXI6IHByb2dyZXNzQmFyRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBjZWxsIHZhbHVlIGFuZCB0cmFuc2xhdGVzIGl0IChpMThuKS4gUmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIFRyYW5zbGF0ZSBTZXJ2aWNlOjogYGkxOG46IHRoaXMudHJhbnNsYXRlICovXHJcbiAgdHJhbnNsYXRlOiB0cmFuc2xhdGVGb3JtYXR0ZXIsXHJcblxyXG4gIC8qKiBUYWtlcyBhIGJvb2xlYW4gdmFsdWUsIGNhc3QgaXQgdG8gdXBwZXJDYXNlIHN0cmluZyBhbmQgZmluYWxseSB0cmFuc2xhdGVzIGl0IChpMThuKS4gKi9cclxuICB0cmFuc2xhdGVCb29sZWFuOiB0cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSB2YWx1ZSBhbmQgZGlzcGxheXMgaXQgYWxsIHVwcGVyY2FzZSAqL1xyXG4gIHVwcGVyY2FzZTogdXBwZXJjYXNlRm9ybWF0dGVyLFxyXG5cclxuICAvKiogVGFrZXMgYSBib29sZWFuIHZhbHVlIGFuZCBkaXNwbGF5IGEgc3RyaW5nICdZZXMnIG9yICdObycgKi9cclxuICB5ZXNObzogeWVzTm9Gb3JtYXR0ZXJcclxufTtcclxuIl19
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const FieldType = {
    unknown: 0,
    string: 1,
    boolean: 2,
    integer: 3,
    float: 4,
    /** number includes Integer and Float */
    number: 5,
    /** new Date(), javascript Date object */
    date: 6,
    /** Format: 'YYYY-MM-DD' => 2001-01-01 */
    dateIso: 7,
    /** Format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' => 2001-01-01T14:00:00.123Z */
    dateUtc: 8,
    /** new Date(), javacript Date Object with Time */
    dateTime: 9,
    /** Format: 'YYYY-MM-DD HH:mm:ss' => 2001-01-01 14:01:01 */
    dateTimeIso: 10,
    /** Format: 'YYYY-MM-DD h:mm:ss a' => 2001-01-01 11:01:01 pm */
    dateTimeIsoAmPm: 11,
    /** Format: 'YYYY-MM-DD h:mm:ss A' => 2001-01-01 11:01:01 PM */
    dateTimeIsoAM_PM: 12,
    /** Format: 'YYYY-MM-DD HH:mm' => 2001-01-01 14:01 */
    dateTimeShortIso: 13,
    /** Format: 'MM/DD/YYYY' => 02/28/2001 */
    dateUs: 14,
    /** Format: 'M/D/YY' => 2/28/12 */
    dateUsShort: 15,
    /** Format: 'MM/DD/YYYY HH:mm' => 02/28/2001 13:01 */
    dateTimeShortUs: 16,
    /** Format: 'MM/DD/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
    dateTimeUs: 17,
    /** Format: 'MM/DD/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
    dateTimeUsAmPm: 18,
    /** Format: 'MM/DD/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
    dateTimeUsAM_PM: 19,
    /** Format: 'M/D/YY H:m:s' => 2/28/14 14:1:2 */
    dateTimeUsShort: 20,
    /** Format: 'M/D/YY h:m:s a' => 2/28/14 1:2:10 pm */
    dateTimeUsShortAmPm: 21,
    /** Format: 'M/D/YY h:m:s A' => 2/28/14 14:1:1 PM */
    dateTimeUsShortAM_PM: 22,
};
export { FieldType };
FieldType[FieldType.unknown] = 'unknown';
FieldType[FieldType.string] = 'string';
FieldType[FieldType.boolean] = 'boolean';
FieldType[FieldType.integer] = 'integer';
FieldType[FieldType.float] = 'float';
FieldType[FieldType.number] = 'number';
FieldType[FieldType.date] = 'date';
FieldType[FieldType.dateIso] = 'dateIso';
FieldType[FieldType.dateUtc] = 'dateUtc';
FieldType[FieldType.dateTime] = 'dateTime';
FieldType[FieldType.dateTimeIso] = 'dateTimeIso';
FieldType[FieldType.dateTimeIsoAmPm] = 'dateTimeIsoAmPm';
FieldType[FieldType.dateTimeIsoAM_PM] = 'dateTimeIsoAM_PM';
FieldType[FieldType.dateTimeShortIso] = 'dateTimeShortIso';
FieldType[FieldType.dateUs] = 'dateUs';
FieldType[FieldType.dateUsShort] = 'dateUsShort';
FieldType[FieldType.dateTimeShortUs] = 'dateTimeShortUs';
FieldType[FieldType.dateTimeUs] = 'dateTimeUs';
FieldType[FieldType.dateTimeUsAmPm] = 'dateTimeUsAmPm';
FieldType[FieldType.dateTimeUsAM_PM] = 'dateTimeUsAM_PM';
FieldType[FieldType.dateTimeUsShort] = 'dateTimeUsShort';
FieldType[FieldType.dateTimeUsShortAmPm] = 'dateTimeUsShortAmPm';
FieldType[FieldType.dateTimeUsShortAM_PM] = 'dateTimeUsShortAM_PM';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRUeXBlLmVudW0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL21vZGVscy9maWVsZFR5cGUuZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFDRSxVQUFPO0lBQ1AsU0FBTTtJQUNOLFVBQU87SUFDUCxVQUFPO0lBQ1AsUUFBSztJQUVMLHdDQUF3QztJQUN4QyxTQUFNO0lBRU4seUNBQXlDO0lBQ3pDLE9BQUk7SUFFSix5Q0FBeUM7SUFDekMsVUFBTztJQUVQLHFFQUFxRTtJQUNyRSxVQUFPO0lBRVAsa0RBQWtEO0lBQ2xELFdBQVE7SUFFUiwyREFBMkQ7SUFDM0QsZUFBVztJQUVYLCtEQUErRDtJQUMvRCxtQkFBZTtJQUVmLCtEQUErRDtJQUMvRCxvQkFBZ0I7SUFFaEIscURBQXFEO0lBQ3JELG9CQUFnQjtJQUVoQix5Q0FBeUM7SUFDekMsVUFBTTtJQUVOLGtDQUFrQztJQUNsQyxlQUFXO0lBRVgscURBQXFEO0lBQ3JELG1CQUFlO0lBRWYsMkRBQTJEO0lBQzNELGNBQVU7SUFFVixnRUFBZ0U7SUFDaEUsa0JBQWM7SUFFZCxnRUFBZ0U7SUFDaEUsbUJBQWU7SUFFZiwrQ0FBK0M7SUFDL0MsbUJBQWU7SUFFZixvREFBb0Q7SUFDcEQsdUJBQW1CO0lBRW5CLG9EQUFvRDtJQUNwRCx3QkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBGaWVsZFR5cGUge1xyXG4gIHVua25vd24sXHJcbiAgc3RyaW5nLFxyXG4gIGJvb2xlYW4sXHJcbiAgaW50ZWdlcixcclxuICBmbG9hdCxcclxuXHJcbiAgLyoqIG51bWJlciBpbmNsdWRlcyBJbnRlZ2VyIGFuZCBGbG9hdCAqL1xyXG4gIG51bWJlcixcclxuXHJcbiAgLyoqIG5ldyBEYXRlKCksIGphdmFzY3JpcHQgRGF0ZSBvYmplY3QgKi9cclxuICBkYXRlLFxyXG5cclxuICAvKiogRm9ybWF0OiAnWVlZWS1NTS1ERCcgPT4gMjAwMS0wMS0wMSAqL1xyXG4gIGRhdGVJc28sXHJcblxyXG4gIC8qKiBGb3JtYXQ6ICdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onID0+IDIwMDEtMDEtMDFUMTQ6MDA6MDAuMTIzWiAqL1xyXG4gIGRhdGVVdGMsXHJcblxyXG4gIC8qKiBuZXcgRGF0ZSgpLCBqYXZhY3JpcHQgRGF0ZSBPYmplY3Qgd2l0aCBUaW1lICovXHJcbiAgZGF0ZVRpbWUsXHJcblxyXG4gIC8qKiBGb3JtYXQ6ICdZWVlZLU1NLUREIEhIOm1tOnNzJyA9PiAyMDAxLTAxLTAxIDE0OjAxOjAxICovXHJcbiAgZGF0ZVRpbWVJc28sXHJcblxyXG4gIC8qKiBGb3JtYXQ6ICdZWVlZLU1NLUREIGg6bW06c3MgYScgPT4gMjAwMS0wMS0wMSAxMTowMTowMSBwbSAqL1xyXG4gIGRhdGVUaW1lSXNvQW1QbSxcclxuXHJcbiAgLyoqIEZvcm1hdDogJ1lZWVktTU0tREQgaDptbTpzcyBBJyA9PiAyMDAxLTAxLTAxIDExOjAxOjAxIFBNICovXHJcbiAgZGF0ZVRpbWVJc29BTV9QTSxcclxuXHJcbiAgLyoqIEZvcm1hdDogJ1lZWVktTU0tREQgSEg6bW0nID0+IDIwMDEtMDEtMDEgMTQ6MDEgKi9cclxuICBkYXRlVGltZVNob3J0SXNvLFxyXG5cclxuICAvKiogRm9ybWF0OiAnTU0vREQvWVlZWScgPT4gMDIvMjgvMjAwMSAqL1xyXG4gIGRhdGVVcyxcclxuXHJcbiAgLyoqIEZvcm1hdDogJ00vRC9ZWScgPT4gMi8yOC8xMiAqL1xyXG4gIGRhdGVVc1Nob3J0LFxyXG5cclxuICAvKiogRm9ybWF0OiAnTU0vREQvWVlZWSBISDptbScgPT4gMDIvMjgvMjAwMSAxMzowMSAqL1xyXG4gIGRhdGVUaW1lU2hvcnRVcyxcclxuXHJcbiAgLyoqIEZvcm1hdDogJ01NL0REL1lZWVkgSEg6bW06c3MnID0+IDAyLzI4LzIwMDEgMTM6MDE6MDEgKi9cclxuICBkYXRlVGltZVVzLFxyXG5cclxuICAvKiogRm9ybWF0OiAnTU0vREQvWVlZWSBoaDptbTpzcyBhJyA9PiAwMi8yOC8yMDAxIDExOjAxOjAxIHBtICovXHJcbiAgZGF0ZVRpbWVVc0FtUG0sXHJcblxyXG4gIC8qKiBGb3JtYXQ6ICdNTS9ERC9ZWVlZIGhoOm1tOnNzIEEnID0+IDAyLzI4LzIwMDEgMTE6MDE6MDEgUE0gKi9cclxuICBkYXRlVGltZVVzQU1fUE0sXHJcblxyXG4gIC8qKiBGb3JtYXQ6ICdNL0QvWVkgSDptOnMnID0+IDIvMjgvMTQgMTQ6MToyICovXHJcbiAgZGF0ZVRpbWVVc1Nob3J0LFxyXG5cclxuICAvKiogRm9ybWF0OiAnTS9EL1lZIGg6bTpzIGEnID0+IDIvMjgvMTQgMToyOjEwIHBtICovXHJcbiAgZGF0ZVRpbWVVc1Nob3J0QW1QbSxcclxuXHJcbiAgLyoqIEZvcm1hdDogJ00vRC9ZWSBoOm06cyBBJyA9PiAyLzI4LzE0IDE0OjE6MSBQTSAqL1xyXG4gIGRhdGVUaW1lVXNTaG9ydEFNX1BNXHJcbn1cclxuIl19
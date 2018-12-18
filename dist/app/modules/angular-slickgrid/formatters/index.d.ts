/** Provides a list of different Formatters that will change the cell value displayed in the UI */
export declare const Formatters: {
    /**
     * Takes an array of complex objects converts it to a comma delimited string.
     * Requires to pass an array of "propertyNames" in the column definition the generic "params" property
     * For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition::
     * { params: { propertyNames: ['firtName'] }}
     */
    arrayObjectToCsv: import("../models/formatter.interface").Formatter;
    /** Takes an array of string and converts it to a comma delimited string */
    arrayToCsv: import("../models/formatter.interface").Formatter;
    /** show value in bold font weight as well */
    bold: import("../models/formatter.interface").Formatter;
    /** When value is filled (true), it will display a checkbox Unicode icon */
    checkbox: import("../models/formatter.interface").Formatter;
    /** When value is filled (true), it will display a Font-Awesome icon (fa-check) */
    checkmark: import("../models/formatter.interface").Formatter;
    /** Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John") */
    complexObject: import("../models/formatter.interface").Formatter;
    /**
     * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
     * @example
     * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
     * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
     * const dataset = [{ value: 1 },{ value: 2 }];
     */
    collection: import("../models/formatter.interface").Formatter;
    /**
     * Looks up values from the columnDefinition.editor.collection property and displays the label in CSV or string format
     * @example
     * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
     * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
     * const dataset = [{ value: 1 },{ value: 2 }];
     */
    collectionEditor: import("../models/formatter.interface").Formatter;
    /** Takes a Date object and displays it as an ISO Date format */
    dateIso: import("../models/formatter.interface").Formatter;
    /** Takes a Date object and displays it as an ISO Date+Time format */
    dateTimeIso: import("../models/formatter.interface").Formatter;
    /** Takes a Date object and displays it as an ISO Date+Time (without seconds) format */
    dateTimeShortIso: import("../models/formatter.interface").Formatter;
    /** Takes a Date object and displays it as an ISO Date+Time+(am/pm) format */
    dateTimeIsoAmPm: import("../models/formatter.interface").Formatter;
    /** Takes a Date object and displays it as an US Date format */
    dateUs: import("../models/formatter.interface").Formatter;
    /** Takes a Date object and displays it as an US Date+Time format */
    dateTimeUs: import("../models/formatter.interface").Formatter;
    /** Takes a Date object and displays it as an US Date+Time (without seconds) format */
    dateTimeShortUs: import("../models/formatter.interface").Formatter;
    /** Takes a Date object and displays it as an US Date+Time+(am/pm) format */
    dateTimeUsAmPm: import("../models/formatter.interface").Formatter;
    /** Displays a Font-Awesome delete icon (fa-trash) */
    deleteIcon: import("../models/formatter.interface").Formatter;
    /**
     * Display the value as x decimals formatted, defaults to 2 decimals.
     * You can pass "decimalPlaces" or "minDecimalPlaces" and/or "maxDecimalPlaces" to the "params" property.
     * For example:: `{ formatter: Formatters.decimal, params: { decimalPlaces: 3 }}`
     * The property "decimalPlaces" is an alias of "minDecimalPlaces"
     */
    decimal: import("../models/formatter.interface").Formatter;
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value */
    dollar: import("../models/formatter.interface").Formatter;
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value */
    dollarColored: import("../models/formatter.interface").Formatter;
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well */
    dollarColoredBold: import("../models/formatter.interface").Formatter;
    /** Displays a Font-Awesome edit icon (fa-pencil) */
    editIcon: import("../models/formatter.interface").Formatter;
    /** Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https). The structure will be "<a href="hyperlink">hyperlink</a>" */
    hyperlink: import("../models/formatter.interface").Formatter;
    /** Takes an hyperlink URI prefix (passed in column definition "params.uriPrefix") and adds the cell value. The structure will be "<a href="uriPrefix">value</a>"  */
    hyperlinkUriPrefix: import("../models/formatter.interface").Formatter;
    /** Displays a Font-Awesome edit icon (fa-info-circle) */
    infoIcon: import("../models/formatter.interface").Formatter;
    /** Takes a value and displays it all lowercase */
    lowercase: import("../models/formatter.interface").Formatter;
    /**
     * Takes a value display it according to a mask provided
     * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
     */
    mask: import("../models/formatter.interface").Formatter;
    /**
     * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters.
     * Requires to pass an array of "formatters" in the column definition the generic "params" property
     * For example::
     * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
     */
    multiple: import("../models/formatter.interface").Formatter;
    /** Takes a cell value number (between 0.0-1.0) and displays a red (<50) or green (>=50) bar */
    percent: import("../models/formatter.interface").Formatter;
    /** Takes a cell value number (between 0.0-100) and displays a red (<50) or green (>=50) bar */
    percentComplete: import("../models/formatter.interface").Formatter;
    /** Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
    percentCompleteBar: import("../models/formatter.interface").Formatter;
    /** Takes a cell value number (between 0-100) and add the "%" after the number */
    percentSymbol: import("../models/formatter.interface").Formatter;
    /** Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
    progressBar: import("../models/formatter.interface").Formatter;
    /** Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `i18n: this.translate */
    translate: import("../models/formatter.interface").Formatter;
    /** Takes a boolean value, cast it to upperCase string and finally translates it (i18n). */
    translateBoolean: import("../models/formatter.interface").Formatter;
    /** Takes a value and displays it all uppercase */
    uppercase: import("../models/formatter.interface").Formatter;
    /** Takes a boolean value and display a string 'Yes' or 'No' */
    yesNo: import("../models/formatter.interface").Formatter;
};

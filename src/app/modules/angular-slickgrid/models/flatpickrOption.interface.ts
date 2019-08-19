import { Locale } from 'flatpickr/dist/types/locale';

export interface FlatpickrOption {
  /** defaults to "F j, Y",	exactly the same as date format, but for the altInput field */
  altFormat?: string;

  /** default to false, show the user a readable date (as per altFormat), but return something totally different to the server. */
  altInput?: boolean;

  /** defaults to false, allows the user to enter a date directly input the input field. By default, direct entry is disabled. */
  allowInput?: boolean;

  /** This class will be added to the input element created by the altInput option.  Note that altInput already inherits classes from the original input. */
  altInputClass?: string;

  /** Instead of body, appends the calendar to the specified node instead*. */
  appendTo?: HTMLElement;

  /** defaults to "F j, Y", defines how the date will be formatted in the aria-label for calendar days, using the same tokens as dateFormat. If you change this, you should choose a value that will make sense if a screen reader reads it out loud. */
  ariaDateFormat?: string;

  /** defaults to true, whether clicking on the input should open the picker. You could disable this if you wish to open the calendar manually with.open() */
  clickOpens?: boolean;

  /** defaults to false, closes the date picker after selecting a date */
  closeOnSelect?: boolean;

  /** defaults to "Y-m-d", a string of characters which are used to define how the date will be displayed in the input box. The supported characters are defined in the table below. */
  dateFormat?: string;

  /**
   * Sets the initial selected date(s).
   * If you're using mode?: "multiple" or a range calendar supply an Array of Date objects or an Array of date strings which follow your dateFormat.
   * Otherwise, you can supply a single Date object or a date string.
   */
  defaultDate?: string | string[];

  /** defaults to 12, initial value of the hour element. */
  defaultHour?: number;

  /** defaults to 0, initial value of the minute element. */
  defaultMinute?: number;

  /** defaults to 0, initial value of the seconds element. */
  defaultSeconds?: number;

  /** See Disabling dates */
  disable?: any[];

  /**
   * defaults to false.
   * Set disableMobile to true to always use the non-native picker.
   * By default, flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
   */
  disableMobile?: boolean;

  /** See Enabling dates */
  enable?: any[];

  /** defaults to false, enables seconds in the time picker. */
  enableSeconds?: boolean;

  /** defaults to false, enables time picker */
  enableTime?: boolean;

  /** Allows using a custom date formatting function instead of the built-in handling for date formats using dateFormat, altFormat, etc. */
  formatDate?: (dateObj: Date, format: string, locale: Locale) => string;

  /** defaults to 1, adjusts the step for the hour input (incl. scrolling) */
  hourIncrement?: number;

  /** defaults to false, displays the calendar inline */
  inline?: boolean;

  /** provide a custom set of locales */
  locale?: any;

  /** The maximum date that a user can pick to (inclusive). */
  maxDate?: string | Date;

  /** The minimum date that a user can start picking from (inclusive). */
  minDate?: string | Date;

  /** defaults to 5, adjusts the step for the minute input (incl. scrolling) */
  minuteIncrement?: number;

  /** defaults to "dropdown", the selector type to change the month */
  monthSelectorType?: 'dropdown' | 'static';

  /** defaults to single, what mode to use the picker */
  mode?: 'single' | 'multiple' | 'range';

  /** defaults to ">", HTML for the arrow icon, used to switch months. */
  nextArrow?: string;

  /** defaults to false, Hides the day selection in calendar. Use it along with enableTime to create a time picker. */
  noCalendar?: boolean;

  /** defaults to false, function that expects a date string and must return a Date object */
  parseDate?: (date: Date, format: string) => void;

  /** Provide external flatpickr plugin(s) */
  plugins?: any | any[];

  /** Where the calendar is rendered relative to the input. */
  position?: 'auto' | 'above' | 'below';

  /** defaults to "<"", HTML for the left arrow icon. */
  prevArrow?: string;

  /** defaults to false, show the month using the shorthand version (ie, Sep instead of September). */
  shorthandCurrentMonth?: boolean;

  /** defaults to 1, number of months to show */
  showMonths?: number;

  /** defaults to false, position the calendar inside the wrapper and next to the input element*. */
  static?: boolean;

  /** defaults to false, displays time picker in 24 hour mode without AM/PM selection when enabled. */
  time_24hr?: boolean;

  /** defaults to false, enables display of week numbers in calendar. */
  weekNumbers?: boolean;

  /** defaults to false, custom elements and input groups */
  wrap?: boolean;

  // --
  // Events
  // -----------------

  /** Function(s) to trigger on every date selection. See Events API */
  onChange?: (selectedDates: Date[] | Date, dateStr: string, instance: any) => void;

  /** Function(s) to trigger on every time the calendar is closed. See Events API */
  onClose?: (selectedDates: Date[] | Date, dateStr: string, instance: any) => void;

  /** Function(s) to trigger on every time the calendar gets created. See Events API */
  onDayCreate?: (date: Date | Date[]) => void;

  /** Function(s) to trigger when the date picker gets drestroyed. See Events API */
  onDestroy?: (day: Date) => void;

  /** Function(s) to trigger when the date picker gets drestroyed. See Events API */
  onKeyDown?: (selectedDates: Date[] | Date, dateStr: string, instance: any) => void;

  /** Function(s) to trigger on every time the month changes. See Events API */
  onMonthChange?: (selectedDates: Date[] | Date, dateStr: string, instance: any) => void;

  /** Function(s) to trigger on every time the calendar is opened. See Events API */
  onOpen?: (selectedDates: Date[] | Date, dateStr: string, instance: any) => void;

  /** Function to trigger when the calendar is ready. See Events API */
  onReady?: () => void;

  /** Function(s) to trigger on every time the year changes. See Events API */
  onValueUpdate?: (selectedDates: Date[] | Date, dateStr: string, instance: any) => void;

  /** Function(s) to trigger on every time the year changes. See Events API */
  onYearChange?: (selectedDates: Date[] | Date, dateStr: string, instance: any) => void;
}

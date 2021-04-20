import { Formatters } from '../formatters/index';
import { Column, Formatter } from '../models/index';

/**
 * Automatically add a Custom Formatter on all column definitions that have an Editor.
 * Instead of manually adding a Custom Formatter on every column definitions that are editables, let's ask the system to do it in an easier automated way.
 * It will loop through all column definitions and add an Custom Editor Formatter when necessary,
 * also note that if there's already a Formatter on the column definition it will automatically use the Formatters.multiple and add the custom formatter into the `params: formatters: {}}`
 */
export function autoAddEditorFormatterToColumnsWithEditor(columnDefinitions: Column[], customEditableFormatter: Formatter) {
  if (Array.isArray(columnDefinitions)) {
    for (const columnDef of columnDefinitions) {
      if (columnDef.editor) {
        if (columnDef.formatter && columnDef.formatter !== Formatters.multiple) {
          const prevFormatter = columnDef.formatter;
          columnDef.formatter = Formatters.multiple;
          columnDef.params = { ...columnDef.params, formatters: [prevFormatter, customEditableFormatter] };
        } else if (columnDef.formatter && columnDef.formatter === Formatters.multiple && columnDef.params) {
          columnDef.params.formatters = [...columnDef.params.formatters, customEditableFormatter];
        } else {
          columnDef.formatter = customEditableFormatter;
        }
      }
    }
  }
}

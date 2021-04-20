import { Column, Editors, Formatter, Formatters } from '@slickgrid-universal/common';
import { autoAddEditorFormatterToColumnsWithEditor } from '../slick-vanilla-utilities';


describe('Slick-Vanilla-Grid-Bundle / Utilies', () => {
  describe('autoAddEditorFormatterToColumnsWithEditor', () => {
    let columnDefinitions: Column[];
    const customEditableInputFormatter: Formatter = (_row, _cell, value, columnDef) => {
      const isEditableLine = !!columnDef.editor;
      value = (value === null || value === undefined) ? '' : value;
      return isEditableLine ? `<div class="editing-field">${value}</div>` : value;
    };

    beforeEach(() => {
      columnDefinitions = [
        { id: 'firstName', field: 'firstName', editor: { model: Editors.text } },
        { id: 'lastName', field: 'lastName', editor: { model: Editors.text }, formatter: Formatters.multiple, params: { formatters: [Formatters.italic, Formatters.bold] } },
        { id: 'age', field: 'age', type: 'number', formatter: Formatters.multiple },
        { id: 'address', field: 'address.street', editor: { model: Editors.longText }, formatter: Formatters.complexObject },
        { id: 'zip', field: 'address.zip', type: 'number', formatter: Formatters.complexObject },
      ];
    });

    it('should have custom editor formatter with correct structure', () => {
      autoAddEditorFormatterToColumnsWithEditor(columnDefinitions, customEditableInputFormatter);

      expect(columnDefinitions).toEqual([
        { id: 'firstName', field: 'firstName', editor: { model: Editors.text }, formatter: customEditableInputFormatter },
        { id: 'lastName', field: 'lastName', editor: { model: Editors.text }, formatter: Formatters.multiple, params: { formatters: [Formatters.italic, Formatters.bold, customEditableInputFormatter] } },
        { id: 'age', field: 'age', type: 'number', formatter: Formatters.multiple },
        { id: 'address', field: 'address.street', editor: { model: Editors.longText }, formatter: Formatters.multiple, params: { formatters: [Formatters.complexObject, customEditableInputFormatter] } },
        { id: 'zip', field: 'address.zip', type: 'number', formatter: Formatters.complexObject },
      ]);
    });
  });
});
import $ from 'jquery';

// using external js modules in Angular
declare var jquery: any;
declare var $: any;

export const multiSelectFilterPostCreation = (columnDef, listTerm, callback) => {
  $('select.ms-filter').each((index, currentElm) => {
    const elmMultiSelect = $(currentElm).multipleSelect({
      container: 'body',
      minimumCountSelected: 2,
      countSelected: '# de % sélectionné',
      allSelected: `Tout sélectionnés`,
      selectAllText: `Sélectionner tout`,
      onClose: () => {
        const selectedItems = elmMultiSelect.multipleSelect('getSelects');
        callback(undefined, { columnDef, operator: 'IN', listTerm: selectedItems });
      }
    });

    // run a query if user has some default search terms
    if (listTerm && Array.isArray(listTerm)) {
      for (let k = 0, ln = listTerm.length; k < ln; k++) {
        listTerm[k] = (listTerm[k] || '') + ''; // make sure all search terms are strings
      }
      elmMultiSelect.multipleSelect('setSelects', listTerm);
      callback(undefined, { columnDef, operator: 'IN', listTerm });
    }
  });
};

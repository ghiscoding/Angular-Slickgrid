/// <reference types="Cypress" />

describe('Example 17 - Row Move & Checkbox Selector Selector Plugins', () => {
  const fullTitles = ['', '', 'Title', 'Duration', '% Complete', 'Start', 'Finish', 'Completed'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/rowmove`);
    cy.get('h2').should('contain', 'Example 17: Row Move & Checkbox Selector');
  });


  it('should have exact Column Titles in the grid', () => {
    cy.get('#grid17')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should drag opened Row Detail to another position in the grid', () => {
    cy.get('[style="top:35px"] > .slick-cell.cell-reorder').as('moveIconTask1');
    cy.get('[style="top:105px"] > .slick-cell.cell-reorder').as('moveIconTask3');

    cy.get('@moveIconTask3').should('have.length', 1);

    cy.get('@moveIconTask3')
      .trigger('mousedown', { button: 0, force: true })
      .trigger('mousemove', 'bottomRight');

    cy.get('@moveIconTask1')
      .trigger('mousemove', 'bottomRight')
      .trigger('mouseup', 'bottomRight', { force: true });

    cy.get('input[type="checkbox"]:checked')
      .should('have.length', 0);
  });

  it('should expect row to be moved to another row index', () => {
    cy.get('.slick-viewport-top.slick-viewport-left')
      .scrollTo('top');

    cy.get('[style="top:0px"] > .slick-cell:nth(2)').should('contain', 'Task 0');
    cy.get('[style="top:35px"] > .slick-cell:nth(2)').should('contain', 'Task 1');
    cy.get('[style="top:70px"] > .slick-cell:nth(2)').should('contain', 'Task 3');
    cy.get('[style="top:105px"] > .slick-cell:nth(2)').should('contain', 'Task 2');
    cy.get('[style="top:140px"] > .slick-cell:nth(2)').should('contain', 'Task 4');

    cy.get('input[type="checkbox"]:checked')
      .should('have.length', 0);
  });

  it('should select 2 rows (Task 3,4), then move row and expect the 2 rows to still be selected without any others', () => {
    cy.get('[style="top:70px"] > .slick-cell:nth(1)').click();
    cy.get('[style="top:140px"] > .slick-cell:nth(1)').click();

    cy.get('[style="top:70px"] > .slick-cell.cell-reorder').as('moveIconTask3');
    cy.get('[style="top:175px"] > .slick-cell.cell-reorder').as('moveIconTask5');

    cy.get('@moveIconTask3').should('have.length', 1);

    cy.get('@moveIconTask3')
      .trigger('mousedown', { button: 0, force: true })
      .trigger('mousemove', 'bottomRight');

    cy.get('@moveIconTask5')
      .trigger('mousemove', 'bottomRight')
      .trigger('mouseup', 'bottomRight', { force: true });

    cy.get('.slick-viewport-top.slick-viewport-left')
      .scrollTo('top');

    cy.get('[style="top:0px"] > .slick-cell:nth(2)').should('contain', 'Task 0');
    cy.get('[style="top:35px"] > .slick-cell:nth(2)').should('contain', 'Task 1');
    cy.get('[style="top:70px"] > .slick-cell:nth(2)').should('contain', 'Task 2');
    cy.get('[style="top:105px"] > .slick-cell:nth(2)').should('contain', 'Task 4');
    cy.get('[style="top:140px"] > .slick-cell:nth(2)').should('contain', 'Task 5');
    cy.get('[style="top:175px"] > .slick-cell:nth(2)').should('contain', 'Task 3');

    // Task 4 and 3 should be selected
    cy.get('input[type="checkbox"]:checked').should('have.length', 2);
    cy.get('[style="top:105px"] > .slick-cell:nth(1) input[type="checkbox"]:checked').should('have.length', 1);
    cy.get('[style="top:175px"] > .slick-cell:nth(1) input[type="checkbox"]:checked').should('have.length', 1);
  });

  it('should move "Duration" column to a different position in the grid', () => {
    const expectedTitles = ['', '', 'Title', '% Complete', 'Start', 'Finish', 'Duration', 'Completed', 'Title'];

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(3)')
      .should('contain', 'Duration')
      .trigger('mousedown', 'center', { which: 1 });

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(6)')
      .should('contain', 'Finish')
      .trigger('mousemove', 'bottomRight')
      .trigger('mouseup', 'bottomRight', { force: true });

    cy.get('#grid17')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(expectedTitles[index]));
  });

  it('should be able to hide "Duration" column', () => {
    const expectedTitles = ['', '', 'Title', '% Complete', 'Start', 'Finish', 'Completed', 'Title'];

    cy.get('[data-test="hide-duration-btn"]').click();

    cy.get('#grid17')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(expectedTitles[index]));
  });

  it('should be able to click disable Filters functionality button and expect no Filters', () => {
    const expectedTitles = ['', '', 'Title', '% Complete', 'Start', 'Finish', 'Completed', 'Title'];

    cy.get('[data-test="disable-filters-btn"]').click().click(); // even clicking twice should have same result

    cy.get('.slick-headerrow').should('not.be.visible');
    cy.get('.slick-headerrow-columns .slick-headerrow-column').should('have.length', 0);

    cy.get('#grid17')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(expectedTitles[index]));

    cy.get('[data-test="toggle-filtering-btn"]').click(); // show it back
  });

  it('should expect "Clear all Filters" command to be hidden in the Grid Menu', () => {
    const expectedFullHeaderMenuCommands = ['Clear all Filters', 'Clear all Sorting', 'Toggle Filter Row', 'Export to Excel'];

    cy.get('#grid17')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click({ force: true });

    cy.get('.slick-gridmenu-custom')
      .find('.slick-gridmenu-item')
      .each(($child, index) => {
        const commandTitle = $child.text();
        expect(commandTitle).to.eq(expectedFullHeaderMenuCommands[index]);

        // expect all Sorting commands to be hidden
        if (commandTitle === 'Clear all Filters' || commandTitle === 'Toggle Filter Row') {
          expect($child).to.be.visible;
        }
      });
  });

  it('should be able to toggle Filters functionality', () => {
    const expectedTitles = ['', '', 'Title', '% Complete', 'Start', 'Finish', 'Completed', 'Title'];

    cy.get('[data-test="toggle-filtering-btn"]').click(); // hide it

    cy.get('.slick-headerrow').should('not.be.visible');
    cy.get('.slick-headerrow-columns .slick-headerrow-column').should('have.length', 0);

    cy.get('#grid17')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(expectedTitles[index]));

    cy.get('[data-test="toggle-filtering-btn"]').click(); // show it
    cy.get('.slick-headerrow-columns .slick-headerrow-column').should('have.length', 7);

    cy.get('#grid17')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(expectedTitles[index]));
  });

  it('should be able to toggle Sorting functionality (disable) and expect all header menu Sorting commands to be hidden and also not show Sort hint while hovering a column', () => {
    const expectedFullHeaderMenuCommands = ['Sort Ascending', 'Sort Descending', '', 'Remove Filter', 'Remove Sort', 'Hide Column'];

    cy.get('.slick-sort-indicator').should('have.length.greaterThan', 0); // sort icon hints
    cy.get('[data-test="toggle-sorting-btn"]').click(); // disable it
    cy.get('.slick-sort-indicator').should('have.length', 0);

    cy.get('#grid17')
      .find('.slick-header-column:nth(5)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .children()
      .each(($child, index) => {
        const commandTitle = $child.text();
        expect(commandTitle).to.eq(expectedFullHeaderMenuCommands[index]);

        // expect all Sorting commands to be hidden
        if (commandTitle === 'Sort Ascending' || commandTitle === 'Sort Descending' || commandTitle === 'Remove Sort') {
          expect($child).not.to.be.visible;
        }
      });
  });

  it('should expect "Clear Sorting" command to be hidden in the Grid Menu', () => {
    const expectedFullHeaderMenuCommands = ['Clear all Filters', 'Clear all Sorting', 'Toggle Filter Row', 'Export to Excel'];

    cy.get('#grid17')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click();

    cy.get('.slick-gridmenu-custom')
      .find('.slick-gridmenu-item')
      .each(($child, index) => {
        const commandTitle = $child.text();
        expect(commandTitle).to.eq(expectedFullHeaderMenuCommands[index]);

        // expect all Sorting commands to be hidden
        if (commandTitle === 'Clear all Sorting') {
          expect($child).not.to.be.visible;
        }
      });
  });

  it('should be able to toggle Sorting functionality (re-enable) and expect all Sorting header menu commands to be hidden and also not show Sort hint while hovering a column', () => {
    const expectedFullHeaderMenuCommands = ['Sort Ascending', 'Sort Descending', '', 'Remove Filter', 'Remove Sort', 'Hide Column'];

    cy.get('.slick-sort-indicator').should('have.length', 0); // sort icon hints
    cy.get('[data-test="toggle-sorting-btn"]').click(); // enable it back
    cy.get('.slick-sort-indicator').should('have.length.greaterThan', 0);

    cy.get('#grid17')
      .find('.slick-header-column:nth(5)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .children()
      .each(($child, index) => {
        const commandTitle = $child.text();
        expect(commandTitle).to.eq(expectedFullHeaderMenuCommands[index]);
        expect($child).to.be.visible;
      });
  });

  it('should expect "Clear Sorting" command to be hidden in the Grid Menu', () => {
    const expectedFullHeaderMenuCommands = ['Clear all Filters', 'Clear all Sorting', 'Toggle Filter Row', 'Export to Excel'];

    cy.get('#grid17')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click();

    cy.get('.slick-gridmenu-custom')
      .find('.slick-gridmenu-item')
      .each(($child, index) => {
        const commandTitle = $child.text();
        expect(commandTitle).to.eq(expectedFullHeaderMenuCommands[index]);

        // expect all Sorting commands to be hidden
        if (commandTitle === 'Clear all Sorting') {
          expect($child).to.be.visible;
        }
      });
  });

  it('should be able to click disable Sorting functionality button and expect all Sorting commands to be hidden and also not show Sort hint while hovering a column', () => {
    const expectedFullHeaderMenuCommands = ['Sort Ascending', 'Sort Descending', '', 'Remove Filter', 'Remove Sort', 'Hide Column'];

    cy.get('.slick-sort-indicator').should('have.length.greaterThan', 0); // sort icon hints
    cy.get('[data-test="disable-sorting-btn"]').click().click(); // even clicking twice should have same result
    cy.get('.slick-sort-indicator').should('have.length', 0);

    cy.get('#grid17')
      .find('.slick-header-column:nth(5)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .children()
      .each(($child, index) => {
        const commandTitle = $child.text();
        expect(commandTitle).to.eq(expectedFullHeaderMenuCommands[index]);

        // expect all Sorting commands to be hidden
        if (commandTitle === 'Sort Ascending' || commandTitle === 'Sort Descending' || commandTitle === 'Remove Sort') {
          expect($child).not.to.be.visible;
        }
      });
  });

  it('should be able to click disable Filter functionality button and expect all Filter commands to be hidden and also not show Sort hint while hovering a column', () => {
    const expectedFullHeaderMenuCommands = ['Sort Ascending', 'Sort Descending', '', 'Remove Filter', 'Remove Sort', 'Hide Column'];

    cy.get('[data-test="disable-filters-btn"]').click().click(); // even clicking twice should have same result

    cy.get('#grid17')
      .find('.slick-header-column:nth(5)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .children()
      .each(($child, index) => {
        const commandTitle = $child.text();
        expect(commandTitle).to.eq(expectedFullHeaderMenuCommands[index]);

        // expect all Sorting commands to be hidden
        if (commandTitle === 'Remove Filter') {
          expect($child).not.to.be.visible;
        }
      });
  });

  it('should expect "Clear all Filters" command to be hidden in the Grid Menu', () => {
    const expectedFullHeaderMenuCommands = ['Clear all Filters', 'Clear all Sorting', 'Toggle Filter Row', 'Export to Excel'];

    cy.get('#grid17')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click();

    cy.get('.slick-gridmenu-custom')
      .find('.slick-gridmenu-item')
      .each(($child, index) => {
        const commandTitle = $child.text();
        expect(commandTitle).to.eq(expectedFullHeaderMenuCommands[index]);

        // expect all Sorting commands to be hidden
        if (commandTitle === 'Clear all Filters' || commandTitle === 'Toggle Filter Row') {
          expect($child).not.to.be.visible;
        }
      });
  });

  it('should open Column Picker and show the "Duration" column back to visible and expect it to have kept its position after toggling filter/sorting', () => {
    // first 2 cols are hidden but they do count as li item
    const expectedFullPickerTitles = ['', '', 'Title', '% Complete', 'Start', 'Finish', 'Duration', 'Completed'];

    cy.get('#grid17')
      .find('.slick-header-column')
      .first()
      .trigger('mouseover')
      .trigger('contextmenu')
      .invoke('show');

    cy.get('.slick-columnpicker')
      .find('.slick-columnpicker-list')
      .children()
      .each(($child, index) => {
        if (index < expectedFullPickerTitles.length) {
          expect($child.text()).to.eq(expectedFullPickerTitles[index]);
        }
      });

    cy.get('.slick-columnpicker')
      .find('.slick-columnpicker-list')
      .children('li:nth-child(7)')
      .children('label')
      .should('contain', 'Duration')
      .click();

    cy.get('#grid17')
      .get('.slick-columnpicker:visible')
      .find('span.close')
      .trigger('click')
      .click();

    cy.get('#grid17')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => {
        if (index <= 5) {
          expect($child.text()).to.eq(expectedFullPickerTitles[index]);
        }
      });
  });
});

/// <reference types="cypress" />
import moment from 'moment-mini';

function removeExtraSpaces(textS) {
  return `${textS}`.replace(/\s+/g, ' ').trim();
}

describe('Example 12: Localization (i18n)', () => {
  const fullEnglishTitles = ['', 'Title', 'Description', 'Duration', 'Start', 'Finish', 'Completed', 'Completed'];
  const fullFrenchTitles = ['', 'Titre', 'Description', 'Durée', 'Début', 'Fin', 'Terminé', 'Terminé'];

  beforeEach(() => {
    cy.restoreLocalStorage();

    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, "log");
    });
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/localization`);
    cy.get('h2')
      .should('contain', 'Example 12: Localization (i18n)');
  });

  describe('English Locale', () => {
    it('should have exact English Column Titles in the grid', () => {
      cy.get('#grid12')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
    });

    it('should have some metrics shown in the grid footer', () => {
      cy.get('#slickGridContainer-grid12')
        .find('.slick-custom-footer')
        .find('.right-footer')
        .should($span => {
          const text = removeExtraSpaces($span.text()); // remove all white spaces
          const now = new Date();
          const dateFormatted = moment(now).format('YYYY-MM-DD, hh:mm a');
          expect(text).to.eq(`Last Update ${dateFormatted} | 1500 of 1500 items`);
        });
    });

    it('should filter certain tasks with the word "ask 1" and expect filter to use contain/include text', () => {
      const tasks = ['Task 1', 'Task 10', 'Task 11', 'Task 12'];

      cy.get('.grid-canvas')
        .find('.slick-row')
        .should('be.visible');

      cy.get('input.filter-title')
        .type('ask 1');

      cy.get('#grid12')
        .find('.slick-row')
        .each(($row, index) => {
          if (index > tasks.length - 1) {
            return;
          }
          cy.wrap($row).children('.slick-cell:nth(1)')
            .should('contain', tasks[index]);
        });
    });
  });

  describe('French locale', () => {
    it('should reset filters and switch locale to French', () => {
      cy.get('#grid12')
        .find('button.slick-gridmenu-button')
        .trigger('click');

      cy.get(`.slick-gridmenu:visible`)
        .find('.slick-gridmenu-item')
        .first()
        .find('span')
        .contains('Clear all Filters')
        .click();

      cy.get('[data-test=language-button]')
        .click();

      cy.get('[data-test=selected-locale]')
        .should('contain', 'fr.json');
    });

    it('should have French Column Titles in the grid after switching locale', () => {
      cy.get('#grid12')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullFrenchTitles[index]));
    });

    it('should have some metrics shown in the grid footer', () => {
      cy.get('#slickGridContainer-grid12')
        .find('.slick-custom-footer')
        .find('.right-footer')
        .should($span => {
          const now = new Date();
          const text = removeExtraSpaces($span.text()); // remove all white spaces
          const dateFormatted = moment(now).format('YYYY-MM-DD, hh:mm a');
          expect(text).to.eq(`Dernière mise à jour ${dateFormatted} | 1500 de 1500 éléments`);
        });
    });

    it('should filter certain tasks', () => {
      const tasks = ['Tâche 1', 'Tâche 10', 'Tâche 11', 'Tâche 12'];

      cy.get('.grid-canvas')
        .find('.slick-row')
        .should('be.visible');

      cy.get('input.filter-title')
        .type('âche 1');

      cy.get('#grid12')
        .find('.slick-row')
        .each(($row, index) => {
          if (index > tasks.length - 1) {
            return;
          }
          cy.wrap($row).children('.slick-cell:nth(1)')
            .should('contain', tasks[index]);
        });
    });

    it('should reset filters before filtering duration', () => {
      cy.get('#grid12')
        .find('button.slick-gridmenu-button')
        .trigger('click');

      cy.get(`.slick-gridmenu:visible`)
        .find('.slick-gridmenu-item')
        .first()
        .find('span')
        .contains('Supprimer tous les filtres')
        .click();
    });

    it('should filter duration with slider filter', () => {
      cy.get('.filter-duration input[type=range]').as('range')
        .invoke('val', 25)
        .trigger('change');

      cy.get('#grid12')
        .find('.slick-row')
        .each(($row, index) => {
          let fullCellWidth;

          // only checks first 5 rows
          if (index > 5) {
            return;
          }

          // get full cell width of the first cell, then return
          cy.wrap($row).children('.slick-cell:nth(3)')
            .first()
            .then(($cell) => fullCellWidth = $cell.width());


          cy.wrap($row)
            .children('.slick-cell:nth(3)')
            .children()
            .should('have.css', 'background-color', 'rgb(255, 0, 0)')
            .should(($el) => {
              // calculate 25% and expect the element width to be about the calculated size with a (+/-)1px precision
              const expectedWidth = (fullCellWidth * .25);
              expect($el.width()).greaterThan(expectedWidth - 1);
              expect($el.width()).lessThan(expectedWidth + 1);
            });
        });
    });
  });

  describe('Row Selection', () => {
    it('should switch locale back to English and reset all Filters', () => {
      cy.get('[data-test=language-button]')
        .click();

      cy.get('[data-test=selected-locale]')
        .should('contain', 'en.json');

      cy.get('#grid12')
        .find('button.slick-gridmenu-button')
        .trigger('click');

      cy.get(`.slick-gridmenu:visible`)
        .find('.slick-gridmenu-item')
        .first()
        .find('span')
        .contains('Clear all Filters')
        .click();
    });

    it('should hover over the Title column and click on "Sort Descending" command', () => {
      cy.get('#slickGridContainer-grid12')
        .find('.slick-header-column:nth(1)')
        .trigger('mouseover')
        .children('.slick-header-menubutton')
        .should('be.hidden')
        .invoke('show')
        .click();

      cy.get('.slick-header-menu')
        .should('be.visible')
        .children('.slick-header-menuitem:nth-child(2)')
        .children('.slick-header-menucontent')
        .should('contain', 'Sort Descending')
        .click();

      cy.get('.slick-row')
        .children('.slick-cell:nth(1)')
        .first()
        .should('contain', 'Task 1499');
    });

    it('should select the row with "Task 1497" and expect the Grid State to be called with it in the console', () => {
      cy.get('#slickGridContainer-grid12').as('grid12');

      cy.get('#grid12')
        .contains('Task 1497')
        .parent()
        .children('.slick-cell-checkboxsel')
        .find('input[type=checkbox]')
        .click({ force: true });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(2);
        expect(win.console.log).to.be.calledWith("Grid State changed:: ", { newValues: { gridRowIndexes: [2], dataContextIds: [1497], filteredDataContextIds: [1497] }, type: 'rowSelection' });
      });
    });

    it('should scroll to bottom of the grid then select "Task 4"', () => {
      cy.get('#slickGridContainer-grid12').as('grid12');

      cy.get('@grid12')
        .find('.slick-viewport-top.slick-viewport-left')
        .scrollTo('bottom')
        .wait(10);

      cy.get('#grid12')
        .contains('Task 4')
        .parent()
        .children('.slick-cell-checkboxsel')
        .find('input[type=checkbox]')
        .click({ force: true });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(2);
        expect(win.console.log).to.be.calledWith("Grid State changed:: ", { newValues: { gridRowIndexes: [1495, 2], dataContextIds: [1497, 4], filteredDataContextIds: [1497, 4] }, type: 'rowSelection' });
      });
    });

    it('should filter the Tasks column with number 4 and expect only "Task 4" visible in the grid', () => {
      cy.get('#slickGridContainer-grid12').as('grid12');

      cy.get('.grid-canvas')
        .find('.slick-row')
        .should('be.visible');

      cy.get('input.filter-title')
        .type('4');

      cy.get('@grid12')
        .find('.slick-row')
        .children()
        .filter('.slick-cell-checkboxsel.selected.true')
        .should('have.length', 1);

      cy.get('@grid12')
        .find('.slick-row')
        .children()
        .filter('.slick-cell.selected.true:nth(1)')
        .contains('Task 4');
    });

    it('should scroll back to the top and expect to see "Task 1497" still selected', () => {
      cy.get('#slickGridContainer-grid12').as('grid12');

      cy.get('.grid-canvas')
        .find('.slick-row')
        .should('be.visible');

      cy.get('@grid12')
        .find('.slick-viewport-top.slick-viewport-left')
        .scrollTo('top')
        .wait(10);

      cy.get('@grid12')
        .find('.slick-row')
        .children()
        .filter('.slick-cell-checkboxsel.selected.true')
        .should('have.length', 1);

      cy.get('@grid12')
        .find('.slick-row')
        .children()
        .filter('.slick-cell.selected.true:nth(1)')
        .contains('Task 1497');
    });
  });
});

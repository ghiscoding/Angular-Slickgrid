/// <reference types="cypress" />
import moment from 'moment-mini';

function removeExtraSpaces(textS) {
  return `${textS}`.replace(/\s+/g, ' ').trim();
}

describe('Example 12: Localization (i18n)', () => {
  const fullEnglishTitles = ['Title', 'Description', 'Duration', 'Start', 'Finish', 'Completed', 'Completed'];
  const fullFrenchTitles = ['Titre', 'Description', 'Durée', 'Début', 'Fin', 'Terminé', 'Terminé'];
  let now = new Date();

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/localization`);
    cy.get('h2')
      .should('contain', 'Example 12: Localization (i18n)')
      .then(() => now = new Date());
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
          const dateFormatted = moment(now).format('YYYY-MM-DD HH:mm a');
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
          cy.wrap($row).children('.slick-cell')
            .first()
            .should('contain', tasks[index]);
        });
    });
  });

  describe('French locale', () => {
    it('should reset filters and switch locale to French', () => {
      cy.get('#grid12')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

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
          const text = removeExtraSpaces($span.text()); // remove all white spaces
          const dateFormatted = moment(now).format('YYYY-MM-DD HH:mm a');
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
          cy.wrap($row).children('.slick-cell')
            .first()
            .should('contain', tasks[index]);
        });
    });

    it('should reset filters before filtering duration', () => {
      cy.get('#grid12')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

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
          cy.wrap($row).children('.slick-cell:nth(2)')
            .first()
            .then(($cell) => fullCellWidth = $cell.width());


          cy.wrap($row)
            .children('.slick-cell:nth(2)')
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
});

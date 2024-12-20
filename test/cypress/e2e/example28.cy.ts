import { changeTimezone, zeroPadding } from '../plugins/utilities';
import { removeExtraSpaces } from '../plugins/utilities';

describe('Example 28 - Tree Data (from a flat dataset with parentId references)', () => {
  const GRID_ROW_HEIGHT = 40;
  const titles = ['Title', 'Duration', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/tree-data-parent-child`);
    cy.get('h2').should('contain', 'Example 28: Tree Data');
    cy.get('h2').should('contain', 'from a flat dataset with parentId references');
  });

  it('should have exact column titles in grid', () => {
    cy.get('#grid28')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should expect all rows to be collapsed on first page load', () => {
    cy.get('#grid28').find('.slick-group-toggle.expanded').should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.collapsed')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });

  it('should have a Grid Preset Filter on 3rd column "% Complete" and expect all rows to be filtered as well', () => {
    cy.get('.input-group-text.highest-range-percentComplete').contains('25');

    cy.get('.search-filter.filter-percentComplete').find('.input-group-addon.operator select').contains('>=');
  });

  it('should expand all rows from "Expand All" button', () => {
    cy.get('[data-test=expand-all-btn]').contains('Expand All').click();

    cy.get('#grid28').find('.slick-group-toggle.collapsed').should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.expanded')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });

  it('should collapsed all rows from "Collapse All" button', () => {
    cy.get('[data-test=collapse-all-btn]').contains('Collapse All').click();

    cy.get('#grid28').find('.slick-group-toggle.expanded').should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.collapsed')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });

  it('should collapsed all rows from "Collapse All" context menu', () => {
    cy.get('#grid28').contains('5 days');

    cy.get('#grid28').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

    cy.get('.slick-context-menu.dropright .slick-menu-command-list')
      .find('.slick-menu-item')
      .find('.slick-menu-content')
      .contains('Collapse all Groups')
      .click();

    cy.get('#grid28').find('.slick-group-toggle.expanded').should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.collapsed')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });

  it('should collapsed all rows from "Expand All" context menu', () => {
    cy.get('#grid28').contains('5 days');

    cy.get('#grid28').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

    cy.get('.slick-context-menu.dropright .slick-menu-command-list')
      .find('.slick-menu-item')
      .find('.slick-menu-content')
      .contains('Expand all Groups')
      .click();

    cy.get('#grid28').find('.slick-group-toggle.collapsed').should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.expanded')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });

  it('should have data filtered, with "% Complete" >=25, and not show the full item count in the footer', () => {
    cy.get('.search-filter.filter-percentComplete .operator .form-control').should('have.value', '>=');

    cy.get('input.slider-filter-input')
      .invoke('val')
      .then((text) => expect(text).to.eq('25'));

    cy.get('.search-filter .input-group-text').should(($span) => expect($span.text()).to.eq('25'));

    cy.get('.right-footer').should(($span) => {
      const text = removeExtraSpaces($span.text()); // remove all white spaces
      expect(text).not.to.eq('500 of 500 items');
    });
  });

  it('should open the Grid Menu "Clear all Filters" command', () => {
    cy.get('#grid28').find('button.slick-grid-menu-button').trigger('click').click();

    cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();
  });

  it('should no longer have filters and it should show the full item count in the footer', () => {
    cy.get('.search-filter.filter-percentComplete .operator .form-control').should('have.value', '');

    cy.get('input.slider-filter-input')
      .invoke('val')
      .then((text) => expect(text).to.eq('0'));

    cy.get('.search-filter .input-group-text').should(($span) => expect($span.text()).to.eq('0'));

    cy.get('.right-footer').should(($span) => {
      const text = removeExtraSpaces($span.text()); // remove all white spaces
      expect(text).to.eq('500 of 500 items');
    });
  });

  it('should click on the "Dynamically Change Filter" button and expect all child items to have a "% Complete" lower than 40', () => {
    cy.get('[data-test="change-filter-dynamically"]').click();
    cy.get('[data-test=expand-all-btn]').contains('Expand All').click();

    const readLineCount = 10;
    for (let row = 0; row < readLineCount; row++) {
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * row}px;"]`).should(($elm) => {
        // only read the percent complete value if it's not a parent
        const $slickGroupToggleNotExpanded = $elm.children('.slick-cell:nth(0)').children('.slick-group-toggle:not(.expanded)');
        if ($slickGroupToggleNotExpanded.length > 1) {
          const percentComplete = $elm.children('.slick-cell:nth(2)').first().text();
          expect(+percentComplete).to.be.lt(40);
        }
      });
    }
  });

  it('should open the Grid Menu "Clear all Filters" command', () => {
    cy.get('#grid28').find('button.slick-grid-menu-button').trigger('click').click();

    cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();
  });

  it('should add an item (Task 500) in the first parent it finds and so we should expect it to be inserted at tree level 1', () => {
    cy.get('[data-test=add-item-btn]').contains('Add New Item').click();

    cy.get('.slick-tree-title[level=1]').get('.slick-cell').contains('Task 500');
  });

  it('should be able to update the 1st row item (Task 0)', () => {
    cy.get('[data-test=update-item-btn]').contains('Update 1st Row Item').click();

    cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('top');

    const now = new Date();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = changeTimezone(now, tz);

    const currentDate = today.getDate();
    let currentMonth: number | string = today.getMonth() + 1; // month is zero based, let's add 1 to it
    if (currentMonth < 10) {
      currentMonth = `0${currentMonth}`; // add zero padding
    }
    const currentYear = today.getFullYear();

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', '11 days');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', '77%');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should(
      'contain',
      `${currentYear}-${zeroPadding(currentMonth)}-${zeroPadding(currentDate)}`
    );
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).should(
      'contain',
      `${currentYear}-${zeroPadding(currentMonth)}-${zeroPadding(currentDate)}`
    );
  });

  it('should collapse the Tree and not expect to see the newly inserted item (Task 500) because all child will be collapsed', () => {
    cy.get('[data-test=collapse-all-btn]').contains('Collapse All').click();

    cy.get('.slick-tree-title[level=1]').should('have.length', 0);

    cy.get('.slick-tree-title')
      .get('.slick-cell')
      .contains(/^((?!Task 500).)*$/);
  });

  it('should open the Grid Menu "Clear all Filters" command', () => {
    cy.get('#grid28').find('button.slick-grid-menu-button').trigger('click').click();

    cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

    cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('top');
  });

  it('should be able to open "Task 1" and "Task 3" parents', () => {
    /*
      we should find this structure
      Task 0
        Task 1
          Task 2
          Task 3
            Task 4
        ...
    */
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).should(
      'have.length',
      1
    );
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).click({ force: true });

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).should(
      'have.length',
      1
    );
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).click({ force: true });
  });

  it('should be able to click on the "Collapse All (wihout event)" button', () => {
    cy.get('[data-test=collapse-all-noevent-btn]').contains('Collapse All (without triggering event)').click();
  });

  it('should be able to click on the "Reapply Previous Toggled Items" button and expect "Task 1" and "Task 3" parents to become open (via Grid State change) while every other parents remains collapsed', () => {
    cy.get('[data-test=reapply-toggled-items-btn]').contains('Reapply Previous Toggled Items').click({ force: true });

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should('have.length', 1);

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should('have.length', 1);

    cy.get(`#grid28 .slick-group-toggle.expanded`).should('have.length', 2);
  });

  it('should be able to click on "Dynamically Toggle First Parent" expect only the first parent item to get collapsed', () => {
    cy.get('[data-test=dynamically-toggle-first-parent-btn]').contains('Dynamically Toggle First Parent').click();

    cy.get(`#grid28 .slick-group-toggle.expanded`).should('have.length', 0);
  });
});

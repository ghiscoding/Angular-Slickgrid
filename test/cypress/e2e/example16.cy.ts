import { format } from '@formkit/tempo';

describe('Example 16: Grid State & Presets using Local Storage', () => {
  const GRID_ROW_HEIGHT = 35;
  const fullEnglishTitles = ['', 'Title', 'Description', 'Duration', '% Complete', 'Start', 'Completed'];

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/gridstate`);
    cy.get('h2').should('contain', 'Example 16: Grid State & Presets using Local Storage');

    cy.clearLocalStorage();
    cy.get('[data-test=reset-button]').click();
  });

  it('should reload the page', () => {
    cy.reload().wait(50);
  });

  it('should have exact Column Titles in the grid', () => {
    cy.get('#grid16')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
  });

  it('should have Pagination displayed with default values', () => {
    cy.get('#slickGridContainer-grid16').as('grid16');

    // 1st Grid
    cy.get('@grid16')
      .find('[data-test=page-number-input]')
      .invoke('val')
      .then((pageNumber) => expect(pageNumber).to.eq('1'));

    cy.get('@grid16').find('[data-test=page-count]').contains('20');

    cy.get('@grid16').find('[data-test=item-from]').contains('1');

    cy.get('@grid16').find('[data-test=item-to]').contains('25');

    cy.get('@grid16').find('[data-test=total-items]').contains('500');
  });

  it('should drag "Title" column to 3rd position in the grid', () => {
    const expectedTitles = ['', 'Description', 'Duration', 'Title', '% Complete', 'Start', 'Completed'];

    cy.get('.slick-header-columns').children('.slick-header-column:nth(1)').contains('Title').drag('.slick-header-column:nth(3)');

    cy.get('.slick-header-column:nth(3)').contains('Title');

    cy.get('#grid16')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(expectedTitles[index]));
  });

  // --
  // Cypress does not yet implement the .hover() method and this test won't work until then
  // it('should resize "Title" column and make it wider', () => {
  //   cy.get('.slick-header-columns')
  //     .children('.slick-header-column:nth(3)')
  //     .should('contain', 'Title');

  //   cy.get('.slick-header-columns')
  //     .children('.slick-header-column:nth(3)')
  //     .find('.slick-resizable-handle')
  //     .trigger('mouseover', -2, 50, { force: true })
  //     .should('be.visible')
  //     .invoke('show')
  //     .hover()
  //     .trigger('mousedown', -2, 50, { which: 1, force: true });

  //   cy.get('.slick-header-columns')
  //     .children('.slick-header-column:nth(5)')
  //     .trigger('mousemove', 'bottomLeft')
  //     .trigger('mouseup', 'bottomLeft', { which: 1, force: true });
  // });

  it('should hide the "Start" column from the Column Picker', () => {
    const expectedTitles = ['', 'Description', 'Duration', 'Title', '% Complete', 'Start', 'Completed'];

    cy.get('#grid16').find('.slick-header-column').first().trigger('mouseover').trigger('contextmenu').invoke('show');

    cy.get('.slick-column-picker')
      .find('.slick-column-picker-list')
      .children()
      .each(($child, index) => {
        if (index === 0) {
          expect($child[0].className).to.eq('hidden');
          expect($child[0].offsetHeight).to.eq(0);
          expect($child[0].offsetWidth).to.eq(0);
        }

        expect($child.text()).to.eq(expectedTitles[index]);
      });

    cy.get('.slick-column-picker')
      .find('.slick-column-picker-list')
      .children('li:nth-child(6)')
      .children('label')
      .should('contain', 'Start')
      .click();

    cy.get('.slick-column-picker:visible').find('.close').trigger('click').click();
  });

  it('should filter certain tasks', () => {
    cy.get('.grid-canvas').find('.slick-row').should('be.visible');

    cy.get('.filter-title input').type('Task 1');
  });

  it('should click on "Title" column to sort it Ascending', () => {
    const expectedTasks = ['Task 1', 'Task 10', 'Task 100', 'Task 101'];

    cy.get('.slick-header-columns').children('.slick-header-column:nth(3)').click();

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(3)')
      .find('.slick-sort-indicator.slick-sort-indicator-asc')
      .should('be.visible');

    cy.get('#grid16')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(3)').should('contain', expectedTasks[index]);
      });
  });

  it('should hover over the "Duration" column click on "Sort Descending" command', () => {
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(2)')
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      // .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(5)')
      .children('.slick-menu-content')
      .should('contain', 'Sort Descending')
      .click();

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(2)')
      .find('.slick-sort-indicator.slick-sort-indicator-desc')
      .should('be.visible');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(2)')
      .find('.slick-sort-indicator-numbered')
      .should('be.visible')
      .should('contain', '2');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(3)')
      .find('.slick-sort-indicator-numbered')
      .should('be.visible')
      .should('contain', '1');
  });

  it('should select row (Task 105)', () => {
    cy.get('#grid16')
      .contains('Task 105')
      .parent()
      .children('.slick-cell-checkboxsel')
      .find('input[type=checkbox]')
      .click({ force: true });
  });

  it('should change Page Size and Page Number then expect the Pagination to have correct values', () => {
    const expectedTasks = ['Task 135', 'Task 136', 'Task 137', 'Task 138', 'Task 139', 'Task 14'];

    cy.get('#slickGridContainer-grid16').as('grid16');

    cy.get('@grid16').find('#items-per-page-label').select('20');

    cy.get('@grid16');
    cy.get('.icon-seek-next').click().click();

    cy.wait(100);

    cy.get('@grid16')
      .find('[data-test=page-number-input]')
      .invoke('val')
      .then((pageNumber) => expect(pageNumber).to.eq('3'));

    cy.get('@grid16').find('[data-test=page-count]').contains('6');

    cy.get('@grid16').find('[data-test=item-from]').contains('41');

    cy.get('@grid16').find('[data-test=item-to]').contains('60');

    cy.get('@grid16').find('[data-test=total-items]').contains('111');

    cy.get('@grid16')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(3)').should('contain', expectedTasks[index]);
      });
  });

  it('should select row (Task 144)', () => {
    cy.get('#grid16')
      .contains('Task 144')
      .parent()
      .children('.slick-cell-checkboxsel')
      .find('input[type=checkbox]')
      .click({ force: true });
  });

  it('should reload the page', () => {
    cy.reload().wait(50);
  });

  it('should expect the same Grid State to persist after the page got reloaded', () => {
    const expectedTitles = ['', 'Description', 'Duration', 'Title', '% Complete', 'Completed'];

    cy.get('#grid16').find('.grid-canvas').find('.slick-row').should('be.visible');

    cy.get('#grid16')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.find('.slick-column-name').text()).to.eq(expectedTitles[index]));
  });

  it('should expect the same Pagination to persist after reload', () => {
    const expectedTasks = ['Task 135', 'Task 136', 'Task 137', 'Task 138', 'Task 139', 'Task 14'];

    cy.get('#slickGridContainer-grid16').as('grid16');

    cy.get('@grid16')
      .find('[data-test=page-number-input]')
      .invoke('val')
      .then((pageNumber) => expect(pageNumber).to.eq('3'));

    cy.get('@grid16').find('[data-test=page-count]').contains('6');

    cy.get('@grid16').find('[data-test=item-from]').contains('41');

    cy.get('@grid16').find('[data-test=item-to]').contains('60');

    cy.get('@grid16').find('[data-test=total-items]').contains('111');

    cy.get('@grid16')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(3)').should('contain', expectedTasks[index]);
      });
  });

  it('should expect row selection (Task 144) to be persisted', () => {
    cy.get('#grid16')
      .contains('Task 144')
      .parent()
      .children()
      .each(($child) => {
        console.log($child);
        expect($child.attr('class')).to.contain('selected');
      });
  });

  it('should have French titles in Column Picker after switching to Language', () => {
    const expectedTitles = ['', 'Description', 'Durée', 'Titre', '% Achevée', 'Début', 'Terminé'];

    cy.get('[data-test=language-button]').click();

    cy.get('[data-test=selected-locale]').should('contain', 'fr.json');

    cy.get('#grid16').find('.slick-header-column').first().trigger('mouseover').trigger('contextmenu').invoke('show');

    cy.get('.slick-column-picker')
      .find('.slick-column-picker-list')
      .children()
      .each(($child, index) => {
        if (index === 0) {
          expect($child[0].className).to.eq('hidden');
          expect($child[0].offsetHeight).to.eq(0);
          expect($child[0].offsetWidth).to.eq(0);
        }

        expect($child.text()).to.eq(expectedTitles[index]);
      });

    cy.get('.slick-column-picker:visible').find('.close').trigger('click').click();
  });

  it('should have French titles in Grid Menu after switching to Language', () => {
    const expectedTitles = ['', 'Description', 'Durée', 'Titre', '% Achevée', 'Début', 'Terminé'];

    cy.get('#grid16').find('button.slick-grid-menu-button').click({ force: true });

    cy.get('.slick-grid-menu')
      .find('.slick-column-picker-list')
      .children()
      .each(($child, index) => {
        if (index === 0) {
          expect($child[0].className).to.eq('hidden');
          expect($child[0].offsetHeight).to.eq(0);
          expect($child[0].offsetWidth).to.eq(0);
        }

        expect($child.text()).to.eq(expectedTitles[index]);
      });

    cy.get('.slick-grid-menu:visible').find('.close').trigger('click').click();
  });

  it('should hover over the "Terminé" column and click on "Cacher la colonne" remove the column from grid', () => {
    const expectedTitles = ['', 'Description', 'Durée', 'Titre', '% Achevée'];

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(5)')
      .trigger('mouseover', { force: true })
      .children('.slick-header-menu-button')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(9)')
      .children('.slick-menu-content')
      .should('contain', 'Cacher la colonne')
      .click();

    cy.get('#grid16')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.find('.slick-column-name').text()).to.eq(expectedTitles[index]));
  });

  it('should be able to freeze "Description" column', () => {
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(1)')
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(1)')
      .children('.slick-menu-content')
      .should('contain', 'Geler les colonnes')
      .click();
  });

  it('should reload the page', () => {
    cy.reload().wait(50);
  });

  it('should expect the same Grid State to persist after the page got reloaded, however we always load in English', () => {
    const expectedTitles = ['', 'Description', 'Duration', 'Title', '% Complete'];

    cy.get('#grid16').find('.grid-canvas').find('.slick-row').should('be.visible');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(2)')
      .find('.slick-sort-indicator-numbered')
      .should('be.visible')
      .should('contain', '2');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(3)')
      .find('.slick-sort-indicator.slick-sort-indicator-asc')
      .should('be.visible');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(3)')
      .find('.slick-sort-indicator-numbered')
      .should('be.visible')
      .should('contain', '1');

    cy.get('#grid16')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.find('.slick-column-name').text()).to.eq(expectedTitles[index]));
  });

  it('should expect row selection (Task 144) to be persisted', () => {
    cy.get('#grid16')
      .contains('Task 144')
      .parent()
      .children()
      .each(($child) => {
        console.log($child);
        expect($child.attr('class')).to.contain('selected');
      });
  });

  it('should go back to first page and expect row selection (Task 105) to be persisted', () => {
    cy.get('#slickGridContainer-grid16').as('grid16');

    cy.get('@grid16').find('.icon-seek-first').click().wait(10);

    cy.get('#grid16')
      .contains('Task 105')
      .parent()
      .children()
      .each(($child) => {
        console.log($child);
        expect($child.attr('class')).to.contain('selected');
      });
  });

  it('should have a persisted frozen column after "Description" and a grid with 4 containers on page load with 2 columns on the left and 3 columns on the right', () => {
    cy.get('[style="top: 0px;"]').should('have.length', 2);
    cy.get('.grid-canvas-left > [style="top: 0px;"]').children().should('have.length', 2);
    cy.get('.grid-canvas-right > [style="top: 0px;"]').children().should('have.length', 3);
  });

  it('should click on the reset button and have exact Column Titles position as in beginning', () => {
    cy.get('#slickGridContainer-grid16').as('grid16');

    cy.get('[data-test="reset-button"]').click();

    cy.get('@grid16')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
  });

  it('should reload the page', () => {
    cy.reload().wait(50);
  });

  it('should have same columns position after reload', () => {
    const expectedTitles = ['', 'Title', 'Description', 'Duration', '% Complete', 'Start', 'Completed'];

    cy.get('#grid16')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(expectedTitles[index]));
  });

  it('should be able to freeze "Description" 3rd column', () => {
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(2)')
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(1)')
      .children('.slick-menu-content')
      .should('contain', 'Freeze Columns')
      .click();
  });

  it('should swap "Duration" and "% Complete" columns', () => {
    const expectedTitles = ['', 'Title', 'Description', '% Complete', 'Duration', 'Start', 'Completed'];

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(3)')
      .contains('Duration')
      .drag('.slick-header-column:nth(4)');

    cy.get('#grid16')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(expectedTitles[index]));
  });

  it('should be able to freeze "% Complete" and expect 4th column to be freezed', () => {
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(3)')
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(1)')
      .children('.slick-menu-content')
      .should('contain', 'Freeze Columns')
      .click();
  });

  it('should have a persisted frozen column after "Description" and a grid with 4 containers on page load with 2 columns on the left and 3 columns on the right', () => {
    cy.get('[style="top: 0px;"]').should('have.length', 2);
    cy.get('.grid-canvas-left > [style="top: 0px;"]').children().should('have.length', 4);
    cy.get('.grid-canvas-right > [style="top: 0px;"]').children().should('have.length', 3);
  });

  describe('Filter Shortcuts', () => {
    it('should clear locale storage & set language to French', () => {
      cy.clearLocalStorage();
      cy.get('[data-test=reset-button]').click();

      cy.get('[data-test=language-button]').click();

      cy.get('[data-test="selected-locale"]').should('contain', 'fr.json');
    });

    it('should open header menu of "Start" column and choose "Filter Shortcuts -> Past" and expect over 200 rows', () => {
      cy.get('#grid16')
        .find('.slick-header-column:nth-of-type(6)')
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .invoke('show')
        .click();

      cy.get('[data-command=filter-shortcuts-root-menu]').should('contain', 'Raccourcis de filtre').trigger('mouseover');

      cy.get('.slick-header-menu.slick-menu-level-1').find('[data-command=past]').should('contain', 'Passé').click();

      cy.get('.search-filter.filter-start .input-group-prepend.operator select').contains('<');

      cy.get('.search-filter.filter-start input.date-picker').invoke('val').should('equal', format(new Date(), 'YYYY-MM-DD'));

      cy.get('[data-test="total-items"]').should(($span) => {
        expect(Number($span.text())).to.gt(200);
      });
    });

    it('should open header menu of "Start" column and choose "Filter Shortcuts -> Future" and expect over 100 rows', () => {
      cy.get('#grid16')
        .find('.slick-header-column:nth-of-type(6)')
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .invoke('show')
        .click();

      cy.get('[data-command=filter-shortcuts-root-menu]').should('contain', 'Raccourcis de filtre').trigger('mouseover');

      cy.get('.slick-header-menu.slick-menu-level-1').find('[data-command=future]').click();

      cy.get('.search-filter.filter-start .input-group-prepend.operator select').contains('>');

      cy.get('.search-filter.filter-start input.date-picker').invoke('val').should('equal', format(new Date(), 'YYYY-MM-DD'));

      cy.get('[data-test="total-items"]').should(($span) => {
        expect(Number($span.text())).to.gt(100);
      });
    });

    it('should open header menu of "Description" column and choose "Filter Shortcuts -> Blank Values" and expect over 10 rows', () => {
      cy.get('#grid16')
        .find('.slick-header-column:nth-of-type(3)')
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .invoke('show')
        .click();

      cy.get('[data-command=filter-shortcuts-root-menu]').should('contain', 'Raccourcis de filtre').trigger('mouseover');

      cy.get('.slick-header-menu.slick-menu-level-1')
        .find('[data-command=blank-values]')
        .should('contain', 'Valeurs nulles')
        .click();

      cy.get('.search-filter.filter-description').invoke('val').should('equal', '< A');

      cy.get('[data-test="total-items"]').should(($span) => {
        expect(Number($span.text())).to.gt(10);
      });
    });

    it('should switch back to English', () => {
      cy.get('[data-test=language-button]').click();

      cy.get('[data-test="selected-locale"]').should('contain', 'en.json');
    });

    it('should open header menu of "Description" column and choose "Filter Shortcuts -> Non-Blank Values" and expect over 80 rows', () => {
      cy.get('#grid16')
        .find('.slick-header-column:nth-of-type(3)')
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .invoke('show')
        .click();

      cy.get('[data-command=filter-shortcuts-root-menu]').should('contain', 'Filter Shortcuts').trigger('mouseover');

      cy.get('.slick-header-menu.slick-menu-level-1')
        .find('[data-command=non-blank-values]')
        .should('contain', 'Non-Blank Values')
        .click();

      cy.get('.search-filter.filter-description').invoke('val').should('equal', '> A');

      cy.get('[data-test="total-items"]').should(($span) => {
        expect(Number($span.text())).to.gt(80);
      });

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).contains('desc');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).contains('desc');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(2)`).contains('desc');
    });
  });
});

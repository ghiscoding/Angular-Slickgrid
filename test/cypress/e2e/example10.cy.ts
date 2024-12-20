describe('Example 10 - Multiple Grids with Row Selection', () => {
  const titles = ['', 'Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/selection`);
    cy.get('h2').should('contain', 'Example 10: Multiple Grids with Row Selection');
  });

  it('should have 2 grids of width of 800px and different height', () => {
    cy.get('#slickGridContainer-grid1').as('grid1');
    cy.get('@grid1').should('have.css', 'width', '800px');

    cy.get('@grid1')
      .find('.slickgrid-container')
      .should(($el) => expect(parseInt(`${$el.height()}`, 10)).to.eq(225));

    cy.get('#slickGridContainer-grid2').as('grid2');
    cy.get('@grid2').should('have.css', 'width', '800px');

    cy.get('@grid2')
      .find('.slickgrid-container')
      .should(($el) => expect(parseInt(`${$el.height()}`, 10)).to.eq(255));
  });

  it('should have exact Titles on 1st grid', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => {
        expect($child.text()).to.eq(titles[index]);
      });
  });

  it('should have 1 rows (Task 3) pre-selected in 2nd grid on its first page but 5 rows selected in the entire dataset', () => {
    cy.get('[data-test=grid2-selections]').should('contain', 'Task 3,Task 12,Task 13,Task 522');

    cy.get('#grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 1);
  });

  it('should have 2 rows (Task 12,Task 13) selected in 2nd grid after typing in a search filter', () => {
    cy.get('#grid2').find('.filter-title').type('Task 1');

    cy.get('#grid2').find('.slick-row').should('not.have.length', 0);

    cy.get('[data-test=grid2-selections]').should('contain', '');

    cy.get('#grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);
  });

  it('should make sure that first column is hidden from the Grid Menu (1st column definition has "excludeFromGridMenu" set) on 1st grid', () => {
    cy.get('#grid1').find('button.slick-grid-menu-button').trigger('click').click();

    cy.get('.slick-grid-menu')
      .find('.slick-column-picker-list')
      .children()
      .each(($child, index) => {
        if (index === 0) {
          expect($child[0].className).to.eq('hidden');
          expect($child[0].offsetHeight).to.eq(0);
          expect($child[0].offsetWidth).to.eq(0);
        }
        expect($child.text()).to.eq(titles[index]);
      });
  });

  it('should hide Title from the Grid Menu and expect 1 less column in the 1st grid', () => {
    const newTitleList = ['', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

    cy.get('#grid1')
      .get('.slick-grid-menu:visible')
      .find('.slick-column-picker-list')
      .children('li:nth-child(2)')
      .children('label')
      .should('contain', 'Title')
      .click();

    cy.get('#grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => {
        expect($child.text()).to.eq(newTitleList[index]);
      });

    cy.get('#grid1').get('.slick-grid-menu:visible').find('.close').trigger('click').click();
  });

  it('should show the Title column again from the Column Picker in the 1st grid', () => {
    cy.get('#grid1').find('.slick-header-column').first().trigger('mouseover').trigger('contextmenu').invoke('show');

    cy.get('.slick-column-picker')
      .find('.slick-column-picker-list')
      .children()
      .each(($child, index) => {
        if (index === 0) {
          expect($child[0].className).to.eq('hidden');
          expect($child[0].offsetHeight).to.eq(0);
          expect($child[0].offsetWidth).to.eq(0);
        }
        expect($child.text()).to.eq(titles[index]);
      });

    cy.get('.slick-column-picker')
      .find('.slick-column-picker-list')
      .children('li:nth-child(2)')
      .children('label')
      .should('contain', 'Title')
      .click();

    cy.get('#grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => {
        expect($child.text()).to.eq(titles[index]);
      });

    cy.get('#grid1').get('.slick-column-picker:visible').find('.close').trigger('click').click();
  });

  describe('Pagination', () => {
    it('should Clear all Filters on 2nd Grid', () => {
      cy.get('#grid2').find('button.slick-grid-menu-button').trigger('click').click();

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();
    });

    it('should have Pagination displayed and set on Grid1 and Grid2', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');
      cy.get('#slickGridContainer-grid2').as('grid2');

      // 1st Grid
      cy.get('@grid1')
        .find('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('2'));

      cy.get('@grid1').find('[data-test=page-count]').contains('99');

      cy.get('@grid1').find('[data-test=item-from]').contains('6');

      cy.get('@grid1').find('[data-test=item-to]').contains('10');

      cy.get('@grid1').find('[data-test=total-items]').contains('495');

      // 2nd Grid
      cy.get('@grid2').find('[data-test=page-count]').contains('105');

      cy.get('@grid2').find('[data-test=item-from]').contains('1');

      cy.get('@grid2').find('[data-test=item-to]').contains('5');

      cy.get('@grid2').find('[data-test=total-items]').contains('525');
    });

    it('should change Page Number in Grid1 and expect the Pagination to have correct values', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1').find('[data-test=page-number-input]').clear().type('52').type('{enter}');

      cy.get('@grid1').find('[data-test=page-count]').contains('99');

      cy.get('@grid1').find('[data-test=item-from]').contains('256');

      cy.get('@grid1').find('[data-test=item-to]').contains('260');

      cy.get('@grid1').find('[data-test=total-items]').contains('495');
    });

    it('should change Page Number and Page Size in Grid2 and expect the Pagination to have correct values', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('[data-test=page-number-input]').clear().type('34').type('{enter}');

      cy.get('@grid2').find('[data-test=page-count]').contains('105');

      cy.get('@grid2').find('[data-test=item-from]').contains('166');

      cy.get('@grid2').find('[data-test=item-to]').contains('170');

      cy.get('@grid2').find('[data-test=total-items]').contains('525');

      cy.get('@grid2').find('#items-per-page-label').select('75');

      cy.get('@grid2').find('[data-test=page-count]').contains('7');

      cy.get('@grid2').find('[data-test=item-from]').contains('1');

      cy.get('@grid2').find('[data-test=item-to]').contains('75');
    });

    it('should go back to Grid1 and expect the same value before changing Pagination of Grid2', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1').find('[data-test=page-count]').contains('99');

      cy.get('@grid1').find('[data-test=item-from]').contains('256');

      cy.get('@grid1').find('[data-test=item-to]').contains('260');

      cy.get('@grid1').find('[data-test=total-items]').contains('495');
    });

    it('should display page 0 of 0 with 0 items when applied filter returning an empty dataset', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1').find('.filter-title').type('000');

      cy.get('.slick-empty-data-warning:visible').contains('No data to display.');

      cy.get('@grid1').find('[data-test=page-count]').contains('0');

      cy.get('@grid1').find('[data-test=item-from]').should('not.be.visible');

      cy.get('@grid1').find('[data-test=item-to]').should('not.be.visible');

      cy.get('@grid1').find('[data-test=total-items]').contains('0');
    });

    it('should erase part of the filter to have "00" and expect 4 items in total with 1 page', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1').find('.filter-title').type('{backspace}');

      cy.get('.slick-empty-data-warning').contains('No data to display.').should('not.be.visible');

      cy.get('@grid1').find('[data-test=page-count]').contains('1');

      cy.get('@grid1').find('[data-test=item-from]').contains('1');

      cy.get('@grid1').find('[data-test=item-to]').contains('4');

      cy.get('@grid1').find('[data-test=total-items]').contains('4');
    });

    it('should also expect Grid2 to be unchanged (after changing Pagination in Grid1 in previous tests)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('[data-test=page-count]').contains('7');

      cy.get('@grid2').find('[data-test=item-from]').contains('1');

      cy.get('@grid2').find('[data-test=item-to]').contains('75');

      cy.get('@grid2').find('[data-test=total-items]').contains('525');
    });

    it('should have 4 rows (Task 3,Task 12,Task 13,Task 522) selected in the entire 2nd grid BUT only 1 selected in current Page 1', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 3,Task 12,Task 13,Task 522');

      cy.get('@grid2')
        .find('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('#grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 1);
    });

    it('should go to Page 3 of 2nd Grid and have 2 rows selected in that Page and also have 4 rows selected in the entire grid (Task 3,Task 12,Task 13,Task 522)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 3,Task 12,Task 13,Task 522');

      cy.get('@grid2').find('#items-per-page-label').select('5');

      cy.get('@grid2').find('[data-test=page-number-input]').clear().type('3').type('{enter}');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);
    });

    it('should go to last Page of 2nd Grid and have 1 rows selected in that Page and also have 4 rows selected in the entire grid (Task 3,Task 12,Task 13,Task 522)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.icon-seek-end').click();

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 3,Task 12,Task 13,Task 522');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 1);
    });

    it(`should go to first Page of 2nd Grid and select another row (Task 1) in that Page, wich will now be (Task1,Task3) and now have 5 rows selected in the entire grid (Task 1,Task 3,Task 12,Task 13,Task 522)`, () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.icon-seek-first').click().wait(10);

      cy.get('@grid2').find('.slick-row:nth(1) .slick-cell:nth(0) input[type=checkbox]').click({ force: true });

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 1,Task 3,Task 12,Task 13,Task 522');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(6);
        // going to 1st page
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: { gridRowIndexes: [3], dataContextIds: [12, 13, 3, 522], filteredDataContextIds: [3, 12, 13, 522] },
          type: 'rowSelection',
        });
        // after selecting 1st row
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: { gridRowIndexes: [1, 3], dataContextIds: [1, 12, 13, 3, 522], filteredDataContextIds: [1, 3, 12, 13, 522] },
          type: 'rowSelection',
        });
      });
    });

    it('should go back to Page 3 of 2nd Grid and have 2 rows selected in that Page and also retain 5 selected rows in the entire grid (Task 1,Task 3,Task 12,Task 13,Task 522)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 1,Task 3,Task 12,Task 13,Task 522');

      cy.get('@grid2').find('#items-per-page-label').select('5');

      cy.get('@grid2').find('[data-test=page-number-input]').clear().type('3').type('{enter}');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);
    });

    it('should go to last Page of 2nd Grid and still have 1 row selected in that Page and also retain 5 selected rows in the entire grid (Task 1,Task 3,Task 12,Task 13,Task 522)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.icon-seek-end').click();

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 1,Task 3,Task 12,Task 13,Task 522');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 1);
    });
  });

  describe('Row Selection', () => {
    it('should click on 3rd row and of the Grid1 and expect to see "Task 300" selected', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1');
      cy.get('.slick-row:nth(2) .slick-cell:nth(0) input[type=checkbox]').click({ force: true });

      cy.get('[data-test=grid1-selections]').contains('Task 300');

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(2);
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: { gridRowIndexes: [2], dataContextIds: [300], filteredDataContextIds: [300] },
          type: 'rowSelection',
        });
      });
    });

    it('should remove the filter from Grid1', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1')
        .find('.filter-title')
        .type('{backspace}{backspace}')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.eq('');
        });
    });

    it('should go to Page 61 of Grid1 and expect to find "Task 300" still be selected', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1').find('[data-test=page-number-input]').clear().type('61').type('{enter}');

      cy.get('[data-test=grid1-selections]').contains('Task 300');

      cy.get('.slick-cell.l0.r0.slick-cell-checkboxsel.selected').should('exist');

      cy.get('[data-test=grid1-selections]').contains('Task 300');
    });

    it('should go to a different page for next test to confirm that it will then go to page 1', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('[data-test=page-number-input]').clear().type('22').type('{enter}');

      cy.get('@grid2').find('[data-test=page-count]').contains('105');

      cy.get('@grid2').find('[data-test=item-from]').contains('106');

      cy.get('@grid2').find('[data-test=item-to]').contains('110');

      cy.get('@grid2').find('[data-test=total-items]').contains('525');
    });

    it('should have 2 rows (Task 3,Task 13) selected in 2nd grid after typing in a search filter (3)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.filter-title').type('3').wait(100);

      cy.get('@grid2')
        .find('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('@grid2').find('.slick-row').should('not.have.length', 0);

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 3,Task 13');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);

      cy.window().then((win) => {
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: { gridRowIndexes: [1, 0], dataContextIds: [1, 12, 13, 3, 522], filteredDataContextIds: [3, 13] },
          type: 'rowSelection',
        });
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: [
            {
              columnId: 'title',
              operator: 'Contains',
              searchTerms: ['3'],
              targetSelector: 'input.form-control.filter-title.search-filter.slick-filter.filled',
            },
          ],
          type: 'filter',
        });
      });
    });

    it('should remove filter from Grid2', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.filter-title').type('{backspace}');
    });
  });

  describe('Remove Pagination', () => {
    it('should remove Pagination and not expect any DOM elements of it', () => {
      cy.get('[data-test=toggle-pagination-grid2]').click();

      cy.get('#slickGridContainer-grid2 .slick-pagination').should('not.exist');

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(2);
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: {
            gridRowIndexes: [1, 12, 13, 3, 522],
            dataContextIds: [1, 12, 13, 3, 522],
            filteredDataContextIds: [1, 3, 12, 13, 522],
          },
          type: 'rowSelection',
        });
      });
    });

    it('should have 5 rows (Task 1,Task 3,Task 12,Task 13,Task 522) selected in the entire 2nd grid BUT only 2 shown in the DOM in the top portion of the grid (because SlickGrid uses virtual rendering)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 1,Task 3,Task 12,Task 13,Task 522');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);
    });

    it('should scroll to the bottom of 2nd Grid and still have 5 rows (Task 1,Task 3,Task 12,Task 13,Task 522) selected and find 2 row selected because we now have 2 rows that got rendered (first and last)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 1,Task 3,Task 12,Task 13,Task 522');

      cy.get('@grid2').find('.slick-viewport-top.slick-viewport-left').scrollTo('bottom').wait(10);

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);
    });

    it('should have 2 rows (Task 3,Task 13) selected in 2nd grid after typing in a search filter (3)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.filter-title').type('3');

      cy.get('@grid2').find('.slick-viewport-top.slick-viewport-left').scrollTo('top').wait(10);

      cy.get('@grid2').find('.slick-row').should('not.have.length', 0);

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 3,Task 13');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(4);
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: { gridRowIndexes: [1, 0], dataContextIds: [1, 12, 13, 3, 522], filteredDataContextIds: [3, 13] },
          type: 'rowSelection',
        });
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: [
            {
              columnId: 'title',
              operator: 'Contains',
              searchTerms: ['3'],
              targetSelector: 'input.form-control.filter-title.search-filter.slick-filter.filled',
            },
          ],
          type: 'filter',
        });
      });
    });

    it('should remove filter from Grid2', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.filter-title').type('{backspace}');
    });
  });

  describe('Re-enable Pagination', () => {
    it('should re-enable the Pagination and expect to see it show it again below the grid at Page 1', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('[data-test=toggle-pagination-grid2]').click();

      cy.get('#slickGridContainer-grid2 .slick-pagination').should('exist');

      cy.get('@grid2')
        .find('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('@grid2').find('[data-test=page-number-input]').click();

      cy.get('@grid2').find('[data-test=page-count]').contains('105');

      cy.get('@grid2').find('[data-test=item-from]').contains('1');

      cy.get('@grid2').find('[data-test=item-to]').contains('5');

      cy.get('@grid2').find('[data-test=total-items]').contains('525');

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(4);
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: { gridRowIndexes: [1, 3], dataContextIds: [1, 12, 13, 3, 522], filteredDataContextIds: [1, 3, 12, 13, 522] },
          type: 'rowSelection',
        });
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: { pageNumber: 1, pageSize: 5 },
          type: 'pagination',
        });
      });
    });

    it('should have 2 rows (Task 3,Task 13) selected in 2nd grid after typing in a search filter (3)', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.filter-title').type('3');

      cy.get('@grid2').find('.slick-row').should('not.have.length', 0);

      cy.get('[data-test=grid2-selections]').should('contain', 'Task 3,Task 13');

      cy.get('@grid2').find('.slick-row').children().filter('.slick-cell-checkboxsel.selected').should('have.length', 2);

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(4);
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: { gridRowIndexes: [1, 0], dataContextIds: [1, 12, 13, 3, 522], filteredDataContextIds: [3, 13] },
          type: 'rowSelection',
        });
        expect(win.console.log).to.be.calledWith('Grid State changed:: ', {
          newValues: [
            {
              columnId: 'title',
              operator: 'Contains',
              searchTerms: ['3'],
              targetSelector: 'input.form-control.filter-title.search-filter.slick-filter.filled',
            },
          ],
          type: 'filter',
        });
      });

      cy.get('@grid2')
        .find('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('@grid2').find('[data-test=page-count]').contains('3');

      cy.get('@grid2').find('[data-test=item-from]').contains('1');

      cy.get('@grid2').find('[data-test=item-to]').contains('5');

      cy.get('@grid2').find('[data-test=total-items]').contains('179');
    });

    it('should Select All and expect all pages to no longer have any row selected', () => {
      cy.get('#filter-checkbox-selectall-container input[type=checkbox]').click({ force: true });
    });

    it('should go to the next 2 pages and expect all rows selected in each page', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.icon-seek-next').click();

      cy.get('@grid2').find('.slick-cell-checkboxsel input:checked').should('have.length', 5);

      cy.get('@grid2').find('.icon-seek-next').click();

      cy.get('@grid2').find('.slick-cell-checkboxsel input:checked').should('have.length', 5);
    });

    it('should uncheck 1 row and expect current and next page to have "Select All" uncheck', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.slick-row:nth(0) .slick-cell:nth(0) input[type=checkbox]').click({ force: true });

      cy.get('@grid2').find('#filter-checkbox-selectall-container input[type=checkbox]').should('not.be.checked', true);

      cy.get('@grid2').find('.icon-seek-next').click();

      cy.get('@grid2').find('#filter-checkbox-selectall-container input[type=checkbox]').should('not.be.checked', true);
    });

    it('should go back to previous page, select the row that was unchecked and expect "Select All" to be selected again', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('.icon-seek-prev').click();

      cy.get('@grid2').find('.slick-row:nth(0) .slick-cell:nth(0) input[type=checkbox]').click({ force: true });

      cy.get('@grid2').find('#filter-checkbox-selectall-container input[type=checkbox]').should('be.checked', true);

      cy.get('@grid2').find('.icon-seek-next').click();

      cy.get('@grid2').find('#filter-checkbox-selectall-container input[type=checkbox]').should('be.checked', true);
    });

    it('should Unselect All and expect all pages to no longer have any row selected', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2').find('#filter-checkbox-selectall-container input[type=checkbox]').click({ force: true });

      cy.get('@grid2').find('.slick-cell-checkboxsel input:checked').should('have.length', 0);

      cy.get('@grid2').find('.icon-seek-prev').click();

      cy.get('@grid2').find('.slick-cell-checkboxsel input:checked').should('have.length', 0);

      cy.get('@grid2').find('.icon-seek-prev').click();

      cy.get('@grid2').find('.slick-cell-checkboxsel input:checked').should('have.length', 0);
    });
  });
});

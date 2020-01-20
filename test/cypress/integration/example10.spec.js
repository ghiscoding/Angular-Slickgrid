/// <reference types="cypress" />

describe('Example 10 - Multiple Grids with Row Selection', () => {
  const titles = ['', 'Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/selection`);
    cy.get('h2').should('contain', 'Example 10: Multiple Grids with Row Selection');
  });

  it('should have 2 grids of width of 800px and different height', () => {
    cy.get('#slickGridContainer-grid1').as('grid1');
    cy.get('@grid1').should('have.css', 'width', '800px');

    cy.get('@grid1')
      .find('.slickgrid-container')
      .should('have.css', 'height', '225px');

    cy.get('#slickGridContainer-grid2').as('grid2');
    cy.get('@grid2').should('have.css', 'width', '800px');

    cy.get('@grid2')
      .find('.slickgrid-container')
      .should('have.css', 'height', '255px');
  });

  it('should have exact Titles on 1st grid', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => {
        expect($child.text()).to.eq(titles[index]);
      });
  });

  it('should have 2 rows pre-selected in 2nd grid', () => {
    cy.get('[data-test=grid2-selections]').should('contain', 'Task 0,Task 2');

    cy.get('#grid2')
      .find('.slick-row')
      .children()
      .filter('.slick-cell-checkboxsel.selected.true')
      .should('have.length', 2);
  });

  it('should have 0 rows selected in 2nd grid after typing in a search filter', () => {
    cy.get('#grid2')
      .find('.filter-title')
      .type('Task 1');

    cy.get('#grid2')
      .find('.slick-row')
      .should('not.have.length', 0);

    cy.get('[data-test=grid2-selections]').should('contain', '');

    cy.get('#grid2')
      .find('.slick-row')
      .children()
      .filter('.slick-cell-checkboxsel.selected.true')
      .should('have.length', 0);
  });

  it('should make sure that first column is hidden from the Grid Menu (1st column definition has "excludeFromGridMenu" set) on 1st grid', () => {
    cy.get('#grid1')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click();

    cy.get('.slick-gridmenu')
      .find('.slick-gridmenu-list')
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
      .get('.slick-gridmenu:visible')
      .find('.slick-gridmenu-list')
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

    cy.get('#grid1')
      .get('.slick-gridmenu:visible')
      .find('span.close')
      .trigger('click')
      .click();
  });

  it('should show the Title column again from the Column Picker in the 1st grid', () => {
    cy.get('#grid1')
      .find('.slick-header-column')
      .first()
      .trigger('mouseover')
      .trigger('contextmenu')
      .invoke('show');

    cy.get('.slick-columnpicker')
      .find('.slick-columnpicker-list')
      .children()
      .each(($child, index) => {
        if (index === 0) {
          expect($child[0].className).to.eq('hidden');
          expect($child[0].offsetHeight).to.eq(0);
          expect($child[0].offsetWidth).to.eq(0);
        }
        expect($child.text()).to.eq(titles[index]);
      });

    cy.get('.slick-columnpicker')
      .find('.slick-columnpicker-list')
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

    cy.get('#grid1')
      .get('.slick-columnpicker:visible')
      .find('span.close')
      .trigger('click')
      .click();
  });

  describe('Pagination', () => {
    it('should Clear all Filters on 2nd Grid and expect the same Pagination defined in both Grids', () => {
      cy.get('#grid2')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

      cy.get(`.slick-gridmenu:visible`)
        .find('.slick-gridmenu-item')
        .first()
        .find('span')
        .contains('Clear all Filters')
        .click();
    });

    it('should have Pagination displayed and set on Grid1 and Grid2', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');
      cy.get('#slickGridContainer-grid2').as('grid2');

      // 1st Grid
      cy.get('@grid1')
        .find('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('1'));

      cy.get('@grid1')
        .find('[data-test=page-count]')
        .contains('99');

      cy.get('@grid1')
        .find('[data-test=item-from]')
        .contains('1');

      cy.get('@grid1')
        .find('[data-test=item-to]')
        .contains('5');

      cy.get('@grid1')
        .find('[data-test=total-items]')
        .contains('495');

      // 2nd Grid
      cy.get('@grid2')
        .find('[data-test=page-count]')
        .contains('105');

      cy.get('@grid2')
        .find('[data-test=item-from]')
        .contains('1');

      cy.get('@grid2')
        .find('[data-test=item-to]')
        .contains('5');

      cy.get('@grid2')
        .find('[data-test=total-items]')
        .contains('525');
    });

    it('should change Page Number in Grid1 and expect the Pagination to have correct values', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1')
        .find('[data-test=page-number-input]')
        .clear()
        .type('52')
        .type('{enter}');

      cy.get('@grid1')
        .find('[data-test=page-count]')
        .contains('99');

      cy.get('@grid1')
        .find('[data-test=item-from]')
        .contains('256');

      cy.get('@grid1')
        .find('[data-test=item-to]')
        .contains('260');

      cy.get('@grid1')
        .find('[data-test=total-items]')
        .contains('495');
    });

    it('should change Page Number and Page Size in Grid2 and expect the Pagination to have correct values', () => {
      cy.get('#slickGridContainer-grid2').as('grid2');

      cy.get('@grid2')
        .find('[data-test=page-number-input]')
        .clear()
        .type('34')
        .type('{enter}');

      cy.get('@grid2')
        .find('[data-test=page-count]')
        .contains('105');

      cy.get('@grid2')
        .find('[data-test=item-from]')
        .contains('166');

      cy.get('@grid2')
        .find('[data-test=item-to]')
        .contains('170');

      cy.get('@grid2')
        .find('[data-test=total-items]')
        .contains('525');

      cy.get('@grid2')
        .find('#items-per-page-label').select('75');

      cy.get('@grid2')
        .find('[data-test=page-count]')
        .contains('7');

      cy.get('@grid2')
        .find('[data-test=item-from]')
        .contains('1');

      cy.get('@grid2')
        .find('[data-test=item-to]')
        .contains('75');
    });

    it('should go back to Grid1 and expect the same value before changing Pagination of Grid2', () => {
      cy.get('#slickGridContainer-grid1').as('grid1');

      cy.get('@grid1')
        .find('[data-test=page-count]')
        .contains('99');

      cy.get('@grid1')
        .find('[data-test=item-from]')
        .contains('256');

      cy.get('@grid1')
        .find('[data-test=item-to]')
        .contains('260');

      cy.get('@grid1')
        .find('[data-test=total-items]')
        .contains('495');
    });
  });
});

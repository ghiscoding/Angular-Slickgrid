/// <reference types="cypress" />

describe('Example 1 - Basic Grids', () => {
  const titles = ['Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}`);
    cy.get('h2').should('contain', 'Example 1: Basic Grids');
  });

  it('should have 2 grids of size 800 by 225px', () => {
    cy.get('#slickGridContainer-grid1')
      .should('have.css', 'width', '800px');

    cy.get('#slickGridContainer-grid1 > .slickgrid-container')
      .should('have.css', 'height', '225px');

    cy.get('#slickGridContainer-grid2')
      .should('have.css', 'width', '800px');

    cy.get('#slickGridContainer-grid2 > .slickgrid-container')
      .should('have.css', 'height', '225px');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should hover over the Title column and click on "Sort Descending" command', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-column')
      .first()
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
      .first()
      .children('.slick-cell')
      .first()
      .should('contain', 'Task 994');
  });

  it('should hover over the "Title" column of 2nd grid and click on "Sort Ascending" command', () => {
    const tasks = ['Task 0', 'Task 1', 'Task 10', 'Task 100', 'Task 101'];

    cy.get('#grid2')
      .find('.slick-header-column')
      .first()
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('be.visible')
      .children('.slick-header-menuitem:nth-child(1)')
      .children('.slick-header-menucontent')
      .should('contain', 'Sort Ascending')
      .click();

    cy.get('#grid2')
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

  it('should hover over the "Duration" column of 2nd grid, Sort Ascending and have 2 sorts', () => {
    cy.get('#grid2')
      .find('.slick-header-column:nth-child(2)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .invoke('show')
      .click();

    cy.get('#grid2')
      .find('.slick-header-menu')
      .should('be.visible')
      .children('.slick-header-menuitem:nth-child(2)')
      .click();

    cy.get('#grid2')
      .find('.slick-sort-indicator-asc')
      .should('have.length', 1)
      .siblings('.slick-sort-indicator-numbered')
      .contains('1');

    cy.get('#grid2')
      .find('.slick-sort-indicator-desc')
      .should('have.length', 1)
      .siblings('.slick-sort-indicator-numbered')
      .contains('2');
  });

  it('should clear sorting of grid2 using the Grid Menu "Clear all Sorting" command', () => {
    cy.get('#grid2')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click();
  });

  it('should have no sorting in 2nd grid', () => {
    let gridUid = '';
    const grid2Tasks = ['Task 0', 'Task 1', 'Task 10', 'Task 100', 'Task 101'];

    cy.get('#grid2')
      .should(($grid) => {
        const classes = $grid.prop('className').split(' ');
        gridUid = classes.find(className => /slickgrid_.*/.test(className));
        expect(gridUid).to.not.be.null;
      })
      .then(() => {
        cy.get(`.slick-gridmenu.${gridUid}`)
          .find('.slick-gridmenu-item')
          .first()
          .find('span')
          .contains('Clear all Sorting')
          .click();

        cy.get('#grid2')
          .find('.slick-sort-indicator-asc')
          .should('have.length', 0);

        cy.get('#grid2')
          .find('.slick-sort-indicator-desc')
          .should('have.length', 0);

        cy.get('#grid2')
          .find('.slick-row')
          .each(($row, index) => {
            if (index > grid2Tasks.length - 1) {
              return;
            }
            cy.wrap($row).children('.slick-cell')
              .first()
              .should('contain', grid2Tasks[index]);
          });
      });
  });

  it('should retain sorting in 1st grid', () => {
    cy.get('#grid1')
      .find('.slick-sort-indicator-desc')
      .should('have.length', 1);
  });

  it('should have Pagination displayed and set on Grid2', () => {
    cy.get('[data-test=page-number-input]')
      .invoke('val')
      .then(pageNumber => expect(pageNumber).to.eq('1'));

    cy.get('[data-test=page-count]')
      .contains('199');

    cy.get('[data-test=item-from]')
      .contains('1');

    cy.get('[data-test=item-to]')
      .contains('5');

    cy.get('[data-test=total-items]')
      .contains('995');
  });

  it('should change Page Number 52 and expect the Pagination to have correct values', () => {
    cy.get('[data-test=page-number-input]')
      .clear()
      .type('52')
      .type('{enter}');

    cy.get('[data-test=page-count]')
      .contains('199');

    cy.get('[data-test=item-from]')
      .contains('256');

    cy.get('[data-test=item-to]')
      .contains('260');

    cy.get('[data-test=total-items]')
      .contains('995');
  });
});

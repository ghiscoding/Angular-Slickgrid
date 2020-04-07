/// <reference types="Cypress" />

describe('Example 17 - Row Move & Checkbox Selector Selector Plugins', () => {
  const fullTitles = ['', '', 'Title', 'Duration', '% Complete', 'Start', 'Finish', 'Completed'];

  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, "log");
    });
  });

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
});

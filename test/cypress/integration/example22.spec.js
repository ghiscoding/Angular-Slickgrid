/// <reference types="cypress" />

describe('Example 22 - Use of Angular Components', () => {
  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/angular-components`);
    cy.get('h2').should('contain', 'Example 22: Use of Angular Components');
  });

  it('should click on the last column "Action" dropdown of 2nd row, and then "Delete Row" and expect it to be removed from the grid', () => {
    const expectationRowBefore = ['Task 0', 'Task 1', 'Task 2', 'Task 3', 'Task 4'];
    const expectationRowAfter = ['Task 0', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

    // before deleting the row
    cy.get('#grid22')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectationRowBefore.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell')
          .first()
          .should('contain', expectationRowBefore[index]);
      });

    cy.get('#grid22')
      .find('#myDrop-r1-c6')
      .click();

    cy.contains('Delete Row')
      .trigger('click', { force: true });

    // after deleting the row
    cy.get('#grid22')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectationRowAfter.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell')
          .first()
          .should('contain', expectationRowAfter[index]);
      });
  });
});

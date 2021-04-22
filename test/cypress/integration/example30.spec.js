/// <reference types="cypress" />

describe('Example 30 - Columns Resize by Content', () => {
  const titles = ['', 'Title', 'Duration', 'Cost', '% Complete', 'Complexity', 'Start', 'Completed', 'Finish', 'Product', 'Country of Origin', 'Action'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/resize-by-content`);
    cy.get('h2').should('contain', 'Example 30: Columns Resize by Content');
  });

  it('should have cell that fit the text content', () => {
    cy.get('.slick-row').find('.slick-cell:nth(1)').invoke('width').should('be.gt', 75);
    cy.get('.slick-row').find('.slick-cell:nth(2)').invoke('width').should('be.gt', 67);
    cy.get('.slick-row').find('.slick-cell:nth(3)').invoke('width').should('be.gt', 59);
    cy.get('.slick-row').find('.slick-cell:nth(4)').invoke('width').should('be.gt', 102);
    cy.get('.slick-row').find('.slick-cell:nth(5)').invoke('width').should('be.gt', 89);
    cy.get('.slick-row').find('.slick-cell:nth(6)').invoke('width').should('be.gt', 72);
    cy.get('.slick-row').find('.slick-cell:nth(7)').invoke('width').should('be.gt', 67);
    cy.get('.slick-row').find('.slick-cell:nth(8)').invoke('width').should('be.gt', 72);
    cy.get('.slick-row').find('.slick-cell:nth(9)').invoke('width').should('be.gt', 179);
    cy.get('.slick-row').find('.slick-cell:nth(10)').invoke('width').should('be.gt', 94);
    cy.get('.slick-row').find('.slick-cell:nth(11)').invoke('width').should('equal', 58);
  });

  it('should make the grid readonly and expect to fit the text by content and expect column width to be the same as earlier', () => {
    cy.get('[data-test="toggle-readonly-btn"]').click();

    cy.get('.slick-row').find('.slick-cell:nth(1)').invoke('width').should('be.gt', 75);
    cy.get('.slick-row').find('.slick-cell:nth(2)').invoke('width').should('be.gt', 67);
    cy.get('.slick-row').find('.slick-cell:nth(3)').invoke('width').should('be.gt', 59);
    cy.get('.slick-row').find('.slick-cell:nth(4)').invoke('width').should('be.gt', 102);
    cy.get('.slick-row').find('.slick-cell:nth(5)').invoke('width').should('be.gt', 89);
    cy.get('.slick-row').find('.slick-cell:nth(6)').invoke('width').should('be.gt', 72);
    cy.get('.slick-row').find('.slick-cell:nth(7)').invoke('width').should('be.gt', 67);
    cy.get('.slick-row').find('.slick-cell:nth(8)').invoke('width').should('be.gt', 72);
    cy.get('.slick-row').find('.slick-cell:nth(9)').invoke('width').should('be.gt', 179);
    cy.get('.slick-row').find('.slick-cell:nth(10)').invoke('width').should('be.gt', 94);
    cy.get('.slick-row').find('.slick-cell:nth(11)').invoke('width').should('equal', 58);
  });

  it('should click on (default resize "autosizeColumns") and expect column to be much thinner and fit all its column within the grid container', () => {
    cy.get('[data-test="autosize-columns-btn"]').click();

    cy.get('.slick-row').find('.slick-cell:nth(1)').invoke('width').should('be.lt', 75);
    cy.get('.slick-row').find('.slick-cell:nth(2)').invoke('width').should('be.lt', 95);
    cy.get('.slick-row').find('.slick-cell:nth(3)').invoke('width').should('be.lt', 70);
    cy.get('.slick-row').find('.slick-cell:nth(4)').invoke('width').should('be.lt', 100);
    cy.get('.slick-row').find('.slick-cell:nth(5)').invoke('width').should('be.lt', 100);
    cy.get('.slick-row').find('.slick-cell:nth(6)').invoke('width').should('be.lt', 85);
    cy.get('.slick-row').find('.slick-cell:nth(7)').invoke('width').should('be.lt', 70);
    cy.get('.slick-row').find('.slick-cell:nth(8)').invoke('width').should('be.lt', 85);
    cy.get('.slick-row').find('.slick-cell:nth(9)').invoke('width').should('be.lt', 120);
    cy.get('.slick-row').find('.slick-cell:nth(10)').invoke('width').should('be.lt', 100);
    cy.get('.slick-row').find('.slick-cell:nth(11)').invoke('width').should('equal', 58);
  });
});

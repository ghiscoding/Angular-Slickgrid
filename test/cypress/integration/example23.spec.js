/// <reference types="cypress" />

describe('Example 23 - Grid AutoHeight', () => {
  const fullTitles = ['Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/autoheight`);
    cy.get('h2').should('contain', 'Example 23: Grid AutoHeight');
  });

  it('should have exact column titles in grid', () => {
    cy.get('#slickGridContainer-grid23')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should search for Duration over 50 and expect rows to be that', () => {
    cy.get('[data-test="search-column-list"]')
      .select('Duration (days)');

    cy.get('[data-test="search-operator-list"]')
      .select('>');

    cy.get('[data-test="search-value-input"]')
      .type('50');

    cy.get('#grid23')
      .find('.slick-row .slick-cell:nth(1)')
      .each(($child, index) => {
        if (index > 10) {
          return;
        }
        expect(+$child.text()).to.be.gt(50);
      });
  });

  it('should search for Duration below 50 and expect rows to be that', () => {
    cy.get('[data-test="search-operator-list"]')
      .select('<');

    cy.wait(200);

    cy.get('#grid23')
      .find('.slick-row .slick-cell:nth(1)')
      .each(($child, index) => {
        if (index > 10) {
          return;
        }
        expect(+$child.text()).to.be.lt(50);
      });
  });
});

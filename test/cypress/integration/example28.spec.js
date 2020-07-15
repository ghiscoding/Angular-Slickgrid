/// <reference types="cypress" />

describe('Example 28 - Tree Data (from a Hierarchical Dataset)', () => {
  const titles = ['Title', 'Duration', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/tree-data-parent-child`);
    cy.get('h2').should('contain', 'Example 28: Tree Data (from a flat dataset with parentId references)');
  });

  it('should have exact column titles in grid', () => {
    cy.get('#grid28')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should have a Grid Preset Filter on 3rd column "% Complete" and expect all rows to be filtered as well', () => {
    cy.get('.input-group-text.rangeOutput_percentComplete')
      .contains('25');

    cy.get('.search-filter.filter-percentComplete')
      .find('.input-group-addon.operator select')
      .contains('>=');
  });

  it('should collapsed all rows from "Collapse All" button', () => {
    cy.get('[data-test=collapse-all]')
      .contains('Collapse All')
      .click();

    cy.get('#grid28')
      .find('.slick-group-toggle.expanded')
      .should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.collapsed')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });

  it('should expand all rows from "Expand All" button', () => {
    cy.get('[data-test=expand-all]')
      .contains('Expand All')
      .click();

    cy.get('#grid28')
      .find('.slick-group-toggle.collapsed')
      .should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.expanded')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });

  it('should collapsed all rows from "Collapse All" context menu', () => {
    cy.get('#grid28')
      .contains('5 days');

    cy.get('#grid28')
      .find('.slick-row .slick-cell:nth(1)')
      .rightclick({ force: true });

    cy.get('.slick-context-menu.dropright .slick-context-menu-command-list')
      .find('.slick-context-menu-item')
      .find('.slick-context-menu-content')
      .contains('Collapse all Groups')
      .click();

    cy.get('#grid28')
      .find('.slick-group-toggle.expanded')
      .should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.collapsed')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });

  it('should collapsed all rows from "Expand All" context menu', () => {
    cy.get('#grid28')
      .contains('5 days');

    cy.get('#grid28')
      .find('.slick-row .slick-cell:nth(1)')
      .rightclick({ force: true });

    cy.get('.slick-context-menu.dropright .slick-context-menu-command-list')
      .find('.slick-context-menu-item')
      .find('.slick-context-menu-content')
      .contains('Expand all Groups')
      .click();

    cy.get('#grid28')
      .find('.slick-group-toggle.collapsed')
      .should('have.length', 0);

    cy.get('#grid28')
      .find('.slick-group-toggle.expanded')
      .should(($rows) => expect($rows).to.have.length.greaterThan(0));
  });
});

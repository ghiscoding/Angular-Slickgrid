/// <reference types="cypress" />

function removeExtraSpaces(textS) {
  return `${textS}`.replace(/\s+/g, ' ').trim();
}

describe('Example 20 - Frozen Grid', { retries: 1 }, () => {
  // NOTE:  everywhere there's a * 2 is because we have a top+bottom (frozen rows) containers even after Unfreeze Columns/Rows

  const fullTitles = ['#', 'Title', '% Complete', 'Start', 'Finish', 'Cost | Duration', 'Effort Driven', 'Title 1', 'Title 2', 'Title 3', 'Title 4'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/frozen`);
    cy.get('h2').should('contain', 'Example 20: Pinned (frozen) Columns/Rows');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#grid20')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should have exact Column Header Titles in the grid', () => {
    cy.get('#grid20')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should have a frozen grid with 4 containers on page load with 3 columns on the left and 4 columns on the right', () => {
    cy.get('[style="top:0px"]').should('have.length', 2 * 2);
    cy.get('.grid-canvas-left > [style="top:0px"]').children().should('have.length', 3 * 2);
    cy.get('.grid-canvas-right > [style="top:0px"]').children().should('have.length', 8 * 2);

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '0');
    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(1)').should('contain', 'Task 0');

    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '2009-01-01');
    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(1)').should('contain', '2009-05-05');
  });

  it('should hide "Title" column from Grid Menu and expect last frozen column to be "% Complete"', () => {
    const newColumnList = ['#', '% Complete', 'Start', 'Finish', 'Cost | Duration', 'Effort Driven', 'Title 1', 'Title 2', 'Title 3', 'Title 4'];

    cy.get('#grid20')
      .find('button.slick-gridmenu-button')
      .click({ force: true });

    cy.get('#grid20')
      .get('.slick-gridmenu:visible')
      .find('.slick-gridmenu-list')
      .children('li:visible:nth(1)')
      .children('label')
      .should('contain', 'Title')
      .click({ force: true });

    cy.get('#grid20')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(newColumnList[index]));

    cy.get('.grid-canvas-left > [style="top:0px"]').children().should('have.length', 2 * 2);
    cy.get('.grid-canvas-right > [style="top:0px"]').children().should('have.length', 8 * 2);

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '');

    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '2009-01-01');
    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(1)').should('contain', '2009-05-05');
  });

  it('should show again "Title" column from Grid Menu and expect last frozen column to still be "% Complete"', () => {
    cy.get('#grid20')
      .get('.slick-gridmenu:visible')
      .find('.slick-gridmenu-list')
      .children('li:visible:nth(1)')
      .children('label')
      .should('contain', 'Title')
      .click({ force: true });

    cy.get('#grid20')
      .get('.slick-gridmenu:visible')
      .find('span.close')
      .click({ force: true });

    cy.get('#grid20')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));

    cy.get('.grid-canvas-left > [style="top:0px"]').children().should('have.length', 3 * 2);
    cy.get('.grid-canvas-right > [style="top:0px"]').children().should('have.length', 8 * 2);

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '');
    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(1)').should('contain', 'Task 0');

    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '2009-01-01');
    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(1)').should('contain', '2009-05-05');
  });

  it('should hide "Title" column from Header Menu and expect last frozen column to be "% Complete"', () => {
    const newColumnList = ['#', '% Complete', 'Start', 'Finish', 'Cost | Duration', 'Effort Driven', 'Title 1', 'Title 2', 'Title 3', 'Title 4'];

    cy.get('#grid20')
      .find('.slick-header-column:nth(1)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('be.visible')
      .children('.slick-header-menuitem:nth-child(8)')
      .children('.slick-header-menucontent')
      .should('contain', 'Hide Column')
      .click();

    cy.get('#grid20')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(newColumnList[index]));

    cy.get('.grid-canvas-left > [style="top:0px"]').children().should('have.length', 2 * 2);
    cy.get('.grid-canvas-right > [style="top:0px"]').children().should('have.length', 8 * 2);

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '');

    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '2009-01-01');
    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(1)').should('contain', '2009-05-05');
  });

  it('should show again "Title" column from Column Picker and expect last frozen column to still be "% Complete"', () => {
    cy.get('#grid20')
      .find('.slick-header-column:nth(5)')
      .trigger('mouseover')
      .trigger('contextmenu')
      .invoke('show');

    cy.get('.slick-columnpicker')
      .find('.slick-columnpicker-list')
      .children('li:nth-child(2)')
      .children('label')
      .should('contain', 'Title')
      .click();

    cy.get('.slick-columnpicker:visible')
      .find('span.close')
      .trigger('click')
      .click();

    cy.get('#grid20')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));

    cy.get('.grid-canvas-left > [style="top:0px"]').children().should('have.length', 3 * 2);
    cy.get('.grid-canvas-right > [style="top:0px"]').children().should('have.length', 8 * 2);

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '');
    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(1)').should('contain', 'Task 0');

    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '2009-01-01');
    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(1)').should('contain', '2009-05-05');
  });

  it('should click on the "Remove Frozen Columns" button to switch to a regular grid without frozen columns and expect 7 columns on the left container', () => {
    cy.get('[data-test=remove-frozen-column-button]')
      .click({ force: true });

    cy.get('[style="top:0px"]').should('have.length', 1 * 2);
    cy.get('.grid-canvas-left > [style="top:0px"]').children().should('have.length', 11 * 2);

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '0');
    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(1)').should('contain', 'Task 0');

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(3)').should('contain', '2009-01-01');
    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(4)').should('contain', '2009-05-05');
  });

  it('should have exact Column Header Titles in the grid', () => {
    cy.get('#grid20')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should click on the "Set 3 Frozen Columns" button to switch frozen columns grid and expect 3 frozen columns on the left and 4 columns on the right', () => {
    cy.get('[data-test=set-3frozen-columns]')
      .click({ force: true });

    cy.get('[style="top:0px"]').should('have.length', 2 * 2);
    cy.get('.grid-canvas-left > [style="top:0px"]').children().should('have.length', 3 * 2);
    cy.get('.grid-canvas-right > [style="top:0px"]').children().should('have.length', 8 * 2);

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '0');
    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(1)').should('contain', 'Task 0');

    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '2009-01-01');
    cy.get('.grid-canvas-right > [style="top:0px"] > .slick-cell:nth(1)').should('contain', '2009-05-05');
  });

  it('should have exact Column Header Titles in the grid', () => {
    cy.get('#grid20')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should click on the Grid Menu command "Unfreeze Columns/Rows" to switch to a regular grid without frozen columns and expect 7 columns on the left container', () => {
    cy.get('#grid20')
      .find('button.slick-gridmenu-button')
      .click({ force: true });

    cy.contains('Unfreeze Columns/Rows')
      .click({ force: true });

    cy.get('[style="top:0px"]').should('have.length', 1);
    cy.get('.grid-canvas-left > [style="top:0px"]').children().should('have.length', 11);

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(0)').should('contain', '0');
    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(1)').should('contain', 'Task 0');

    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(3)').should('contain', '2009-01-01');
    cy.get('.grid-canvas-left > [style="top:0px"] > .slick-cell:nth(4)').should('contain', '2009-05-05');
  });
});

/// <reference types="cypress" />

describe('Example 8 - Header Menu Plugin', () => {
  const titles = ['Title', 'Duration', '% Complete', 'Start', 'Finish', 'Completed'];

  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/headermenu`);
    cy.get('h2').should('contain', 'Example 8: Header Menu Plugin');
  });

  it('should have exact Column Titles in the grid', () => {
    cy.get('#grid8')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should hover over the "Title" column and expect Sort & Hide commands to be disabled', () => {
    cy.get('#grid8')
      .find('.slick-header-column')
      .first()
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menuitem.slick-header-menuitem-disabled')
      .contains('Help')
      .should('exist');

    cy.get('.slick-header-menuitem .slick-header-menucontent')
      .contains('Hide Column')
      .should('exist');
  });

  it(`should be still be able to click on the Help command of 2nd column "Duration" and expect an alert`, () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#grid8')
      .find('.slick-header-column:nth(1)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menuitem.bold')
      .find('.slick-header-menucontent.blue')
      .contains('Help')
      .click()
      .then(() => expect(alertStub.getCall(0)).to.be.calledWith('Please help!!!'))

    cy.window().then((win) => {
      expect(win.console.log).to.have.callCount(1);
      expect(win.console.log).to.be.calledWith('execute an action on Help');
    });
  });

  it('should hover over "Duration" and execute "Sort Ascending" command and expect a sort icon', () => {
    cy.get('#grid8')
      .find('.slick-header-column:nth(1)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .invoke('show')
      .click();

    cy.get('.slick-header-menuitem .slick-header-menucontent')
      .contains('Sort Ascending')
      .click();

    cy.get('.slick-header-column:nth(1).slick-header-sortable.slick-header-column-sorted')
      .find('.slick-sort-indicator.slick-sort-indicator-asc')
      .should('exist');
  });

  it('should hover over "% Complete" and not expect to find the Help menu', () => {
    cy.get('#grid8')
      .find('.slick-header-column:nth(2)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('exist');

    cy.get('.slick-header-menuitem .slick-header-menucontent')
      .contains('Help')
      .should('not.exist');
  });

  it('should execute "Sort Descending" command from the menu left open and expect 2 sort icons afterward and "% Completed" to be descending with >80', () => {
    cy.get('.slick-header-menu')
      .should('exist');

    cy.get('.slick-header-menuitem .slick-header-menucontent')
      .contains('Sort Descending')
      .click()
      .wait(10);

    cy.get('.slick-header-column:nth(1).slick-header-sortable.slick-header-column-sorted')
      .find('.slick-sort-indicator.slick-sort-indicator-asc')
      .should('exist');

    cy.get('.slick-header-column:nth(2).slick-header-sortable.slick-header-column-sorted')
      .find('.slick-sort-indicator.slick-sort-indicator-desc')
      .should('exist');

    cy.get('#grid8')
      .find('.slick-row .slick-cell:nth(1)')
      .contains('0 days');

    cy.get('#grid8')
      .find('.slick-row .slick-cell:nth(2)')
      .each($row => {
        expect(+$row.text()).to.be.greaterThan(80);
      });
  });

  it('should hover over the "Completed" column and expect Help commands to be disabled', () => {
    cy.get('#grid8')
      .find('.slick-header-column:nth(5)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menuitem.slick-header-menuitem-disabled')
      .contains('Help')
      .should('exist');
  });

  it('should remain in the "Completed" column and execute "Hide Column" command and expect it gone from the grid', () => {
    const titles = ['Title', 'Duration', '% Complete', 'Start', 'Finish'];

    cy.get('.slick-header-menuitem.slick-header-menuitem')
      .contains('Hide Column')
      .click();

    cy.get('#grid8')
      .find('.slick-header-columns')
      .children()
      .should('have.length', 5)
      .each(($child, index) => expect($child.text()).to.contain(titles[index]));

  });
});

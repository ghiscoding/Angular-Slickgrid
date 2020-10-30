/// <reference types="cypress" />

describe('Example 7 - Header Button Plugin', () => {
  const titles = ['Resize me!', 'Hover me!', 'Column C', 'Column D', 'Column E', 'Column F', 'Column G', 'Column H', 'Column I', 'Column J'];

  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/headerbutton`);
    cy.get('h2').should('contain', 'Example 7: Header Button Plugin');
  });

  it('should have exact Column Titles in the grid', () => {
    cy.get('#grid7')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should go over the 3rd column "Column C" and expect to see negative number in red after clicking on the red header button', () => {
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(2)')
      .should('contain', 'Column C');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(2)')
      .find('.slick-header-button.fa.fa-circle-o.red.faded')
      .click();

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(2)')
      .find('.slick-header-button.fa.fa-circle-o.red.faded')
      .should('not.exist'); // shouldn't be faded anymore

    cy.window().then((win) => {
      expect(win.console.log).to.have.callCount(1);
      expect(win.console.log).to.be.calledWith(`execute a callback action to "toggle-highlight" on Column C`);
    });

    cy.get('#grid7')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > 10) {
          return; // check only the first 10 rows is enough
        }
        cy.wrap($row).children('.slick-cell:nth(2)')
          .each($cell => {
            const numberValue = $cell.text();
            const htmlValue = $cell.html();
            if (+numberValue < 0) {
              expect(htmlValue).to.eq(`<div style="color:red; font-weight:bold;">${numberValue}</div>`);
            } else {
              expect(htmlValue).to.eq(numberValue);
            }
          });
      });
  });

  it('should go over the 5th column "Column E" and not find the red header button', () => {
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(4)')
      .should('contain', 'Column E');

    // column E should not have the icon
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(4)')
      .find('.slick-header-button')
      .should('not.exist');
  });

  it('should go over the last "Column J" and expect to find the red header button, however it should be usable and number should not display as red', () => {
    cy.get('.slick-viewport-top.slick-viewport-left')
      .scrollTo('right')
      .wait(50);

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(9)')
      .should('contain', 'Column J');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(9)')
      .find('.slick-header-button.fa.fa-circle-o.red.faded')
      .should('exist')
      .click();

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(9)')
      .find('.slick-header-button.fa.fa-circle-o.red.faded')
      .should('exist'); // should still be faded

    cy.get('#grid7')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > 10) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(9)')
          .each($cell => expect($cell.html()).to.eq($cell.text()));
      });
  });

  it('should resize 1st column and make it wider', () => {
    cy.get('.slick-viewport-top.slick-viewport-left')
      .scrollTo('left')
      .wait(50);

    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(0)')
      .should('contain', 'Resize me!');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(0)')
      .find('.slick-header-button:nth(3)')
      .should('be.hidden');

    // Cypress does not yet support the .hover() method and because of that we need to manually resize the element
    // this is not ideal since it only resizes the cell not the entire column but it's enough to test the functionality
    cy.get('.slick-header-column:nth(0)')
      // resize the 1st column
      .each($elm => $elm.width(140))
      .find('.slick-resizable-handle')
      .should('be.visible')
      .invoke('show');

    cy.get('.slick-header-column:nth(0)')
      .should(($el) => {
        const expectedWidth = 140; // calculate with a calculated width including a (+/-)1px precision
        expect($el.width()).greaterThan(expectedWidth - 1);
        expect($el.width()).lessThan(expectedWidth + 1);
      });

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(0)')
      .find('.slick-header-button')
      .should('have.length', 4);
  });

  it('should go on the 2nd column "Hover me!" and expect the header button to appear only when doing hover over it', () => {
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(1)')
      .should('contain', 'Hover me!');

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(1)')
      .find('.slick-header-button.slick-header-button-hidden')
      .should('be.hidden')
      .should('have.css', 'width', '0px');

    // hover is not yet implemented in Cypress, so the following test won't work until then
    // cy.get('.slick-header-columns')
    //   .children('.slick-header-column:nth(1)')
    //   .trigger('mouseover')
    //   .hover()
    //   .find('.slick-header-button')
    //   .should('have.css', 'width', '15px');
  });
});

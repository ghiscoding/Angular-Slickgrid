describe('Example 7 - Header Button Plugin', () => {
  const titles = [
    'Resize me!',
    'Hover me!',
    'Column C',
    'Column D',
    'Column E',
    'Column F',
    'Column G',
    'Column H',
    'Column I',
    'Column J',
  ];

  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  });

  describe('Grid 1', () => {
    it('should display Example title', () => {
      cy.visit(`${Cypress.config('baseUrl')}/headerbutton`);
      cy.get('h2').should('contain', 'Example 7: Header Button Plugin');
    });

    it('should have exact Column Titles in the grid', () => {
      cy.get('#grid7-1 .slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(titles[index]));
    });

    it('should go over the 3rd column "Column C" and expect to see negative number in red after clicking on the red header button', () => {
      cy.get('#grid7-1 .slick-header-columns').children('.slick-header-column:nth(2)').should('contain', 'Column C');

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(2)')
        .find('.slick-header-button.mdi-lightbulb-outline.text-warning.faded')
        .click();

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(2)')
        .find('.slick-header-button.mdi-lightbulb-outline.text-warning.faded')
        .should('not.exist'); // shouldn't be faded anymore

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith(`execute a callback action to "toggle-highlight" on Column C`);
      });

      cy.get('#grid7-1 .slick-row').each(($row, index) => {
        if (index > 10) {
          return; // check only the first 10 rows is enough
        }
        cy.wrap($row)
          .children('.slick-cell:nth(2)')
          .each(($cell) => {
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
      cy.get('#grid7-1 .slick-header-columns').children('.slick-header-column:nth(4)').should('contain', 'Column E');

      // column E should not have the icon
      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(4)')
        .find('.slick-header-button')
        .should('not.exist');
    });

    it('should go over the last "Column J" and expect to find the button to have the disabled class and clicking it should not turn the negative numbers to red neither expect console log after clicking the disabled button', () => {
      cy.get('#grid7-1 .slick-viewport-top.slick-viewport-left').scrollTo('right').wait(50);

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(9)')
        .should('contain', 'Column J')
        .find('.slick-header-button-disabled')
        .should('exist');

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(9)')
        .find('.slick-header-button.slick-header-button-disabled.mdi-lightbulb-outline.text-warning.faded')
        .should('exist')
        .click();

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(9)')
        .find('.slick-header-button.slick-header-button-disabled.mdi-lightbulb-outline.text-warning.faded')
        .should('exist'); // should still be faded after previous click

      cy.get('#grid7-1 .slick-row').each(($row, index) => {
        if (index > 10) {
          return;
        }
        cy.wrap($row)
          .children('.slick-cell:nth(9)')
          .each(($cell) => expect($cell.html()).to.eq($cell.text()));
      });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(0);
      });
    });

    it('should resize 1st column and make it wider', () => {
      cy.get('#grid7-1 .slick-viewport-top.slick-viewport-left').scrollTo('left').wait(50);

      cy.get('#grid7-1 .slick-header-columns').children('.slick-header-column:nth(0)').should('contain', 'Resize me!');

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(0)')
        .find('.slick-header-button:nth(3)')
        .should('be.hidden');

      // Cypress does not yet support the .hover() method and because of that we need to manually resize the element
      // this is not ideal since it only resizes the cell not the entire column but it's enough to test the functionality
      cy.get('#grid7-1 .slick-header-column:nth(0)')
        // resize the 1st column
        .each(($elm) => $elm.width(140))
        .find('.slick-resizable-handle')
        .should('be.visible')
        .invoke('show');

      cy.get('#grid7-1 .slick-header-column:nth(0)').should(($el) => {
        const expectedWidth = 140; // calculate with a calculated width including a (+/-)1px precision
        expect($el.width()).greaterThan(expectedWidth - 1);
        expect($el.width()).lessThan(expectedWidth + 1);
      });

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(0)')
        .find('.slick-header-button')
        .should('have.length', 4);
    });

    it('should resize column to its previous size and still expect some icons to be hidden', () => {
      cy.get('#grid7-1 .slick-header-column:nth(0)')
        // resize the 1st column
        .each(($elm) => $elm.width(50))
        .find('.slick-resizable-handle')
        .should('be.visible')
        .invoke('show');

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(0)')
        .find('.slick-header-button:nth(3)')
        .should('be.hidden');

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(0)')
        .find('.slick-header-button:nth(1)')
        .should('be.hidden');
    });

    it('should go on the 2nd column "Hover me!" and expect the header button to appear only when doing hover over it', () => {
      cy.get('#grid7-1 .slick-header-columns').children('.slick-header-column:nth(1)').should('contain', 'Hover me!');

      cy.get('#grid7-1 .slick-header-columns')
        .children('.slick-header-column:nth(1)')
        .find('.slick-header-button.slick-header-button-hidden')
        .should('be.hidden')
        .should('have.css', 'visibility', 'hidden');
    });
  });

  describe('Grid 2', () => {
    it('should have exact Column Titles in the grid', () => {
      cy.get('#grid7-2 .slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(titles[index]));
    });

    it('should go over the 3rd column "Column C" and expect to see negative number in red after clicking on the red header button', () => {
      cy.get('#grid7-2 .slick-header-columns').children('.slick-header-column:nth(2)').should('contain', 'Column C');

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(2)')
        .find('.slick-header-button.mdi-lightbulb-outline.text-warning.faded')
        .click({ force: true });

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(2)')
        .find('.slick-header-button.mdi-lightbulb-outline.text-warning.faded')
        .should('not.exist'); // shouldn't be faded anymore

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith(`execute a callback action to "toggle-highlight" on Column C`);
      });

      cy.get('#grid7-2 .slick-row').each(($row, index) => {
        if (index > 10) {
          return; // check only the first 10 rows is enough
        }
        cy.wrap($row)
          .children('.slick-cell:nth(2)')
          .each(($cell) => {
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
      cy.get('#grid7-2 .slick-header-columns').children('.slick-header-column:nth(4)').should('contain', 'Column E');

      // column E should not have the icon
      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(4)')
        .find('.slick-header-button')
        .should('not.exist');
    });

    it('should go over the last "Column J" and expect to find the button to have the disabled class and clicking it should not turn the negative numbers to red neither expect console log after clicking the disabled button', () => {
      cy.get('#grid7-2 .slick-viewport-top.slick-viewport-left').scrollTo('right').wait(50);

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(9)')
        .should('contain', 'Column J')
        .find('.slick-header-button-disabled')
        .should('exist');

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(9)')
        .find('.slick-header-button.slick-header-button-disabled.mdi-lightbulb-outline.text-warning.faded')
        .should('exist')
        .click({ force: true });

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(9)')
        .find('.slick-header-button.slick-header-button-disabled.mdi-lightbulb-outline.text-warning.faded')
        .should('exist'); // should still be faded after previous click

      cy.get('#grid7-2 .slick-row').each(($row, index) => {
        if (index > 10) {
          return;
        }
        cy.wrap($row)
          .children('.slick-cell:nth(9)')
          .each(($cell) => expect($cell.html()).to.eq($cell.text()));
      });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(0);
      });
    });

    it('should resize 1st column and make it wider', () => {
      cy.get('#grid7-2 .slick-viewport-top.slick-viewport-left').scrollTo('left').wait(50);

      cy.get('#grid7-2 .slick-header-columns').children('.slick-header-column:nth(0)').should('contain', 'Resize me!');

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(0)')
        .find('.slick-header-button:nth(3)')
        .should('be.hidden');

      // Cypress does not yet support the .hover() method and because of that we need to manually resize the element
      // this is not ideal since it only resizes the cell not the entire column but it's enough to test the functionality
      cy.get('#grid7-2 .slick-header-column:nth(0)')
        // resize the 1st column
        .each(($elm) => $elm.width(140))
        .find('.slick-resizable-handle')
        .should('be.visible')
        .invoke('show');

      cy.get('#grid7-2 .slick-header-column:nth(0)').should(($el) => {
        const expectedWidth = 140; // calculate with a calculated width including a (+/-)1px precision
        expect($el.width()).greaterThan(expectedWidth - 1);
        expect($el.width()).lessThan(expectedWidth + 1);
      });

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(0)')
        .find('.slick-header-button')
        .should('have.length', 4);
    });

    it('should resize column to its previous size and still expect some icons to be hidden', () => {
      cy.get('#grid7-2 .slick-header-column:nth(0)')
        // resize the 1st column
        .each(($elm) => $elm.width(50))
        .find('.slick-resizable-handle')
        .should('be.visible')
        .invoke('show');

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(0)')
        .find('.slick-header-button:nth(3)')
        .should('be.hidden');

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(0)')
        .find('.slick-header-button:nth(1)')
        .should('be.hidden');
    });

    it('should go on the 2nd column "Hover me!" and expect the header button to appear only when doing hover over it', () => {
      cy.get('#grid7-2 .slick-header-columns').children('.slick-header-column:nth(1)').should('contain', 'Hover me!');

      cy.get('#grid7-2 .slick-header-columns')
        .children('.slick-header-column:nth(1)')
        .find('.slick-header-button.slick-header-button-hidden')
        .should('be.hidden')
        .should('have.css', 'visibility', 'hidden');
    });

    it('should filter "Column C" with positive number only and not expect any more red values', () => {
      cy.get('#grid7-2 .search-filter.filter-2').type('>0');

      cy.get('#grid7-2 .slick-row').each(($row, index) => {
        if (index > 10) {
          return; // check only the first 10 rows is enough
        }
        cy.wrap($row)
          .children('.slick-cell:nth(2)')
          .each(($cell) => {
            const numberValue = $cell.text();
            expect(+numberValue).to.be.greaterThan(0);
          });
      });
    });

    it('should hover over the "Column C" and click on "Clear Filter" and expect grid to have all rows shown', () => {
      cy.get('#grid7-2 .slick-header-column:nth(2)')
        .first()
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .invoke('show')
        .click();

      cy.get('#grid7-2 .slick-header-menu .slick-menu-command-list')
        .should('be.visible')
        .children('.slick-menu-item:nth-of-type(6)')
        .children('.slick-menu-content')
        .should('contain', 'Remove Filter')
        .click();

      cy.get('.slick-row').should('have.length.greaterThan', 1);
    });

    it('should Clear all Sorting', () => {
      cy.get('#grid7-2').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item:nth(1)').find('span').contains('Clear all Sorting').click();
    });

    it('should hover over the "Column C" and click on "Sort Ascending"', () => {
      cy.get('#grid7-2 .slick-header-column:nth(2)').first().trigger('mouseover').children('.slick-header-menu-button').click();

      cy.get('#grid7-2 .slick-header-menu .slick-menu-command-list')
        .should('be.visible')
        .children('.slick-menu-item:nth-of-type(3)')
        .children('.slick-menu-content')
        .should('contain', 'Sort Ascending')
        .click();
    });

    it('should expect first few items of "Column C" to be negative numbers and be red', () => {
      cy.get('#grid7-2 .slick-viewport-top.slick-viewport-left').scrollTo('top').wait(50);

      cy.get('#grid7-2 .slick-row').each(($row, index) => {
        if (index > 10) {
          return; // check only the first 10 rows is enough
        }
        cy.wrap($row)
          .children('.slick-cell:nth(2)')
          .each(($cell) => {
            const numberValue = $cell.text();
            const htmlValue = $cell.html();
            expect(htmlValue).to.eq(`<div style="color:red; font-weight:bold;">${numberValue}</div>`);
          });
      });
    });
  });
});

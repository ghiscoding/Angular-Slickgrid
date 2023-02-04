describe('Example 31 - Columns Resize by Content', { retries: 1 }, () => {
  const GRID_ROW_HEIGHT = 33;

  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/resize-by-content`);
    cy.get('h2').should('contain', 'Example 31: Columns Resize by Content');
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

  it('should double-click on the "Complexity" column resize handle and expect the column to become wider and show all text', () => {
    cy.get('.slick-row').find('.slick-cell:nth(5)').invoke('width').should('be.lt', 80);

    cy.get('.slick-header-column:nth-child(6) .slick-resizable-handle')
      .dblclick();

    cy.get('.slick-row').find('.slick-cell:nth(5)').invoke('width').should('be.gt', 95);
  });

  it('should open the "Product" header menu and click on "Resize by Content" and expect the column to become wider and show all text', () => {
    cy.get('.slick-row').find('.slick-cell:nth(9)').invoke('width').should('be.lt', 120);

    cy.get('#grid31')
      .find('.slick-header-column:nth-child(10)')
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(1)')
      .children('.slick-menu-content')
      .should('contain', 'Resize by Content')
      .click();

    cy.get('.slick-row').find('.slick-cell:nth(9)').invoke('width').should('be.gt', 120);
  });

  it('should change row selection across multiple pages, first page should have 2 selected', () => {
    cy.get('[data-test="set-dynamic-rows-btn"]').click();

    // Row index 3, 4 and 11 (last one will be on 2nd page)
    cy.get('input[type="checkbox"]:checked').should('have.length', 2); // 2x in current page and 1x in next page
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 3}px"] > .slick-cell:nth(0) input[type="checkbox"]`).should('be.checked');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 4}px"] > .slick-cell:nth(0) input[type="checkbox"]`).should('be.checked');
  });

  it('should go to next page and expect 1 row selected in that second page', () => {
    cy.get('.icon-seek-next').click();

    cy.get('input[type="checkbox"]:checked').should('have.length', 1); // only 1x row in page 2
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 1}px"] > .slick-cell:nth(0) input[type="checkbox"]`).should('be.checked');
  });

  it('should click on "Select All" checkbox and expect all rows selected in current page', () => {
    const expectedRowIds = [11, 3, 4];

    // go back to 1st page
    cy.get('.icon-seek-prev')
      .click();

    cy.get('#filter-checkbox-selectall-container input[type=checkbox]')
      .click({ force: true });

    cy.window().then((win) => {
      expect(win.console.log).to.have.callCount(3);
      expect(win.console.log).to.be.calledWith('Selected Ids:', expectedRowIds);
    });
  });

  it('should go to the next 2 pages and expect all rows selected in each page', () => {
    cy.get('.icon-seek-next')
      .click();

    cy.get('.slick-cell-checkboxsel input:checked')
      .should('have.length', 10);

    cy.get('.icon-seek-next')
      .click();

    cy.get('.slick-cell-checkboxsel input:checked')
      .should('have.length', 10);
  });

  it('should uncheck 1 row and expect current and next page to have "Select All" uncheck', () => {
    cy.get('.slick-row:nth(0) .slick-cell:nth(0) input[type=checkbox]')
      .click({ force: true });

    cy.get('#filter-checkbox-selectall-container input[type=checkbox]')
      .should('not.be.checked', true);

    cy.get('.icon-seek-next')
      .click();

    cy.get('#filter-checkbox-selectall-container input[type=checkbox]')
      .should('not.be.checked', true);
  });

  it('should go back to previous page, select the row that was unchecked and expect "Select All" to be selected again', () => {
    cy.get('.icon-seek-prev')
      .click();

    cy.get('.slick-row:nth(0) .slick-cell:nth(0) input[type=checkbox]')
      .click({ force: true });

    cy.get('#filter-checkbox-selectall-container input[type=checkbox]')
      .should('be.checked', true);

    cy.get('.icon-seek-next')
      .click();

    cy.get('#filter-checkbox-selectall-container input[type=checkbox]')
      .should('be.checked', true);
  });

  it('should Unselect All and expect all pages to no longer have any row selected', () => {
    cy.get('#filter-checkbox-selectall-container input[type=checkbox]')
      .click({ force: true });

    cy.get('.slick-cell-checkboxsel input:checked')
      .should('have.length', 0);

    cy.get('.icon-seek-prev')
      .click();

    cy.get('.slick-cell-checkboxsel input:checked')
      .should('have.length', 0);

    cy.get('.icon-seek-prev')
      .click();

    cy.get('.slick-cell-checkboxsel input:checked')
      .should('have.length', 0);
  });
});

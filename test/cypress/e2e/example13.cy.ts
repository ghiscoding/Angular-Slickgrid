describe('Example 13 - Custom Backend Server Pagination', () => {
  const fullTitles = ['Note', 'Status', 'Currency', 'Amount', 'Input Date', 'Input Time'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/swt`);
    cy.get('h2').should('contain', 'Example 13: Custom Backend Server Pagination');
  });

  it('should have exact column titles in grid', () => {
    cy.get('#slickGridContainer-common-grid')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should be on 1st page and have default query string', () => {
    cy.get('.slick-pagination-nav input')
      .invoke('val')
      .then((pageNumber) => expect(pageNumber).to.eq('1'));

    cy.get('[data-test="query-string"]').contains('http://127.0.0.1:8080/grid!display.do?¤tPage=1');
  });

  it('should go on next page and expect query to be updated accordingly', () => {
    cy.get('.icon-seek-next').click();

    cy.get('.page-spin').should('be.visible', true);

    cy.get('.slick-pagination-nav input')
      .invoke('val')
      .then((pageNumber) => expect(pageNumber).to.eq('2'));

    cy.get('[data-test="query-string"]').contains('http://127.0.0.1:8080/grid!display.do?¤tPage=2&selectedSort=&selectedFilter=');

    cy.get('.page-spin').should('be.visible', false);
  });

  xit('should filter with "New" Status and expect query string to contains the search and the page to be back to Page 1', () => {
    cy.get('input.search-filter.filter-status').type('New');

    cy.get('.page-spin').should('be.visible', true);

    cy.get('[data-test="query-string"]').contains(
      'http://127.0.0.1:8080/grid!display.do?¤tPage=1&selectedSort=&selectedFilter=All|New|All|All|All|All|'
    );

    cy.get('.slick-pagination-nav input')
      .invoke('val')
      .then((pageNumber) => expect(pageNumber).to.eq('1'));

    cy.get('.page-spin').should('be.visible', false);
  });

  xit('should go to last page 5 and expect query to be updated accordingly', () => {
    cy.get('.icon-seek-end').click();

    cy.get('.page-spin').should('be.visible', true);

    cy.get('.slick-pagination-nav input')
      .invoke('val')
      .then((pageNumber) => expect(pageNumber).to.eq('5'));

    cy.get('[data-test="query-string"]').contains(
      'http://127.0.0.1:8080/grid!display.do?¤tPage=5&selectedSort=&selectedFilter=All|New|All|All|All|All|'
    );

    cy.get('.page-spin').should('be.visible', false);
  });
});

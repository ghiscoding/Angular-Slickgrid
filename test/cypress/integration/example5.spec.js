describe('Example 5 - OData Grid', () => {
  it('should display Example 5 title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/odata`);
    cy.get('h2').should('contain', 'Example 5: Grid connected to Backend Server with OData');
  });

  it('should have default OData query', () => {
    cy.get('[data-test=alert-odata-query]').should('exist');
    cy.get('[data-test=alert-odata-query]').should('contain', 'OData Query');

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=odata-query-result]')
      .should(($span) => {
        expect($span.text()).to.eq(`$top=20&$skip=20&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });
  });

  it('should change Pagination to next page', () => {
    cy.get('.icon-seek-next').click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=odata-query-result]')
      .should(($span) => {
        expect($span.text()).to.eq(`$top=20&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });
  });

  it('should change Pagination to first page with 10 items', () => {
    cy.get('#items-per-page-label').select('10');

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=odata-query-result]')
      .should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });
  });

  it('should change Pagination to last page', () => {
    cy.get('.icon-seek-end').click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=odata-query-result]')
      .should(($span) => {
        expect($span.text()).to.eq(`$top=10&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });
  });

  it('should clear all Filters', () => {
    cy.get('#grid5')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click();

    cy.get(`.slick-gridmenu:visible`)
      .find('.slick-gridmenu-item')
      .first()
      .find('span')
      .contains('Clear All Filters')
      .click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=odata-query-result]')
      .should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name asc`);
      });
  });

  it('should clear all Sorting', () => {
    cy.get('#grid5')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click();

    cy.get(`.slick-gridmenu:visible`)
      .find('.slick-gridmenu-item:nth(1)')
      .find('span')
      .contains('Clear All Sorting')
      .click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=odata-query-result]')
      .should(($span) => {
        expect($span.text()).to.eq(`$top=10`);
      });
  });

  it('should use "substringof" when OData version is set to 2', () => {
    cy.get('.search-filter.filter-name')
      .find('input')
      .type('John');

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=odata-query-result]')
      .should(($span) => {
        expect($span.text()).to.eq(`$top=10&$filter=(substringof('John', Name))`);
      });
  });

  it('should use "contains" when OData version is set to 4', () => {
    cy.get('[data-test=version4]')
      .click();

    cy.get('.search-filter.filter-name')
      .find('input')
      .type('John');

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=odata-query-result]')
      .should(($span) => {
        expect($span.text()).to.eq(`$top=10&$filter=(contains(Name, 'John'))`);
      });
  });
});

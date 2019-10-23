describe('Example 5 - OData Grid', () => {
  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/odata`);
    cy.get('h2').should('contain', 'Example 5: Grid connected to Backend Server with OData');
  });

  describe('when "enableCount" is set', () => {
    it('should have default OData query', () => {
      cy.get('[data-test=alert-odata-query]').should('exist');
      cy.get('[data-test=alert-odata-query]').should('contain', 'OData Query');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=20&$skip=20&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });
    });

    it('should change Pagination to next page', () => {
      cy.get('.icon-seek-next').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=20&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });
    });

    it('should change Pagination to first page with 10 items', () => {
      cy.get('#items-per-page-label').select('10');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });
    });

    it('should change Pagination to last page', () => {
      cy.get('.icon-seek-end').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });
    });

    it('should change Pagination to first page using the external button', () => {
      cy.get('[data-test=goto-first-page')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });
    });

    it('should change Pagination to last page using the external button', () => {
      cy.get('[data-test=goto-last-page')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });
    });

    it('should clear all Filters and expect to go back to first page', () => {
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
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc`);
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
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10`);
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
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$filter=(substringof('John', Name))`);
        });

      cy.get('#grid5')
        .find('.slick-row')
        .should('have.length', 1);
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
          expect($span.text()).to.eq(`$count=true&$top=10&$filter=(contains(Name, 'John'))`);
        });

      cy.get('#grid5')
        .find('.slick-row')
        .should('have.length', 1);
    });
  });

  describe('when "enableCount" is unchecked (not set)', () => {
    it('should clear all Filters, set 20 items per page & uncheck "enableCount"', () => {
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

      cy.get('#items-per-page-label').select('20');

      cy.get('[data-test=enable-count]').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=20`);
        });
    });

    it('should change Pagination to next page', () => {
      cy.get('.icon-seek-next').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=20&$skip=20`);
        });
    });

    it('should change Pagination to first page with 10 items', () => {
      cy.get('#items-per-page-label').select('10');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10`);
        });
    });

    it('should change Pagination to last page', () => {
      cy.get('.icon-seek-end').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$skip=90`);
        });
    });

    it('should click on "Name" column to sort it Ascending', () => {
      cy.get('.slick-header-columns')
        .children('.slick-header-column:nth(1)')
        .click();

      cy.get('.slick-header-columns')
        .children('.slick-header-column:nth(1)')
        .find('.slick-sort-indicator.slick-sort-indicator-asc')
        .should('be.visible');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$skip=90&$orderby=Name asc`);
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
          expect($span.text()).to.eq(`$top=10&$skip=90`);
        });
    });

    it('should use "substringof" when OData version is set to 2', () => {
      cy.get('[data-test=version2]')
        .click();

      cy.get('.search-filter.filter-name')
        .find('input')
        .type('John');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$filter=(substringof('John', Name))`);
        });

      cy.get('#grid5')
        .find('.slick-row')
        .should('have.length', 1);
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

      cy.get('#grid5')
        .find('.slick-row')
        .should('have.length', 1);
    });
  });
});

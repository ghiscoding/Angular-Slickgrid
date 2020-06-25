/// <reference types="cypress" />

describe('Example 5 - OData Grid', () => {
  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  });

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

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('3'));

      cy.get('[data-test=page-count]')
        .contains('3');

      cy.get('[data-test=item-from]')
        .contains('41');

      cy.get('[data-test=item-to]')
        .contains('50');

      cy.get('[data-test=total-items]')
        .contains('50');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=20&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: { pageNumber: 3, pageSize: 20 }, type: 'pagination' });
      });
    });

    it('should change Pagination to first page with 10 items', () => {
      cy.get('#items-per-page-label').select('10');

      // wait for the query to start and finish
      cy.get('[data-test=status]').should('contain', 'processing...');
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]')
        .contains('5');

      cy.get('[data-test=item-from]')
        .contains('1');

      cy.get('[data-test=item-to]')
        .contains('10');

      cy.get('[data-test=total-items]')
        .contains('50');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: { pageNumber: 1, pageSize: 10 }, type: 'pagination' });
      });
    });

    it('should change Pagination to last page', () => {
      cy.get('.icon-seek-end').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('5'));

      cy.get('[data-test=page-count]')
        .contains('5');

      cy.get('[data-test=item-from]')
        .contains('41');

      cy.get('[data-test=item-to]')
        .contains('50');

      cy.get('[data-test=total-items]')
        .contains('50');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: { pageNumber: 5, pageSize: 10 }, type: 'pagination' });
      });
    });

    it('should change Pagination to first page using the external button', () => {
      cy.get('[data-test=goto-first-page')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]')
        .contains('5');

      cy.get('[data-test=item-from]')
        .contains('1');

      cy.get('[data-test=item-to]')
        .contains('10');

      cy.get('[data-test=total-items]')
        .contains('50');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: { pageNumber: 1, pageSize: 10 }, type: 'pagination' });
      });
    });

    it('should change Pagination to last page using the external button', () => {
      cy.get('[data-test=goto-last-page')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('5'));

      cy.get('[data-test=page-count]')
        .contains('5');

      cy.get('[data-test=item-from]')
        .contains('41');

      cy.get('[data-test=item-to]')
        .contains('50');

      cy.get('[data-test=total-items]')
        .contains('50');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
        });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: { pageNumber: 5, pageSize: 10 }, type: 'pagination' });
      });
    });

    it('should Clear all Filters and expect to go back to first page', () => {
      cy.get('#grid5')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

      cy.get(`.slick-gridmenu:visible`)
        .find('.slick-gridmenu-item')
        .first()
        .find('span')
        .contains('Clear all Filters')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]')
        .contains('10');

      cy.get('[data-test=item-from]')
        .contains('1');

      cy.get('[data-test=item-to]')
        .contains('10');

      cy.get('[data-test=total-items]')
        .contains('100');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc`);
        });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(2);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: [], type: 'filter' });
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: { pageNumber: 1, pageSize: 10 }, type: 'pagination' });
      });
    });

    it('should Clear all Sorting', () => {
      cy.get('#grid5')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

      cy.get(`.slick-gridmenu:visible`)
        .find('.slick-gridmenu-item:nth(1)')
        .find('span')
        .contains('Clear all Sorting')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$inlinecount=allpages&$top=10`);
        });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: [], type: 'sorter' });
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

    it('should click on Set Dynamic Filter and expect query and filters to be changed', () => {
      cy.get('[data-test=set-dynamic-filter]')
        .click();

      cy.get('.search-filter.filter-name select')
        .should('have.value', 'a*');

      cy.get('.search-filter.filter-name')
        .find('input')
        .invoke('val')
        .then(text => expect(text).to.eq('A'));

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$count=true&$top=10&$filter=(startswith(Name, 'A'))`);
        });

      cy.get('#grid5')
        .find('.slick-row')
        .should('have.length', 5);
    });
  });

  describe('when "enableCount" is unchecked (not set)', () => {
    it('should Clear all Filters, set 20 items per page & uncheck "enableCount"', () => {
      cy.get('#grid5')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

      cy.get(`.slick-gridmenu:visible`)
        .find('.slick-gridmenu-item')
        .first()
        .find('span')
        .contains('Clear all Filters')
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

      // wait for the query to start and finish
      cy.get('[data-test=status]').should('contain', 'processing...');
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

    it('should Clear all Sorting', () => {
      cy.get('#grid5')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

      cy.get(`.slick-gridmenu:visible`)
        .find('.slick-gridmenu-item:nth(1)')
        .find('span')
        .contains('Clear all Sorting')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$skip=90`);
        });
    });

    it('should click on Set Dynamic Filter and expect query and filters to be changed', () => {
      cy.get('[data-test=set-dynamic-filter]')
        .click();

      cy.get('.search-filter.filter-name select')
        .should('have.value', 'a*');

      cy.get('.search-filter.filter-name')
        .find('input')
        .invoke('val')
        .then(text => expect(text).to.eq('A'));

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$filter=(startswith(Name, 'A'))`);
        });

      cy.get('#grid5')
        .find('.slick-row')
        .should('have.length', 5);
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

  describe('General Pagination Behaviors', () => {
    it('should type a filter which returns an empty dataset', () => {
      cy.get('.search-filter.filter-name')
        .find('input')
        .clear()
        .type('xy');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$filter=(contains(Name, 'xy'))`);
        });

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');
    });

    it('should display page 0 of 0 but hide pagination from/to numbers when filtered data "xy" returns an empty dataset', () => {
      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('0'));

      cy.get('[data-test=page-count]')
        .contains('0');

      cy.get('[data-test=item-from]')
        .should('not.exist');

      cy.get('[data-test=item-to]')
        .should('not.exist');

      cy.get('[data-test=total-items]')
        .contains('0');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$filter=(contains(Name, 'xy'))`);
        });
    });

    it('should erase part of the filter so that it filters with "x"', () => {
      cy.get('.search-filter.filter-name')
        .find('input')
        .type('{backspace}');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$filter=(contains(Name, 'x'))`);
        });

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'done');

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(2);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: [{ columnId: 'name', searchTerms: ['x'] }], type: 'filter' });
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: { pageNumber: 1, pageSize: 10 }, type: 'pagination' });
      });
    });

    it('should display page 1 of 1 with 2 items after erasing part of the filter to be "x" which should return 1 page', () => {
      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then(pageNumber => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]')
        .contains('1');

      cy.get('[data-test=item-from]')
        .contains('1');

      cy.get('[data-test=item-to]')
        .contains('2');

      cy.get('[data-test=total-items]')
        .contains('2');
    });
  });

  describe('Set Dynamic Sorting', () => {
    it('should click on "Set Filters Dynamically" then on "Set Sorting Dynamically"', () => {
      cy.get('[data-test=set-dynamic-filter]')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'processing');
      cy.get('[data-test=status]').should('contain', 'done');

      cy.get('[data-test=set-dynamic-sorting]')
        .click();

      cy.get('[data-test=status]').should('contain', 'processing');
      cy.get('[data-test=status]').should('contain', 'done');
    });

    it('should expect the grid to be sorted by "Name" descending', () => {
      cy.get('#grid5')
        .get('.slick-header-column:nth(1)')
        .find('.slick-sort-indicator-desc')
        .should('have.length', 1);

      cy.get('.slick-row')
        .first()
        .children('.slick-cell:nth(1)')
        .should('contain', 'Ayers Hood');

      cy.get('.slick-row')
        .last()
        .children('.slick-cell:nth(1)')
        .should('contain', 'Alexander Foley');

      cy.get('[data-test=odata-query-result]')
        .should(($span) => {
          expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$filter=(startswith(Name, 'A'))`);
        });
    });
  });
});

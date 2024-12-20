describe('Example 5 - OData Grid', () => {
  const GRID_ROW_HEIGHT = 35;
  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/odata`);
    cy.get('h2').should('contain', 'Example 5: Grid connected to Backend Server with OData');
  });

  describe('when "enableCount" is set', () => {
    it('should have default OData query', () => {
      cy.get('[data-test=alert-odata-query]').should('exist');
      cy.get('[data-test=alert-odata-query]').should('contain', 'OData Query');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=20&$skip=20&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });
    });

    it('should change Pagination to next page', () => {
      cy.get('.icon-seek-next').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('3'));

      cy.get('[data-test=page-count]').contains('3');

      cy.get('[data-test=item-from]').contains('41');

      cy.get('[data-test=item-to]').contains('50');

      cy.get('[data-test=total-items]').contains('50');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=20&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', {
          newValues: { pageNumber: 3, pageSize: 20 },
          type: 'pagination',
        });
      });
    });

    it('should change Pagination to first page with 10 items', () => {
      cy.get('#items-per-page-label').select('10');

      // wait for the query to start and finish
      cy.get('[data-test=status]').should('contain', 'loading');
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]').contains('5');

      cy.get('[data-test=item-from]').contains('1');

      cy.get('[data-test=item-to]').contains('10');

      cy.get('[data-test=total-items]').contains('50');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', {
          newValues: { pageNumber: 1, pageSize: 10 },
          type: 'pagination',
        });
      });
    });

    it('should change Pagination to last page', () => {
      cy.get('.icon-seek-end').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('5'));

      cy.get('[data-test=page-count]').contains('5');

      cy.get('[data-test=item-from]').contains('41');

      cy.get('[data-test=item-to]').contains('50');

      cy.get('[data-test=total-items]').contains('50');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', {
          newValues: { pageNumber: 5, pageSize: 10 },
          type: 'pagination',
        });
      });
    });

    it('should change Pagination to first page using the external button', () => {
      cy.get('[data-test=goto-first-page').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]').contains('5');

      cy.get('[data-test=item-from]').contains('1');

      cy.get('[data-test=item-to]').contains('10');

      cy.get('[data-test=total-items]').contains('50');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', {
          newValues: { pageNumber: 1, pageSize: 10 },
          type: 'pagination',
        });
      });
    });

    it('should change Pagination to last page using the external button', () => {
      cy.get('[data-test=goto-last-page').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('5'));

      cy.get('[data-test=page-count]').contains('5');

      cy.get('[data-test=item-from]').contains('41');

      cy.get('[data-test=item-to]').contains('50');

      cy.get('[data-test=total-items]').contains('50');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$skip=40&$orderby=Name asc&$filter=(Gender eq 'male')`);
      });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', {
          newValues: { pageNumber: 5, pageSize: 10 },
          type: 'pagination',
        });
      });
    });

    it('should Clear all Filters and expect to go back to first page', () => {
      cy.get('#grid5').find('button.slick-grid-menu-button').click({ force: true });

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]').contains('10');

      cy.get('[data-test=item-from]').contains('1');

      cy.get('[data-test=item-to]').contains('10');

      cy.get('[data-test=total-items]').contains('100');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$orderby=Name asc`);
      });

      cy.window().then((win) => {
        // TODO look into, this should be called 2x times not 3x times
        // expect(win.console.log).to.have.callCount(2);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: [], type: 'filter' });
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', {
          newValues: { pageNumber: 1, pageSize: 10 },
          type: 'pagination',
        });
      });
    });

    it('should Clear all Sorting', () => {
      cy.get('#grid5').find('button.slick-grid-menu-button').click({ force: true });

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item:nth(1)').find('span').contains('Clear all Sorting').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=10`);
      });

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(1);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', { newValues: [], type: 'sorter' });
      });
    });

    it('should use "substringof" when OData version is set to 2', () => {
      cy.get('.search-filter.filter-name').find('input').type('John');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$inlinecount=allpages&$top=10&$filter=(substringof('John', Name))`);
      });

      cy.get('#grid5').find('.slick-row').should('have.length', 1);
    });

    it('should use "contains" when OData version is set to 4', () => {
      cy.get('[data-test=version4]').click();

      cy.get('.search-filter.filter-name').find('input').type('John');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=10&$filter=(contains(Name, 'John'))`);
      });

      cy.get('#grid5').find('.slick-row').should('have.length', 1);
    });

    it('should return 3 rows using "C*n" (starts with "C" + ends with "n")', () => {
      cy.get('input.filter-name').clear().type('C*n');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=10&$filter=(startswith(Name, 'C') and endswith(Name, 'n'))`);
      });

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Carroll Buchanan');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Consuelo Dickson');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Christine Compton');
    });

    it('should perform filterQueryOverride when operator "%%" is selected', () => {
      cy.get('.search-filter.filter-name select')
        .find('option')
        .last()
        .then((element) => {
          cy.get('.search-filter.filter-name select').select(element.val());
        });

      cy.get('.search-filter.filter-name').find('input').clear().type('Jo%yn%er');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=10&$filter=(matchesPattern(Name, '%5EJo%25yn%25er$'))`);
      });

      cy.get('.slick-row').should('have.length', 1);
    });

    it('should click on Set Dynamic Filter and expect query and filters to be changed', () => {
      cy.get('[data-test=set-dynamic-filter]').click();

      cy.get('.search-filter.filter-name select').should('have.value', 'a*');

      cy.get('.search-filter.filter-name')
        .find('input')
        .invoke('val')
        .then((text) => expect(text).to.eq('A'));

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=10&$filter=(startswith(Name, 'A'))`);
      });

      cy.get('#grid5').find('.slick-row').should('have.length', 5);
    });

    it('should use a range filter when searching with ".."', () => {
      cy.get('.slick-header-columns').children('.slick-header-column:nth(1)').contains('Name').click();

      cy.get('.search-filter.filter-name').find('input').clear().type('Anthony Joyner..Ayers Hood');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(
          `$count=true&$top=10&$orderby=Name asc&$filter=(Name ge 'Anthony%20Joyner' and Name le 'Ayers%20Hood')`
        );
      });

      cy.get('#grid5').find('.slick-row').should('have.length', 3);
    });
  });

  describe('when "enableCount" is unchecked (not set)', () => {
    it('should Clear all Filters and Sortings, set 20 items per page & uncheck "enableCount"', () => {
      cy.get('#grid5').find('button.slick-grid-menu-button').click({ force: true });

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

      cy.get('#grid5').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item:nth(1)').find('span').contains('Clear all Sorting').click();

      cy.get('#items-per-page-label').select('20');

      cy.get('[data-test=enable-count]').click();
      cy.get('[data-test=enable-count]').should('not.be.checked');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=20`);
      });
    });

    it('should change Pagination to next page', () => {
      cy.get('.icon-seek-next').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=20&$skip=20`);
      });
    });

    it('should change Pagination to first page with 10 items', () => {
      cy.get('#items-per-page-label').select('10');

      // wait for the query to start and finish
      cy.get('[data-test=status]').should('contain', 'loading');
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10`);
      });
    });

    it('should change Pagination to last page', () => {
      cy.get('.icon-seek-end').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$skip=90`);
      });
    });

    it('should click on "Name" column to sort it Ascending', () => {
      cy.get('.slick-header-columns').children('.slick-header-column:nth(1)').click();

      cy.get('.slick-header-columns')
        .children('.slick-header-column:nth(1)')
        .find('.slick-sort-indicator.slick-sort-indicator-asc')
        .should('be.visible');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$skip=90&$orderby=Name asc`);
      });
    });

    it('should Clear all Sorting', () => {
      cy.get('#grid5').find('button.slick-grid-menu-button').click({ force: true });

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item:nth(1)').find('span').contains('Clear all Sorting').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$skip=90`);
      });
    });

    it('should click on Set Dynamic Filter and expect query and filters to be changed', () => {
      cy.get('[data-test=set-dynamic-filter]').click();

      cy.get('.search-filter.filter-name select').should('have.value', 'a*');

      cy.get('.search-filter.filter-name')
        .find('input')
        .invoke('val')
        .then((text) => expect(text).to.eq('A'));

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$filter=(startswith(Name, 'A'))`);
      });

      cy.get('#grid5').find('.slick-row').should('have.length', 5);
    });

    it('should use "substringof" when OData version is set to 2', () => {
      cy.get('[data-test=version2]').click();

      cy.get('.search-filter.filter-name').find('input').type('John');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$filter=(substringof('John', Name))`);
      });

      cy.get('#grid5').find('.slick-row').should('have.length', 1);
    });

    it('should use "contains" when OData version is set to 4', () => {
      cy.get('[data-test=version4]').click();

      cy.get('.search-filter.filter-name').find('input').type('John');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$filter=(contains(Name, 'John'))`);
      });

      cy.get('#grid5').find('.slick-row').should('have.length', 1);
    });
  });

  describe('General Pagination Behaviors', () => {
    it('should type a filter which returns an empty dataset', () => {
      cy.get('.search-filter.filter-name').find('input').clear().type('xy');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$filter=(contains(Name, 'xy'))`);
      });

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('.slick-empty-data-warning:visible').contains('No data to display.');
    });

    it('should display page 0 of 0 but hide pagination from/to numbers when filtered data "xy" returns an empty dataset', () => {
      cy.get('[data-test=page-count]').contains('0');

      cy.get('[data-test=item-from]').should('not.be.visible');

      cy.get('[data-test=item-to]').should('not.be.visible');

      cy.get('[data-test=total-items]').contains('0');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$filter=(contains(Name, 'xy'))`);
      });

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('0'));
    });

    it('should erase part of the filter so that it filters with "x"', () => {
      cy.get('.search-filter.filter-name').find('input').type('{backspace}');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$filter=(contains(Name, 'x'))`);
      });

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('.slick-empty-data-warning').contains('No data to display.').should('not.be.visible');

      cy.window().then((win) => {
        expect(win.console.log).to.have.callCount(2);
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', {
          newValues: [
            {
              columnId: 'name',
              operator: 'Contains',
              searchTerms: ['x'],
              targetSelector: 'input.form-control.filter-name.compound-input.filled',
            },
          ],
          type: 'filter',
        });
        expect(win.console.log).to.be.calledWith('Client sample, Grid State changed:: ', {
          newValues: { pageNumber: 1, pageSize: 10 },
          type: 'pagination',
        });
      });
    });

    it('should display page 1 of 1 with 2 items after erasing part of the filter to be "x" which should return 1 page', () => {
      cy.wait(50);

      cy.get('[data-test=page-count]').contains('1');

      cy.get('[data-test=item-from]').contains('1');

      cy.get('[data-test=item-to]').contains('2');

      cy.get('[data-test=total-items]').contains('2');

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));
    });
  });

  describe('Set Dynamic Sorting', () => {
    it('should click on "Set Filters Dynamically" then on "Set Sorting Dynamically"', () => {
      cy.get('[data-test=set-dynamic-filter]').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'loading');
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=set-dynamic-sorting]').click();

      cy.get('[data-test=status]').should('contain', 'loading');
      cy.get('[data-test=status]').should('contain', 'finished');
    });

    it('should expect the grid to be sorted by "Name" descending', () => {
      cy.get('#grid5').get('.slick-header-column:nth(1)').find('.slick-sort-indicator-desc').should('have.length', 1);

      cy.get('.slick-row').first().children('.slick-cell:nth(1)').should('contain', 'Ayers Hood');

      cy.get('.slick-row').last().children('.slick-cell:nth(1)').should('contain', 'Alexander Foley');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$filter=(startswith(Name, 'A'))`);
      });
    });

    it('should display an error when trying to sort by "Company" and the query & sort icons should remain the same', () => {
      cy.get('.slick-header-columns').children('.slick-header-column:nth(3)').click();

      cy.get('.slick-header-columns')
        .children('.slick-header-column:nth(3)')
        .find('.slick-sort-indicator.slick-sort-indicator-asc')
        .should('not.exist');

      // wait for the query to finish
      cy.get('[data-test=error-status]').should('contain', 'Server could not sort using the field "Company"');
      cy.get('[data-test=status]').should('contain', 'ERROR!!');

      // same query string as prior test
      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$filter=(startswith(Name, 'A'))`);
      });
    });

    it('should change Gender filter to "female" and still expect previous sort (before the error) to still be in query', () => {
      cy.get('.ms-filter.filter-gender:visible').click();

      cy.get('[data-name="filter-gender"].ms-drop').find('li:visible:nth(2)').contains('female').click();

      cy.get('#grid5').find('.slick-row').should('have.length', 1);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Alisha Myers');

      // query should still contain previous sort by + new gender filter
      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$filter=(startswith(Name, 'A') and Gender eq 'female')`);
      });
    });

    it('should try the "Company" filter and expect an error to throw and also expect the filter to reset to empty after the error is displayed', () => {
      cy.get('input.search-filter.filter-company').type('Core');

      // wait for the query to finish
      cy.get('[data-test=error-status]').should('contain', 'Server could not filter using the field "Company"');
      cy.get('[data-test=status]').should('contain', 'ERROR!!');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$filter=(startswith(Name, 'A') and Gender eq 'female')`);
      });

      cy.get('#grid5').find('.slick-row').should('have.length', 1);
    });

    it('should clear the "Name" filter and expect query to be successfull with just 1 filter "Gender" to be filled but without the previous failed filter', () => {
      cy.get('#grid5')
        .find('.slick-header-left .slick-header-column:nth(1)')
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .invoke('show')
        .click();

      cy.get('.slick-header-menu .slick-menu-command-list')
        .should('be.visible')
        .children('.slick-menu-item:nth-of-type(6)')
        .children('.slick-menu-content')
        .should('contain', 'Remove Filter')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$filter=(Gender eq 'female')`);
      });

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]').contains('5');

      cy.get('[data-test=item-from]').contains('1');

      cy.get('[data-test=item-to]').contains('10');

      cy.get('[data-test=total-items]').contains('50');
    });

    it('should display error when clicking on the "Throw Error..." button and not expect query and page to change', () => {
      cy.get('[data-test="throw-page-error-btn"]').click({ force: true });
      cy.wait(50);

      cy.get('[data-test=error-status]').should('contain', 'Server timed out trying to retrieve data for the last page');
      cy.get('[data-test=status]').should('contain', 'ERROR!!');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$filter=(Gender eq 'female')`);
      });

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]').contains('5');

      cy.get('[data-test=item-from]').contains('1');

      cy.get('[data-test=item-to]').contains('10');

      cy.get('[data-test=total-items]').contains('50');
    });

    it('should display error when trying to change items per to 50,000 items and expect query & page to remain the same', () => {
      cy.get('#items-per-page-label').select('50000');

      cy.get('[data-test=error-status]').should('contain', 'Server timed out retrieving 50,000 rows');
      cy.get('[data-test=status]').should('contain', 'ERROR!!');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$filter=(Gender eq 'female')`);
      });

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]').contains('5');

      cy.get('[data-test=item-from]').contains('1');

      cy.get('[data-test=item-to]').contains('10');

      cy.get('[data-test=total-items]').contains('50');
    });

    it('should now go to next page without anymore problems and query & page should change as normal', () => {
      cy.get('.icon-seek-next').click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$skip=10&$orderby=Name desc&$filter=(Gender eq 'female')`);
      });

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('2'));

      cy.get('[data-test=page-count]').contains('5');

      cy.get('[data-test=item-from]').contains('11');

      cy.get('[data-test=item-to]').contains('20');

      cy.get('[data-test=total-items]').contains('50');
    });
  });

  describe('Select and Expand Behaviors', () => {
    it('should enable "enableSelect" and "enableExpand" and expect the query to select/expand all fields', () => {
      cy.get('[data-test=enable-expand]').click();
      cy.get('[data-test=enable-expand]').should('be.checked');
      cy.wait(5);

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$expand=category`);
      });

      cy.get('[data-test=enable-select]').click();
      cy.get('[data-test=enable-select]').should('be.checked');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$top=10&$orderby=Name desc&$select=id,name,gender,company&$expand=category($select=name)`);
      });
    });

    it('should try to sort and filter on "Category" and expect the query to be succesful', () => {
      cy.get('#grid5').find('button.slick-grid-menu-button').click({ force: true });

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

      cy.get('#grid5').find('button.slick-grid-menu-button').click({ force: true });

      cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').find('span').contains('Clear all Sorting').click();

      cy.get('.slick-header-columns').children('.slick-header-column:nth(4)').click();

      cy.get('.slick-header-columns')
        .children('.slick-header-column:nth(4)')
        .find('.slick-sort-indicator.slick-sort-indicator-asc')
        .should('exist');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(
          `$top=10&$orderby=Category/name asc&$select=id,name,gender,company&$expand=category($select=name)`
        );
      });

      cy.get('input.search-filter.filter-category_name').type('Silver');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(
          `$top=10&$orderby=Category/name asc&$filter=(contains(Category/name, 'Silver'))&$select=id,name,gender,company&$expand=category($select=name)`
        );
      });

      cy.get('[data-test=page-number-input]')
        .invoke('val')
        .then((pageNumber) => expect(pageNumber).to.eq('1'));

      cy.get('[data-test=page-count]').contains('4');

      cy.get('[data-test=item-from]').contains('1');

      cy.get('[data-test=item-to]').contains('10');

      cy.get('[data-test=total-items]').contains('32');
    });
  });
});

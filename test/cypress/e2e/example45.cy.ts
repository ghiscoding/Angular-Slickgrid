describe('Example 45 - Row Detail with inner Grid', () => {
  const rootGridTitles = ['', 'ID', 'Company Name', 'Street Address', 'City', 'Zip Code', 'Country'];
  const innerGridTitles = ['Order ID', 'Ship City', 'Freight', 'Ship Name'];
  const GRID_ROW_HEIGHT = 33;
  let ROW_DETAIL_PANEL_COUNT = 8;

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/rowdetail-innergrid`);
    cy.get('h2').should('contain', 'Example 45: Row Detail with inner Grid');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#grid45')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(rootGridTitles[index]));
  });

  for (const isUsingAutoHeight of [true, false]) {
    describe(`using autoHeight: "${isUsingAutoHeight}"`, () => {
      it(`should toggle autoHeight checkbox to ${isUsingAutoHeight}`, () => {
        if (isUsingAutoHeight) {
          cy.get('[data-test="use-auto-height"]').check();
        } else {
          cy.get('[data-test="use-auto-height"]').uncheck();
        }
      });

      it('should set row detail height to 8 rows and change server delay to 40ms for faster testing', () => {
        cy.get('[data-test="detail-view-row-count"]').clear().type('8');
        cy.get('[data-test="set-count-btn"]').click();
        cy.get('[data-test="server-delay"]').type('{backspace}');
      });

      it('should open the Row Detail of the 2nd row and expect to find an inner grid with all inner column titles', () => {
        cy.get('.slick-cell.detail-view-toggle:nth(1)').click().wait(40);

        cy.get('.slick-cell + .dynamic-cell-detail').find('h4').should('contain', '- Order Details (id: 1)');

        cy.get('#innergrid-1')
          .find('.slick-header-columns')
          .children()
          .each(($child, index) => expect($child.text()).to.eq(innerGridTitles[index]));
      });

      it('should sort 2nd Row Detail inner grid "Freight" column in ascending order and filter "Ship City" with "m" and expect 2 sorted rows', () => {
        cy.get('#innergrid-1').find('.slick-header-column:nth(2)').children('.slick-header-menu-button').click();

        cy.get('#innergrid-1 .slick-header-menu .slick-menu-command-list')
          .should('be.visible')
          .children('.slick-menu-item:nth-of-type(3)')
          .children('.slick-menu-content')
          .should('contain', 'Sort Ascending')
          .click();

        cy.get('#innergrid-1 .search-filter.filter-shipCity').clear().type('m*');

        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should open 3rd row and still expect 2nd row to be sorted and filtered', () => {
        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * (1 * (ROW_DETAIL_PANEL_COUNT + 1))}px;"] .slick-cell:nth(0)`)
          .click()
          .wait(40);

        cy.get('.slick-cell + .dynamic-cell-detail').find('h4').should('contain', `- Order Details (id: ${2})`);

        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        // 3rd row detail
        cy.get('#innergrid-2 .search-filter.filter-orderId').should('have.value', '');
        cy.get('#innergrid-2 .search-filter.filter-shipCity').should('have.value', '');
        cy.get('#innergrid-2 .slick-sort-indicator-asc').should('not.exist');

        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10261');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Rio de Janeiro');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should go at the bottom end of the grid, then back to top and expect all Row Details to be opened but reset to default', () => {
        cy.get('#grid45').type('{ctrl}{end}', { release: false });
        cy.get('#grid45').type('{ctrl}{home}', { release: false });
        cy.wait(50);
        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10261');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Rio de Janeiro');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        // 3rd row detail
        cy.get('#innergrid-2 .search-filter.filter-orderId').should('have.value', '');
        cy.get('#innergrid-2 .search-filter.filter-shipCity').should('have.value', '');
        cy.get('#innergrid-2 .slick-sort-indicator-asc').should('not.exist');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10261');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Rio de Janeiro');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should force redraw of all Row Details and expect same row details to be opened and opened', () => {
        cy.get('[data-test="redraw-all-btn"]').click();
        cy.wait(10);

        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10261');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Rio de Janeiro');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        // 3rd row detail
        cy.get('#innergrid-2 .search-filter.filter-orderId').should('have.value', '');
        cy.get('#innergrid-2 .search-filter.filter-shipCity').should('have.value', '');
        cy.get('#innergrid-2 .slick-sort-indicator-asc').should('not.exist');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10261');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Rio de Janeiro');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should close all rows', () => {
        cy.get('[data-test="collapse-all-btn"]').click();
      });

      it('should open 2nd row and sort inner grid "Freight" column in ascending order and filter "Order ID" and "Ship City" with "m" and expect 2 sorted rows', () => {
        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * 1}px;"] .slick-cell:nth(0)`)
          .click()
          .wait(40);

        cy.get('.slick-cell + .dynamic-cell-detail').find('h4').should('contain', `- Order Details (id: ${1})`);

        cy.get('#innergrid-1').find('.slick-header-column:nth(2)').children('.slick-header-menu-button').click();

        cy.get('#innergrid-1 .slick-header-menu .slick-menu-command-list')
          .should('be.visible')
          .children('.slick-menu-item:nth-of-type(3)')
          .children('.slick-menu-content')
          .should('contain', 'Sort Ascending')
          .click();

        cy.get('#innergrid-1 .search-filter.filter-orderId').clear().type('>102');
        cy.get('#innergrid-1 .search-filter.filter-shipCity').clear().type('m*');

        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should open 1st row and expect 2nd row no longer be sorted neither filtered because it has to re-rendered', () => {
        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * 0}px;"] .slick-cell:nth(0)`)
          .click()
          .wait(40);

        cy.get('#innergrid-1 .search-filter.filter-shipCity').should('have.value', '');
        cy.get('#innergrid-1 .slick-sort-indicator-asc').should('not.exist');

        // default rows
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10261');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Rio de Janeiro');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should close all rows', () => {
        cy.get('[data-test="collapse-all-btn"]').click();
      });

      it('should re-open 2nd row and sort inner grid "Freight" column in ascending order and filter "Ship City" with "m" and expect 2 sorted rows', () => {
        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * 1}px;"] .slick-cell:nth(0)`)
          .click()
          .wait(40);

        cy.get('.slick-cell + .dynamic-cell-detail').find('h4').should('contain', `- Order Details (id: ${1})`);

        cy.get('#innergrid-1').find('.slick-header-column:nth(2)').children('.slick-header-menu-button').click();

        cy.get('#innergrid-1 .slick-header-menu .slick-menu-command-list')
          .should('be.visible')
          .children('.slick-menu-item:nth-of-type(3)')
          .children('.slick-menu-content')
          .should('contain', 'Sort Ascending')
          .click();

        cy.get('#innergrid-1 .search-filter.filter-shipCity').clear().type('m*');

        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should scroll down when the row detail is just barely visible and then scroll back up and still expect same filters/sorting', () => {
        cy.get('#grid45 .slick-viewport-top.slick-viewport-left').first().scrollTo(0, 350);
        cy.wait(50);
        cy.get('#grid45 .slick-viewport-top.slick-viewport-left').first().scrollTo(0, 0);

        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should scroll down by 2 pages down and then scroll back up and no longer the same filters/sorting', () => {
        cy.get('#grid45 .slick-viewport-top.slick-viewport-left').first().scrollTo(0, 800);
        cy.wait(50);
        cy.get('#grid45 .slick-viewport-top.slick-viewport-left').first().scrollTo(0, 0);

        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('not.contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('not.contain', 'Madrid');
      });

      it('should close all rows and enable inner Grid State/Presets', () => {
        cy.get('[data-test="collapse-all-btn"]').click();
        cy.get('[data-test="use-inner-grid-state-presets"]').click();
      });

      it('should open again 2nd row and sort inner grid "Freight" column in ascending order & filter "Ship City" with "m" and expect 2 sorted rows', () => {
        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * 1}px;"] .slick-cell:nth(0)`)
          .click()
          .wait(40);

        cy.get('.slick-cell + .dynamic-cell-detail').find('h4').should('contain', `- Order Details (id: ${1})`);

        cy.get('#innergrid-1').find('.slick-header-column:nth(2)').children('.slick-header-menu-button').click();

        cy.get('#innergrid-1 .slick-header-menu .slick-menu-command-list')
          .should('be.visible')
          .children('.slick-menu-item:nth-of-type(3)')
          .children('.slick-menu-content')
          .should('contain', 'Sort Ascending')
          .click();

        cy.get('#innergrid-1 .search-filter.filter-shipCity').clear().type('m*');

        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should open again 3rd row and sort inner grid "Freight" column in ascending order & filter "Order ID" and "Ship City" with "m" and expect 2 sorted rows', () => {
        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * (1 * (ROW_DETAIL_PANEL_COUNT + 1))}px;"] .slick-cell:nth(0)`)
          .click()
          .wait(40);

        cy.get('.slick-cell + .dynamic-cell-detail').find('h4').should('contain', `- Order Details (id: ${2})`);

        cy.get('#innergrid-2 .slick-header-column:nth(2)').children('.slick-header-menu-button').click();

        cy.get('#innergrid-2 .slick-header-menu .slick-menu-command-list')
          .should('be.visible')
          .children('.slick-menu-item:nth-of-type(3)')
          .children('.slick-menu-content')
          .should('contain', 'Sort Ascending')
          .click();

        cy.get('#innergrid-2 .search-filter.filter-orderId').clear().type('>102');
        cy.get('#innergrid-2 .search-filter.filter-shipCity').clear().type('m*');

        // 3rd row detail
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should close and reopen the 3rd row and expect same filtered and sorted rows', () => {
        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * (1 * (ROW_DETAIL_PANEL_COUNT + 1))}px;"] .slick-cell:nth(0)`).as(
          '3rdRow'
        );
        cy.get('@3rdRow').click();
        cy.get('@3rdRow').click();

        // 3rd row detail
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should go to the bottom end of the grid and open row 987', () => {
        cy.get('#grid45').type('{ctrl}{end}', { release: false });

        cy.get('.slick-row[data-row=1001] .detail-view-toggle').first().click();

        cy.get('#innergrid-987 .search-filter.filter-orderId').as('orderIdSearch');
        cy.get('@orderIdSearch').clear();
        cy.get('@orderIdSearch').type('>987');
        cy.get('.slick-empty-data-warning').should('be.visible');
      });

      it('should go again back to top of the grid and now expect that all Row Details are still opened AND their filters/sorting are kept and reapplied', () => {
        cy.get('#grid45').type('{ctrl}{home}', { release: false });

        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        // 3rd row detail
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should go back to the bottom of the grid and still expect row detail 987 to be opened with same filter and no rows inside it', () => {
        cy.get('#grid45').type('{ctrl}{end}', { release: false });

        cy.get('#innergrid-987 .search-filter.filter-orderId').as('orderIdSearch');
        cy.get('@orderIdSearch').clear();
        cy.get('@orderIdSearch').type('>987');
        cy.get('.slick-empty-data-warning').should('be.visible');
      });

      it('should go back to the top of the grid once more and close 3nd row and still expect same rows in both row details', () => {
        cy.get('#grid45').type('{ctrl}{home}', { release: false });
        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * (1 * (ROW_DETAIL_PANEL_COUNT + 1))}px;"] .slick-cell:nth(0)`)
          .click()
          .wait(40);

        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        cy.get(`.slick-row[style="top: ${GRID_ROW_HEIGHT * (1 * (ROW_DETAIL_PANEL_COUNT + 1))}px;"] .slick-cell:nth(0)`)
          .click()
          .wait(40);

        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        // 3rd row detail
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should change Row Detail panel height to 15, open 2nd and 3rd then execute PageDown twice', () => {
        ROW_DETAIL_PANEL_COUNT = 15;
        cy.get('[data-test="collapse-all-btn"]').click();
        cy.get('[data-test="detail-view-row-count"]').as('rowCount');
        cy.get('@rowCount').clear();
        cy.get('@rowCount').type('15');
        cy.get('[data-test="set-count-btn"]').click();

        cy.get('.slick-cell.detail-view-toggle:nth(1)').click().wait(40);

        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        // open 3rd row detail
        cy.get(`.slick-row[data-row="14"] .slick-cell:nth(0)`).click().wait(40);

        // 3rd row detail
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        cy.get('#grid45').type('{pageDown}{pageDown}', { release: false });
        cy.wait(50);
        cy.get('#grid45 .slick-viewport-top.slick-viewport-left').first().scrollTo(0, 350);

        // expect same grid details for both grids
        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
        // 3rd row detail
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should change Row Detail panel height back to 8, open 2nd and 3rd and filter Company ID with "1..2" and expect only these 2 rows to be rendered in the grid', () => {
        ROW_DETAIL_PANEL_COUNT = 8;
        cy.get('[data-test="collapse-all-btn"]').click();
        cy.get('[data-test="detail-view-row-count"]').as('rowCount');
        cy.get('@rowCount').clear();
        cy.get('@rowCount').type('8');
        cy.get('[data-test="set-count-btn"]').click();

        cy.get('.slick-cell.detail-view-toggle:nth(1)').click().wait(40);

        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        // open 3rd row detail
        cy.get(`.slick-row[data-row="9"] .slick-cell:nth(0)`).click().wait(40);

        // 3rd row detail
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        cy.get('.search-filter.filter-companyId').type('1..2');
        cy.get('#grid45 .slick-row:not(#innergrid-1 .slick-row,#innergrid-2 .slick-row)').should(
          'have.length',
          ROW_DETAIL_PANEL_COUNT * 2
        );
        cy.get('.search-filter.filter-companyId').type('{backspace}2');
        cy.get('#grid45 .slick-row:not(#innergrid-1 .slick-row,#innergrid-2 .slick-row)').should(
          'have.length',
          ROW_DETAIL_PANEL_COUNT * 2
        );
      });

      it('should clear Company ID filter and have all rows back in grid and rendered', () => {
        cy.get('#grid45').find('button.slick-grid-menu-button').first().click({ force: true });

        cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

        cy.get('#grid45 .slick-row:not(#innergrid-1 .slick-row,#innergrid-2 .slick-row)').should(
          'have.length.greaterThan',
          ROW_DETAIL_PANEL_COUNT * 2
        );

        // 2nd row detail
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-1 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');

        // 3rd row detail
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', '10281');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Madrid');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', '10267');
        cy.get(`#innergrid-2 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'München');
      });

      it('should reload page on first describe run', () => {
        if (isUsingAutoHeight) {
          cy.reload();
        }
      });
    });
  }
});

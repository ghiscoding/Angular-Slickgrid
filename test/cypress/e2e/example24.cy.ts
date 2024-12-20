describe('Example 24 - Grids in Bootstrap Tabs', () => {
  const GRID_ROW_HEIGHT = 35;
  const grid1FullTitles = ['Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];
  const grid2FullTitles = ['Name', 'Gender', 'Company'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/gridtabs`);
    cy.get('h2').should('contain', 'Example 24: Grids in Bootstrap Tabs');
  });

  it('should have exact column titles in grid', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(grid1FullTitles[index]));
  });

  it('should have "Task 0" incremented by 1 after each row', () => {
    cy.get(`[data-test="javascript-tab"] [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should(
      'contain',
      'Task 0'
    );
    cy.get(`[data-test="javascript-tab"] [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should(
      'contain',
      'Task 1'
    );
    cy.get(`[data-test="javascript-tab"] [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should(
      'contain',
      'Task 2'
    );
    cy.get(`[data-test="javascript-tab"] [style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should(
      'contain',
      'Task 3'
    );
    cy.get(`[data-test="javascript-tab"] [style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should(
      'contain',
      'Task 4'
    );
    cy.get(`[data-test="javascript-tab"] [style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(0)`).should(
      'contain',
      'Task 5'
    );
  });

  it('should change open next Tab "Http-Client" and expect a grid with 3 columns', () => {
    cy.get('.tab-container').contains('Http-Client').click();

    cy.get('#slickGridContainer-grid2:visible')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(grid2FullTitles[index]));
  });

  it('should expect first 3 rows to be an exact match of data provided by the external JSON file', () => {
    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell.l0`).should('contain', 'Ethel Price');
    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell.l1`).should('contain', 'female');
    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell.l2`).should('contain', 'Enersol');

    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell.l0`).should('contain', 'Claudine Neal');
    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell.l1`).should('contain', 'female');
    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell.l2`).should('contain', 'Sealoud');

    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell.l0`).should('contain', 'Beryl Rice');
    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell.l1`).should('contain', 'female');
    cy.get(`[data-test="http-tab"] [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell.l2`).should('contain', 'Velity');
  });
});

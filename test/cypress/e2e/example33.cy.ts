describe('Example 33 - Real-Time Trading Platform', () => {
  const titles = [
    'Currency',
    'Symbol',
    'Market',
    'Company',
    'Type',
    'Change',
    'Price',
    'Quantity',
    'Amount',
    'Price History',
    'Execution Timestamp',
  ];
  const GRID_ROW_HEIGHT = 35;

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/trading`);
    cy.get('h2').should('contain', 'Example 33: Real-Time Trading Platform');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#grid33')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should check first 5 rows and expect certain data', () => {
    for (let i = 0; i < 5; i++) {
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * i}px;"] > .slick-cell:nth(0)`).contains(/CAD|USD$/);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * i}px;"] > .slick-cell:nth(4)`).contains(/Buy|Sell$/);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * i}px;"] > .slick-cell:nth(5)`).contains(/\$\(?[0-9.]*\)?/);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * i}px;"] > .slick-cell:nth(6)`).contains(/\$[0-9.]*/);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * i}px;"] > .slick-cell:nth(7)`).contains(/\d$/);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * i}px;"] > .slick-cell:nth(8)`).contains(/\$[0-9.]*/);
    }
  });

  it('should find multiple green & pink backgrounds to show gains & losses when in real-time mode', () => {
    cy.get('#refreshRateRange').invoke('val', 5).trigger('change');

    cy.get('.changed-gain').should('have.length.gt', 2);
    cy.get('.changed-loss').should('have.length.gt', 2);
  });

  it('should NOT find any green neither pink backgrounds when in real-time is stopped', () => {
    cy.get('[data-test="highlight-input"]').type('{backspace}{backspace}');
    cy.get('[data-test="stop-btn"]').click();

    cy.wait(5);
    cy.get('.changed-gain').should('have.length', 0);
    cy.get('.changed-loss').should('have.length', 0);
    cy.wait(1);
    cy.get('.changed-gain').should('have.length', 0);
    cy.get('.changed-loss').should('have.length', 0);
  });

  it('should Group by 1st column "Currency" and expect 2 groups with Totals when collapsed', () => {
    cy.get('.slick-header-column:nth(0)').contains('Currency').drag('.slick-dropzone', { force: true });

    cy.get('.slick-group-toggle-all').click();

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).should(
      'have.length',
      1
    );
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Currency: CAD');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(8)`).contains(/\$[0-9,.]*/);

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).should(
      'have.length',
      1
    );
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Currency: USD');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(8)`).contains(/\$[0-9,.]*/);
  });
});

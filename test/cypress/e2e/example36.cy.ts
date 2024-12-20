describe('Example 36 - Excel Export Formula', () => {
  const GRID_ROW_HEIGHT = 33;
  const fullTitles = ['#', 'Name', 'Price', 'Quantity', 'Sub-Total', 'Taxable', 'Taxes', 'Total'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/excel-formula`);
    cy.get('h2').should('contain', 'Example 36: Excel Export Formula');
  });

  it('should have exact column titles on grid', () => {
    cy.get('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should check first 3 rows with calculated totals', () => {
    // 1st row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).contains('1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).contains('Oranges');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).contains('$2.22');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).contains('4');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).contains('$8.88');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`).should('have.text', '');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).should('have.text', '');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(7)`).contains('$8.88');

    // 2nd row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).contains('2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).contains('Apples');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).contains('$1.55');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).contains('3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(4)`).contains('$4.65');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(5)`).should('have.text', '');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(6)`).should('have.text', '');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(7)`).contains('$4.65');

    // 3rd row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).contains('3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).contains('Honeycomb Cereals');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(2)`).contains('$4.55');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).contains('2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(4)`).contains('$9.10');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(4)`)
      .should('have.css', 'color')
      .and('eq', 'rgb(33, 80, 115)');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(5)`).find('.mdi-check');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(6)`).contains('$0.68');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(6)`)
      .should('have.css', 'color')
      .and('eq', 'rgb(198, 89, 17)');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(7)`).contains('$9.78');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(7)`)
      .should('have.css', 'color')
      .and('eq', 'rgb(0, 90, 158)');
  });

  it('should change Price & Qty on first 3 rows and expect calculated values to be updated', () => {
    // 1st row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).contains('1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2) input`)
      .clear()
      .type('2.44{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3) input`)
      .clear()
      .type('7{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).contains('$17.08');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(7)`).contains('$17.08');

    // 2nd row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).contains('2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2) input`)
      .clear()
      .type('1.4{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3) input`)
      .clear()
      .type('3{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(4)`).contains('$4.20');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(7)`).contains('$4.20');

    // 3rd row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).contains('3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(2)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(2) input`)
      .clear()
      .type('4.23{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3) input`)
      .clear()
      .type('3{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(4)`).contains('$12.69');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(6)`).contains('$0.95');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(7)`).contains('$13.64');
  });

  it('should be able to change Tax Rate and for first 3 rows only expect the 3rd one to be updated with different taxes and total', () => {
    cy.get('[data-test="taxrate"]').clear().type('6.25');
    cy.get('[data-test="update-btn"]').click();

    // 1st row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).contains('1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).contains('$2.44');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).contains('7');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).contains('$17.08');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(7)`).contains('$17.08');

    // 2nd row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).contains('2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).contains('$1.40');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).contains('3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(4)`).contains('$4.20');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(7)`).contains('$4.20');

    // 3rd row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).contains('3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(2)`).contains('$4.23');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).contains('3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(4)`).contains('$12.69');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(6)`).contains('$0.79');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(7)`).contains('$13.48');
  });

  it('should Group by Taxable and expect calculated totals', () => {
    cy.get('[data-test="group-by-btn"]').click();

    // last and 5th row of first Group
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(0)`).contains('11');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(1)`).contains('Milk');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(2)`).contains('$3.11');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(3)`).contains('3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(4)`).contains('$9.33');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(5)`).find('.mdi-check');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(6)`).contains('$0.58');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(7)`).contains('$9.91');

    // Taxable group total row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(2)`).contains('$15.71');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(3)`).contains('25');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(4)`).contains('$42.32');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(6)`).contains('$2.65');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(7)`).contains('$44.97');

    // Non-Taxable group total row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(2)`).contains('$21.61');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(3)`).contains('92');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(4)`).contains('$60.29');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(6)`).contains('$0.00');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(7)`).contains('$60.29');
  });

  it('should change Price & Qty of item 10,11 and expect calculated values to be updated in group total', () => {
    // item 10
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).contains('10');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(1)`).contains('Drinkable Yogurt');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(2)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(2) input`)
      .clear()
      .type('1.96{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(3)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(3) input`)
      .clear()
      .type('4{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(4)`).contains('$7.84');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(6)`).contains('$0.49');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(7)`).contains('$8.33');

    // item 11
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(0)`).contains('11');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(1)`).contains('Milk');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(2)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(2) input`)
      .clear()
      .type('3.85{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(3)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(3) input`)
      .clear()
      .type('2{enter}');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(4)`).contains('$7.70');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(6)`).contains('$0.48');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(7)`).contains('$8.18');

    // group total row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(2)`).contains('$17.19');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(3)`).contains('22');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(4)`).contains('$41.21');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(6)`).contains('$2.58');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(7)`).contains('$43.79');

    // Non-Taxable group total row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(2)`).contains('$21.61');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(3)`).contains('92');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(4)`).contains('$60.29');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(6)`).contains('$0.00');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 14}px;"] > .slick-cell:nth(7)`).contains('$60.29');
  });

  it('should change Tax Rate again and expect Taxes and Total to be recalculated', () => {
    cy.get('[data-test="taxrate"]').clear().type('7');
    cy.get('[data-test="update-btn"]').click();

    // item 10
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(6)`).contains('$0.55');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(7)`).contains('$8.39');

    // item 11
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(6)`).contains('$0.54');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(7)`).contains('$8.24');

    // group total row
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(2)`).contains('$17.19');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(3)`).contains('22');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(4)`).contains('$41.21');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(6)`).contains('$2.88');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 6}px;"] > .slick-cell:nth(7)`).contains('$44.09');
  });
});

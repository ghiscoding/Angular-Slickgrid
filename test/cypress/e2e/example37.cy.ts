describe('Example 37 - Footer Totals Row', () => {
  const fullTitles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const GRID_ROW_HEIGHT = 33;

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/footer-totals`);
    cy.get('h2').should('contain', 'Example 37: Footer Totals Row');
  });

  it('should have exact Column Header Titles in the grid', () => {
    cy.get('#grid37')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should have a total sum displayed in the footer for each column', () => {
    for (let i = 0; i < 10; i++) {
      cy.get(`.slick-footerrow-columns .slick-footerrow-column:nth(${i})`).should(($span) => {
        const totalStr = $span.text();
        const totalVal = Number(totalStr.replace('Sum: ', ''));

        expect(totalStr).to.contain('Sum:');
        expect(totalVal).to.gte(400);
      });
    }
  });

  it('should be able to increase cell value by a number of 5 and expect column sum to be increased by 5 as well', () => {
    let cellVal = 0;
    let totalVal = 0;
    const increasingVal = 50;

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should(($span) => {
      cellVal = Number($span.text());
      expect(cellVal).to.gte(0);
    });
    cy.get('.slick-footerrow-columns .slick-footerrow-column:nth(0)').should(($span) => {
      totalVal = parseInt($span.text().replace('Sum: ', ''));
      expect(totalVal).to.gte(400);
    });

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).click();
    cy.get('.editor-0').type(`${increasingVal}{enter}`);
    cy.wait(1);

    cy.get('.slick-footerrow-columns .slick-footerrow-column:nth(0)').should(($span) => {
      const newTotalVal = parseInt($span.text().replace('Sum: ', ''));
      expect(newTotalVal).to.eq(totalVal - cellVal + increasingVal);
    });
  });
});

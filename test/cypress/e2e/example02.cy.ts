import { removeExtraSpaces } from '../plugins/utilities';

describe('Example 2 - Grid with Formatters', () => {
  const GRID_ROW_HEIGHT = 35;

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/formatter`);
    cy.get('h2').should('contain', 'Example 2: Grid with Formatters');
  });

  it('should show a custom text in the grid footer left portion', () => {
    cy.get('#slickGridContainer-grid2').find('.slick-custom-footer').find('.left-footer').contains('custom footer text');
  });

  it('should have some metrics shown in the grid footer', () => {
    cy.get('#slickGridContainer-grid2')
      .find('.slick-custom-footer')
      .find('.right-footer')
      .should(($span) => {
        const text = removeExtraSpaces($span.text()); // remove all white spaces
        expect(text).to.eq('500 items');
      });
  });

  it('should expect "Effort Driven" 1st cell to include fire icon', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(7)`)
      .find('.mdi.mdi-fire.red')
      .should('have.length', 1);
  });

  it('should expect "Effort Driven" 2nd cell to include a snowflake icon', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(7)`)
      .find('.mdi.mdi-snowflake')
      .should('have.length', 1);
  });

  it('should click on a "Completed" cell and expect it to toggle to checked', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(8)`)
      .find('.mdi.mdi-circle')
      .should('have.length', 1);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(8)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(8)`)
      .find('.mdi.mdi-circle')
      .should('have.length', 0);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(8)`)
      .find('.mdi.mdi-check-circle')
      .should('have.length', 1);

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(8)`)
      .find('.mdi.mdi-circle')
      .should('have.length', 1);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(8)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(8)`)
      .find('.mdi.mdi-circle')
      .should('have.length', 0);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(8)`)
      .find('.mdi.mdi-check-circle')
      .should('have.length', 1);
  });
});

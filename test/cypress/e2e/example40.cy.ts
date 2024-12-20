describe('Example 40 - Infinite Scroll from JSON data', () => {
  const GRID_ROW_HEIGHT = 33;
  const titles = ['Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/infinite-json`);
    cy.get('h2').should('contain', 'Example 40: Infinite Scroll from JSON data');
  });

  it('should have exact Column Titles in the grid', () => {
    cy.get('#grid40')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should expect first row to include "Task 0" and other specific properties', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).contains(/[0-9]/);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).contains(/[0-9]/);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).contains(/20[0-9]{2}-[0-9]{2}-[0-9]{2}/);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).contains(/20[0-9]{2}-[0-9]{2}-[0-9]{2}/);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`)
      .find('.mdi.mdi-check')
      .should('have.length', 1);
  });

  it('should scroll to bottom of the grid and expect next batch of 50 items appended to current dataset for a total of 100 items', () => {
    cy.get('[data-test="totalItemCount"]').should('have.text', '50');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

    cy.get('[data-test="totalItemCount"]').should('have.text', '100');
  });

  it('should scroll to bottom of the grid again and expect 50 more items for a total of now 150 items', () => {
    cy.get('[data-test="totalItemCount"]').should('have.text', '100');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

    cy.get('[data-test="totalItemCount"]').should('have.text', '150');
  });

  it('should disable onSort for data reset and expect same dataset length of 150 items after sorting by Title', () => {
    cy.get('[data-test="onsort-off"]').click();

    cy.get('[data-id="title"]').click();

    cy.get('[data-test="totalItemCount"]').should('have.text', '150');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 10');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 100');
  });

  it('should enable onSort for data reset and expect dataset to be reset to 50 items after sorting by Title', () => {
    cy.get('[data-test="onsort-on"]').click();

    cy.get('[data-id="title"]').click();

    cy.get('[data-test="totalItemCount"]').should('have.text', '50');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 9');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 8');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 7');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 6');
  });

  it('should "Group by Duration" and expect 50 items grouped', () => {
    cy.get('[data-test="group-by-duration"]').click();

    cy.get('[data-test="totalItemCount"]').should('have.text', '50');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should('have.length', 1);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).contains(/Duration: [0-9]/);
  });

  it('should scroll to the bottom "Group by Duration" and expect 50 more items for a total of 100 items grouped', () => {
    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

    cy.get('[data-test="totalItemCount"]').should('have.text', '100');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should('have.length', 1);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).contains(/Duration: [0-9]/);
  });
});

describe('Example 42 - Custom Pagination', () => {
  const GRID_ROW_HEIGHT = 40;
  const titles = ['Title', 'Description', '% Complete', 'Start', 'Finish', 'Duration', 'Completed'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/custom-pagination`);
    cy.get('h2').should('contain', 'Example 42: Custom Pagination');
  });

  it('should have exact Column Titles in the grid', () => {
    cy.get('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should expect first row to be Task 0', () => {
    cy.get('.seek-first').should('have.class', 'disabled');
    cy.get('.seek-prev').should('have.class', 'disabled');
    cy.get('.item-from').should('contain', 1);
    cy.get('.item-to').should('contain', 50);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 4');
  });

  it('should click on next page and expect top row to be Task 50', () => {
    cy.get('.page-item.seek-next').click();

    cy.get('.seek-first').should('not.have.class', 'disabled');
    cy.get('.seek-prev').should('not.have.class', 'disabled');
    cy.get('.item-from').should('contain', 51);
    cy.get('.item-to').should('contain', 100);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 50');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 51');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 52');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 53');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 54');
  });

  it('should click on goto last page and expect top row to be Task 50', () => {
    cy.get('.page-item.seek-end').click();

    cy.get('.seek-next').should('have.class', 'disabled');
    cy.get('.seek-end').should('have.class', 'disabled');
    cy.get('.item-from').should('contain', 4951);
    cy.get('.item-to').should('contain', 5000);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 4950');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 4951');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 4952');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 4953');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 4954');
  });

  it('should change page size and expect pagination to be updated', () => {
    cy.get('[data-test="page-size-input"]').type('{backspace}{backspace}75');
    cy.get('.seek-first').should('have.class', 'disabled');
    cy.get('.seek-prev').should('have.class', 'disabled');
    cy.get('.item-from').should('contain', 1);
    cy.get('.item-to').should('contain', 75);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 2');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 3');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 4');
  });

  it('should toggle pagination position to bottom', () => {
    cy.get('[data-text="toggle-pagination-btn"]').click();
    cy.get('#pager.bottom').should('exist');
    cy.get('.page-item.seek-next').click();

    cy.get('.item-from').should('contain', 76);
    cy.get('.item-to').should('contain', 150);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 75');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 76');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 77');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 78');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should('contain', 'Task 79');
  });
});

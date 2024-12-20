describe('Example 11 - Add / Update / Highlight a Datagrid Item', () => {
  const GRID_ROW_HEIGHT = 35;
  const fullTitles = ['', 'Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/additem`);
    cy.get('h2').should('contain', 'Example 11: Add / Update / Highlight a Datagrid Item');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#slickGridContainer-grid11')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should expect Task 0 to Task 4 on first 5 rows', () => {
    const expectedTasks = ['Task 0', 'Task 1', 'Task 2', 'Task 3', 'Task 4'];

    cy.get('#grid11')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)').should('contain', expectedTasks[index]);
      });
  });

  it('should delete first row Task 0 from the grid', () => {
    const expectedTasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];

    cy.get('#grid11').find('.slick-row').first().children('.slick-cell:nth(0)').click();

    cy.get('#grid11')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)').should('contain', expectedTasks[index]);
      });
  });

  it('should add 2 rows on the top of the grid', () => {
    const expectedTasks = ['Task 1001', 'Task 1000', 'Task 1', 'Task 2', 'Task 3', 'Task 4'];

    cy.get('[data-test="add-new-item-top-btn"]').click().click();

    cy.get('#grid11')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)').should('contain', expectedTasks[index]);
      });
  });

  it('should add 2 rows on the bottom of the grid', () => {
    cy.get('[data-test="add-new-item-bottom-btn"]').click();

    cy.get('#grid11').find('.slick-row').last().should('contain.text', 'Task 1002');
  });

  it('should click on highlight "Duration over 40" and expect few rows being highlighted in purple', () => {
    cy.get('[data-test="highlight-duration40-btn"]').click();

    cy.get('.slick-row.duration-bg').should('have.length.greaterThan', 1);
  });

  it('should scroll to bottom and expect last row to be "Task 1002"', () => {
    cy.get('[data-test="scroll-bottom-btn"]').click();

    cy.get('#grid11').find('.slick-row').last().should('contain.text', 'Task 1002');
  });

  it('should scroll to top and expect certain rows on top', () => {
    // cy.get('[data-test="scroll-top-btn"]').click();
    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 1001');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 100');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 1');
  });
});

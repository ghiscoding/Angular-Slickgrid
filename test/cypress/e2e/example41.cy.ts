describe('Example 41 - Drag & Drop', () => {
  const GRID_ROW_HEIGHT = 33;
  const titles = ['', 'Name', 'Complete'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/drag-recycle`);
    cy.get('h2').should('contain', 'Example 41: Drag & Drop');
  });

  it('should have exact Column Titles in the grid', () => {
    cy.get('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should expect first row to include "Task 0" and other specific properties', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Make a list');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`)
      .find('.mdi.mdi-check')
      .should('have.length', 1);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Check it twice');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', `Find out who's naughty`);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', `Find out who's nice`);
  });

  it('should drag 2nd row to 3rd position', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell.cell-reorder`).as('moveIconTask1');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell.cell-reorder`).as('moveIconTask2');

    cy.get('@moveIconTask2').should('have.length', 1);

    cy.get('@moveIconTask2').trigger('mousedown', { which: 1, force: true }).trigger('mousemove', 'bottomRight');

    cy.get('@moveIconTask1').trigger('mousemove', 'bottomRight').trigger('mouseup', 'bottomRight', { which: 1, force: true });

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Make a list');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', `Find out who's naughty`);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Check it twice');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', `Find out who's nice`);
  });

  it('should drag a single row "Check it twice" to recycle bin', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`)
      .contains(`Find out who's naughty`)
      .trigger('mousedown', { which: 1, force: true })
      .trigger('mousemove', 'bottomRight');

    cy.get('.recycle-bin.drag-dropzone').should('have.length', 1);
    cy.get('.drag-message').contains('Drag to Recycle Bin to delete 1 selected row(s)');

    cy.get('#dropzone').trigger('mousemove', 'center');
    cy.get('.recycle-bin.drag-hover').should('have.length', 1);
    cy.get('#dropzone').trigger('mouseup', 'center', { which: 1, force: true });

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Make a list');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Check it twice');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', `Find out who's nice`);

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Make a list');
    cy.get('.slick-row').should('have.length', 3);
    cy.get('.recycle-bin.drag-dropzone').should('have.length', 0);
    cy.get('.recycle-bin.drag-hover').should('have.length', 0);
  });

  it('should be able to drag 2 last rows to recycle bin', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`)
      .contains(`Find out who's nice`)
      .type('{ctrl}', { release: false })
      .click();

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`)
      .contains('Check it twice')
      .click()
      .trigger('mousedown', { which: 1, force: true })
      .trigger('mousemove', 'bottomRight');

    cy.get('.recycle-bin.drag-dropzone').should('have.length', 1);
    cy.get('.drag-message').contains('Drag to Recycle Bin to delete 2 selected row(s)');

    cy.get('#dropzone').trigger('mousemove', 'center');

    cy.get('.recycle-bin.drag-hover').should('have.length', 1);
    cy.get('#dropzone').trigger('mouseup', 'center', { which: 1, force: true });

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Make a list');
    cy.get('.slick-row').should('have.length', 1);
    cy.get('.recycle-bin.drag-dropzone').should('have.length', 0);
    cy.get('.recycle-bin.drag-hover').should('have.length', 0);
  });
});

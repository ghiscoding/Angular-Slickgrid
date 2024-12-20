describe('Example 14 - Grouping & Aggregators', () => {
  const fullTitles = ['Id Click me', 'Title', 'Duration', '% Complete', 'Start', 'Finish', 'Cost', 'Effort Driven'];
  const GRID_ROW_HEIGHT = 35;

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/grouping`);
    cy.get('h2').should('contain', 'Example 14: Grouping & Aggregators');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#grid14')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  describe('Grouping Tests', () => {
    it('should "Group by Duration & sort groups by value" then Collapse All and expect only group titles', () => {
      cy.get('[data-test="add-50k-rows-btn"]').click();
      cy.get('[data-test="group-duration-sort-value-btn"]').click();
      cy.get('[data-test="collapse-all-btn"]').click();

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 0');

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 1');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 2');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 3');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 4');
    });

    it('should click on Expand All columns and expect 1st row as grouping title and 2nd row as a regular row', () => {
      cy.get('[data-test="add-50k-rows-btn"]').click();
      cy.get('[data-test="group-duration-sort-value-btn"]').click();
      cy.get('[data-test="expand-all-btn"]').click();

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 0');

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Task');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).should('contain', '0');
    });

    it('should "Group by Duration then Effort-Driven" and expect 1st row to be expanded, 2nd row to be collapsed and 3rd row to have group totals', () => {
      cy.get('[data-test="group-duration-effort-btn"]').click();

      cy.get(
        `[style="top: ${GRID_ROW_HEIGHT * 0}px;"].slick-group-level-0 > .slick-cell:nth(0) .slick-group-toggle.expanded`
      ).should('have.length', 1);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"].slick-group-level-0 > .slick-cell:nth(0) .slick-group-title`).should(
        'contain',
        'Duration: 0'
      );

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"].slick-group-level-1 .slick-group-toggle.collapsed`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"].slick-group-level-1 .slick-group-title`).should(
        'contain',
        'Effort-Driven: False'
      );

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"].slick-group-level-1 .slick-group-toggle.collapsed`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"].slick-group-level-1 .slick-group-title`).should(
        'contain',
        'Effort-Driven: True'
      );

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"].slick-group-totals.slick-group-level-0 .slick-cell:nth(2)`).should(
        'contain',
        'Total: 0'
      );
    });

    it('should "Group by Duration then Effort-Driven then Percent" and expect fist 2 rows to be expanded, 3rd row to be collapsed then 4th row to have group total', () => {
      cy.get('[data-test="group-duration-effort-percent-btn"]').click();

      cy.get(
        `[style="top: ${GRID_ROW_HEIGHT * 0}px;"].slick-group-level-0 > .slick-cell:nth(0) .slick-group-toggle.expanded`
      ).should('have.length', 1);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"].slick-group-level-0 > .slick-cell:nth(0) .slick-group-title`).should(
        'contain',
        'Duration: 0'
      );

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"].slick-group-level-1 .slick-group-toggle.expanded`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"].slick-group-level-1 .slick-group-title`).should(
        'contain',
        'Effort-Driven: False'
      );

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"].slick-group-level-2 .slick-group-toggle.collapsed`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"].slick-group-level-2 .slick-group-title`).contains(/^% Complete: [0-9]/);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"].slick-group-totals.slick-group-level-2 .slick-cell:nth(3)`).contains(
        /^Avg: [0-9]%$/
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"].slick-group-totals.slick-group-level-2`)
        .find('.slick-cell:nth(3)')
        .contains('Avg: ');
    });
  });

  describe('Diverse Input Text Filters with multiple symbol variances', () => {
    it('should clear all Groupings', () => {
      cy.get('[data-test="clear-grouping-btn"]').click();
    });

    it('should return 500 rows using "Ta*33" (starts with "Ta" + ends with 33)', () => {
      cy.get('.search-filter.filter-title').clear().type('Ta*3');

      cy.get('.item-count').should('contain', 5000);

      cy.get('.search-filter.filter-title').clear().type('Ta*33');

      cy.get('.item-count').should('contain', 500);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 33');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 133');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 233');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 333');
    });

    it('should return 40000 rows using "Ta*" (starts with "Ta")', () => {
      cy.get('.search-filter.filter-title').clear().type('Ta*');

      cy.get('.item-count').should('contain', 50000);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 0');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 1');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 2');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 3');
    });

    it('should return 500 rows using "*11" (ends with "11")', () => {
      cy.get('.search-filter.filter-title').clear().type('*11');

      cy.get('.item-count').should('contain', 500);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 1');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 11');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 21');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 31');
    });

    it('should return 497 rows using ">222" (greater than 222)', () => {
      cy.get('.search-filter.filter-sel').clear().type('>222');

      cy.get('.item-count').should('contain', 497);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 311');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 411');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 511');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 611');
    });

    it('should return 499 rows using "<>311" (not equal to 311)', () => {
      cy.get('.search-filter.filter-sel').clear().type('<>311');

      cy.get('.item-count').should('contain', 499);

      cy.get('.search-filter.filter-sel').clear().type('!=311');

      cy.get('.item-count').should('contain', 499);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 11');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 111');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 211');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 411');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 511');
    });

    it('should return 1 rows using "=311" or "==311" (equal to 311)', () => {
      cy.get('.search-filter.filter-sel').clear().type('=311');

      cy.get('.item-count').should('contain', 1);

      cy.get('.search-filter.filter-sel').clear().type('==311');

      cy.get('.item-count').should('contain', 1);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Task 311');
    });
  });

  describe('Column Header with HTML Elements', () => {
    it('should trigger an alert when clicking on the 1st column button inside its header', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('button[data-test=col1-hello-btn]')
        .click({ force: true })
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Hello World'));
    });

    it('should open Column Picker and have a "Custom Label" as the 1st column label', () => {
      cy.get('#grid14').find('.slick-header-column').first().trigger('mouseover').trigger('contextmenu').invoke('show');

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list li:nth-child(1) .checkbox-label')
        .should('have.text', 'Custom Label');
    });

    it('should open Grid Menu and have a "Custom Label" as the 1st column label', () => {
      cy.get('#grid14').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get(`.slick-grid-menu:visible`)
        .find('.slick-column-picker-list li:nth-child(1) .checkbox-label')
        .should('have.text', 'Custom Label');

      cy.get('[data-dismiss="slick-grid-menu"]').click();
    });
  });
});

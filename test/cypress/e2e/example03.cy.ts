describe('Example 3 - Grid with Editors', () => {
  const GRID_ROW_HEIGHT = 35;
  const fullTitles = [
    '',
    '',
    'Title',
    'Title, Custom Editor',
    'Duration (days)',
    '% Complete',
    'Start',
    'Finish',
    'City of Origin',
    'Country of Origin',
    'Country of Origin Name',
    'Effort Driven',
    'Prerequisites',
  ];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/editor`);
    cy.get('h2').should('contain', 'Example 3: Editors / Delete');
  });

  it('should have exact Column Titles in the grid', () => {
    cy.get('#grid3')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should be able to change Title with Custom Editor and expect to save when changing the value and then mouse clicking on a different cell', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`)
      .should('contain', 'Task 1')
      .click();
    cy.get('input[type=text].editor-text').type('Task 8888');

    // mouse click on next cell on the right & expect a save
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(4)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should('contain', 'Task 8888');
  });

  it('should be able to undo the editor and expect it to be opened, then clicking on Escape should reveal the cell to have rolled back text of "Task 1"', () => {
    cy.get('[data-test="undo-btn"]').click();

    cy.get('input[type=text].editor-text').should('exist').type('{esc}');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should('contain', 'Task 1');
  });

  it('should enable "Auto Commit Edit"', () => {
    cy.get('[data-test=auto-commit]').click();
  });

  it('should be able to change all values of 3rd row', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(2)`)
      .should('contain', 'Task 2')
      .click();

    // change Title & Custom Title
    cy.get('.editor-title > textarea').type('Task 2222');
    cy.get('.editor-title .btn-save').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 2222');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).should('contain', 'Task 2222');

    // change duration
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(4)`).click();
    cy.get('.slider-editor input[type=range]').as('range').invoke('val', 25).trigger('change', { force: true });
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(4)`).should('contain', '25');

    // change % Complete
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(5)`).click();
    cy.get('[data-name=editor-complete].ms-drop > ul > li > label:nth(5)').contains('95').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(5)`).find(
      '.percent-complete-bar[style="background: green; width: 95%;"]'
    );

    // change Finish date
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(6)`).click();
    cy.get('.vanilla-calendar-month:visible').click();
    cy.get('.vanilla-calendar-months__month').contains('Jan').click();
    cy.get('.vanilla-calendar-year').click();
    cy.get('.vanilla-calendar-years__year').contains('2009').click();
    cy.get('.vanilla-calendar-day__btn').contains('22').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(6)`).should('contain', '2009-01-22');

    // change City of Origin
    // cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(8)`).click({ force: true });
    // cy.get('input.autocomplete.editor-cityOfOrigin.ui-autocomplete-input')
    //   .type('Venice');

    // change Effort Driven
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(11)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(11) > input.editor-checkbox.editor-effort-driven`).check();

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');
  });

  it('should dynamically add 2x new "Title" columns', () => {
    const updatedTitles = [
      '',
      '',
      'Title',
      'Title, Custom Editor',
      'Duration (days)',
      '% Complete',
      'Start',
      'Finish',
      'City of Origin',
      'Country of Origin',
      'Country of Origin Name',
      'Effort Driven',
      'Prerequisites',
      'Title',
      'Title',
    ];

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(13)`).should('not.exist');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(14)`).should('not.exist');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`)
      .should('contain', 'Task 0')
      .should('have.length', 1);

    cy.get('#grid3')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(updatedTitles[index]));

    cy.get('[data-test=add-title-column]').click().click();

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(13)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(14)`).should('contain', 'Task 0');
  });

  it('should be able to change value of 1st row "Title" column and expect same value set in all 3 "Title" columns', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`)
      .should('contain', 'Task 0')
      .click();

    // change Title & Custom Title
    cy.get('.editor-title > textarea').type('Task 0000');
    cy.get('.editor-title .btn-save').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 0000');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should('contain', 'Task 0000');

    // change duration
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).click();
    cy.get('.slider-editor input[type=range]').as('range').invoke('val', 50).trigger('change', { force: true });
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).should('contain', '50');

    // change % Complete
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`).click();
    cy.get('[data-name=editor-complete].ms-drop > ul > li > label:nth(5)').contains('95').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`).find(
      '.percent-complete-bar[style="background: green; width: 95%;"]'
    );

    // change Finish date
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).click();
    cy.get('.vanilla-calendar-month:visible').click();
    cy.get('.vanilla-calendar-months__month').contains('Jan').click();
    cy.get('.vanilla-calendar-year').click();
    cy.get('.vanilla-calendar-years__year').contains('2009').click();
    cy.get('.vanilla-calendar-day__btn').contains('22').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).should('contain', '2009-01-22');

    // change Effort Driven
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(11)`).click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(11) > input.editor-checkbox.editor-effort-driven`)
      .check()
      .blur();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(10)`).click(); // the blur seems to not always work, so just click on another cell
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(11)`).find('.mdi-check.checkmark-icon');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');
  });

  it('should be able to filter and search "Task 2222" in the new column and expect only 1 row showing in the grid', () => {
    cy.get('input.search-filter.filter-title1').type('Task 2222', { force: true }).should('have.value', 'Task 2222');

    cy.get('.slick-row').should('have.length', 1);
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 2222');
  });

  it('should hover over the last "Title" column and click on "Clear Filter" and expect grid to have all rows shown', () => {
    cy.get('.slick-header-column:nth-child(14)')
      .first()
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(6)')
      .children('.slick-menu-content')
      .should('contain', 'Remove Filter')
      .click();

    cy.get('.slick-row').should('have.length.greaterThan', 1);
  });

  it('should be able to dynamically remove last 2 added Title columns', () => {
    cy.get('[data-test=remove-title-column]').click().click();

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 0');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(13)`).should('not.exist');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(14)`).should('not.exist');
  });

  it('should be able to change values again of 1st row "Title" column and expect same value set in all 3 "Title" columns', () => {
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`)
      .should('contain', 'Task 0')
      .click();

    // change Title & Custom Title
    cy.get('.editor-title > textarea').type('Task 0000');
    cy.get('.editor-title .btn-save').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 0000');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should('contain', 'Task 0000');

    // change duration
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).click();
    cy.get('.slider-editor input[type=range]').as('range').invoke('val', 50).trigger('change', { force: true });
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).should('contain', '50');

    // change % Complete
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`).click();
    cy.get('[data-name=editor-complete].ms-drop > ul > li > label:nth(3)').contains('97').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`).find(
      '.percent-complete-bar[style="background: green; width: 97%;"]'
    );

    // change Finish date
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).click();
    cy.get('.vanilla-calendar-day__btn').contains('21').click();
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).should('contain', '2009-01-21');

    // // change Effort Driven
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(11)`).click();
    cy.get(
      `[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(11) > input.editor-checkbox.editor-effort-driven`
    ).uncheck();
  });

  it('should open the "Prerequisites" Filter then choose "Task 3", "Task 4" and "Task 8" from the list and expect to see 2 rows of data in the grid', () => {
    cy.get('div.ms-filter.filter-prerequisites').trigger('click');

    cy.get('.ms-drop')
      .contains(/^Task 3$/) // use regexp to avoid finding first Task 3 which is in fact Task 399
      .click();

    cy.get('.ms-drop')
      .contains(/^Task 4$/)
      .click();

    cy.get('.ms-drop')
      .contains(/^Task 8$/)
      .click();

    cy.get('.ms-ok-button').click();

    cy.get('.slick-row').should('have.length', 2);

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 4');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).should('contain', 'Task 8');
  });
});

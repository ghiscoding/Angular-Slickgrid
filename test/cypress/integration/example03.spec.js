/// <reference types="cypress" />

function removeExtraSpaces(textS) {
  return `${textS}`.replace(/\s+/g, ' ').trim();
}

describe('Example 3 - Grid with Editors', () => {
  const GRID_ROW_HEIGHT = 35;
  const fullTitles = [
    '', '', 'Title', 'Title, Custom Editor', 'Duration (days)', '% Complete',
    'Start', 'Finish', 'City of Origin', 'Country of Origin', 'Country of Origin Name',
    'Effort Driven', 'Prerequisites',
  ];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/editor`);
    cy.get('h2').should('contain', 'Example 3: Editors / Delete');
  });

  it('should have exact Column Titles in the grid', () => {
    cy.get('#grid3')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should enable "Auto Commit Edit"', () => {
    cy.get('[data-test=auto-commit]')
      .click();
  });

  it('should be able to change all values of 3rd row', () => {
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(2)`).should('contain', 'Task 2').click();

    // change Title & Custom Title
    cy.get('.editor-title > textarea').type('Task 2222');
    cy.get('.editor-title .btn-save').click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(2)`).should('contain', 'Task 2222');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(3)`).should('contain', 'Task 2222');

    // change duration
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(4)`).click();
    cy.get('.slider-editor input[type=range]').as('range')
      .invoke('val', 25)
      .trigger('change')
      .type('{enter}', { force: true });
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(4)`).should('contain', '25');

    // change % Complete
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(5)`).click();
    cy.get('[name=editor-complete].ms-drop > ul > li > label:nth(5)').contains('95').click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(5)`)
      .find('.percent-complete-bar[style="background:green; width:95%"]');

    // change Finish date
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(6)`).click();
    cy.get('.flatpickr-monthDropdown-months:visible')
      .select('January', { force: true });
    cy.get('.numInput.cur-year:visible').type('2009');
    cy.get('.flatpickr-day:visible:nth(25)').click('bottom', { force: true })
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(6)`).should('contain', '2009-01-22');

    // change City of Origin
    // cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(8)`).click({ force: true });
    // cy.get('input.autocomplete.editor-cityOfOrigin.ui-autocomplete-input')
    //   .type('Venice');

    // change Effort Driven
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(11)`).click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 2}px"] > .slick-cell:nth(11) > input.editor-checkbox.editor-effort-driven`).check();

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left')
      .scrollTo('top');
  });

  it('should dynamically add 2x new "Title" columns', () => {
    const updatedTitles = [
      '', '', 'Title', 'Title, Custom Editor', 'Duration (days)', '% Complete',
      'Start', 'Finish', 'City of Origin', 'Country of Origin', 'Country of Origin Name',
      'Effort Driven', 'Prerequisites', 'Title', 'Title'
    ];

    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(2)`).should('contain', 'Task 0');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(13)`).should('not.exist');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(14)`).should('not.exist');

    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(2)`)
      .should('contain', 'Task 0')
      .should('have.length', 1);

    cy.get('#grid3')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(updatedTitles[index]));

    cy.get('[data-test=add-title-column]')
      .click()
      .click();

    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(2)`).should('contain', 'Task 0');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(3)`).should('contain', 'Task 0');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(13)`).should('contain', 'Task 0');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(14)`).should('contain', 'Task 0');
  });

  it('should be able to change value of 1st row "Title" column and expect same value set in all 3 "Title" columns', () => {
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(2)`).should('contain', 'Task 0').click();

    // change Title & Custom Title
    cy.get('.editor-title > textarea').type('Task 0000');
    cy.get('.editor-title .btn-save').click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(2)`).should('contain', 'Task 0000');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(3)`).should('contain', 'Task 0000');

    // change duration
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(4)`).click();
    cy.get('.slider-editor input[type=range]').as('range')
      .invoke('val', 50)
      .trigger('change')
      .type('{enter}', { force: true });
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(4)`).should('contain', '50');

    // change % Complete
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(5)`).click();
    cy.get('[name=editor-complete].ms-drop > ul > li > label:nth(5)').contains('95').click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(5)`)
      .find('.percent-complete-bar[style="background:green; width:95%"]');

    // change Finish date
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(6)`).click();
    cy.get('.flatpickr-monthDropdown-months:visible')
      .select('January', { force: true });
    cy.get('.numInput.cur-year:visible').type('2009');
    cy.get('.flatpickr-day:visible:nth(25)').click('bottom', { force: true })
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(6)`).should('contain', '2009-01-22');

    // change Effort Driven
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(11)`).click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(11) > input.editor-checkbox.editor-effort-driven`).check().blur();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(10)`).click(); // the blur seems to not always work, so just click on another cell
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(11)`).find('.fa-check.checkmark-icon');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left')
      .scrollTo('top');
  });

  it('should be able to dynamically remove last 2 added Title columns', () => {
    cy.get('[data-test=remove-title-column]')
      .click()
      .click();

    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(2)`).should('contain', 'Task 0');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(13)`).should('not.exist');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(14)`).should('not.exist');
  });

  it('should be able to change values again of 1st row "Title" column and expect same value set in all 3 "Title" columns', () => {
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(2)`).should('contain', 'Task 0').click();

    // change Title & Custom Title
    cy.get('.editor-title > textarea').type('Task 0000');
    cy.get('.editor-title .btn-save').click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(2)`).should('contain', 'Task 0000');
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(3)`).should('contain', 'Task 0000');

    // change duration
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(4)`).click();
    cy.get('.slider-editor input[type=range]').as('range')
      .invoke('val', 50)
      .trigger('change')
      .type('{enter}', { force: true });
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(4)`).should('contain', '50');

    // change % Complete
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(5)`).click();
    cy.get('[name=editor-complete].ms-drop > ul > li > label:nth(3)').contains('97').click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(5)`)
      .find('.percent-complete-bar[style="background:green; width:97%"]');

    // change Finish date
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(6)`).click();
    cy.get('.flatpickr-day:visible:nth(24)').click('bottom', { force: true })
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(6)`).should('contain', '2009-01-21');

    // // change Effort Driven
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(11)`).click();
    cy.get(`[style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(11) > input.editor-checkbox.editor-effort-driven`).uncheck();
  });
});

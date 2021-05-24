/// <reference types="cypress" />

function removeExtraSpaces(textS) {
  return `${textS}`.replace(/\s+/g, ' ').trim();
}

describe('Example 21 - Row Detail View', { retries: 1 }, () => {
  const titles = ['', 'Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/rowdetail`);
    cy.get('h2').should('contain', 'Example 21: Row Detail View');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#grid21')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should display first few rows of Task 0 to 5', () => {
    const expectedTasks = ['Task 0', 'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

    cy.get('#grid21')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)')
          .first()
          .should('contain', expectedTasks[index]);
      });
  });

  it('should click anywhere on 3rd row to open its Row Detail and expect its title to be Task 2 in an H2 tag', () => {
    cy.get('#grid21')
      .find('.slick-row:nth(2)')
      .click();

    cy.get('#grid21')
      .find('.innerDetailView_2 .container_2')
      .as('detailContainer');

    cy.get('@detailContainer')
      .find('h3')
      .contains('Task 2');
  });

  it('should click on the "Click Me" button and expect the assignee name to showing in uppercase in an Alert', () => {
    let assignee = '';
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#grid21')
      .find('.innerDetailView_2 .container_2')
      .as('detailContainer');

    cy.get('@detailContainer')
      .find('input')
      .invoke('val')
      .then(text => assignee = text);

    cy.get('@detailContainer')
      .find('[data-test=assignee-btn]')
      .click()
      .then(() => {
        if (assignee === '') {
          expect(alertStub.getCall(0)).to.be.calledWith(`No one is assigned to this task.`);
        } else {
          expect(alertStub.getCall(0)).to.be.calledWith(`Assignee on this task is: ${assignee.toUpperCase()}`);
        }
      });
  });

  it('should click on the "Call Parent Method" button and expect a Bootstrap Alert to show up with some text containing the Task 2', () => {
    cy.get('#grid21')
      .find('.innerDetailView_2 .container_2')
      .as('detailContainer');

    cy.get('@detailContainer')
      .find('[data-test=parent-btn]')
      .click();

    cy.get('.alert-info[data-test=flash-msg]')
      .contains('We just called Parent Method from the Row Detail Child Component on Task 2');
  });

  it('should click on the "Delete Row" button and expect the Task 2 to be deleted from the grid', () => {
    const expectedTasks = ['Task 0', 'Task 1', 'Task 3', 'Task 4', 'Task 5'];

    cy.get('#grid21')
      .find('.innerDetailView_2 .container_2')
      .as('detailContainer');

    cy.get('@detailContainer')
      .find('[data-test=delete-btn]')
      .click();

    cy.get('.slick-viewport-top.slick-viewport-left')
      .scrollTo('top');

    cy.get('#grid21')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)')
          .first()
          .should('contain', expectedTasks[index]);
      });

    cy.get('.alert-danger[data-test=flash-msg]')
      .contains('Deleted row with Task 2');
  });

  it('should open a few Row Details and expect them to be closed after clicking on the "Close All Row Details" button', () => {
    const expectedTasks = ['Task 0', 'Task 1', 'Task 3', 'Task 4', 'Task 5'];

    cy.get('#grid21')
      .find('.slick-row:nth(2)')
      .click();

    cy.get('#grid21')
      .find('.innerDetailView_3 .container_3')
      .as('detailContainer3');

    cy.get('@detailContainer3')
      .find('h3')
      .contains('Task 3');

    cy.get('#grid21')
      .find('.slick-row:nth(0)')
      .click();

    cy.get('#grid21')
      .find('.innerDetailView_0 .container_0')
      .as('detailContainer0');

    cy.get('@detailContainer0')
      .find('h3')
      .contains('Task 0');

    cy.get('[data-test=close-all-btn]')
      .click();

    cy.get('.slick-viewport-top.slick-viewport-left')
      .scrollTo('top');

    cy.get('#grid21')
      .find('.innerDetailView_0 .container_0')
      .should('not.exist');

    cy.get('#grid21')
      .find('.innerDetailView_1 .container_1')
      .should('not.exist');

    cy.get('#grid21')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)')
          .first()
          .should('contain', expectedTasks[index]);
      });
  });

  it('should open a few Row Details, then sort by Title and expect all Row Details to be closed afterward', () => {
    const expectedTasks = ['Task 1', 'Task 10', 'Task 100', 'Task 101', 'Task 102'];

    cy.get('#grid21')
      .find('.slick-row:nth(0)')
      .click();

    cy.get('#grid21')
      .find('.innerDetailView_0 .container_0')
      .as('detailContainer0');

    cy.get('@detailContainer0')
      .find('h3')
      .contains('Task 0');

    cy.get('#grid21')
      .find('.slick-row:nth(9)')
      .click();

    cy.get('#grid21')
      .find('.innerDetailView_3 .container_3')
      .as('detailContainer3');

    cy.get('@detailContainer3')
      .find('h3')
      .contains('Task 3');

    cy.get('#slickGridContainer-grid21')
      .find('.slick-header-column:nth(1)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('be.visible')
      .children('.slick-header-menuitem:nth-child(4)')
      .children('.slick-header-menucontent')
      .should('contain', 'Sort Descending')
      .click();

    cy.get('#slickGridContainer-grid21')
      .find('.slick-header-column:nth(1)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('be.visible')
      .children('.slick-header-menuitem:nth-child(3)')
      .children('.slick-header-menucontent')
      .should('contain', 'Sort Ascending')
      .click();

    cy.get('.slick-viewport-top.slick-viewport-left')
      .scrollTo('top');

    cy.get('#grid21')
      .find('.innerDetailView_0 .container_0')
      .should('not.exist');

    cy.get('#grid21')
      .find('.innerDetailView_3 .container_3')
      .should('not.exist');

    cy.get('#grid21')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)')
          .first()
          .should('contain', expectedTasks[index]);
      });
  });
});

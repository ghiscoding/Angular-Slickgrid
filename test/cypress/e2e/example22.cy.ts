describe('Example 22 - Use of Angular Components', () => {
  const fullTitles = [
    'Title',
    'Title with Angular Component',
    'Assignee',
    'Assignee with Angular Component',
    '% Complete',
    'Start',
    'Finish',
    'Action',
  ];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/angular-components`);
    cy.get('h2').should('contain', 'Example 22: Use of Angular Components');
  });

  it('should have exact column titles in grid', () => {
    cy.get('#slickGridContainer-grid22')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should have a 2nd column title with an interactive angular component rendering a button and showing an alert on click', () => {
    const stub = cy.stub();

    cy.on('window:alert', stub);

    cy.get('#grid22')
      .find('.slick-row')
      .first()
      .children('.slick-cell:nth(1)')
      .find('button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Hello Task 0');
      });
  });

  it('should click on the last column "Action" dropdown of 2nd row, and then "Delete Row" and expect it to be removed from the grid', () => {
    const expectationRowBefore = ['Task 0', 'Task 1', 'Task 2', 'Task 3', 'Task 4'];
    const expectationRowAfter = ['Task 0', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

    // before deleting the row
    cy.get('#grid22')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectationRowBefore.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell').first().should('contain', expectationRowBefore[index]);
      });

    cy.get('#grid22').find('.slick-row:nth(1) .slick-cell:nth(7)').contains('Action').click({ force: true });

    cy.get('.slick-cell-menu .slick-menu-command-list')
      .find('.slick-menu-item.red')
      .should('exist')
      .contains('Delete Row')
      .click();

    // after deleting the row
    cy.get('#grid22')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectationRowAfter.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell').first().should('contain', expectationRowAfter[index]);
      });
  });

  it('should expect a Custom Angular ng-Select Dropdown Editor then select 1st option of 3 Assignee names', () => {
    cy.get('.slick-row:nth(0)').children('.slick-cell:nth(2)').click().click();

    cy.get('.ng-dropdown-panel-items .ng-option').should('have.length', 4);

    cy.get('.ng-dropdown-panel-items .ng-option:nth(1)').click();

    cy.get('.slick-row:nth(1)').children('.slick-cell:nth(2)').click().click();

    cy.get('.ng-dropdown-panel-items .ng-option:nth(2)').click();

    cy.get('[data-test=auto-commit]').click();
  });

  it('should have 2 first rows with "Assignee" of "John" (0) then "Pierre" (1)', () => {
    const tasks = [
      ['Task 0', 'John', 'John'],
      ['Task 2', 'Pierre', 'Pierre'],
    ];

    cy.get('#grid22')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > tasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(0)').should('contain', tasks[index][0]);
        cy.wrap($row).children('.slick-cell:nth(2)').should('contain', tasks[index][1]);
        if (index === 0) {
          cy.wrap($row).children('.slick-cell:nth(2)').should('contain', '');
        } else {
          cy.wrap($row).children('.slick-cell:nth(2)').should('contain', tasks[index][2]);
        }
      });
  });

  it('should remove Angular Component rendered for AsyncPostRender once content is copied', () => {
    cy.visit(`${Cypress.config('baseUrl')}/angular-components`);

    cy.get('router-outlet').siblings().should('have.length', 1);
  });
});

describe('Example 21 - Row Detail View', () => {
  const titles = ['', 'Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/rowdetail`);
    cy.get('h2').should('contain', 'Example 21: Row Detail View');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#grid21')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should change server delay to 40ms for faster testing', () => {
    cy.get('[data-test="set-count-btn"]').click();
    cy.get('[data-test="server-delay"]').type('{backspace}');
  });

  it('should display first few rows of Task 0 to 5', () => {
    const expectedTasks = ['Task 0', 'Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

    cy.get('#grid21')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)').first().should('contain', expectedTasks[index]);
      });
  });

  it('should click anywhere on 3rd row to open its Row Detail and expect its title to be Task 2 in an H2 tag', () => {
    cy.get('#grid21').find('.slick-row:nth(2)').click();

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_2 .container_2').as('detailContainer');

    cy.get('@detailContainer').find('h3').contains('Task 2');
  });

  it('should click on the "Click Me" button and expect the assignee name to showing in uppercase in an Alert', () => {
    let assignee = '';
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_2 .container_2').as('detailContainer');

    cy.get('@detailContainer')
      .find('input')
      .invoke('val')
      .then((text) => (assignee = `${text || ''}`));

    cy.wait(10);

    cy.get('@detailContainer')
      .find('[data-test=assignee-btn]')
      .click()
      .then(() => {
        if (assignee === '') {
          expect(alertStub.getCall(0)).to.be.calledWith('No one is assigned to this task.');
        } else {
          expect(alertStub.getCall(0)).to.be.calledWith(`Assignee on this task is: ${assignee.toUpperCase()}`);
        }
      });
  });

  it('should click on the "Call Parent Method" button and expect a Bootstrap Alert to show up with some text containing the Task 2', () => {
    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_2 .container_2').as('detailContainer');

    cy.get('@detailContainer').find('[data-test=parent-btn]').click();

    cy.get('.alert-info[data-test=flash-msg]').contains(
      'We just called Parent Method from the Row Detail Child Component on Task 2'
    );
  });

  it('should click on the "Delete Row" button and expect the Task 2 to be deleted from the grid', () => {
    const expectedTasks = ['Task 0', 'Task 1', 'Task 3', 'Task 4', 'Task 5'];

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_2 .container_2').as('detailContainer');

    cy.get('@detailContainer').find('[data-test=delete-btn]').click();

    cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('top');

    cy.get('#grid21')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)').first().should('contain', expectedTasks[index]);
      });

    cy.get('.alert-danger[data-test=flash-msg]').contains('Deleted row with Task 2');
  });

  it('should open a few Row Details and expect them to be closed after clicking on the "Close All Row Details" button', () => {
    const expectedTasks = ['Task 0', 'Task 1', 'Task 3', 'Task 4', 'Task 5'];

    cy.get('#grid21').find('.slick-row:nth(2)').click();

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_3 .container_3').as('detailContainer3');

    cy.get('@detailContainer3').find('h3').contains('Task 3');

    cy.get('#grid21').find('.slick-row:nth(0)').click();

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_0 .container_0').as('detailContainer0');

    cy.get('@detailContainer0').find('h3').contains('Task 0');

    cy.get('[data-test=collapse-all-btn]').click();

    cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('top');

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_0 .container_0').should('not.exist');

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_1 .container_1').should('not.exist');

    cy.get('#grid21')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)').first().should('contain', expectedTasks[index]);
      });
  });

  it('should open a few Row Details, then sort by Title and expect all Row Details to be closed afterward', () => {
    const expectedTasks = ['Task 0', 'Task 1', 'Task 10', 'Task 100', 'Task 101', 'Task 102', 'Task 103', 'Task 104'];

    cy.get('#grid21').find('.slick-row:nth(0)').click();

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_0 .container_0').as('detailContainer0');

    cy.get('@detailContainer0').find('h3').contains('Task 0');

    cy.get('#grid21').find('.slick-row:nth(9)').click();

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_3 .container_3').as('detailContainer3');

    cy.get('@detailContainer3').find('h3').contains('Task 3');

    cy.get('#slickGridContainer-grid21')
      .find('.slick-header-column:nth(1)')
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(4)')
      .children('.slick-menu-content')
      .should('contain', 'Sort Descending')
      .click();

    cy.get('#slickGridContainer-grid21')
      .find('.slick-header-column:nth(1)')
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(3)')
      .children('.slick-menu-content')
      .should('contain', 'Sort Ascending')
      .click();

    cy.get('#grid21').find('.slick-header-column:nth(1)').find('.slick-sort-indicator-asc').should('have.length', 1);

    cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('top');

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_0 .container_0').should('not.exist');

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_3 .container_3').should('not.exist');

    cy.get('#grid21')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > expectedTasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell:nth(1)').first().should('contain', expectedTasks[index]);
      });
  });

  it('should click open Row Detail of Task 1 and Task 101 then type a title filter of "Task 101" and expect Row Detail to be opened and still be rendered', () => {
    cy.get('#grid21').find('.slick-row:nth(4)').click();

    cy.get('#grid21').find('.slick-row:nth(1)').click();

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_101').as('detailContainer');

    cy.get('@detailContainer').find('h3').contains('Task 101');

    cy.get('.search-filter.filter-title').type('Task 101');
  });

  it('should call "Clear all Filters" from Grid Menu and expect "Task 101" to still be rendered correctly', () => {
    cy.get('#grid21').find('button.slick-grid-menu-button').trigger('click').click();

    cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_101').as('detailContainer');

    cy.get('@detailContainer').find('h3').contains('Task 101');
  });

  it('should call "Clear all Sorting" from Grid Menu and expect all row details to be collapsed', () => {
    cy.get('#grid21').find('button.slick-grid-menu-button').trigger('click').click();

    cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').find('span').contains('Clear all Sorting').click();

    cy.get('#grid21').find('.slick-sort-indicator-asc').should('have.length', 0);

    cy.get('.dynamic-cell-detail').should('have.length', 0);
  });

  it('should close all row details & make grid editable', () => {
    cy.get('[data-test="collapse-all-btn"]').click();
    cy.get('[data-test="editable-grid-btn"]').click();
  });

  it('should click on 5th row detail open icon and expect it to open', () => {
    cy.get('#grid21').find('.slick-row:nth(4) .slick-cell:nth(0)').click();

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_101').as('detailContainer');

    cy.get('@detailContainer').find('h3').contains('Task 101');
  });

  it('should click on 2nd row "Title" cell to edit it and expect Task 5 row detail to get closed', () => {
    cy.get('#grid21').find('.slick-row:nth(1) .slick-cell:nth(1)').click();

    cy.get('.editor-title')
      .invoke('val')
      .then((text) => expect(text).to.eq('Task 1'));

    cy.get('#grid21').find('.slick-cell + .dynamic-cell-detail .innerDetailView_101').should('not.exist');
  });
});

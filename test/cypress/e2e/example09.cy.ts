describe('Example 9 - Grid Menu', () => {
  const fullEnglishTitles = ['Title', 'Duration', '% Complete', 'Start', 'Finish', 'Completed'];
  const fullFrenchTitles = ['Titre', 'Durée', '% Achevée', 'Début', 'Fin', 'Terminé'];

  beforeEach(() => {
    // create a console.log spy for later use
    cy.window().then((win) => {
      cy.spy(win.console, 'log');
    });
  });

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/gridmenu`);
    cy.get('h2').should('contain', 'Example 9: Grid Menu Control');
  });

  describe('use English locale', () => {
    it('should have exact Column Titles in the grid', () => {
      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
    });

    it('should open the Grid Menu and expect a title for "Custom Menus" and for "Columns"', () => {
      cy.get('#grid9').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get('.slick-menu-command-list').find('.slick-menu-title').contains('Custom Commands');

      cy.get('.slick-grid-menu').find('.slick-menu-title').contains('Columns');

      cy.get('#grid9').get('.slick-grid-menu:visible').find('.close').trigger('click').click({ force: true });
    });

    it('should hover over the Title column and click on "Hide Column" command and remove 1st column from grid', () => {
      const smallerTitleList = fullEnglishTitles.slice(1);

      cy.get('#grid9')
        .find('.slick-header-column')
        .first()
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .should('be.hidden')
        .invoke('show')
        .trigger('click', { force: true });

      cy.get('.slick-header-menu .slick-menu-command-list')
        .should('be.visible')
        .children('.slick-menu-item:nth-of-type(4)')
        .children('.slick-menu-content')
        .should('contain', 'Hide Column')
        .click({ force: true });

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(smallerTitleList[index]));
    });

    it('should hide a column from the picker and then open the Grid Menu and expect the "Command 1" to NOT be usable', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('#grid9').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get('.slick-menu-item.orange')
        .find('.slick-menu-content')
        .contains('Command 1')
        .click()
        .then(() => expect(alertStub.getCall(0)).to.be.null);

      cy.get('#grid9').get('.slick-grid-menu:visible').find('.close').trigger('click').click({ force: true });
    });

    it('should type a filter and then open the Grid Menu and expect the "Command 2" to NOT be visible', () => {
      cy.get('input.search-filter.filter-duration').type('10');

      cy.get('#grid9').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get('.slick-menu-item.red').should('not.exist');
    });

    it('should clear all filters and expect no filters in the grid', () => {
      cy.get('#grid9').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get('.slick-menu-item').find('.slick-menu-content').contains('Clear all Filters').click();

      cy.get('input.search-filter.filter-duration').each(($elm) => expect($elm.text()).to.eq(''));
    });

    it('should clear the filters and then open the Grid Menu and expect the "Command 2" to now be visible', () => {
      cy.get('#grid9').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get('.slick-menu-item.red').find('.slick-menu-content.italic').should('contain', 'Command 2');
    });

    it('should click on the Grid Menu to show the Title as 1st column again', () => {
      cy.get('#grid9').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get('#grid9')
        .get('.slick-grid-menu:visible')
        .find('.slick-column-picker-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Title')
        .click({ force: true });

      cy.get('#grid9').get('.slick-grid-menu:visible').find('.close').trigger('click').click({ force: true });

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
    });

    it('should now expect the "Command 1" to be usable since all columns are visible', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('#grid9').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get('.slick-menu-item.orange')
        .find('.slick-menu-content')
        .contains('Command 1')
        .click()
        .then(() => expect(alertStub.getCall(0)).to.be.calledWith('command1'));
    });

    it('should hover over the Title column and click on "Hide Column" command and remove 1st column from grid', () => {
      const smallerTitleList = fullEnglishTitles.slice(1);

      cy.get('#grid9')
        .find('.slick-header-column')
        .first()
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .should('be.hidden')
        .invoke('show')
        .trigger('click', { force: true });

      cy.get('.slick-header-menu .slick-menu-command-list')
        .should('be.visible')
        .children('.slick-menu-item:nth-of-type(4)')
        .children('.slick-menu-content')
        .should('contain', 'Hide Column')
        .click({ force: true });

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(smallerTitleList[index]));
    });

    it('should click on the External Grid Menu to show the Title as 1st column again', () => {
      cy.get('[data-test=external-gridmenu]').trigger('click').click({ force: true });

      cy.get('#grid9')
        .get('.slick-grid-menu:visible')
        .find('.slick-column-picker-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Title')
        .click({ force: true });

      cy.get('#grid9').get('.slick-grid-menu:visible').find('.close').trigger('click').click({ force: true });

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
    });
  });

  describe('switch to French language', () => {
    it('should switch locale to French and have column header titles in French', () => {
      cy.get('[data-test=language]').click({ force: true });

      cy.get('[data-test=selected-locale]').should('contain', 'fr.json');

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullFrenchTitles[index]));
    });

    it('should hover over the Title column and click on "Cacher la colonne" command and remove 1st column from grid', () => {
      const smallerTitleList = fullFrenchTitles.slice(1);

      cy.get('#grid9')
        .find('.slick-header-column')
        .first()
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .should('be.hidden')
        .invoke('show')
        .trigger('click', { force: true });

      cy.get('.slick-header-menu .slick-menu-command-list')
        .should('be.visible')
        .children('.slick-menu-item:nth-of-type(4)')
        .children('.slick-menu-content')
        .should('contain', 'Cacher la colonne')
        .click({ force: true });

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(smallerTitleList[index]));
    });

    it('should click on the Grid Menu to show the Title as 1st column again', () => {
      cy.get('#grid9').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get('#grid9')
        .get('.slick-grid-menu:visible')
        .find('.slick-column-picker-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Titre')
        .click({ force: true });

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullFrenchTitles[index]));
    });

    it('should hover over the Title column and click on "Hide Column" command and remove 1st column from grid', () => {
      const smallerTitleList = fullFrenchTitles.slice(1);

      cy.get('#grid9')
        .find('.slick-header-column')
        .first()
        .trigger('mouseover')
        .children('.slick-header-menu-button')
        .should('be.hidden')
        .invoke('show')
        .trigger('click', { force: true });

      cy.get('.slick-header-menu .slick-menu-command-list')
        .should('be.visible')
        .children('.slick-menu-item:nth-of-type(4)')
        .children('.slick-menu-content')
        .should('contain', 'Cacher la colonne')
        .click({ force: true });

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(smallerTitleList[index]));
    });

    it('should click on the External Grid Menu to show the Title as 1st column again', () => {
      cy.get('[data-test=external-gridmenu]').trigger('click').click({ force: true });

      cy.get('#grid9')
        .get('.slick-grid-menu:visible')
        .find('.slick-column-picker-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Titre')
        .click({ force: true });

      cy.get('#grid9').get('.slick-grid-menu:visible').find('.close').trigger('click').click({ force: true });

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullFrenchTitles[index]));
    });
  });

  describe('Grid Menu with sub-menus', () => {
    it('should switch locale back to English', () => {
      cy.get('[data-test=language]').click({ force: true });

      cy.get('[data-test=selected-locale]').should('contain', 'en.json');

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
    });

    it('should be able to open Grid Menu and click on Export->Text and expect alert triggered with Text Export', () => {
      const subCommands1 = ['Text', 'Excel'];
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('#grid9').find('button.slick-grid-menu-button').click({ force: true });

      cy.get('.slick-grid-menu.slick-menu-level-0 .slick-menu-command-list').find('.slick-menu-item').contains('Exports').click();

      cy.get('.slick-grid-menu.slick-menu-level-1 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(subCommands1[index]));

      cy.get('.slick-grid-menu.slick-menu-level-1 .slick-menu-command-list')
        .find('.slick-menu-item')
        .contains('Text (tab delimited)')
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Exporting as Text (tab delimited)'));
    });

    it('should be able to open Grid Menu and click on Export->Excel->xlsx and expect alert triggered with Excel (xlsx) Export', () => {
      const subCommands1 = ['Text', 'Excel'];
      const subCommands2 = ['Excel (csv)', 'Excel (xlsx)'];
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('#grid9').find('button.slick-grid-menu-button').click({ force: true });

      cy.get('.slick-grid-menu.slick-menu-level-0 .slick-menu-command-list').find('.slick-menu-item').contains('Exports').click();

      cy.get('.slick-grid-menu.slick-menu-level-1 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(subCommands1[index]));

      cy.get('.slick-submenu').should('have.length', 1);
      cy.get('.slick-grid-menu.slick-menu-level-1 .slick-menu-command-list').find('.slick-menu-item').contains('Excel').click();

      cy.get('.slick-grid-menu.slick-menu-level-2 .slick-menu-command-list').as('subMenuList2');

      cy.get('@subMenuList2').find('.slick-menu-title').contains('available formats');

      cy.get('@subMenuList2')
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(subCommands2[index]));
      cy.get('.slick-submenu').should('have.length', 2);

      cy.get('.slick-grid-menu.slick-menu-level-2 .slick-menu-command-list')
        .find('.slick-menu-item')
        .contains('Excel (xlsx)')
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Exporting as Excel (xlsx)'));
      cy.get('.slick-submenu').should('have.length', 0);
    });

    it('should open Export->Excel context sub-menu then open Feedback->ContactUs sub-menus and expect previous Export menu to no longer exists', () => {
      const subCommands1 = ['Text', 'Excel'];
      const subCommands2 = ['Request update from supplier', '', 'Contact Us'];
      const subCommands2_1 = ['Email us', 'Chat with us', 'Book an appointment'];

      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('[data-test=external-gridmenu]').click();

      cy.get('.slick-grid-menu.slick-menu-level-0 .slick-menu-command-list').find('.slick-menu-item').contains('Export').click();

      cy.get('.slick-grid-menu.slick-menu-level-1 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(subCommands1[index]));

      // click different sub-menu
      cy.get('.slick-grid-menu.slick-menu-level-0')
        .find('.slick-menu-item')
        .contains('Feedback')
        .should('exist')
        .trigger('mouseover'); // mouseover or click should work

      cy.get('.slick-submenu').should('have.length', 1);
      cy.get('.slick-grid-menu.slick-menu-level-1')
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(subCommands2[index]));

      // click on Feedback->ContactUs
      cy.get('.slick-grid-menu.slick-menu-level-1.dropright') // right align
        .find('.slick-menu-item')
        .contains('Contact Us')
        .should('exist')
        .click();

      cy.get('.slick-submenu').should('have.length', 2);
      cy.get('.slick-grid-menu.slick-menu-level-2.dropright') // right align
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.eq(subCommands2_1[index]));

      cy.get('.slick-grid-menu.slick-menu-level-2');

      cy.get('.slick-grid-menu.slick-menu-level-2 .slick-menu-command-list')
        .find('.slick-menu-item')
        .contains('Chat with us')
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Command: contact-chat'));

      cy.get('.slick-submenu').should('have.length', 0);
    });
  });
});

describe('Example 9 - Grid Menu', () => {
  const fullEnglishTitles = ['Title', 'Duration', '% Complete', 'Start', 'Finish', 'Completed'];
  const fullFrenchTitles = ['Titre', 'Durée', '% Achevée', 'Début', 'Fin', 'Terminé'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/gridmenu`);
    cy.get('h2').should('contain', 'Example 9: Grid Menu Control');
  });

  describe('use English locale', () => {
    it('should have exact Column Titles in the grid', () => {
      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
    });

    it('should hover over the Title column and click on "Hide Column" command and remove 1st column from grid', () => {
      const smallerTitleList = fullEnglishTitles.slice(1);

      cy.get('#grid9')
        .find('.slick-header-column')
        .first()
        .trigger('mouseover')
        .children('.slick-header-menubutton')
        .should('be.hidden')
        .invoke('show')
        .trigger('click', { force: true });

      cy.get('.slick-header-menu')
        .should('be.visible')
        .children('.slick-header-menuitem:nth-child(2)')
        .children('.slick-header-menucontent')
        .should('contain', 'Hide Column')
        .click();

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(smallerTitleList[index]));
    });

    it('should click on the Grid Menu to show the Title as 1st column again', () => {
      cy.get('#grid9')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

      cy.get('#grid9')
        .get('.slick-gridmenu:visible')
        .find('.slick-gridmenu-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Title')
        .click();

      cy.get('#grid9')
        .get('.slick-gridmenu:visible')
        .find('span.close')
        .trigger('click')
        .click();

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
    });

    it('should hover over the Title column and click on "Hide Column" command and remove 1st column from grid', () => {
      const smallerTitleList = fullEnglishTitles.slice(1);

      cy.get('#grid9')
        .find('.slick-header-column')
        .first()
        .trigger('mouseover')
        .children('.slick-header-menubutton')
        .should('be.hidden')
        .invoke('show')
        .trigger('click', { force: true });

      cy.get('.slick-header-menu')
        .should('be.visible')
        .children('.slick-header-menuitem:nth-child(2)')
        .children('.slick-header-menucontent')
        .should('contain', 'Hide Column')
        .click();

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(smallerTitleList[index]));
    });

    it('should click on the External Grid Menu to show the Title as 1st column again', () => {
      cy.get('[data-test=external-gridmenu]')
        .trigger('click')
        .click();

      cy.get('#grid9')
        .get('.slick-gridmenu:visible')
        .find('.slick-gridmenu-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Title')
        .click();

      cy.get('#grid9')
        .get('.slick-gridmenu:visible')
        .find('span.close')
        .trigger('click')
        .click();

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));

      cy.get('#grid9')
        .get('.slick-gridmenu')
        .find('span.close')
        .trigger('click', { force: true })
        .click({ force: true });
    });
  });

  describe('switch to French language', () => {
    it('should switch locale to French and have column header titles in French', () => {
      cy.get('[data-test=language]')
        .click();

      cy.get('[data-test=selected-locale]')
        .should('contain', 'fr.json');

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
        .children('.slick-header-menubutton')
        .should('be.hidden')
        .invoke('show')
        .trigger('click', { force: true });

      cy.get('.slick-header-menu')
        .should('be.visible')
        .children('.slick-header-menuitem:nth-child(2)')
        .children('.slick-header-menucontent')
        .should('contain', 'Cacher la colonne')
        .click();

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(smallerTitleList[index]));
    });

    it('should click on the Grid Menu to show the Title as 1st column again', () => {
      cy.get('#grid9')
        .find('button.slick-gridmenu-button')
        .trigger('click')
        .click();

      cy.get('#grid9')
        .get('.slick-gridmenu:visible')
        .find('.slick-gridmenu-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Titre')
        .click();

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
        .children('.slick-header-menubutton')
        .should('be.hidden')
        .invoke('show')
        .trigger('click', { force: true });

      cy.get('.slick-header-menu')
        .should('be.visible')
        .children('.slick-header-menuitem:nth-child(2)')
        .children('.slick-header-menucontent')
        .should('contain', 'Cacher la colonne')
        .click();

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(smallerTitleList[index]));
    });

    it('should click on the External Grid Menu to show the Title as 1st column again', () => {
      cy.get('[data-test=external-gridmenu]')
        .trigger('click')
        .click();

      cy.get('#grid9')
        .get('.slick-gridmenu:visible')
        .find('.slick-gridmenu-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Titre')
        .click();

      cy.get('#grid9')
        .get('.slick-gridmenu:visible')
        .find('span.close')
        .trigger('click')
        .click();

      cy.get('#grid9')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullFrenchTitles[index]));

      cy.get('#grid9')
        .get('.slick-gridmenu')
        .find('span.close')
        .trigger('click', { force: true })
        .click({ force: true });
    });
  });
});

describe('Example 27 - GraphQL Basic API without Pagination', () => {
  const GRID_ROW_HEIGHT = 35;
  const fullPreTitles = ['Country', 'Language', 'Continent'];
  const fullTitles = [
    'Code',
    'Name',
    'Native',
    'Phone Area Code',
    'Currency',
    'Emoji',
    'Names',
    'Native',
    'Codes',
    'Name',
    'Code',
  ];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/graphql-nopage`);
    cy.get('h2').should('contain', 'Example 27: GraphQL Basic API without Pagination');
  });

  it('should display a processing alert which will change to done', () => {
    // cy.get('[data-test=status]').should('contain', 'processing');
    cy.get('[data-test=status]').should('contain', 'finished');
  });

  it('should have exact Column Pre-Header & Column Header Titles in the grid', () => {
    cy.get('#grid27')
      .find('.slick-header-columns:nth(0)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullPreTitles[index]));

    cy.get('#grid27')
      .find('.slick-header-columns:nth(1)')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should expect first 3 rows to be an exact match of data provided by the external GraphQL API', () => {
    cy.get('.right-footer.metrics').contains('250 of 250 items');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'AD');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Andorra');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Andorra');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should('contain', '376');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).should('contain', 'EUR');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).should('contain', 'Catalan');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(7)`).should('contain', 'Català');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(8)`).should('contain', 'ca');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(9)`).should('contain', 'Europe');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(10)`).should('contain', 'EU');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'AE');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'United Arab Emirates');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).should('contain', 'دولة الإمارات العربية المتحدة');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should('contain', '971');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(4)`).should('contain', 'AED');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(6)`).should('contain', 'Arabic');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(7)`).should('contain', 'العربية');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(8)`).should('contain', 'ar');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(9)`).should('contain', 'Asia');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(10)`).should('contain', 'AS');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'AF');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Afghanistan');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(2)`).should('contain', 'افغانستان');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).should('contain', '93');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(4)`).should('contain', 'AFN');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(6)`).should('contain', 'Pashto, Uzbek, Turkmen');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(7)`).should('contain', 'پښتو, Ўзбек, Туркмен / تركمن');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(8)`).should('contain', 'ps, uz, tk');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(9)`).should('contain', 'Asia');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(10)`).should('contain', 'AS');
  });

  it('should sort by country name and expect first 2 rows as Afghanistan and Albania', () => {
    cy.get(`.slick-header-columns:nth(1) .slick-header-column:nth-child(2)`).contains('Name').click();

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'AF');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Afghanistan');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'افغانستان');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should('contain', '93');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'AL');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Albania');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).should('contain', 'Shqipëria');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should('contain', '355');
  });

  it('should filter by Language Codes "fr, de" and expect 2 rows of data in the grid', () => {
    cy.get('.search-filter.filter-languageCode').type('fr, de');

    cy.get('.right-footer.metrics').contains('2 of 250 items');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'BE');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Belgium');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'België');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should('contain', '32');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).should('contain', 'EUR');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).should('contain', 'Dutch, French, German');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(7)`).should('contain', 'Nederlands, Français, Deutsch');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(8)`).should('contain', 'nl, fr, de');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(9)`).should('contain', 'Europe');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(10)`).should('contain', 'EU');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'LU');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Luxembourg');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(2)`).should('contain', 'Luxembourg');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should('contain', '352');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(4)`).should('contain', 'EUR');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(6)`).should('contain', 'French, German, Luxembourgish');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(7)`).should(
      'contain',
      'Français, Deutsch, Lëtzebuergesch'
    );
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(8)`).should('contain', 'fr, de, lb');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(9)`).should('contain', 'Europe');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(10)`).should('contain', 'EU');
  });

  it('should Clear all Filters and expect all rows to be back', () => {
    cy.get('#grid27').find('button.slick-grid-menu-button').click();

    cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

    cy.get('.right-footer.metrics').contains('250 of 250 items');
  });

  it('should be able to filter "Country of Origin" with a text range filter "b..e" and expect to see only Canada showing up', () => {
    cy.get('input.search-filter.filter-countryName').type('b..e');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Bosnia and Herzegovina');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', 'Barbados');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', 'Bangladesh');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', 'Belgium');
  });

  it('should filter Language Native with "Aymar" and expect only 1 row in the grid', () => {
    cy.get('div.ms-filter.filter-languageNative').trigger('click');

    cy.get('.ms-search:visible').type('Aymar');

    cy.get('.ms-drop:visible').contains('Aymar').click();

    cy.get('.ms-ok-button:visible').click();

    cy.get('.right-footer.metrics').contains('1 of 250 items');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should('contain', 'BO');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Bolivia');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(2)`).should('contain', 'Bolivia');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should('contain', '591');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(4)`).should('contain', 'BOB,BOV');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).should('contain', 'Spanish, Aymara, Quechua');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(7)`).should('contain', 'Español, Aymar, Runa Simi');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(8)`).should('contain', 'es, ay, qu');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(9)`).should('contain', 'South America');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(10)`).should('contain', 'SA');
  });

  it('should Clear all Filters and expect all rows to be back', () => {
    cy.get('#grid27').find('button.slick-grid-menu-button').trigger('click').click();

    cy.get(`.slick-grid-menu:visible`).find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

    cy.get('.right-footer.metrics').contains('250 of 250 items');
  });

  it('should filter Language Native with "French" language and expect only 40 rows in the grid', () => {
    cy.get('div.ms-filter.filter-languageName').trigger('click');

    cy.get('.ms-search:visible').type('French');

    cy.get('.ms-drop:visible').contains('French').click();

    cy.get('.ms-ok-button:visible').click();

    cy.get('.right-footer.metrics').contains('44 of 250 items');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(1)`).should('contain', 'Belgium');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(6)`).should('contain', 'Dutch, French, German');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(8)`).should('contain', 'nl, fr, de');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(9)`).should('contain', 'Europe');

    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(1)`).should('contain', 'Benin');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(6)`).should('contain', 'French');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(8)`).should('contain', 'fr');
    cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(9)`).should('contain', 'Africa');
  });
});

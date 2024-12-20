describe('Example 34 - Custom header & footer', () => {
  const fullTitles = ['Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/header-footer`);
    cy.get('h2').should('contain', 'Example 34: Custom header & footer Templates');
  });

  it('should have exact column titles on grid', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should have a custom header', () => {
    cy.get('#slickGridContainer-grid1').find('h3').should('contain', 'Grid with header and footer slot');
  });

  it('should have a custom footer with a clickable button', () => {
    cy.get('#slickGridContainer-grid1')
      .find('custom-footer')
      .find('button')
      .should('contain', "I'm a button from an Angular component (click me)")
      .click()
      .click()
      .siblings('div')
      .should('contain', "You've clicked me 2 time(s)");
  });
});

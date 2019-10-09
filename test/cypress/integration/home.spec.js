describe('Home Page', () => {
  it('should display Home Page', () => {
    cy.visit('http://localhost:4300/home');

    cy.get('h2').should(($h2) => {
      expect($h2, 'text content').to.have.text('Angular-Slickgrid - Demo Site');
    });

    cy.get('.subtitle')
      .contains('This site is to demo multiple usage of Angular-Slickgrid');
  });
});

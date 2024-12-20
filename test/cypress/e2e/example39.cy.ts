import { removeWhitespaces } from '../plugins/utilities';

describe('Example 39 - Infinite Scroll with GraphQL', () => {
  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/infinite-graphql`);
    cy.get('h2').should('contain', 'Example 39: GraphQL Backend Service with Infinite Scroll');
  });

  it('should use fake smaller server wait delay for faster E2E tests', () => {
    cy.get('[data-test="server-delay"]').clear().type('20');
  });

  it('should have default GraphQL query', () => {
    cy.get('[data-test=alert-graphql-query]').should('exist');
    cy.get('[data-test=alert-graphql-query]').should('contain', 'GraphQL Query');

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'finished');

    cy.get('[data-test=graphql-query-result]').should(($span) => {
      const text = removeWhitespaces($span.text()); // remove all white spaces
      expect(text).to.eq(
        removeWhitespaces(
          `query { users (first:30,offset:0,locale:"en",userId:123) { totalCount, nodes { id,name,gender,company } } }`
        )
      );
    });
  });

  it('should scroll to bottom of the grid and expect next batch of 30 items appended to current dataset for a total of 60 items', () => {
    cy.get('[data-test="itemCount"]').should('have.text', '30');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

    cy.get('[data-test="itemCount"]').should('have.text', '60');

    cy.get('[data-test=graphql-query-result]').should(($span) => {
      const text = removeWhitespaces($span.text()); // remove all white spaces
      expect(text).to.eq(
        removeWhitespaces(
          `query { users (first:30,offset:30,locale:"en",userId:123) { totalCount, nodes { id,name,gender,company } } }`
        )
      );
    });
  });

  it('should scroll to bottom of the grid and expect next batch of 30 items appended to current dataset for a new total of 90 items', () => {
    cy.get('[data-test="itemCount"]').should('have.text', '60');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

    cy.get('[data-test="itemCount"]').should('have.text', '90');

    cy.get('[data-test=graphql-query-result]').should(($span) => {
      const text = removeWhitespaces($span.text()); // remove all white spaces
      expect(text).to.eq(
        removeWhitespaces(
          `query { users (first:30,offset:60,locale:"en",userId:123) { totalCount, nodes { id,name,gender,company } } }`
        )
      );
    });
  });

  it('should do one last scroll to reach the end of the data and have a full total of 100 items', () => {
    cy.get('[data-test="itemCount"]').should('have.text', '90');

    cy.get('[data-test="data-loaded-tag"]').should('be.hidden');

    cy.get('[data-test="data-loaded-tag"]').should('not.have.class', 'fully-loaded');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

    cy.get('[data-test="itemCount"]').should('have.text', '100');

    cy.get('[data-test=graphql-query-result]').should(($span) => {
      const text = removeWhitespaces($span.text()); // remove all white spaces
      expect(text).to.eq(
        removeWhitespaces(
          `query { users (first:30,offset:90,locale:"en",userId:123) { totalCount, nodes { id,name,gender,company } } }`
        )
      );
    });

    cy.get('[data-test="data-loaded-tag"]').should('be.visible');

    cy.get('[data-test="data-loaded-tag"]').should('have.class', 'fully-loaded');
  });

  it('should sort by Name column and expect dataset to restart at index zero and have a total of 30 items', () => {
    cy.get('[data-test="data-loaded-tag"]').should('have.class', 'fully-loaded');

    cy.get('[data-id="name"]').click();

    cy.get('[data-test="itemCount"]').should('have.text', '30');

    cy.get('[data-test=graphql-query-result]').should(($span) => {
      const text = removeWhitespaces($span.text()); // remove all white spaces
      expect(text).to.eq(
        removeWhitespaces(`query { users (first:30,offset:0,orderBy:[{field:name,direction:ASC}],locale:"en",userId:123) {
          totalCount, nodes { id,name,gender,company } } }`)
      );
    });

    cy.get('[data-test="data-loaded-tag"]').should('not.have.class', 'fully-loaded');
  });

  it('should scroll to bottom again and expect next batch of 30 items appended to current dataset for a total of 60 items', () => {
    cy.get('[data-test="itemCount"]').should('have.text', '30');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

    cy.get('[data-test="itemCount"]').should('have.text', '60');

    cy.get('[data-test=graphql-query-result]').should(($span) => {
      const text = removeWhitespaces($span.text()); // remove all white spaces
      expect(text).to.eq(
        removeWhitespaces(`query { users (first:30,offset:30,orderBy:[{field:name,direction:ASC}],locale:"en",userId:123) {
          totalCount, nodes { id,name,gender,company } } }`)
      );
    });

    cy.get('[data-test="data-loaded-tag"]').should('not.have.class', 'fully-loaded');
  });

  it('should change Gender filter to "female" and expect dataset to restart at index zero and have a total of 30 items', () => {
    cy.get('.ms-filter.filter-gender:visible').click();

    cy.get('[data-name="filter-gender"].ms-drop').find('li:visible:nth(2)').contains('Female').click();

    cy.get('[data-test=graphql-query-result]').should(($span) => {
      const text = removeWhitespaces($span.text()); // remove all white spaces
      expect(text).to.eq(
        removeWhitespaces(`query { users (first:30,offset:0,
          orderBy:[{field:name,direction:ASC}],
          filterBy:[{field:gender,operator:EQ,value:"female"}],locale:"en",userId:123) { totalCount, nodes { id,name,gender,company } } }`)
      );
    });

    cy.get('[data-test="data-loaded-tag"]').should('not.have.class', 'fully-loaded');
  });

  it('should scroll to bottom again and expect next batch to be only 20 females appended to current dataset for a total of 50 items found in DB', () => {
    cy.get('[data-test="itemCount"]').should('have.text', '30');

    cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

    cy.get('[data-test="itemCount"]').should('have.text', '50');

    cy.get('[data-test=graphql-query-result]').should(($span) => {
      const text = removeWhitespaces($span.text()); // remove all white spaces
      expect(text).to.eq(
        removeWhitespaces(`query { users (first:30,offset:30,
          orderBy:[{field:name,direction:ASC}],
          filterBy:[{field:gender,operator:EQ,value:"female"}],locale:"en",userId:123) { totalCount, nodes { id,name,gender,company } } }`)
      );
    });
  });
});

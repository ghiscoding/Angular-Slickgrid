import moment from 'moment-mini';

function removeSpaces(textS) {
  return `${textS}`.replace(/\s+/g, '');
}

const presetLowestDay = moment().add(-2, 'days').format('YYYY-MM-DD');
const presetHighestDay = moment().add(20, 'days').format('YYYY-MM-DD');

describe('Example 6 - GraphQL Grid', () => {
  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/gridgraphql`);
    cy.get('h2').should('contain', 'Example 6: Grid connected to Backend Server with GraphQL');
  });

  it('should have a grid of size 900 by 200px', () => {
    cy.get('#slickGridContainer-grid6')
      .should('have.css', 'width', '900px');

    cy.get('#slickGridContainer-grid6 > .slickgrid-container')
      .should('have.css', 'height', '200px');
  });

  it('should have default GraphQL query', () => {
    cy.get('[data-test=alert-graphql-query]').should('exist');
    cy.get('[data-test=alert-graphql-query]').should('contain', 'GraphQL Query');

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:20,offset:20,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[
            {field:"gender",operator:EQ,value:"male"},{field:"name",operator:Contains,value:"JohnDoe"},
            {field:"company",operator:IN,value:"xyz"},{field:"finish",operator:GE,value:"${presetLowestDay}"},{field:"finish",operator:LE,value:"${presetHighestDay}"}
          ],locale:"en",userId:123){
            totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should change Pagination to next page', () => {
    cy.get('.icon-seek-next').click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:20,offset:40,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[
            {field:"gender",operator:EQ,value:"male"},{field:"name",operator:Contains,value:"JohnDoe"},
            {field:"company",operator:IN,value:"xyz"},{field:"finish",operator:GE,value:"${presetLowestDay}"},{field:"finish",operator:LE,value:"${presetHighestDay}"}
          ],locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should change Pagination to last page', () => {
    cy.get('.icon-seek-end').click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:20,offset:80,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[
            {field:"gender",operator:EQ,value:"male"},{field:"name",operator:Contains,value:"JohnDoe"},
            {field:"company",operator:IN,value:"xyz"},{field:"finish",operator:GE,value:"${presetLowestDay}"},{field:"finish",operator:LE,value:"${presetHighestDay}"}
          ],locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should change Pagination to first page using the external button', () => {
    cy.get('[data-test=goto-first-page')
      .click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query { users (first:20,offset:0,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[
            {field:"gender",operator:EQ,value:"male"},
            {field:"name",operator:Contains,value:"John Doe"},
            {field:"company",operator:IN,value:"xyz"},
            {field:"finish",operator:GE,value:"${presetLowestDay}"},
            {field:"finish",operator:LE,value:"${presetHighestDay}"}
          ],locale:"en",userId:123) { totalCount, nodes { id,name,gender,company,billing{address{street,zip}},finish } } }`));
      });
  });

  it('should change Pagination to last page using the external button', () => {
    cy.get('[data-test=goto-last-page')
      .click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:20,offset:80,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[
            {field:"gender",operator:EQ,value:"male"},{field:"name",operator:Contains,value:"JohnDoe"},
            {field:"company",operator:IN,value:"xyz"},{field:"finish",operator:GE,value:"${presetLowestDay}"},{field:"finish",operator:LE,value:"${presetHighestDay}"}
          ],locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should change Pagination to first page with 30 items', () => {
    cy.get('.icon-seek-first').click();

    cy.get('#items-per-page-label').select('30');

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:30,offset:0,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[
            {field:"gender",operator:EQ,value:"male"},{field:"name",operator:Contains,value:"JohnDoe"},
            {field:"company",operator:IN,value:"xyz"},{field:"finish",operator:GE,value:"${presetLowestDay}"},{field:"finish",operator:LE,value:"${presetHighestDay}"}
          ],locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should clear a single filter, that is not empty, by the header menu and expect query change', () => {
    cy.get('#grid6')
      .find('.slick-header-column:nth(0)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('be.visible')
      .children('.slick-header-menuitem:nth-child(4)')
      .children('.slick-header-menucontent')
      .should('contain', 'Remove Filter')
      .click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:30,offset:0,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[
            {field:"gender",operator:EQ,value:"male"},{field:"company",operator:IN,value:"xyz"},
            {field:"finish",operator:GE,value:"${presetLowestDay}"},{field:"finish",operator:LE,value:"${presetHighestDay}"}
          ],locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should try clearing same filter, which is now empty, by the header menu and expect same query without loading spinner', () => {
    cy.get('#grid6')
      .find('.slick-header-column:nth(0)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('be.visible')
      .children('.slick-header-menuitem:nth-child(4)')
      .children('.slick-header-menucontent')
      .should('contain', 'Remove Filter')
      .click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:30,offset:0,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[
            {field:"gender",operator:EQ,value:"male"},{field:"company",operator:IN,value:"xyz"},
            {field:"finish",operator:GE,value:"${presetLowestDay}"},{field:"finish",operator:LE,value:"${presetHighestDay}"}
          ],locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should clear the date range filter expect the query to have the 2 "finish" (GE, LE) filters removed', () => {
    cy.get('#grid6')
      .find('.slick-header-column:nth(5)')
      .trigger('mouseover')
      .children('.slick-header-menubutton')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu')
      .should('be.visible')
      .children('.slick-header-menuitem:nth-child(4)')
      .children('.slick-header-menucontent')
      .should('contain', 'Remove Filter')
      .click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:30,offset:0,
          orderBy:[{field:"name",direction:ASC},{field:"company",direction:DESC}],
          filterBy:[{field:"gender",operator:EQ,value:"male"},{field:"company",operator:IN,value:"xyz"}],
          locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should clear all Filters & Sorts', () => {
    cy.contains('Clear all Filter & Sorts').click();

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:30,offset:0,locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  it('should click on "Name" column to sort it Ascending', () => {
    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(0)')
      .click();

    cy.get('.slick-header-columns')
      .children('.slick-header-column:nth(0)')
      .find('.slick-sort-indicator.slick-sort-indicator-asc')
      .should('be.visible');

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:30,offset:0,
          orderBy:[{field:"name",direction:ASC}],
          locale:"en",userId:123){totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });
});

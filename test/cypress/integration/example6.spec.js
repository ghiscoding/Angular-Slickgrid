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

  it('should have GraphQL query with defined Grid Presets', () => {
    cy.get('.search-filter.filter-name select')
      .should('not.have.value')

    cy.get('.search-filter.filter-name')
      .find('input')
      .invoke('val')
      .then(text => expect(text).to.eq('John Doe'));

    cy.get('.search-filter.filter-gender .ms-choice > span')
      .contains('Male');

    cy.get('.search-filter.filter-company .ms-choice > span')
      .contains('Company XYZ');

    cy.get('.search-filter.filter-finish')
      .find('input')
      .invoke('val')
      .then(text => expect(text).to.eq(`${presetLowestDay} to ${presetHighestDay}`));

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

  it('should click on Set Dynamic Filter and expect query and filters to be changed', () => {
    cy.get('[data-test=set-dynamic-filter]')
      .click();

    cy.get('.search-filter.filter-name select')
      .should('have.value', 'a*')

    cy.get('.search-filter.filter-name')
      .find('input')
      .invoke('val')
      .then(text => expect(text).to.eq('Jane'));

    cy.get('.search-filter.filter-gender .ms-choice > span')
      .contains('Female');

    cy.get('.search-filter.filter-company .ms-choice > span')
      .contains('Acme');

    cy.get('.search-filter.filter-billingAddressZip select')
      .should('have.value', '>=')

    cy.get('.search-filter.filter-billingAddressZip')
      .find('input')
      .invoke('val')
      .then(text => expect(text).to.eq('11'));

    cy.get('.search-filter.filter-finish')
      .find('input')
      .invoke('val')
      .then(text => expect(text).to.eq(`${presetLowestDay} to ${presetHighestDay}`));

    // wait for the query to finish
    cy.get('[data-test=status]').should('contain', 'done');

    cy.get('[data-test=graphql-query-result]')
      .should(($span) => {
        const text = removeSpaces($span.text()); // remove all white spaces
        expect(text).to.eq(removeSpaces(`query{users(first:30,offset:0,
          orderBy:[{field:"name",direction:ASC}],
          filterBy:[{field:"gender",operator:EQ,value:"female"},{field:"name",operator:StartsWith,value:"Jane"},
          {field:"company",operator:IN,value:"acme"},{field:"billing.address.zip",operator:GE,value:"11"},
          {field:"finish",operator:GE,value:"${presetLowestDay}"},{field:"finish",operator:LE,value:"${presetHighestDay}"}],locale:"en",userId:123)
          {totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
      });
  });

  describe('Set Dynamic Sorting', () => {
    it('should click on "Clear All Filters & Sorting" then "Set Dynamic Sorting" buttons', () => {
      cy.get('[data-test=clear-filters-sorting]')
        .click();

      cy.get('[data-test=set-dynamic-sorting]')
        .click();

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'processing');
      cy.get('[data-test=status]').should('contain', 'done');
    });

    it('should expect the grid to be sorted by "Zip" descending then by "Company" ascending', () => {
      cy.get('#grid6')
        .get('.slick-header-column:nth(2)')
        .find('.slick-sort-indicator-asc')
        .should('have.length', 1)
        .siblings('.slick-sort-indicator-numbered')
        .contains('2');

      cy.get('#grid6')
        .get('.slick-header-column:nth(3)')
        .find('.slick-sort-indicator-desc')
        .should('have.length', 1)
        .siblings('.slick-sort-indicator-numbered')
        .contains('1');

      cy.get('[data-test=graphql-query-result]')
        .should(($span) => {
          const text = removeSpaces($span.text()); // remove all white spaces
          expect(text).to.eq(removeSpaces(`query{users(first:30,offset:0,
            orderBy:[{field:"billing.address.zip",direction:DESC},{field:"company",direction:ASC}],locale:"en",userId:123){
            totalCount,nodes{id,name,gender,company,billing{address{street,zip}},finish}}}`));
        });
    });
  });
});

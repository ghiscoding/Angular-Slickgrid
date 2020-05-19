/// <reference types="cypress" />

describe('Example 29 - Tree Data (from a Hierarchical Dataset)', () => {
  const titles = ['Files', 'Date Modified', 'Size'];
  // const defaultSortAscList = ['bucket-list.txt', 'documents', 'misc', 'todo.txt', 'pdf', 'internet-bill.pdf', 'map.pdf', 'map2.pdf', 'phone-bill.pdf', 'txt', 'todo.txt', 'xls', 'compilation.xls', 'music', 'mp3', 'pop', 'song.mp3', 'theme.mp3', 'rock', 'soft.mp3', 'something.txt'];
  // const defaultSortDescList = ['something.txt', 'music', 'mp3', 'rock', 'soft.mp3', 'pop', 'theme.mp3', 'song.mp3', 'documents', 'xls', 'compilation.xls', 'txt', 'todo.txt', 'pdf', 'phone-bill.pdf', 'map2.pdf', 'map.pdf', 'internet-bill.pdf', 'misc', 'todo.txt', 'bucket-list.txt'];
  const defaultSortAscList = ['bucket-list.txt', 'documents', 'misc', 'todo.txt', 'pdf', 'internet-bill.pdf', 'map.pdf', 'map2.pdf', 'phone-bill.pdf'];
  const defaultSortDescList = ['something.txt', 'music', 'mp3', 'rock', 'soft.mp3', 'pop', 'theme.mp3', 'song.mp3', 'documents', 'xls', 'compilation.xls', 'txt', 'todo.txt'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/tree-data-hierarchical`);
    cy.get('h2').should('contain', 'Example 29: Tree Data (from a Hierarchical Dataset)');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#slickGridContainer-grid29')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should have default Files list', () => {
    cy.get('#grid29')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > defaultSortAscList.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell')
          .first()
          .should('contain', defaultSortAscList[index]);
      });
  });

  it('should filter the Files column with the word "map" and expect only 4 rows left', () => {
    const filteredFiles = ['documents', 'pdf', 'map.pdf', 'map2.pdf'];
    const filteredSizes = ['', '', '3.1', '2.9'];

    cy.get('.search-filter.filter-file')
      .type('map');

    cy.get('#grid29')
      .find('.slick-row')
      .each(($row, index) => {
        cy.wrap($row).children('.slick-cell:nth(0)').should('contain', filteredFiles[index]);
        cy.wrap($row).children('.slick-cell:nth(2)').should('contain', filteredSizes[index]);
      });
  });

  it('should add filter with Size <3 and expect 3 rows left', () => {
    const filteredFiles = ['documents', 'pdf', 'map2.pdf'];

    cy.get('.search-filter.filter-size')
      .find('input')
      .type('3');

    cy.get('.search-filter.filter-size')
      .find('.input-group-addon.operator select')
      .select('<');

    cy.get('#grid29')
      .find('.slick-row .slick-cell:nth(0)')
      .each(($cell, index) => {
        expect($cell.text().trim()).to.contain(filteredFiles[index]);
      });
  });

  it('should add filter with Size >3 and expect 3 rows left', () => {
    const filteredFiles = ['documents', 'pdf', 'map.pdf'];

    cy.get('.search-filter.filter-size')
      .find('.input-group-addon.operator select')
      .select('>');

    cy.get('#grid29')
      .find('.slick-row .slick-cell:nth(0)')
      .each(($cell, index) => {
        expect($cell.text().trim()).to.contain(filteredFiles[index]);
      });
  });

  it('should add filter with Size <=3.1 and expect 3 rows left', () => {
    const filteredFiles = ['documents', 'pdf', 'map.pdf', 'map2.pdf'];

    cy.get('.search-filter.filter-size')
      .find('input')
      .type('.1');

    cy.get('.search-filter.filter-size')
      .find('.input-group-addon.operator select')
      .select('<=');

    cy.get('#grid29')
      .find('.slick-row .slick-cell:nth(0)')
      .each(($cell, index) => {
        expect($cell.text().trim()).to.contain(filteredFiles[index]);
      });
  });

  it('should Clear all Filters and default list', () => {
    cy.get('#grid29')
      .find('button.slick-gridmenu-button')
      .trigger('click')
      .click();

    cy.get(`.slick-gridmenu:visible`)
      .find('.slick-gridmenu-item')
      .first()
      .find('span')
      .contains('Clear all Filters')
      .click();

    cy.get('#grid29')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > defaultSortAscList.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell')
          .first()
          .should('contain', defaultSortAscList[index]);
      });
  });

  it('should click on "Files" column to sort descending', () => {
    cy.get('.slick-header-columns .slick-header-column:nth(0)')
      .click();

    cy.get('#grid29')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > defaultSortDescList.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell')
          .first()
          .should('contain', defaultSortDescList[index]);
      });
  });

  it('should filter the Files by the input search string and expect 4 rows and 1st column to have ', () => {
    const filteredFiles = ['documents', 'pdf', 'map2.pdf', 'map.pdf'];

    cy.get('[data-test=search-string]')
      .type('map');

    cy.get('.search-filter.filter-file')
      .should(($input) => {
        expect($input.val()).to.eq('map');
      });

    cy.get('#grid29')
      .find('.slick-row .slick-cell:nth(0)')
      .each(($cell, index) => {
        expect($cell.text().trim()).to.contain(filteredFiles[index]);
      });
  });

  it('should clear search string and expect default list', () => {
    cy.get('[data-test=clear-search-string]')
      .click();

    cy.get('#grid29')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > defaultSortAscList.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell')
          .first()
          .should('contain', defaultSortDescList[index]);
      });
  });
});

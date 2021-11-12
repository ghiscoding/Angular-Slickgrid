/// <reference types="cypress" />

describe('Example 29 - Tree Data (from a Hierarchical Dataset)', { retries: 1 }, () => {
  const GRID_ROW_HEIGHT = 33;
  const titles = ['Files', 'Date Modified', 'Description', 'Size'];
  // const defaultSortAscList = ['bucket-list.txt', 'documents', 'misc', 'todo.txt', 'pdf', 'internet-bill.pdf', 'map.pdf', 'map2.pdf', 'phone-bill.pdf', 'txt', 'todo.txt', 'xls', 'compilation.xls', 'music', 'mp3', 'pop', 'song.mp3', 'theme.mp3', 'rock', 'soft.mp3', 'something.txt'];
  // const defaultSortDescList = ['something.txt', 'music', 'mp3', 'rock', 'soft.mp3', 'pop', 'theme.mp3', 'song.mp3', 'documents', 'xls', 'compilation.xls', 'txt', 'todo.txt', 'pdf', 'phone-bill.pdf', 'map2.pdf', 'map.pdf', 'internet-bill.pdf', 'misc', 'todo.txt', 'bucket-list.txt'];
  const defaultGridPresetWithoutPdfDocs = ['bucket-list.txt', 'documents', 'misc', 'todo.txt', 'pdf', 'txt', 'todo.txt', 'xls', 'compilation.xls'];
  const defaultSortAscList = ['bucket-list.txt', 'documents', 'misc', 'todo.txt', 'pdf', 'internet-bill.pdf', 'map.pdf', 'map2.pdf', 'phone-bill.pdf'];
  const defaultSortDescList = ['something.txt', 'music', 'mp3', 'rock', 'soft.mp3', 'pop', 'theme.mp3', 'song.mp3', 'documents', 'xls', 'compilation.xls', 'txt', 'todo.txt'];
  const defaultSortDescListWithExtraSongs = ['something.txt', 'recipes', 'coffee-cake', 'chocolate-cake', 'cheesecake', 'music', 'mp3', 'rock', 'soft.mp3', 'pop', 'theme.mp3', 'song.mp3', 'pop-126.mp3', 'pop-125.mp3', 'documents', 'xls'];
  const popMusicWith3ExtraSongs = ['music', 'mp3', 'pop', 'pop-125.mp3', 'pop-126.mp3', 'pop-127.mp3', 'song.mp3', 'theme.mp3',];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/tree-data-hierarchical`);
    cy.get('h2').should('contain', 'Example 29: Tree Data');
    cy.get('h2').should('contain', 'from a Hierarchical Dataset');
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#slickGridContainer-grid29')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(titles[index]));
  });

  it('should expect the "pdf" folder to be closed by the collapsed items grid preset', () => {
    cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * 4}px"] > .slick-cell:nth(0)`).should('contain', 'pdf');
    cy.get(`.slick-group-toggle.collapsed`).should('have.length', 1);

    defaultGridPresetWithoutPdfDocs.forEach((_colName, rowIdx) => {
      if (rowIdx < defaultGridPresetWithoutPdfDocs.length - 1) {
        cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', defaultGridPresetWithoutPdfDocs[rowIdx]);
      }
    });
  });

  it('should expand "pdf" folder and expect all folders to be expanded', () => {
    cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * 4}px"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`)
      .click();

    cy.get('.slick-viewport-top.slick-viewport-left')
      .scrollTo('top', { force: true });
  });

  it('should have default Files list', () => {
    defaultSortAscList.forEach((_colName, rowIdx) => {
      if (rowIdx > defaultSortAscList.length - 1) {
        return;
      }
      cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', defaultSortAscList[rowIdx]);
    });
  });

  it('should be able to add 2 new pop songs into the Music folder', () => {
    cy.get('[data-test=add-item-btn]')
      .contains('Add New Pop Song')
      .click()
      .click();

    cy.get('.slick-group-toggle[level=3]')
      .get('.slick-cell')
      .contains('pop-125.mp3');

    cy.get('.slick-group-toggle[level=3]')
      .get('.slick-cell')
      .contains('pop-126.mp3');
  });

  it('should filter the Files column with the word "map" and expect only 4 rows left', () => {
    const filteredFiles = ['documents', 'pdf', 'map.pdf', 'map2.pdf'];
    const filteredSizes = ['', '', '3.1', '2.9'];

    cy.get('.search-filter.filter-file')
      .type('map');

    cy.get('#slickGridContainer-grid29')
      .find('.slick-row')
      .each(($row, index) => {
        cy.wrap($row).children('.slick-cell:nth(0)').should('contain', filteredFiles[index]);
        cy.wrap($row).children('.slick-cell:nth(3)').should('contain', filteredSizes[index]);
      });
  });

  it('should add filter with "Size < 3" and expect 3 rows left', () => {
    const filteredFiles = ['documents', 'pdf', 'map2.pdf'];

    cy.get('.search-filter.filter-size')
      .find('input')
      .type('3');

    cy.get('.search-filter.filter-size')
      .find('.input-group-addon.operator select')
      .select('<');

    cy.get('#slickGridContainer-grid29')
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

    cy.get('#slickGridContainer-grid29')
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

    cy.get('#slickGridContainer-grid29')
      .find('.slick-row .slick-cell:nth(0)')
      .each(($cell, index) => {
        expect($cell.text().trim()).to.contain(filteredFiles[index]);
      });
  });

  it('should Clear all Filters and default list', () => {
    cy.get('#slickGridContainer-grid29')
      .find('button.slick-grid-menu-button')
      .trigger('click')
      .click();

    cy.get(`.slick-grid-menu:visible`)
      .find('.slick-grid-menu-item')
      .first()
      .find('span')
      .contains('Clear all Filters')
      .click();

    defaultSortAscList.forEach((_colName, rowIdx) => {
      if (rowIdx < defaultSortAscList.length - 1) {
        cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', defaultSortAscList[rowIdx]);
      }
    });
  });

  it('should click on "Files" column to sort descending', () => {
    cy.get('.slick-header-columns .slick-header-column:nth(0)')
      .click();

    defaultSortDescListWithExtraSongs.forEach((_colName, rowIdx) => {
      if (rowIdx < defaultSortDescListWithExtraSongs.length - 1) {
        cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', defaultSortDescListWithExtraSongs[rowIdx]);
      }
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

    cy.get('#slickGridContainer-grid29')
      .find('.slick-row .slick-cell:nth(0)')
      .each(($cell, index) => {
        expect($cell.text().trim()).to.contain(filteredFiles[index]);
      });
  });

  it('should clear search string and expect default list', () => {
    cy.get('[data-test=clear-search-string]')
      .click();

    defaultSortDescListWithExtraSongs.forEach((_colName, rowIdx) => {
      if (rowIdx < defaultSortDescListWithExtraSongs.length - 1) {
        cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', defaultSortDescListWithExtraSongs[rowIdx]);
      }
    });
  });

  it('should be able to add a 3rd new pop song into the Music folder and see it show up in the UI', () => {
    cy.get('[data-test=add-item-btn]')
      .contains('Add New Pop Song')
      .click();

    cy.get('.slick-group-toggle[level=3]')
      .get('.slick-cell')
      .contains('pop-127.mp3');

    cy.get('.slick-group-toggle[level=3]')
      .get('.slick-cell')
      .contains('pop-127.mp3');
  });

  it('should return 8 rows when filtering the word "pop" music without excluding children', () => {
    cy.get('.search-filter.filter-file')
      .type('pop');

    cy.get('.right-footer .item-count')
      .contains('8');

    popMusicWith3ExtraSongs.forEach((_colName, rowIdx) => {
      if (rowIdx < popMusicWith3ExtraSongs.length - 1) {
        cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', popMusicWith3ExtraSongs[rowIdx]);
      }
    });
  });

  it('should return 6 rows when using same filter "pop" music AND selecting checkbox to "Exclude Children when Filtering Tree"', () => {
    cy.get('[data-test="exclude-child-when-filtering"]')
      .check();

    cy.get('.right-footer .item-count')
      .contains('6');

    popMusicWith3ExtraSongs.forEach((_colName, rowIdx) => {
      if (rowIdx < popMusicWith3ExtraSongs.length - 3) {
        cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', popMusicWith3ExtraSongs[rowIdx]);
      }
    });
  });

  it('should change filter to the word "music" and expect only 1 row (the music folder) to show up when still Excluding Children from the Tree', () => {
    cy.get('[data-test=clear-search-string]')
      .click();

    cy.get('.search-filter.filter-file')
      .type('music');

    cy.get('.right-footer .item-count')
      .contains('1');

    cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * 0}px"] > .slick-cell:nth(0)`).should('contain', 'music');
  });

  it('should use same filter "music" and now expect to see 10 rows (entire music folder content) to show up when "Exclude Children when Filtering Tree" becomes uncheck', () => {
    cy.get('[data-test="exclude-child-when-filtering"]')
      .uncheck();

    cy.get('.right-footer .item-count')
      .contains('10');

    const allMusic = [...popMusicWith3ExtraSongs, 'rock', 'soft.mp3'];

    allMusic.forEach((_colName, rowIdx) => {
      if (rowIdx < allMusic.length - 3) {
        cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', allMusic[rowIdx]);
      }
    });
  });

  it('should use same filter "music" and add extra filter of "size >= 50" and expect 1+ songs (>=6 rows) to show up in the grid when "Exclude Children when Filtering Tree" is unchecked and "Skip Other Criteria..." is checked', () => {

    cy.get('.search-filter.filter-size')
      .find('input')
      .type('50');

    cy.get('.search-filter.filter-size')
      .find('.input-group-addon.operator select')
      .select('>=');

    cy.wait(50)
      .get('.right-footer .item-count')
      .then($row => {
        expect(+$row.text()).to.be.at.least(6);
      });

    const expectedFiles = ['music', 'mp3', 'pop', 'pop-125.mp3', 'rock', 'soft.mp3'];

    expectedFiles.forEach((_colName, rowIdx) => {
      if (rowIdx < expectedFiles.length - 3) {
        cy.get(`#slickGridContainer-grid29 [style="top:${GRID_ROW_HEIGHT * rowIdx}px"] > .slick-cell:nth(0)`).should('contain', expectedFiles[rowIdx]);
      }
    });
  });

  it('should use same filter "music" and "size > 70" then uncked "Skip Other Criteria..." and now expect 0 rows in the grid because there 0 rows having these 2 filters criteria', () => {
    cy.get('[data-test="auto-approve-parent-item"]')
      .uncheck();

    cy.get('.right-footer .item-count')
      .contains('0');
  });
});
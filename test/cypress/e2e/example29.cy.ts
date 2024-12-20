describe('Example 29 - Tree Data with Aggregators (from a Hierarchical Dataset)', () => {
  const GRID_ROW_HEIGHT = 33;
  const titles = ['Files', 'Date Modified', 'Description', 'Size'];
  // const defaultSortAscList = ['bucket-list.txt', 'documents', 'misc', 'warranties.txt', 'pdf', 'internet-bill.pdf', 'map.pdf', 'map2.pdf', 'phone-bill.pdf', 'txt', 'todo.txt', 'unclassified.csv', 'unresolved.csv', 'xls', 'compilation.xls', 'music', 'mp3', 'other', 'pop', 'song.mp3', 'theme.mp3', 'rock', 'soft.mp3', 'something.txt'];
  // const defaultSortDescList = ['something.txt', 'music', 'mp3', 'rock', 'soft.mp3', 'other', 'pop', 'theme.mp3', 'song.mp3', 'documents', 'xls', 'compilation.xls', 'txt', 'todo.txt', 'unclassified.csv', 'unresolved.csv', 'pdf', 'phone-bill.pdf', 'map2.pdf', 'map.pdf', 'internet-bill.pdf', 'misc', 'todo.txt', 'bucket-list.txt'];
  const defaultGridPresetWithoutPdfDocs = [
    'bucket-list.txt',
    'documents',
    'misc',
    'warranties.txt',
    'pdf',
    'txt',
    'todo.txt',
    'unclassified.csv',
    'unresolved.csv',
    'xls',
    'compilation.xls',
  ];
  const defaultSortAscList = [
    'bucket-list.txt',
    'documents',
    'misc',
    'warranties.txt',
    'pdf',
    'internet-bill.pdf',
    'map.pdf',
    'map2.pdf',
    'phone-bill.pdf',
  ];
  // const defaultSortDescList = ['something.txt', 'music', 'mp3', 'rock', 'soft.mp3', 'other', 'pop', 'theme.mp3', 'song.mp3', 'documents', 'xls', 'compilation.xls', 'txt', 'todo.txt'];
  const defaultSortDescListWithExtraSongs = [
    'something.txt',
    'recipes',
    'coffee-cake',
    'chocolate-cake',
    'cheesecake',
    'music',
    'mp3',
    'rock',
    'soft.mp3',
    'pop',
    'theme.mp3',
    'song.mp3',
    'pop-80.mp3',
    'pop-79.mp3',
    'other',
    'documents',
    'xls',
  ];
  const popMusicWith3ExtraSongs = [
    'music',
    'mp3',
    'other',
    'pop',
    'pop-79.mp3',
    'pop-80.mp3',
    'pop-81.mp3',
    'song.mp3',
    'theme.mp3',
  ];
  const popMusicWith3ExtraSongsWithoutEmpty = [
    'music',
    'mp3',
    'pop',
    'pop-79.mp3',
    'pop-80.mp3',
    'pop-81.mp3',
    'song.mp3',
    'theme.mp3',
  ];

  describe('without Auto-Recalc feature', () => {
    it('should display Example title', () => {
      cy.visit(`${Cypress.config('baseUrl')}/tree-data-hierarchical`);
      cy.get('h2').should('contain', 'Example 29: Tree Data with Aggregators');
      cy.get('h2').should('contain', 'from a Hierarchical Dataset');
    });

    it('should have exact column titles on 1st grid', () => {
      cy.get('#slickGridContainer-grid29')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(titles[index]));
    });

    it('should expect the "pdf" folder to be closed by the collapsed items grid preset with aggregators of Sum(8.8MB) / Avg(2.2MB)', () => {
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should('contain', 'pdf');
      cy.get(`.slick-group-toggle.collapsed`).should('have.length', 1);
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 8.8 MB / avg: 2.2 MB'
      );

      defaultGridPresetWithoutPdfDocs.forEach((_colName, rowIdx) => {
        if (rowIdx < defaultGridPresetWithoutPdfDocs.length - 1) {
          cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
            'contain',
            defaultGridPresetWithoutPdfDocs[rowIdx]
          );
        }
      });
    });

    it('should have documents folder with aggregation of Sum(14.46MB) / Avg(1.45MB)', () => {
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'documents'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 14.46 MB / avg: 1.45 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'misc'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 0.4 MB / avg: 0.4 MB'
      );
    });

    it('should expand "pdf" folder and expect all folders to be expanded', () => {
      cy.get(
        `#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`
      ).click();

      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('top', { force: true } as any);
    });

    it('should have default Files list', () => {
      defaultSortAscList.forEach((_colName, rowIdx) => {
        if (rowIdx > defaultSortAscList.length - 1) {
          return;
        }
        cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
          'contain',
          defaultSortAscList[rowIdx]
        );
      });
    });

    it('should have pop songs folder with aggregations of Sum(53.3MB) / Avg(26.65MB)', () => {
      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('center', { force: true } as any);

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'music'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 151.3 MB / avg: 50.43 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 17}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 151.3 MB / avg: 50.43 MB'
      );
      // next folder is "other" and is empty without aggregations
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'pop'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 53.3 MB / avg: 26.65 MB'
      );
    });

    it('should be able to add 2 new pop songs into the Music folder', () => {
      cy.get('[data-test=add-item-btn]').contains('Add New Pop Song').click().click();

      cy.get('.slick-group-toggle[level=3]').get('.slick-cell').contains('pop-79.mp3');

      cy.get('.slick-group-toggle[level=3]').get('.slick-cell').contains('pop-80.mp3');

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 20}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '82 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 21}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '83 MB'
      );
    });

    it('should have pop songs folder with updated aggregations including new pop songs of Sum(218.3MB) / Avg(54.58MB)', () => {
      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('bottom', { force: true } as any);

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'music'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 316.3 MB / avg: 63.26 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 17}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 316.3 MB / avg: 63.26 MB'
      );
      // next folder is "other" and is empty without aggregations
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'pop'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 218.3 MB / avg: 54.58 MB'
      );
    });

    it('should filter the Files column with the word "map" and expect only 4 rows left', () => {
      const filteredFiles = ['documents', 'pdf', 'map.pdf', 'map2.pdf'];
      const filteredSizes = ['', '', '3.1', '2.9'];

      cy.get('.search-filter.filter-file').type('map');

      cy.get('#slickGridContainer-grid29')
        .find('.slick-row')
        .each(($row, index) => {
          cy.wrap($row).children('.slick-cell:nth(0)').should('contain', filteredFiles[index]);
          cy.wrap($row).children('.slick-cell:nth(3)').should('contain', filteredSizes[index]);
        });
    });

    it('should add filter with "Size < 3" and expect 3 rows left', () => {
      const filteredFiles = ['documents', 'pdf', 'map2.pdf'];

      cy.get('.search-filter.filter-size').find('input').type('3');

      cy.get('.search-filter.filter-size').find('.input-group-addon.operator select').select('<');

      cy.get('#slickGridContainer-grid29')
        .find('.slick-row .slick-cell:nth(0)')
        .each(($cell, index) => {
          expect($cell.text().trim()).to.contain(filteredFiles[index]);
        });
    });

    it('should add filter with Size >3 and expect 3 rows left', () => {
      const filteredFiles = ['documents', 'pdf', 'map.pdf'];

      cy.get('.search-filter.filter-size').find('.input-group-addon.operator select').select('>');

      cy.get('#slickGridContainer-grid29')
        .find('.slick-row .slick-cell:nth(0)')
        .each(($cell, index) => {
          expect($cell.text().trim()).to.contain(filteredFiles[index]);
        });
    });

    it('should add filter with Size <=3.1 and expect 3 rows left', () => {
      const filteredFiles = ['documents', 'pdf', 'map.pdf', 'map2.pdf'];

      cy.get('.search-filter.filter-size').find('input').type('.1');

      cy.get('.search-filter.filter-size').find('.input-group-addon.operator select').select('<=');

      cy.get('#slickGridContainer-grid29')
        .find('.slick-row .slick-cell:nth(0)')
        .each(($cell, index) => {
          expect($cell.text().trim()).to.contain(filteredFiles[index]);
        });
    });

    it('should Clear all Filters and expect default list', () => {
      cy.get('#slickGridContainer-grid29').find('button.slick-grid-menu-button').trigger('click').click({ force: true });

      cy.get(`.slick-grid-menu:visible`)
        .find('.slick-menu-item')
        .first()
        .find('span')
        .contains('Clear all Filters')
        .click({ force: true });

      defaultSortAscList.forEach((_colName, rowIdx) => {
        if (rowIdx < defaultSortAscList.length - 1) {
          cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
            'contain',
            defaultSortAscList[rowIdx]
          );
        }
      });
    });

    it('should click on "Files" column to sort descending', () => {
      cy.get('.slick-header-columns .slick-header-column:nth(0)').click();

      defaultSortDescListWithExtraSongs.forEach((_colName, rowIdx) => {
        if (rowIdx < defaultSortDescListWithExtraSongs.length - 1) {
          cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
            'contain',
            defaultSortDescListWithExtraSongs[rowIdx]
          );
        }
      });
    });

    it('should filter the Files by the input search string and expect 4 rows and 1st column to have ', () => {
      const filteredFiles = ['documents', 'pdf', 'map2.pdf', 'map.pdf'];

      cy.get('[data-test=search-string]').type('map');

      cy.get('.search-filter.filter-file').should(($input) => {
        expect($input.val()).to.eq('map');
      });

      cy.get('#slickGridContainer-grid29')
        .find('.slick-row .slick-cell:nth(0)')
        .each(($cell, index) => {
          expect($cell.text().trim()).to.contain(filteredFiles[index]);
        });
    });

    it('should clear search string and expect default list', () => {
      cy.get('[data-test=clear-search-string]').click();

      defaultSortDescListWithExtraSongs.forEach((_colName, rowIdx) => {
        if (rowIdx < defaultSortDescListWithExtraSongs.length - 1) {
          cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
            'contain',
            defaultSortDescListWithExtraSongs[rowIdx]
          );
        }
      });
    });

    it('should be able to add a 3rd new pop song into the Music folder and see it show up in the UI', () => {
      cy.get('[data-test=add-item-btn]').contains('Add New Pop Song').click();

      cy.get('.slick-group-toggle[level=3]').get('.slick-cell').contains('pop-81.mp3');

      cy.get('.slick-group-toggle[level=3]').get('.slick-cell').contains('pop-81.mp3');
    });

    it('should have pop songs folder with updated aggregations including 4 pop songs of Sum(400.3MB) / Avg(66.72MB)', () => {
      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('bottom', { force: true } as any);

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'music'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 400.3 MB / avg: 66.72 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 17}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 400.3 MB / avg: 66.72 MB'
      );
      // next folder is "other" and is empty without aggregations
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'pop'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 302.3 MB / avg: 60.46 MB'
      );
    });

    it('should return 8 rows when filtering the word "pop" music without excluding children', () => {
      cy.get('.search-filter.filter-file').type('pop');

      cy.get('.right-footer .item-count').contains('8');

      popMusicWith3ExtraSongsWithoutEmpty.forEach((_colName, rowIdx) => {
        if (rowIdx < popMusicWith3ExtraSongsWithoutEmpty.length - 1) {
          cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
            'contain',
            popMusicWith3ExtraSongsWithoutEmpty[rowIdx]
          );
        }
      });
    });

    it('should return 6 rows when using same filter "pop" music AND selecting checkbox to "Exclude Children when Filtering Tree"', () => {
      cy.get('[data-test="exclude-child-when-filtering"]').check();

      cy.get('.right-footer .item-count').contains('6');

      popMusicWith3ExtraSongsWithoutEmpty.forEach((_colName, rowIdx) => {
        if (rowIdx < popMusicWith3ExtraSongsWithoutEmpty.length - 3) {
          cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
            'contain',
            popMusicWith3ExtraSongsWithoutEmpty[rowIdx]
          );
        }
      });
    });

    it('should change filter to the word "music" and expect only 1 row (the music folder) to show up when still Excluding Children from the Tree', () => {
      cy.get('#slickGridContainer-grid29').find('button.slick-grid-menu-button').click();

      cy.get('.slick-grid-menu:visible').find('.slick-menu-item').first().find('span').contains('Clear all Filters').click();

      cy.get('.search-filter.filter-file').type('music');

      cy.get('.right-footer .item-count').contains('1');

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'music'
      );
    });

    it('should use same filter "music" and now expect to see 10 rows (entire music folder content) to show up when "Exclude Children when Filtering Tree" becomes uncheck', () => {
      cy.get('[data-test="exclude-child-when-filtering"]').uncheck();

      cy.get('.right-footer .item-count').contains('11');

      const allMusic = [...popMusicWith3ExtraSongs, 'rock', 'soft.mp3'];

      allMusic.forEach((_colName, rowIdx) => {
        if (rowIdx < allMusic.length - 3) {
          cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
            'contain',
            allMusic[rowIdx]
          );
        }
      });
    });

    it('should use same filter "music" and add extra filter of "size >= 50" and expect 1+ songs (>=6 rows) to show up in the grid when "Exclude Children when Filtering Tree" is unchecked and "Skip Other Criteria..." is checked', () => {
      cy.get('.search-filter.filter-size').find('input').type('50');

      cy.get('.search-filter.filter-size').find('.input-group-addon.operator select').select('>=');

      cy.wait(50)
        .get('.right-footer .item-count')
        .then(($row) => {
          expect(+$row.text()).to.be.at.least(6);
        });

      const expectedFiles = ['music', 'mp3', 'pop', 'pop-79.mp3', 'rock', 'soft.mp3'];

      expectedFiles.forEach((_colName, rowIdx) => {
        if (rowIdx < expectedFiles.length - 3) {
          cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * rowIdx}px;"] > .slick-cell:nth(0)`).should(
            'contain',
            expectedFiles[rowIdx]
          );
        }
      });
    });

    it('should use same filter "music" and "size > 70" then unchecked "Skip Other Criteria..." and now expect 0 rows in the grid because there 0 rows having these 2 filters criteria', () => {
      cy.get('[data-test="auto-approve-parent-item"]').uncheck();

      cy.get('.right-footer .item-count').contains('0');
    });

    it('should clear all filters', () => {
      cy.get('[data-test="clear-filters-btn"]').click();
    });

    it('should have pop songs folder with updated aggregations including 4 pop songs of Sum(400.3MB) / Avg(66.72MB)', () => {
      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('center', { force: true } as any);

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'music'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 400.3 MB / avg: 66.72 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 17}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 400.3 MB / avg: 66.72 MB'
      );
      // next folder is "other" and is empty without aggregations
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'pop'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 302.3 MB / avg: 60.46 MB'
      );
    });

    it('should remove last inserted pop song 81 and expect aggregations to be updated with Sum(316.3MB) / Avg(63.26MB)', () => {
      cy.get('[data-test="remove-item-btn"]').click();

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'music'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 316.3 MB / avg: 63.26 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 17}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 316.3 MB / avg: 63.26 MB'
      );
      // next folder is "other" and is empty without aggregations
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'pop'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 218.3 MB / avg: 54.58 MB'
      );
    });
  });

  describe('Auto-Recalc Tree Totals feature enabled', () => {
    it('should enable auto-recalc Tree Totals', () => {
      cy.get('[data-test="auto-recalc-totals"]').check();
    });

    it('should have pop songs folder with aggregation reflecting what is displayed, Sum(316.3MB) / Avg(63.26MB)', () => {
      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('center', { force: true } as any);

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'music'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 16}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 316.3 MB / avg: 63.26 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 17}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 316.3 MB / avg: 63.26 MB'
      );
      // next folder is "other" and is empty without aggregations
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'pop'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 19}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 218.3 MB / avg: 54.58 MB'
      );
    });

    it('should have documents with same Sum as the beginning since auto-recalc is disabled, aggregation should be Sum(14.46MB) / Avg(1.45MB)', () => {
      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('top', { force: true } as any);

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'documents'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 14.46 MB / avg: 1.45 MB (total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'misc'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 0.4 MB / avg: 0.4 MB (sub-total)'
      );
    });

    it('should retype filter "map" and expect totals to be updated with a lower Sum(6MB) / Avg(3MB) of only what is displayed', () => {
      cy.get('.search-filter.filter-file').type('map');

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'documents'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 6 MB / avg: 3 MB (total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'pdf');
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 6 MB / avg: 3 MB (sub-total)'
      );

      cy.get('.right-footer .item-count').contains('4');
      cy.get('.right-footer .total-count').contains('31');
    });

    it('should enable auto-recalc Tree Totals', () => {
      cy.get('[data-test="clear-filters-btn"]').click();
    });

    it('should type filter "b" and expect totals to be updated with a lower Sum(6MB) / Avg(3MB) of only what is displayed', () => {
      cy.get('.search-filter.filter-file').type('b');

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'bucket-list.txt'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'documents'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 4.02 MB / avg: 1.34 MB (total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'pdf');
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 2.8 MB / avg: 1.4 MB (sub-total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'internet-bill.pdf'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '1.3 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'phone-bill.pdf'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '1.5 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'zebra.dll'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 5}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '1.22 MB'
      );

      cy.get('.right-footer .item-count').contains('6');
      cy.get('.right-footer .total-count').contains('31');
    });

    it('should type filter "b" and expect totals to be updated with a lower Sum(6MB) / Avg(3MB) of only what is displayed', () => {
      cy.get('.search-filter.filter-file').type('i'); // will become "bi"

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'documents'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 2.8 MB / avg: 1.4 MB (total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'pdf');
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 2.8 MB / avg: 1.4 MB (sub-total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'internet-bill.pdf'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '1.3 MB'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'phone-bill.pdf'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '1.5 MB'
      );

      cy.get('.right-footer .item-count').contains('4');
      cy.get('.right-footer .total-count').contains('31');
    });

    it('should clear all filters', () => {
      cy.get('[data-test="clear-filters-btn"]').click();
    });

    it('should collapse "pdf" folder and filter with "b" again and expect same updated tree totals as earlier collapsed or expanded should still be Sum(2.8MB) / Avg(1.4MB)', () => {
      cy.get(
        `#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`
      ).click();

      cy.get('.search-filter.filter-file').type('b');

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'bucket-list.txt'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'documents'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 4.02 MB / avg: 1.34 MB (total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'pdf');
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 2.8 MB / avg: 1.4 MB (sub-total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'zebra.dll'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '1.22 MB'
      );

      cy.get('.right-footer .item-count').contains('4');
      cy.get('.right-footer .total-count').contains('31');
    });

    it('should clear all filters and collapse all Tree groups (folders) then type "so" and expect updated "music" totals Sum(104.3MB) / Avg(52.15MB)', () => {
      cy.get('[data-test="clear-filters-btn"]').click();
      cy.get('[data-test="collapse-all-btn"]').click();

      cy.get('.search-filter.filter-file').type('so');

      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'documents'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 0.79 MB / avg: 0.79 MB (total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'music'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        'sum: 104.3 MB / avg: 52.15 MB (total)'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should(
        'contain',
        'something.txt'
      );
      cy.get(`#slickGridContainer-grid29 [style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(3)`).should(
        'contain',
        '90 MB'
      );

      cy.get('.right-footer .item-count').contains('3');
      cy.get('.right-footer .total-count').contains('31');
    });
  });
});

describe('Example 1 - Basic Grids', () => {
  const fullTitles = ['Title', 'Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/basic`);
    cy.get('h2').should('contain', 'Example 1: Basic Grids');
  });

  it('should have 2 grids of size 800 by 225px', () => {
    cy.get('#slickGridContainer-grid1').should('have.css', 'width', '800px');

    cy.get('#slickGridContainer-grid1 > .slickgrid-container').should(($el) =>
      expect(parseInt(`${$el.height()}`, 10)).to.eq(225)
    );

    cy.get('#slickGridContainer-grid2').should('have.css', 'width', '800px');

    cy.get('#slickGridContainer-grid2 > .slickgrid-container').should(($el) =>
      expect(parseInt(`${$el.height()}`, 10)).to.eq(225)
    );
  });

  it('should have exact column titles on 1st grid', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should hover over the Title column and click on "Sort Descending" command', () => {
    cy.get('#slickGridContainer-grid1')
      .find('.slick-header-column')
      .first()
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .should('be.hidden')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(4)')
      .children('.slick-menu-content')
      .should('contain', 'Sort Descending')
      .click();

    cy.get('.slick-row').first().children('.slick-cell').first().should('contain', 'Task 994');
  });

  it('should hover over the "Title" column of 2nd grid and click on "Sort Ascending" command', () => {
    const tasks = ['Task 0', 'Task 1', 'Task 10', 'Task 100', 'Task 101'];

    cy.get('#grid2')
      .find('.slick-header-column')
      .first()
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .invoke('show')
      .click();

    cy.get('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(3)')
      .children('.slick-menu-content')
      .should('contain', 'Sort Ascending')
      .click();

    cy.get('#grid2')
      .find('.slick-row')
      .each(($row, index) => {
        if (index > tasks.length - 1) {
          return;
        }
        cy.wrap($row).children('.slick-cell').first().should('contain', tasks[index]);
      });
  });

  it('should hover over the "Duration" column of 2nd grid, Sort Ascending and have 2 sorts', () => {
    cy.get('#grid2')
      .find('.slick-header-column:nth-of-type(2)')
      .trigger('mouseover')
      .children('.slick-header-menu-button')
      .invoke('show')
      .click();

    cy.get('#grid2')
      .find('.slick-header-menu .slick-menu-command-list')
      .should('be.visible')
      .children('.slick-menu-item:nth-of-type(4)')
      .click();

    cy.get('#grid2')
      .find('.slick-sort-indicator-asc')
      .should('have.length', 1)
      .siblings('.slick-sort-indicator-numbered')
      .contains('1');

    cy.get('#grid2')
      .find('.slick-sort-indicator-desc')
      .should('have.length', 1)
      .siblings('.slick-sort-indicator-numbered')
      .contains('2');
  });

  it('should clear sorting of grid2 using the Grid Menu "Clear all Sorting" command', () => {
    cy.get('#grid2').find('button.slick-grid-menu-button').trigger('click').click();
  });

  it('should have no sorting in 2nd grid (back to default sorted by id)', () => {
    let gridUid = '';
    const grid2Tasks = ['Task 0', 'Task 1', 'Task 2', 'Task 3', 'Task 4'];

    cy.get('#grid2')
      .should(($grid) => {
        const classes = $grid.prop('className').split(' ');
        gridUid = classes.find((className: string) => /slickgrid_.*/.test(className));
        expect(gridUid).to.not.be.null;
      })
      .then(() => {
        cy.get(`.slick-grid-menu.${gridUid}`).find('.slick-menu-item').first().find('span').contains('Clear all Sorting').click();

        cy.get('#grid2').find('.slick-sort-indicator-asc').should('have.length', 0);

        cy.get('#grid2').find('.slick-sort-indicator-desc').should('have.length', 0);

        cy.get('#grid2')
          .find('.slick-row')
          .each(($row, index) => {
            if (index > grid2Tasks.length - 1) {
              return;
            }
            cy.wrap($row).children('.slick-cell').first().should('contain', grid2Tasks[index]);
          });
      });
  });

  it('should retain sorting in 1st grid', () => {
    cy.get('#grid1').find('.slick-sort-indicator-desc').should('have.length', 1);
  });

  it('should have Pagination displayed and set on Grid2', () => {
    cy.get('[data-test=page-number-input]')
      .invoke('val')
      .then((pageNumber) => expect(pageNumber).to.eq('1'));

    cy.get('[data-test=page-count]').contains('199');

    cy.get('[data-test=item-from]').contains('1');

    cy.get('[data-test=item-to]').contains('5');

    cy.get('[data-test=total-items]').contains('995');
  });

  it('should change Page Number 52 and expect the Pagination to have correct values', () => {
    cy.get('[data-test=page-number-input]').clear().type('52').type('{enter}');

    cy.get('[data-test=page-count]').contains('199');

    cy.get('[data-test=item-from]').contains('256');

    cy.get('[data-test=item-to]').contains('260');

    cy.get('[data-test=total-items]').contains('995');
  });

  it('should open the Grid Menu on 1st Grid and expect all Columns to be checked', () => {
    let gridUid = '';
    cy.get('#grid1').find('button.slick-grid-menu-button').click({ force: true });

    cy.get('#grid1')
      .should(($grid) => {
        const classes = $grid.prop('className').split(' ');
        gridUid = classes.find((className: string) => /slickgrid_.*/.test(className));
        expect(gridUid).to.not.be.null;
      })
      .then(() => {
        cy.get(`.slick-grid-menu.${gridUid}`)
          .find('.slick-column-picker-list')
          .children('li')
          .each(($child, index) => {
            if (index <= 5) {
              const $input = $child.find('input');
              const $label = $child.find('span.checkbox-label');
              expect($input.prop('checked')).to.eq(true);
              expect($label.text()).to.eq(fullTitles[index]);
            }
          });
      });
  });

  it('should then hide "Title" column from same 1st Grid and expect the column to be removed from 1st Grid', () => {
    const newColumnList = ['Duration (days)', '% Complete', 'Start', 'Finish', 'Effort Driven'];
    cy.get('#grid1')
      .get('.slick-grid-menu:visible')
      .find('.slick-column-picker-list')
      .children('li:visible:nth(0)')
      .children('label')
      .should('contain', 'Title')
      .click({ force: true });

    cy.get('#grid1').get('.slick-grid-menu:visible').find('.close').click({ force: true });

    cy.get('#grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(newColumnList[index]));
  });

  it('should open the Grid Menu off 2nd Grid and expect all Columns to still be all checked', () => {
    let gridUid = '';
    cy.get('#grid2').find('button.slick-grid-menu-button').click({ force: true });

    cy.get('#grid2')
      .should(($grid) => {
        const classes = $grid.prop('className').split(' ');
        gridUid = classes.find((className: string) => /slickgrid_.*/.test(className));
        expect(gridUid).to.not.be.null;
      })
      .then(() => {
        cy.get(`.slick-grid-menu.${gridUid}`)
          .find('.slick-column-picker-list')
          .children('li')
          .each(($child, index) => {
            if (index <= 5) {
              const $input = $child.find('input');
              const $label = $child.find('span.checkbox-label');
              expect($input.prop('checked')).to.eq(true);
              expect($label.text()).to.eq(fullTitles[index]);
            }
          });
      });
  });

  it('should then hide "% Complete" column from this same 2nd Grid and expect the column to be removed from 2nd Grid', () => {
    const newColumnList = ['Title', 'Duration (days)', 'Start', 'Finish', 'Effort Driven'];
    cy.get('#grid2')
      .get('.slick-grid-menu:visible')
      .find('.slick-column-picker-list')
      .children('li:visible:nth(2)')
      .children('label')
      .should('contain', '% Complete')
      .click({ force: true });

    cy.get('#grid2').get('.slick-grid-menu:visible').find('.close').click({ force: true });

    cy.get('#grid2')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(newColumnList[index]));
  });

  it('should go back to 1st Grid and open its Grid Menu and we expect this grid to stil have the "Title" column be hidden (unchecked)', () => {
    cy.get('#grid1').find('button.slick-grid-menu-button').click({ force: true });

    cy.get('.slick-column-picker-list')
      .children('li')
      .each(($child, index) => {
        if (index <= 5) {
          const $input = $child.find('input');
          const $label = $child.find('span.checkbox-label');
          if ($label.text() === 'Title') {
            expect($input.attr('checked')).to.eq(undefined);
          } else {
            expect($input.prop('checked')).to.eq(true);
          }
          expect($label.text()).to.eq(fullTitles[index]);
        }
      });
  });

  it('should hide "Start" column from 1st Grid and expect to have 2 hidden columns (Title, Start)', () => {
    const newColumnList = ['Duration (days)', '% Complete', 'Finish', 'Effort Driven'];
    cy.get('#grid1')
      .get('.slick-grid-menu:visible')
      .find('.slick-column-picker-list')
      .children('li:visible:nth(3)')
      .children('label')
      .should('contain', 'Start')
      .click({ force: true });

    cy.get('#grid1').get('.slick-grid-menu:visible').find('.close').click({ force: true });

    cy.get('#grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(newColumnList[index]));
  });

  it('should open Column Picker of 2nd Grid and show the "% Complete" column back to visible', () => {
    cy.get('#grid2').find('.slick-header-column').first().trigger('mouseover').trigger('contextmenu').invoke('show');

    cy.get('.slick-column-picker')
      .find('.slick-column-picker-list')
      .children()
      .each(($child, index) => {
        if (index <= 5) {
          expect($child.text()).to.eq(fullTitles[index]);
        }
      });

    cy.get('.slick-column-picker')
      .find('.slick-column-picker-list')
      .children('li:nth-of-type(3)')
      .children('label')
      .should('contain', '% Complete')
      .click();

    cy.get('#grid2')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => {
        if (index <= 5) {
          expect($child.text()).to.eq(fullTitles[index]);
        }
      });

    cy.get('#grid2').get('.slick-column-picker:visible').find('.close').trigger('click').click();
  });

  it('should open the Grid Menu on 2nd Grid and expect all Columns to be checked', () => {
    let gridUid = '';
    cy.get('#grid2').find('button.slick-grid-menu-button').click({ force: true });

    cy.get('#grid2')
      .should(($grid) => {
        const classes = $grid.prop('className').split(' ');
        gridUid = classes.find((className: string) => /slickgrid_.*/.test(className));
        expect(gridUid).to.not.be.null;
      })
      .then(() => {
        cy.get(`.slick-grid-menu.${gridUid}`)
          .find('.slick-column-picker-list')
          .children('li')
          .each(($child, index) => {
            if (index <= 5) {
              const $input = $child.find('input');
              const $label = $child.find('span.checkbox-label');
              expect($input.prop('checked')).to.eq(true);
              expect($label.text()).to.eq(fullTitles[index]);
            }
          });
      });
  });

  it('should still expect 1st Grid to be unchanged from previous state and still have only 4 columns shown', () => {
    const newColumnList = ['Duration (days)', '% Complete', 'Finish', 'Effort Driven'];

    cy.get('#grid1')
      .find('.slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(newColumnList[index]));
  });

  it('should open the Grid Menu on 1st Grid and also expect to only have 4 columns checked (visible)', () => {
    let gridUid = '';
    cy.get('#grid1').find('button.slick-grid-menu-button').click({ force: true });

    cy.get('#grid1')
      .should(($grid) => {
        const classes = $grid.prop('className').split(' ');
        gridUid = classes.find((className: string) => /slickgrid_.*/.test(className));
        expect(gridUid).to.not.be.null;
      })
      .then(() => {
        cy.get(`.slick-grid-menu.${gridUid}`)
          .find('.slick-column-picker-list')
          .children('li')
          .each(($child, index) => {
            if (index <= 5) {
              const $input = $child.find('input');
              const $label = $child.find('span.checkbox-label');
              if ($label.text() === 'Title' || $label.text() === 'Start') {
                expect($input.attr('checked')).to.eq(undefined);
              } else {
                expect($input.prop('checked')).to.eq(true);
              }
              expect($label.text()).to.eq(fullTitles[index]);
            }
          });
      });

    cy.get('#grid1').get('.slick-grid-menu:visible').find('.close').click({ force: true });
  });
});

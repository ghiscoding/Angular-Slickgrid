describe('Example 19 - Draggable Grouping & Aggregators', () => {
  const preHeaders = ['Common Factor', 'Period', 'Analysis', ''];
  const fullTitles = ['Title', 'Duration', 'Start', 'Finish', 'Cost', '% Complete', 'Effort-Driven'];
  const GRID_ROW_HEIGHT = 35;

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/draggrouping`);
    cy.get('h2').should('contain', 'Example 19: Draggable Grouping & Aggregators');
  });

  it('should have exact column (pre-header) grouping titles in grid', () => {
    cy.get('#grid19')
      .find('.slick-preheader-panel .slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(preHeaders[index]));
  });

  it('should have exact column titles in grid', () => {
    cy.get('#grid19')
      .find('.slick-header:not(.slick-preheader-panel) .slick-header-columns')
      .children()
      .each(($child, index) => expect($child.text()).to.eq(fullTitles[index]));
  });

  it('should have a draggable dropzone on top of the grid in the top-header section', () => {
    cy.get('#grid19')
      .find('.slick-topheader-panel .slick-dropzone:visible')
      .contains('Drop a column header here to group by the column');
  });

  describe('Grouping Tests', () => {
    it('should "Group by Duration & sort groups by value" then Collapse All and expect only group titles', () => {
      cy.get('[data-test="add-50k-rows-btn"]').click();
      cy.get('[data-test="group-duration-sort-value-btn"]').click();
      cy.get('[data-test="collapse-all-btn"]').click();

      cy.get('.grouping-selects select:nth(0)').should('have.value', '2: duration');
      cy.get('.grouping-selects select:nth(1)').should('not.have.value');
      cy.get('.grouping-selects select:nth(2)').should('not.have.value');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 0');

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 1');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 2');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 3}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 3');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 4}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 4');
    });

    it('should click on Expand All columns and expect 1st row as grouping title and 2nd row as a regular row', () => {
      cy.get('[data-test="add-50k-rows-btn"]').click();
      cy.get('[data-test="group-duration-sort-value-btn"]').click();
      cy.get('[data-test="expand-all-btn"]').click();

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 0');

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0)`).should('contain', 'Task');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(1)`).should('contain', '0');
    });

    it('should show 1 column title (Duration) shown in the pre-header section', () => {
      cy.get('.slick-dropped-grouping:nth(0) div').contains('Duration');
      cy.get('.grouping-selects select:nth(0)').should('have.value', '2: duration');
      cy.get('.grouping-selects select:nth(1)').should('not.have.value');
      cy.get('.grouping-selects select:nth(2)').should('not.have.value');
    });

    it('should "Group by Duration then Effort-Driven" and expect 1st row to be expanded, 2nd row to be expanded and 3rd row to be a regular row', () => {
      cy.get('[data-test="group-duration-effort-btn"]').click();

      cy.get(
        `[style="top: ${GRID_ROW_HEIGHT * 0}px;"].slick-group-level-0 > .slick-cell:nth(0) .slick-group-toggle.expanded`
      ).should('have.length', 1);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"].slick-group-level-0 > .slick-cell:nth(0) .slick-group-title`).should(
        'contain',
        'Duration: 0'
      );

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"].slick-group-level-1 .slick-group-toggle.expanded`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"].slick-group-level-1 .slick-group-title`).should(
        'contain',
        'Effort-Driven: False'
      );

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', '0');
    });

    it('should show 2 column titles (Duration, Effort-Driven) shown in the pre-header section & same select dropdown', () => {
      cy.get('.slick-dropped-grouping:nth(0) div').contains('Duration');
      cy.get('.slick-dropped-grouping:nth(1) div').contains('Effort-Driven');
      cy.get('.grouping-selects select:nth(0)').should('have.value', '2: duration');
      cy.get('.grouping-selects select:nth(1)').should('have.value', '7: effortDriven');
      cy.get('.grouping-selects select:nth(2)').should('not.have.value');
    });

    it('should be able to drag and swap grouped column titles inside the pre-header', () => {
      cy.get('.slick-dropped-grouping:nth(0) div').contains('Duration').drag('.slick-dropped-grouping:nth(1) div');

      cy.get('.slick-dropped-grouping:nth(0) div').contains('Effort-Driven');
      cy.get('.slick-dropped-grouping:nth(1) div').contains('Duration');
      cy.get('.grouping-selects select:nth(0)').should('have.value', '7: effortDriven');
      cy.get('.grouping-selects select:nth(1)').should('have.value', '2: duration');
      cy.get('.grouping-selects select:nth(2)').should('not.have.value');
    });

    it('should expect the grouping to be swapped as well in the grid', () => {
      cy.get(
        `[style="top: ${GRID_ROW_HEIGHT * 0}px;"].slick-group-level-0 > .slick-cell:nth(0) .slick-group-toggle.expanded`
      ).should('have.length', 1);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"].slick-group-level-0 > .slick-cell:nth(0) .slick-group-title`).should(
        'contain',
        'Effort-Driven: False'
      );

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"].slick-group-level-1 .slick-group-toggle.expanded`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"].slick-group-level-1 .slick-group-title`).should('contain', 'Duration: 0');

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(0)`).should('contain', 'Task');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 2}px;"] > .slick-cell:nth(1)`).should('contain', '0');
    });

    it('should expand all rows with "Expand All" from context menu and expect all the Groups to be expanded and the Toogle All icon to be collapsed', () => {
      cy.get('#grid19').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-command-list')
        .find('.slick-menu-item')
        .find('.slick-menu-content')
        .contains('Expand all Groups')
        .click();

      cy.get('#grid19').find('.slick-group-toggle.collapsed').should('have.length', 0);

      cy.get('#grid19')
        .find('.slick-group-toggle.expanded')
        .should(($rows) => expect($rows).to.have.length.greaterThan(0));

      cy.get('.slick-group-toggle-all-icon.expanded').should('exist');
    });

    it('should collapse all rows with "Collapse All" from context menu and expect all the Groups to be collapsed and the Toogle All icon to be collapsed', () => {
      cy.get('#grid19').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-command-list')
        .find('.slick-menu-item')
        .find('.slick-menu-content')
        .contains('Collapse all Groups')
        .click();

      cy.get('#grid19').find('.slick-group-toggle.expanded').should('have.length', 0);

      cy.get('#grid19')
        .find('.slick-group-toggle.collapsed')
        .should(($rows) => expect($rows).to.have.length.greaterThan(0));

      cy.get('.slick-group-toggle-all-icon.collapsed').should('exist');
    });

    it('should use the topheader Toggle All button and expect all groups to now be expanded', () => {
      cy.get('.slick-topheader-panel .slick-group-toggle-all').click();

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).should(
        'contain',
        'Effort-Driven: False'
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0) .slick-group-title`).should('contain', 'Duration: 0');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`)
        .should('have.css', 'marginLeft')
        .and('eq', `0px`);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`)
        .should('have.css', 'marginLeft')
        .and('eq', `15px`);
    });

    it('should use the topheader Toggle All button again and expect all groups to now be collapsed', () => {
      cy.get('.slick-topheader-panel .slick-group-toggle-all').click();

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-toggle.collapsed`).should(
        'have.length',
        1
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(0) .slick-group-title`).should(
        'contain',
        'Effort-Driven: False'
      );
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 1}px;"] > .slick-cell:nth(0) .slick-group-title`).should(
        'contain',
        'Effort-Driven: True'
      );
    });

    it('should clear all groups with "Clear all Grouping" from context menu and expect all the Groups to be collapsed and the Toogle All icon to be collapsed', () => {
      cy.get('#grid19').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-command-list')
        .find('.slick-menu-item')
        .find('.slick-menu-content')
        .contains('Clear all Grouping')
        .click();

      cy.get('#grid19').find('.slick-group-toggle-all').should('be.hidden');

      cy.get('#grid19')
        .find('.slick-draggable-dropzone-placeholder')
        .should('be.visible')
        .should('have.text', 'Drop a column header here to group by the column');
    });

    it('should add 500 items and expect 500 of 500 items displayed', () => {
      cy.get('[data-test="add-500-rows-btn"]').click();

      cy.get('.right-footer').contains('500 of 500 items');
    });

    it('should clear all grouping and expect all select dropdown to be cleared too', () => {
      cy.get('[data-test="clear-grouping-btn"]').click();
      cy.get('.grouping-selects select:nth(0)').should('not.have.value');
      cy.get('.grouping-selects select:nth(1)').should('not.have.value');
      cy.get('.grouping-selects select:nth(2)').should('not.have.value');
    });

    it('should be able to toggle draggable grouping row (top-header panel)', () => {
      cy.get('.slick-topheader-panel').should('be.visible');

      cy.get('[data-test="toggle-draggable-grouping-row"]').click();

      cy.get('.slick-topheader-panel').should('be.hidden');

      cy.get('[data-test="toggle-draggable-grouping-row"]').click();

      cy.get('.slick-topheader-panel').should('be.visible');
    });
  });

  describe('Column Picker tests', () => {
    it('should open Column Picker from 2nd header column and hide Title & Duration which will hide Common Factor Group as well', () => {
      const fullTitlesWithGroupNames = [
        'Common Factor - Title',
        'Common Factor - Duration',
        'Period - Start',
        'Period - Finish',
        'Analysis - Cost',
        'Analysis - % Complete',
        'Analysis - Effort-Driven',
      ];

      cy.get('#grid19').find('.slick-header-column:nth(1)').trigger('mouseover').trigger('contextmenu').invoke('show');

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list')
        .children()
        .each(($child, index) => {
          if (index <= 5) {
            expect($child.text()).to.eq(fullTitlesWithGroupNames[index]);
          }
        });

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Title')
        .click();

      cy.get('.slick-column-picker .close').click();
    });

    it('should open Column Picker from 2nd header column name and hide Duration which will hide Common Factor Group as well', () => {
      const fullTitlesWithGroupNames = [
        'Common Factor - Title',
        'Common Factor - Duration',
        'Period - Start',
        'Period - Finish',
        'Analysis - Cost',
        'Analysis - % Complete',
        'Analysis - Effort-Driven',
      ];

      cy.get('#grid19')
        .find('.slick-header-column:nth(1) .slick-column-name')
        .trigger('mouseover')
        .trigger('contextmenu')
        .invoke('show');

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list')
        .children()
        .each(($child, index) => {
          if (index <= 5) {
            expect($child.text()).to.eq(fullTitlesWithGroupNames[index]);
          }
        });

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list')
        .children('li:nth-child(2)')
        .children('label')
        .should('contain', 'Duration')
        .click();

      cy.get('.slick-column-picker .close').click();
    });

    it('should expect headers to be without Title/Duration and pre-headers without Common Factor Group header titles', () => {
      const preHeadersWithoutFactor = ['Period', 'Analysis'];
      const titlesWithoutTitleDuration = ['Start', 'Finish', 'Cost', '% Complete', 'Effort-Driven'];

      // Column Pre-Headers without Common Factor group
      cy.get('#grid19')
        .find('.slick-header:not(.slick-preheader-panel) .slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(titlesWithoutTitleDuration[index]));

      // Column Headers without Title & Duration
      cy.get('#grid19')
        .find('.slick-preheader-panel .slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(preHeadersWithoutFactor[index]));
    });

    it('should open Column Picker from Pre-Header column and show again Title column', () => {
      const fullTitlesWithGroupNames = [
        'Common Factor - Title',
        'Common Factor - Duration',
        'Period - Start',
        'Period - Finish',
        'Analysis - Cost',
        'Analysis - % Complete',
        'Analysis - Effort-Driven',
      ];

      cy.get('#grid19')
        .find('.slick-preheader-panel .slick-header-column:nth(1)')
        .trigger('mouseover')
        .trigger('contextmenu')
        .invoke('show');

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list')
        .children()
        .each(($child, index) => {
          if (index <= 5) {
            expect($child.text()).to.eq(fullTitlesWithGroupNames[index]);
          }
        });

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list')
        .children('li:nth-child(1)')
        .children('label')
        .should('contain', 'Title')
        .click();

      // close picker & reopen from a pre-header column name instead
      cy.get('.slick-column-picker .close').click();
    });

    it('should open Column Picker from Pre-Header column name and show again Duration column', () => {
      const fullTitlesWithGroupNames = [
        'Common Factor - Title',
        'Common Factor - Duration',
        'Period - Start',
        'Period - Finish',
        'Analysis - Cost',
        'Analysis - % Complete',
        'Analysis - Effort-Driven',
      ];

      cy.get('#grid19')
        .find('.slick-preheader-panel .slick-header-column:nth(1)')
        .trigger('mouseover')
        .trigger('contextmenu')
        .invoke('show');

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list')
        .children()
        .each(($child, index) => {
          if (index <= 5) {
            expect($child.text()).to.eq(fullTitlesWithGroupNames[index]);
          }
        });

      cy.get('.slick-column-picker')
        .find('.slick-column-picker-list')
        .children('li:nth-child(2)')
        .children('label')
        .should('contain', 'Duration')
        .click();

      cy.get('.slick-column-picker .close').click();
    });

    it('should expect header titles to show again Title/Duration and pre-headers with Common Factor Group header titles', () => {
      const preHeadersWithFactor = ['Common Factor', 'Period', 'Analysis', ''];
      const titlesWithTitleDuration = ['Title', 'Duration', 'Start', 'Finish', 'Cost', '% Complete', 'Effort-Driven'];

      // Column Pre-Headers without Common Factor group
      cy.get('#grid19')
        .find('.slick-header:not(.slick-preheader-panel) .slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(titlesWithTitleDuration[index]));

      // Column Headers without Title & Duration
      cy.get('#grid19')
        .find('.slick-preheader-panel .slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(preHeadersWithFactor[index]));
    });
  });
});

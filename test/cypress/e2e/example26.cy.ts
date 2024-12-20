describe('Example 26 - Cell Menu & Context Menu Plugins', () => {
  const GRID_ROW_HEIGHT = 35;
  const fullEnglishTitles = ['#', 'Title', '% Complete', 'Start', 'Finish', 'Priority', 'Completed', 'Action'];
  const fullFrenchTitles = ['#', 'Titre', '% Achevée', 'Début', 'Fin', 'Priorité', 'Terminé', 'Action'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/context`);
    cy.get('h2').should('contain', 'Example 26: Cell Menu & Context Menu Plugins');
  });

  describe('English Locale', () => {
    it('should have exact Column Titles in the grid', () => {
      cy.get('#grid26')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullEnglishTitles[index]));
    });

    it('should have first row with "Task 0" and a Priority set to a Yellow Star (low) with the Action cell disabled and not clickable', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Task 0');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').find('.mdi-star.yellow');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(6)').find('.mdi-check.checkmark-icon');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7) .disabled').contains('Action');

      cy.get('.slick-cell-menu').should('not.exist');
    });

    it('should expect the Context Menu to not have the "Help" menu when there is Completed set to True', () => {
      const commands = ['Copy', 'Export to Excel', '', 'Delete Row', '', 'Disabled Command', '', 'Exports', 'Feedback'];

      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Task 0');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu.dropright .slick-menu-command-list')
        .find('.slick-menu-item')
        .each(($command, index) => {
          expect($command.text()).to.contain(commands[index]);
          expect($command.text()).not.include('Help');
        });
    });

    it('should be able to click on the Context Menu (x) close button, on top right corner, to close the menu', () => {
      cy.get('.slick-context-menu.dropright').should('exist');

      cy.get('.slick-context-menu button.close').click();
    });

    it('should change "Task 0" Priority to "High" with Context Menu and expect the Action Menu to become clickable and usable', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Task 0');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-option-list').contains('High').click();

      cy.get('.slick-context-menu .slick-menu-command-list').should('not.exist');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu.dropleft').should('exist');
    });

    it('should expect a "Command 2" to be disabled and not clickable (menu will remain open), in that same Action menu', () => {
      cy.get('.slick-cell-menu .slick-menu-item.slick-menu-item-disabled').contains('Command 2').click({ force: true });

      cy.get('.slick-cell-menu.dropleft').should('exist');
    });

    it('should change the Completed to "False" in that same Action and then expect the "Command 2" to enabled and clickable', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('.slick-cell-menu .slick-menu-option-list').find('.slick-menu-item').contains('False').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu .slick-menu-item')
        .contains('Command 2')
        .click()
        .then(() => expect(alertStub.getCall(0)).to.be.calledWith('Command 2'));
    });

    it('should expect the Context Menu now have the "Help" menu when Completed is set to False', () => {
      const commands = ['Copy', 'Export to Excel', '', 'Delete Row', '', 'Help', 'Disabled Command', '', 'Exports', 'Feedback'];

      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Task 0');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(6)').rightclick({ force: true });

      cy.get('.slick-context-menu.dropleft .slick-menu-command-list')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(commands[index]));

      cy.get('.slick-context-menu button.close').click();
    });

    it('should be able to click on the Action Cell Menu (x) close button, on top right corner, to close the menu', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu.dropleft').should('exist');

      cy.get('.slick-cell-menu button.close').click();

      cy.get('.slick-cell-menu.dropleft').should('not.exist');
    });

    it('should click on the "Show Commands & Priority Options" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-commands-and-priority-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-option-list').should('exist').contains('High');

      cy.get('.slick-context-menu .slick-menu-command-list')
        .find('.slick-menu-item.red')
        .find('.slick-menu-content.bold')
        .should('exist')
        .contains('Delete Row');

      cy.get('.slick-context-menu button.close').click();
    });

    it('should click on the "Show Priority Options Only" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-priority-only-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-option-list').should('exist').contains('High');

      cy.get('.slick-context-menu .slick-menu-command-list').should('not.exist');

      cy.get('.slick-context-menu button.close').click();
    });

    it('should click on the "Show Actions Commands & Completed Options" button and see both list when opening Action Cell Menu', () => {
      cy.get('[data-test=cell-menu-commands-and-options-true-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu .slick-menu-option-list').should('exist').contains('True');

      cy.get('.slick-cell-menu .slick-menu-command-list').should('exist').contains('Delete Row');

      cy.get('.slick-cell-menu button.close').click();
    });

    it('should open the Action Cell Menu and expect the Completed "null" option when this Effort is set to False', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu.dropleft').should('exist');

      cy.get('.slick-cell-menu')
        .find('.slick-menu-option-list')
        .find('.slick-menu-item.italic')
        .find('.slick-menu-content')
        .contains('null');
    });

    it('should open the Action Cell Menu and not expect the Completed "null" option when this Effort is set to True', () => {
      cy.get('.slick-cell-menu.dropleft').should('exist');

      cy.get('.slick-cell-menu').find('.slick-menu-option-list').contains('True').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu').each(($row) => {
        expect($row.text()).not.include('null');
      });
    });

    it('should reset Completed to False for the next test to include all commands', () => {
      cy.get('.slick-cell-menu').find('.slick-menu-option-list').contains('False').click();
    });

    it('should click on the "Show Action Commands Only" button and see both list when opening Context Menu', () => {
      const commands = ['Command 1', 'Command 2', '', 'Delete Row', 'Help', 'Disabled Command', '', 'Exports', 'Feedback'];

      cy.get('[data-test=cell-menu-commands-and-options-false-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(commands[index]));

      cy.get('.slick-cell-menu .slick-menu-option-list').should('not.exist');

      cy.get('.slick-cell-menu button.close').click();
    });

    it('should be able to delete first row by using the "Delete Row" command from the Context Menu', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Task 0');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-command-list')
        .find('.slick-menu-item.red')
        .find('.slick-menu-content.bold')
        .should('exist')
        .contains('Delete Row')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .each(($row) => {
          expect($row.text()).not.include('Task 0');
        });
    });

    it('should be able to delete the 3rd row "Task 3" by using the "Delete Row" command from the Action Cell Menu', () => {
      cy.get('#grid26').find('.slick-row:nth(2) .slick-cell:nth(1)').contains('Task 3');

      cy.get('#grid26').find('.slick-row:nth(2) .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu .slick-menu-command-list')
        .find('.slick-menu-item.red')
        .find('.slick-menu-content.bold')
        .should('exist')
        .contains('Delete Row')
        .click();

      cy.get('#grid26')
        .find('.slick-row:nth(2) .slick-cell:nth(1)')
        .each(($row) => {
          expect($row.text()).not.include('Task 3');
        });
    });

    it('should check Context Menu "menuUsabilityOverride" condition and expect to not be able to open Context Menu from rows than are >= to Task 21', () => {
      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('bottom').wait(50);

      cy.get('#grid26').find('.slick-row:nth(3) .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-command-list').should('not.exist');
    });

    it('should scroll back to top row and be able to open Context Menu', () => {
      cy.get('.slick-viewport-top.slick-viewport-left').scrollTo('top').wait(50);

      cy.get('#grid26').find('.slick-row:nth(1) .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-command-list').should('exist');

      cy.get('.slick-context-menu button.close').click();
    });
  });

  describe('French Locale', () => {
    it('should switch locale to French', () => {
      cy.get('[data-test=language-button]').click();

      cy.get('[data-test=selected-locale]').should('contain', 'fr.json');
    });

    it('should show both Commands & Options on the Action Cell Menu', () => {
      cy.get('[data-test=cell-menu-commands-and-options-true-button]').click();
    });

    it('should have exact Column Titles in the grid', () => {
      cy.get('#grid26')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.contain(fullFrenchTitles[index]));
    });

    it('should have first row with "Tâche 1" and a Priority set to a Orange Star (medium) with the Action cell disabled and not clickable', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Tâche 1');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').find('.mdi-star.orange');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7) .disabled').contains('Action');

      cy.get('.slick-cell-menu').should('not.exist');
    });

    it('should expect the Context Menu to not have the "Aide" menu when there is Completed set to False', () => {
      const commands = [
        'Copier',
        'Exporter vers Excel',
        '',
        'Supprimer la ligne',
        '',
        'Aide',
        'Commande désactivée',
        '',
        'Exports',
        'Feedback',
      ];

      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Tâche 1');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu.dropright .slick-menu-command-list')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(commands[index]));
    });

    it('should be able to click on the Context Menu (x) close button, on top right corner, to close the menu', () => {
      cy.get('.slick-context-menu.dropright').should('exist');

      cy.get('.slick-context-menu button.close').click();
    });

    it('should change "Tâche 1" Priority to "Haut" with Context Menu and expect the Action Menu to become clickable and usable', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Tâche 1');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-option-list').contains('Haut').click();

      cy.get('.slick-context-menu .slick-menu-command-list').should('not.exist');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu.dropleft').should('exist');
    });

    it('should expect a "Command 2" to be enabled and clickable in that same Action menu', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu .slick-menu-item')
        .contains('Command 2')
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Command 2'));
    });

    it('should expect the Context Menu now have the "Aide" menu when Completed is set to False', () => {
      const commands = [
        'Copier',
        'Exporter vers Excel',
        '',
        'Supprimer la ligne',
        '',
        'Aide',
        'Commande désactivée',
        '',
        'Exports',
        'Feedback',
      ];

      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Tâche 1');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(6)').rightclick({ force: true });

      cy.get('.slick-context-menu.dropleft .slick-menu-command-list')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(commands[index]));

      cy.get('.slick-context-menu button.close').click();
    });

    it('should be able to click on the Action Cell Menu (x) close button, on top right corner, to close the menu', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu.dropleft').should('exist');

      cy.get('.slick-cell-menu button.close').click();

      cy.get('.slick-cell-menu.dropleft').should('not.exist');
    });

    it('should click on the "Show Commands & Priority Options" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-commands-and-priority-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-option-list').should('exist').contains('Haut');

      cy.get('.slick-context-menu .slick-menu-command-list')
        .find('.slick-menu-item.red')
        .find('.slick-menu-content.bold')
        .should('exist')
        .contains('Supprimer la ligne');

      cy.get('.slick-context-menu button.close').click();
    });

    it('should click on the "Show Priority Options Only" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-priority-only-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-option-list').should('exist').contains('Haut');

      cy.get('.slick-context-menu .slick-menu-command-list').should('not.exist');

      cy.get('.slick-context-menu button.close').click();
    });

    it('should click on the "Show Actions Commands & Completed Options" button and see both list when opening Action Cell Menu', () => {
      cy.get('[data-test=cell-menu-commands-and-options-true-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu .slick-menu-option-list').should('exist').contains('Vrai');

      cy.get('.slick-cell-menu .slick-menu-command-list').should('exist').contains('Supprimer la ligne');

      cy.get('.slick-cell-menu button.close').click();
    });

    it('should open the Action Cell Menu and expect the Completed "null" option when this Effort is set to Faux', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu.dropleft').should('exist');

      cy.get('.slick-cell-menu')
        .find('.slick-menu-option-list')
        .find('.slick-menu-item.italic')
        .find('.slick-menu-content')
        .contains('null');
    });

    it('should open the Action Cell Menu and not expect the Completed "null" option when this Effort is set to True', () => {
      cy.get('.slick-cell-menu.dropleft').should('exist');

      cy.get('.slick-cell-menu').find('.slick-menu-option-list').contains('Vrai').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu').each(($row) => {
        expect($row.text()).not.include('null');
      });
    });

    it('should reset Completed to Faux for the next test to include all commands', () => {
      cy.get('.slick-cell-menu').find('.slick-menu-option-list').contains('Faux').click();
    });

    it('should click on the "Show Action Commands Only" button and see both list when opening Context Menu', () => {
      const commands = [
        'Command 1',
        'Command 2',
        '',
        'Supprimer la ligne',
        'Aide',
        'Commande désactivée',
        '',
        'Exports',
        'Feedback',
      ];

      cy.get('[data-test=cell-menu-commands-and-options-false-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(commands[index]));

      cy.get('.slick-cell-menu .slick-menu-option-list').should('not.exist');

      cy.get('.slick-cell-menu button.close').click();
    });

    it('should be able to delete first row by using the "Supprimer la ligne" command from the Context Menu', () => {
      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').contains('Tâche 1');

      cy.get('#grid26').find('.slick-row .slick-cell:nth(1)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-command-list')
        .find('.slick-menu-item.red')
        .find('.slick-menu-content.bold')
        .should('exist')
        .contains('Supprimer la ligne')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .each(($row) => {
          expect($row.text()).not.include('Tâche 1');
        });
    });

    it('should be able to delete the 4th row "Tâche 6" by using the "Supprimer la ligne" command from the Action Cell Menu', () => {
      cy.get('#grid26').find('.slick-row:nth(3) .slick-cell:nth(1)').contains('Tâche 6');

      cy.get('#grid26').find('.slick-row:nth(3) .slick-cell:nth(7)').contains('Action').click({ force: true });

      cy.get('.slick-cell-menu .slick-menu-command-list')
        .find('.slick-menu-item.red')
        .find('.slick-menu-content.bold')
        .should('exist')
        .contains('Supprimer la ligne')
        .click();

      cy.get('#grid26')
        .find('.slick-row:nth(3) .slick-cell:nth(1)')
        .each(($row) => {
          expect($row.text()).not.include('Tâche 6');
        });
    });
  });

  describe('with sub-menus', () => {
    it('should switch back locale to English', () => {
      cy.get('#grid26').find('button.slick-grid-menu-button').trigger('click').click();

      cy.get('[data-test=language-button]').click();

      cy.get('[data-test=selected-locale]').should('contain', 'en.json');
    });

    it('should reopen Context Menu hover "Priority" column then open options sub-menu & select "High" option and expect Task to be set to High in the UI', () => {
      const subOptions = ['Low', 'Medium', 'High'];

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] .slick-cell:nth(5)`).rightclick({ force: true });

      cy.get('.slick-context-menu.slick-menu-level-0 .slick-menu-option-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains('Sub-Options (demo)')
        .click();

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-option-list').as('subMenuList');
      cy.get('@subMenuList').find('.slick-menu-title').contains('Change Priority');
      cy.get('@subMenuList')
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($command, index) => expect($command.text()).to.eq(subOptions[index]));

      cy.get('@subMenuList').find('.slick-menu-item .slick-menu-content').contains('High').click();

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] .slick-cell:nth(5)`).find('.mdi-star.red');
    });

    it('should be able to open Context Menu from any other cell and click on Export->Text and expect alert triggered with Text Export', () => {
      const subCommands1 = ['Text', 'Excel'];
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] .slick-cell:nth(1)`).should('contain', 'Task 2');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] .slick-cell:nth(1)`).rightclick({ force: true });

      cy.get('.slick-context-menu.slick-menu-level-0 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains(/^Exports$/)
        .click();

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item')
        .each(($command, index) => expect($command.text()).to.contain(subCommands1[index]));

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-command-list')
        .find('.slick-menu-item')
        .contains('Text')
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Exporting as Text (tab delimited)'));
    });

    it('should be able to open Context Menu and click on Export->Excel-> sub-commands to see 1 context menu + 1 sub-menu then clicking on Text should call alert action', () => {
      const subCommands1 = ['Text', 'Excel'];
      const subCommands2 = ['Excel (csv)', 'Excel (xlsx)'];
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] .slick-cell:nth(1)`).should('contain', 'Task 2');
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] .slick-cell:nth(1)`).rightclick({ force: true });

      cy.get('.slick-context-menu.slick-menu-level-0 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains(/^Exports$/)
        .click();

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($command, index) => expect($command.text()).to.contain(subCommands1[index]));

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains('Excel')
        .click();

      cy.get('.slick-context-menu.slick-menu-level-2 .slick-menu-command-list').as('subMenuList2');

      cy.get('@subMenuList2').find('.slick-menu-title').contains('available formats');

      cy.get('@subMenuList2')
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($command, index) => expect($command.text()).to.contain(subCommands2[index]));

      cy.get('.slick-context-menu.slick-menu-level-2 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains('Excel (xlsx)')
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Exporting as Excel (xlsx)'));
    });

    it('should click on the "Show Commands & Priority Options" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-commands-and-priority-button]').click();

      cy.get('#grid26').find('.slick-row .slick-cell:nth(5)').rightclick({ force: true });

      cy.get('.slick-context-menu .slick-menu-option-list').should('exist').contains('High');

      cy.get('.slick-context-menu .slick-menu-command-list')
        .find('.slick-menu-item.red')
        .find('.slick-menu-content.bold')
        .should('exist')
        .contains('Delete Row');

      cy.get('.slick-context-menu button.close').click();
    });

    it('should open Export->Excel sub-menu & open again Sub-Options on top and expect sub-menu to be recreated with that Sub-Options list instead of the Export->Excel list', () => {
      const subCommands1 = ['Text', 'Excel'];
      const subCommands2 = ['Excel (csv)', 'Excel (xlsx)'];
      const subOptions = ['Low', 'Medium', 'High'];

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`).rightclick({ force: true });

      cy.get('.slick-context-menu.slick-menu-level-0 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains(/^Exports$/)
        .click();

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($command, index) => expect($command.text()).to.contain(subCommands1[index]));

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains('Excel')
        .click();

      cy.get('.slick-context-menu.slick-menu-level-2 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($command, index) => expect($command.text()).to.contain(subCommands2[index]));

      cy.get('.slick-context-menu.slick-menu-level-0 .slick-menu-option-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains('Sub-Options')
        .click();

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-option-list').as('optionSubList2');

      cy.get('@optionSubList2').find('.slick-menu-title').contains('Change Priority');

      cy.get('@optionSubList2')
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($option, index) => expect($option.text()).to.contain(subOptions[index]));
    });

    it('should open Export->Excel context sub-menu then open Feedback->ContactUs sub-menus and expect previous Export menu to no longer exists', () => {
      const subCommands1 = ['Text', 'Excel'];
      const subCommands2 = ['Request update from supplier', '', 'Contact Us'];
      const subCommands2_1 = ['Email us', 'Chat with us', 'Book an appointment'];

      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`);
      cy.get(`[style="top: ${GRID_ROW_HEIGHT * 0}px;"] > .slick-cell:nth(5)`).rightclick({ force: true });

      cy.get('.slick-context-menu.slick-menu-level-0 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains(/^Exports$/)
        .click();

      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($command, index) => expect($command.text()).to.contain(subCommands1[index]));

      // click different sub-menu
      cy.get('.slick-context-menu.slick-menu-level-0 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains('Feedback')
        .should('exist')
        .click();

      cy.get('.slick-submenu').should('have.length', 1);
      cy.get('.slick-context-menu.slick-menu-level-1 .slick-menu-command-list')
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($command, index) => expect($command.text()).to.contain(subCommands2[index]));

      // click on Feedback->ContactUs
      cy.get('.slick-context-menu.slick-menu-level-1.dropleft') // left align
        .find('.slick-menu-item .slick-menu-content')
        .contains('Contact Us')
        .should('exist')
        .trigger('mouseover'); // mouseover or click should work

      cy.get('.slick-submenu').should('have.length', 2);
      cy.get('.slick-context-menu.slick-menu-level-2.dropright') // right align
        .should('exist')
        .find('.slick-menu-item .slick-menu-content')
        .each(($command, index) => expect($command.text()).to.eq(subCommands2_1[index]));

      cy.get('.slick-context-menu.slick-menu-level-2');

      cy.get('.slick-context-menu.slick-menu-level-2 .slick-menu-command-list')
        .find('.slick-menu-item .slick-menu-content')
        .contains('Chat with us')
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Command: contact-chat'));

      cy.get('.slick-submenu').should('have.length', 0);
    });
  });
});

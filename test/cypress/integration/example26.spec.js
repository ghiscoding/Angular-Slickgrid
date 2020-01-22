/// <reference types="cypress" />

describe('Example 26 - Cell Menu & Context Menu Plugins', () => {
  const fullEnglishTitles = ['#', 'Title', '% Complete', 'Start', 'Finish', 'Priority', 'Completed', 'Action'];
  const fullFrenchTitles = ['#', 'Titre', '% Achevée', 'Début', 'Fin', 'Priorité', 'Terminé', 'Action'];

  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/context`);
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
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Task 0');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(5)')
        .find('.fa-star.yellow');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(6)')
        .find('.fa-check.checkmark-icon');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7) .disabled')
        .contains('Action');

      cy.get('.slick-cell-menu')
        .should('not.exist')
    });

    it('should expect the Context Menu to not have the "Help" menu when there is Completed set to True', () => {
      const commands = ['Copy', 'Export to Excel', '', 'Delete Row', '', 'Disabled Command'];

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Task 0');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu.dropright .slick-context-menu-command-list')
        .find('.slick-context-menu-item')
        .each(($command, index) => {
          expect($command.text()).to.eq(commands[index]);
          expect($command.text()).not.include('Help');
        });
    });

    it('should be able to click on the Context Menu (x) close button, on top right corner, to close the menu', () => {
      cy.get('.slick-context-menu.dropright')
        .should('exist');

      cy.get('.slick-context-menu button.close')
        .click();
    });

    it('should change "Task 0" Priority to "High" with Context Menu and expect the Action Menu to become clickable and usable', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Task 0');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(5)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-option-list')
        .contains('High')
        .click();

      cy.get('.slick-context-menu-command-list')
        .should('not.exist');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu.dropleft')
        .should('exist');
    });

    it('should expect a "Command 2" to be disabled and not clickable (menu will remain open), in that same Action menu', () => {
      cy.get('.slick-cell-menu .slick-cell-menu-item.slick-cell-menu-item-disabled')
        .contains('Command 2')
        .click({ force: true });

      cy.get('.slick-cell-menu.dropleft')
        .should('exist');
    });

    it('should change the Completed to "False" in that same Action and then expect the "Command 2" to enabled and clickable', () => {
      const alertStub = cy.stub();
      cy.on('window:alert', alertStub);

      cy.get('.slick-cell-menu .slick-cell-menu-option-list')
        .find('.slick-cell-menu-item')
        .contains('False')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu .slick-cell-menu-item')
        .contains('Command 2')
        .click()
        .then(() => expect(alertStub.getCall(0)).to.be.calledWith('Command 2'));
    });

    it('should expect the Context Menu now have the "Help" menu when Completed is set to False', () => {
      const commands = ['Copy', 'Export to Excel', '', 'Delete Row', '', 'Help', 'Disabled Command'];

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Task 0');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(6)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu.dropleft .slick-context-menu-command-list')
        .find('.slick-context-menu-item')
        .each(($command, index) => expect($command.text()).to.eq(commands[index]));

      cy.get('.slick-context-menu button.close')
        .click();
    });

    it('should be able to click on the Action Cell Menu (x) close button, on top right corner, to close the menu', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu.dropleft')
        .should('exist');

      cy.get('.slick-cell-menu button.close')
        .click();

      cy.get('.slick-cell-menu.dropleft')
        .should('not.exist');
    });

    it('should click on the "Show Commands & Priority Options" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-commands-and-priority-button]')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(5)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-option-list')
        .should('exist')
        .contains('High');

      cy.get('.slick-context-menu-command-list')
        .find('.slick-context-menu-item.red')
        .find('.slick-context-menu-content.bold')
        .should('exist')
        .contains('Delete Row');

      cy.get('.slick-context-menu button.close')
        .click();
    });

    it('should click on the "Show Priority Options Only" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-priority-only-button]')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(5)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-option-list')
        .should('exist')
        .contains('High');

      cy.get('.slick-context-menu-command-list')
        .should('not.exist');

      cy.get('.slick-context-menu button.close')
        .click();
    });

    it('should click on the "Show Actions Commands & Completed Options" button and see both list when opening Action Cell Menu', () => {
      cy.get('[data-test=cell-menu-commands-and-options-true-button]')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu .slick-cell-menu-option-list')
        .should('exist')
        .contains('True');

      cy.get('.slick-cell-menu-command-list')
        .should('exist')
        .contains('Delete Row');

      cy.get('.slick-cell-menu button.close')
        .click();
    });

    it('should open the Action Cell Menu and expect the Completed "null" option when this Effort is set to False', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu.dropleft')
        .should('exist');

      cy.get('.slick-cell-menu')
        .find('.slick-cell-menu-option-list')
        .find('.slick-cell-menu-item.italic')
        .find('.slick-cell-menu-content')
        .contains('null');
    });

    it('should open the Action Cell Menu and not expect the Completed "null" option when this Effort is set to True', () => {
      cy.get('.slick-cell-menu.dropleft')
        .should('exist');

      cy.get('.slick-cell-menu')
        .find('.slick-cell-menu-option-list')
        .contains('True')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu')
        .each($row => {
          expect($row.text()).not.include('null');
        });
    });

    it('should reset Completed to False for the next test to include all commands', () => {
      cy.get('.slick-cell-menu')
        .find('.slick-cell-menu-option-list')
        .contains('False')
        .click();
    });

    it('should click on the "Show Action Commands Only" button and see both list when opening Context Menu', () => {
      const commands = ['Command 1', 'Command 2', '', 'Delete Row', 'Help', 'Disabled Command'];

      cy.get('[data-test=cell-menu-commands-and-options-false-button]')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu .slick-cell-menu-command-list')
        .should('exist')
        .find('.slick-cell-menu-item')
        .each(($command, index) => expect($command.text()).to.eq(commands[index]));

      cy.get('.slick-cell-menu-option-list')
        .should('not.exist');

      cy.get('.slick-cell-menu button.close')
        .click();
    });

    it('should be able to delete first row by using the "Delete Row" command from the Context Menu', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Task 0');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-command-list')
        .find('.slick-context-menu-item.red')
        .find('.slick-context-menu-content.bold')
        .should('exist')
        .contains('Delete Row')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .each($row => {
          expect($row.text()).not.include('Task 0');
        });
    });

    it('should be able to delete the 3rd row "Task 3" by using the "Delete Row" command from the Action Cell Menu', () => {
      cy.get('#grid26')
        .find('.slick-row:nth(2) .slick-cell:nth(1)')
        .contains('Task 3');

      cy.get('#grid26')
        .find('.slick-row:nth(2) .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu .slick-cell-menu-command-list')
        .find('.slick-cell-menu-item.red')
        .find('.slick-cell-menu-content.bold')
        .should('exist')
        .contains('Delete Row')
        .click();

      cy.get('#grid26')
        .find('.slick-row:nth(2) .slick-cell:nth(1)')
        .each($row => {
          expect($row.text()).not.include('Task 3');
        });
    });

    it('should check Context Menu "menuUsabilityOverride" condition and expect to not be able to open Context Menu from rows than are >= to Task 21', () => {
      cy.get('.slick-viewport-top.slick-viewport-left')
        .scrollTo('bottom')
        .wait(50);

      cy.get('#grid26')
        .find('.slick-row:nth(3) .slick-cell:nth(1)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-command-list')
        .should('not.exist');
    });

    it('should scroll back to top row and be able to open Context Menu', () => {
      cy.get('.slick-viewport-top.slick-viewport-left')
        .scrollTo('top')
        .wait(50);

      cy.get('#grid26')
        .find('.slick-row:nth(1) .slick-cell:nth(1)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-command-list')
        .should('exist');

      cy.get('.slick-context-menu button.close')
        .click();
    });
  });

  describe('French Locale', () => {
    it('should switch locale to French', () => {
      cy.get('[data-test=language-button]')
        .click();

      cy.get('[data-test=selected-locale]')
        .should('contain', 'fr.json');
    });

    it('should show both Commands & Options on the Action Cell Menu', () => {
      cy.get('[data-test=cell-menu-commands-and-options-true-button]')
        .click();
    });

    it('should have exact Column Titles in the grid', () => {
      cy.get('#grid26')
        .find('.slick-header-columns')
        .children()
        .each(($child, index) => expect($child.text()).to.eq(fullFrenchTitles[index]));
    });

    it('should have first row with "Tâche 1" and a Priority set to a Orange Star (medium) with the Action cell disabled and not clickable', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Tâche 1');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(5)')
        .find('.fa-star.orange');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7) .disabled')
        .contains('Action');

      cy.get('.slick-cell-menu')
        .should('not.exist')
    });

    it('should expect the Context Menu to not have the "Aide" menu when there is Completed set to False', () => {
      const commands = ['Copier', 'Exporter vers Excel', '', 'Supprimer la ligne', '', 'Aide', 'Commande désactivée'];

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Tâche 1');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu.dropright .slick-context-menu-command-list')
        .find('.slick-context-menu-item')
        .each(($command, index) => expect($command.text()).to.eq(commands[index]));
    });

    it('should be able to click on the Context Menu (x) close button, on top right corner, to close the menu', () => {
      cy.get('.slick-context-menu.dropright')
        .should('exist');

      cy.get('.slick-context-menu button.close')
        .click();
    });

    it('should change "Tâche 1" Priority to "Haut" with Context Menu and expect the Action Menu to become clickable and usable', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Tâche 1');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(5)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-option-list')
        .contains('Haut')
        .click();

      cy.get('.slick-context-menu-command-list')
        .should('not.exist');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu.dropleft')
        .should('exist');
    });

    it('should expect a "Command 2" to be enabled and clickable in that same Action menu', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu .slick-cell-menu-item')
        .contains('Command 2')
        .click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Command 2'));
    });

    it('should expect the Context Menu now have the "Aide" menu when Completed is set to False', () => {
      const commands = ['Copier', 'Exporter vers Excel', '', 'Supprimer la ligne', '', 'Aide', 'Commande désactivée'];

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Tâche 1');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(6)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu.dropleft .slick-context-menu-command-list')
        .find('.slick-context-menu-item')
        .each(($command, index) => expect($command.text()).to.eq(commands[index]));

      cy.get('.slick-context-menu button.close')
        .click();
    });

    it('should be able to click on the Action Cell Menu (x) close button, on top right corner, to close the menu', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu.dropleft')
        .should('exist');

      cy.get('.slick-cell-menu button.close')
        .click();

      cy.get('.slick-cell-menu.dropleft')
        .should('not.exist');
    });

    it('should click on the "Show Commands & Priority Options" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-commands-and-priority-button]')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(5)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-option-list')
        .should('exist')
        .contains('Haut');

      cy.get('.slick-context-menu-command-list')
        .find('.slick-context-menu-item.red')
        .find('.slick-context-menu-content.bold')
        .should('exist')
        .contains('Supprimer la ligne');

      cy.get('.slick-context-menu button.close')
        .click();
    });

    it('should click on the "Show Priority Options Only" button and see both list when opening Context Menu', () => {
      cy.get('[data-test=context-menu-priority-only-button]')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(5)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-option-list')
        .should('exist')
        .contains('Haut');

      cy.get('.slick-context-menu-command-list')
        .should('not.exist');

      cy.get('.slick-context-menu button.close')
        .click();
    });

    it('should click on the "Show Actions Commands & Completed Options" button and see both list when opening Action Cell Menu', () => {
      cy.get('[data-test=cell-menu-commands-and-options-true-button]')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu .slick-cell-menu-option-list')
        .should('exist')
        .contains('Vrai');

      cy.get('.slick-cell-menu-command-list')
        .should('exist')
        .contains('Supprimer la ligne');

      cy.get('.slick-cell-menu button.close')
        .click();
    });

    it('should open the Action Cell Menu and expect the Completed "null" option when this Effort is set to Faux', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu.dropleft')
        .should('exist');

      cy.get('.slick-cell-menu')
        .find('.slick-cell-menu-option-list')
        .find('.slick-cell-menu-item.italic')
        .find('.slick-cell-menu-content')
        .contains('null');
    });

    it('should open the Action Cell Menu and not expect the Completed "null" option when this Effort is set to True', () => {
      cy.get('.slick-cell-menu.dropleft')
        .should('exist');

      cy.get('.slick-cell-menu')
        .find('.slick-cell-menu-option-list')
        .contains('Vrai')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu')
        .each($row => {
          expect($row.text()).not.include('null');
        });
    });

    it('should reset Completed to Faux for the next test to include all commands', () => {
      cy.get('.slick-cell-menu')
        .find('.slick-cell-menu-option-list')
        .contains('Faux')
        .click();
    });

    it('should click on the "Show Action Commands Only" button and see both list when opening Context Menu', () => {
      const commands = ['Command 1', 'Command 2', '', 'Supprimer la ligne', 'Aide', 'Commande désactivée'];

      cy.get('[data-test=cell-menu-commands-and-options-false-button]')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu .slick-cell-menu-command-list')
        .should('exist')
        .find('.slick-cell-menu-item')
        .each(($command, index) => expect($command.text()).to.eq(commands[index]));

      cy.get('.slick-cell-menu-option-list')
        .should('not.exist');

      cy.get('.slick-cell-menu button.close')
        .click();
    });

    it('should be able to delete first row by using the "Supprimer la ligne" command from the Context Menu', () => {
      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .contains('Tâche 1');

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .rightclick({ force: true });

      cy.get('.slick-context-menu .slick-context-menu-command-list')
        .find('.slick-context-menu-item.red')
        .find('.slick-context-menu-content.bold')
        .should('exist')
        .contains('Supprimer la ligne')
        .click();

      cy.get('#grid26')
        .find('.slick-row .slick-cell:nth(1)')
        .each($row => {
          expect($row.text()).not.include('Tâche 1');
        });
    });

    it('should be able to delete the 4th row "Tâche 6" by using the "Supprimer la ligne" command from the Action Cell Menu', () => {
      cy.get('#grid26')
        .find('.slick-row:nth(3) .slick-cell:nth(1)')
        .contains('Tâche 6');

      cy.get('#grid26')
        .find('.slick-row:nth(3) .slick-cell:nth(7)')
        .contains('Action')
        .click({ force: true });

      cy.get('.slick-cell-menu .slick-cell-menu-command-list')
        .find('.slick-cell-menu-item.red')
        .find('.slick-cell-menu-content.bold')
        .should('exist')
        .contains('Supprimer la ligne')
        .click();

      cy.get('#grid26')
        .find('.slick-row:nth(3) .slick-cell:nth(1)')
        .each($row => {
          expect($row.text()).not.include('Tâche 6');
        });
    });
  });
});

/// <reference types="cypress" />
import moment from 'moment-mini';

describe('Example 4 - Client Side Sort/Filter Grid', () => {
  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseExampleUrl')}/clientside`);
    cy.get('h2').should('contain', 'Example 4: Client Side Sort/Filter');
  });

  describe('Load Grid with Presets', () => {
    const presetDurationValues = [220, 10];
    const presetUsDateShort = '04/20/25';

    it('should have "Duration" fields within the inclusive range of the preset filters', () => {
      cy.get('#grid4')
        .find('.slick-row')
        .each(($row) => {
          cy.wrap($row)
            .children('.slick-cell:nth(2)')
            .each(($cell) => {
              const value = parseInt($cell.text().trim(), 10);
              if (!isNaN(value)) {
                const foundItems = presetDurationValues.filter(acceptedValue => acceptedValue === value);
                expect(foundItems).to.have.length(1);
              }
            });
        });
    });

    it('should have US Date Short within the range of the preset filters', () => {
      cy.get('.search-filter.filter-usDateShort')
        .find('input')
        .invoke('val')
        .then(text => expect(text).to.eq(presetUsDateShort));

      cy.get('#grid4')
        .find('.slick-row')
        .each(($row) => {
          cy.wrap($row)
            .children('.slick-cell:nth(5)')
            .each(($cell) => {
              const isDateValid = moment($cell.text(), 'M/D/YY').isBefore(presetUsDateShort);
              expect(isDateValid).to.eq(true);
            });
        });
    });
  });

  describe('Set Dymamic Filters', () => {
    const dynamicDurationValues = [2, 25, 48, 50];
    const dynamicMaxComplete = 95;
    const dynamicStartDate = '2001-02-28';

    it('should click on Set Dynamic Filters', () => {
      cy.get('[data-test=set-dynamic-filter]')
        .click();
    });

    it('should have "% Complete" fields within the exclusive range of the filters presets', () => {
      cy.get('#grid4')
        .find('.slick-row')
        .each(($row) => {
          cy.wrap($row)
            .children('.slick-cell:nth(3)')
            .each(($cell) => {
              const value = parseInt($cell.text().trim(), 10);
              if (!isNaN(value)) {
                expect(value < dynamicMaxComplete).to.eq(true);
              }
            });
        });
    });

    it('should have "Duration" fields within the inclusive range of the dynamic filters', () => {
      cy.get('#grid4')
        .find('.slick-row')
        .each(($row) => {
          cy.wrap($row)
            .children('.slick-cell:nth(2)')
            .each(($cell) => {
              const value = parseInt($cell.text().trim(), 10);
              if (!isNaN(value)) {
                const foundItems = dynamicDurationValues.filter(acceptedValue => acceptedValue === value);
                expect(foundItems).to.have.length(1);
              }
            });
        });
    });

    it('should have Start Date within the range of the dynamic filters', () => {
      cy.get('.search-filter.filter-start')
        .find('input')
        .invoke('val')
        .then(text => expect(text).to.eq(dynamicStartDate));

      cy.get('#grid4')
        .find('.slick-row')
        .each(($row) => {
          cy.wrap($row)
            .children('.slick-cell:nth(4)')
            .each(($cell) => {
              const isDateValid = moment($cell.text()).isSameOrAfter(dynamicStartDate);
              expect(isDateValid).to.eq(true);
            });
        });
    });
  });
});

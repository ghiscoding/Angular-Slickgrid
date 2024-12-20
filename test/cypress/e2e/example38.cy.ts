describe('Example 38 - Infinite Scroll with OData', () => {
  it('should display Example title', () => {
    cy.visit(`${Cypress.config('baseUrl')}/infinite-odata`);
    cy.get('h2').should('contain', 'Example 38: OData (v4) Backend Service with Infinite Scroll');
  });

  describe('when "enableCount" is set', () => {
    it('should have default OData query', () => {
      cy.get('[data-test=alert-odata-query]').should('exist');
      cy.get('[data-test=alert-odata-query]').should('contain', 'OData Query');

      // wait for the query to finish
      cy.get('[data-test=status]').should('contain', 'finished');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30`);
      });
    });

    it('should scroll to bottom of the grid and expect next batch of 30 items appended to current dataset for a total of 60 items', () => {
      cy.get('[data-test="itemCount"]').should('have.text', '30');

      cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

      cy.get('[data-test="itemCount"]').should('have.text', '60');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$skip=30`);
      });
    });

    it('should scroll to bottom of the grid and expect next batch of 30 items appended to current dataset for a new total of 90 items', () => {
      cy.get('[data-test="itemCount"]').should('have.text', '60');

      cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

      cy.get('[data-test="itemCount"]').should('have.text', '90');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$skip=60`);
      });
    });

    it('should do one last scroll to reach the end of the data and have a full total of 100 items', () => {
      cy.get('[data-test="itemCount"]').should('have.text', '90');

      cy.get('[data-test="data-loaded-tag"]').should('be.hidden');

      cy.get('[data-test="data-loaded-tag"]').should('not.have.class', 'fully-loaded');

      cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

      cy.get('[data-test="itemCount"]').should('have.text', '100');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$skip=90`);
      });

      cy.get('[data-test="data-loaded-tag"]').should('be.visible');

      cy.get('[data-test="data-loaded-tag"]').should('have.class', 'fully-loaded');
    });

    it('should sort by Name column and expect dataset to restart at index zero and have a total of 30 items', () => {
      cy.get('[data-test="data-loaded-tag"]').should('have.class', 'fully-loaded');

      cy.get('[data-id="name"]').click();

      cy.get('[data-test="itemCount"]').should('have.text', '30');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$orderby=Name asc`);
      });

      cy.get('[data-test="data-loaded-tag"]').should('not.have.class', 'fully-loaded');
    });

    it('should scroll to bottom again and expect next batch of 30 items appended to current dataset for a total of 60 items', () => {
      cy.get('[data-test="itemCount"]').should('have.text', '30');

      cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

      cy.get('[data-test="itemCount"]').should('have.text', '60');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$skip=30&$orderby=Name asc`);
      });

      cy.get('[data-test="data-loaded-tag"]').should('not.have.class', 'fully-loaded');
    });

    it('should change Gender filter to "female" and expect dataset to restart at index zero and have a total of 30 items', () => {
      cy.get('.ms-filter.filter-gender:visible').click();

      cy.get('[data-name="filter-gender"].ms-drop').find('li:visible:nth(2)').contains('female').click();

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$orderby=Name asc&$filter=(Gender eq 'female')`);
      });

      cy.get('[data-test="data-loaded-tag"]').should('not.have.class', 'fully-loaded');
    });

    it('should scroll to bottom again and expect next batch to be only 20 females appended to current dataset for a total of 50 items found in DB', () => {
      cy.get('[data-test="itemCount"]').should('have.text', '30');

      cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

      cy.get('[data-test="itemCount"]').should('have.text', '50');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$skip=30&$orderby=Name asc&$filter=(Gender eq 'female')`);
      });
    });

    it('should "Group by Gender" and expect 30 items grouped', () => {
      cy.get('[data-test="clear-filters-sorting"]').click();
      cy.get('[data-test="group-by-gender"]').click();

      cy.get('[data-test="itemCount"]').should('have.text', '30');

      cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30`);
      });

      cy.get(`[style="top: 0px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should('have.length', 1);
      cy.get(`[style="top: 0px;"] > .slick-cell:nth(0) .slick-group-title`).contains(/Gender: [female|male]/);
    });

    it('should scroll to the bottom "Group by Gender" and expect 30 more items for a total of 60 items grouped', () => {
      cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('bottom');

      cy.get('[data-test="itemCount"]').should('have.text', '60');

      cy.get('.slick-viewport.slick-viewport-top.slick-viewport-left').scrollTo('top');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$skip=30`);
      });

      cy.get(`[style="top: 0px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should('have.length', 1);
      cy.get(`[style="top: 0px;"] > .slick-cell:nth(0) .slick-group-title`).contains(/Gender: [female|male]/);
    });

    it('should sort by Name column again and expect dataset to restart at index zero and have a total of 30 items still having Group Gender', () => {
      cy.get('[data-id="name"]').click();

      cy.get('[data-test="itemCount"]').should('have.text', '30');

      cy.get('[data-test=odata-query-result]').should(($span) => {
        expect($span.text()).to.eq(`$count=true&$top=30&$orderby=Name asc`);
      });

      cy.get(`[style="top: 0px;"] > .slick-cell:nth(0) .slick-group-toggle.expanded`).should('have.length', 1);
      cy.get(`[style="top: 0px;"] > .slick-cell:nth(0) .slick-group-title`).contains(/Gender: [female|male]/);
    });
  });
});

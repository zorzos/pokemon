describe('Marlow Assessment', () => {
  beforeEach(() => cy.visit('/'));

  it('Should verify Pokemon table', () => {
    cy.get('.MuiDataGrid-main').should('exist')
    cy.get('.MuiDataGrid-main').should('not.be.empty')
  });

  it('Should try to click on a table row', () => {
    cy.get('.MuiDataGrid-virtualScrollerRenderZone').children().should('have.length', 20);
    const charizard = cy.get('.MuiDataGrid-virtualScrollerRenderZone').find('div[data-id=6]')
    charizard.click()
  });

  it('Verify modal details', () => {
    cy.get('.MuiDataGrid-virtualScrollerRenderZone').children().should('have.length', 20);
    const charizard = cy.get('.MuiDataGrid-virtualScrollerRenderZone').find('div[data-id=6]')
    charizard.click()
    cy.get('.MuiDialog-paper').should('exist');
    cy.get('.MuiDialogTitle-root').should('exist');
    cy.get('.MuiDialogTitle-root').should('have.text', '#6 Charizard');
  });

  it('Verify modal closes properly', () => {
    cy.get('.MuiDataGrid-virtualScrollerRenderZone').children().should('have.length', 20);
    const charizard = cy.get('.MuiDataGrid-virtualScrollerRenderZone').find('div[data-id=6]')
    charizard.click()
    cy.get('.MuiDialog-paper').should('exist');
    cy.get('.MuiDialog-paper').find('button').click();
    cy.get('.MuiDialog-paper').should('not.exist');
  });
});

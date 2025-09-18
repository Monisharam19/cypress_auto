describe('Radio Button Practice Tests', () => {
  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/radio-buttons');
  });

  it('should select a color radio button and verify it is checked', () => {
    cy.get('input[type="radio"][value="Red"]').check().should('be.checked');
    cy.get('input[type="radio"][value="Blue"]').should('not.be.checked');
  });

  it('should select a sport radio button and verify it is checked', () => {
    cy.get('input[type="radio"][value="Football"]').check().should('be.checked');
    cy.get('input[type="radio"][value="Basketball"]').should('not.be.checked');
  });
});

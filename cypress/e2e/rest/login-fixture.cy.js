describe('OrangeHRM Login with Fixture', () => {
  it('should login using fixture data', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.fixture('user').then((userData) => {
      cy.get('input[name="username"]').type(userData.username);
      cy.get('input[name="password"]').type(userData.password);
    });
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
  });
});
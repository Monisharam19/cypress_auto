describe('OrangeHRM Login - Data Driven Test', () => {
  let testCases;

  before(() => {
    cy.fixture('loginTestCases').then((data) => {
      testCases = data;
    });
  });

  testCases?.forEach((testCase) => {
    it(testCase.testName, () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      cy.get('input[name="username"]').clear().type(testCase.username);
      cy.get('input[name="password"]').clear().type(testCase.password);
      cy.get('button[type="submit"]').click();

      if (testCase.expectedResult === 'success') {
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
      } else {
        cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
      }
    });
  });
});
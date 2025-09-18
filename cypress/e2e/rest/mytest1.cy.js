// Test suite for SauceDemo login page attribute value checks and UI validations
describe('SauceDemo Attribute Value Checks', () => {
  
  // This hook runs before each test case to load the login page fresh
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/v1/');
  });

  // ========================
  // EXISTENCE AND VISIBILITY
  // ========================

  it('should check if the login button exists and is visible', () => {
    // Select login button by class and check if it exists in DOM and is visible
    cy.get('.btn_action')
      .should('exist')       // Asserts that element is present in DOM
      .and('be.visible');    // Asserts that element is not hidden
  });

  it('should check if a non-existent element does not exist', () => {
    // Tries to get a fake element and expects it not to exist in DOM
    cy.get('.non-existent-element')
      .should('not.exist');  // This will pass since this selector doesn't exist
  });

  it('should check if the error message does not exist before login attempt', () => {
    // Ensures that there is no error message displayed before login attempt
    cy.get('[data-test="error"]')
      .should('not.exist');  // Error container should not be present initially
  });

  it('should trigger error message on failed login and check visibility', () => {
    // Enter invalid credentials to trigger login error
    cy.get('#user-name').type('invalid_user');  // Type incorrect username
    cy.get('#password').type('invalid_pass');   // Type incorrect password
    cy.get('.btn_action').click();              // Click login button

    // Check if error message appears after failed login attempt
    cy.get('[data-test="error"]')
      .should('exist')       // Error container should now exist
      .and('be.visible');    // It should also be visible to user
  });

  // ========================
  // ATTRIBUTE VALUE TESTS
  // ========================

  it('should check placeholder attribute of username input', () => {
    // Validate that username field has correct placeholder text
    cy.get('#user-name')
      .should('have.attr', 'placeholder', 'Username');
  });
 
  it('should check if login button is not disabled', () => {
    // Ensure that login button is not disabled (should be clickable)
    cy.get('#login-button')
      .should('not.have.attr', 'disabled');
  });
 
  it('should check if username input does not have readonly attribute', () => {
    // Confirm that username input is editable (not readonly)
    cy.get('#user-name')
      .should('not.have.attr', 'readonly');
  });
});

// Test suite for navigation and viewport-related commands
describe('SauceDemo Navigation and Viewport Tests', () => {

  // Test: Visit the SauceDemo login page
  it('should visit the SauceDemo login page', () => {
    cy.visit('https://www.saucedemo.com/v1/'); // Navigates to the specified URL
    cy.url().should('include', 'saucedemo.com'); // Asserts that the URL contains 'saucedemo.com'
  });

  // Test: Reload the current page
  it('should reload the page', () => {
    cy.visit('https://www.saucedemo.com/v1/');
    cy.reload(); // Reloads the page
    cy.get('.login_logo').should('exist'); // Checks that the login logo still exists after reload
  });

  // Test: Navigate back and forward in browser history
  it('should navigate back and forward in browser history', () => {
    cy.visit('https://www.saucedemo.com/v1/');
    cy.get('#user-name').type('standard_user'); // Enter username
    cy.get('#password').type('secret_sauce'); // Enter password
    cy.get('.btn_action').click(); // Click login button

    cy.go('back'); // Navigate back to login page
    cy.url().should('include', 'saucedemo.com'); // Confirm we're back on the login page

    cy.go('forward'); // Navigate forward to inventory page
    cy.url().should('include', 'inventory.html'); // Confirm we're on the inventory page
  });

  // Test: Change viewport size to simulate different devices
  it('should set different viewport sizes', () => {
    cy.visit('https://www.saucedemo.com/v1/');

    cy.viewport(320, 480); // Simulate mobile device
    cy.wait(1000); // Wait to observe change

    cy.viewport(768, 1024); // Simulate tablet
    cy.wait(1000);

    cy.viewport(1280, 720); // Simulate desktop
    cy.wait(1000);

    cy.get('.login_logo').should('be.visible'); // Ensure logo is visible in all viewports
  });
});

// Test suite for DOM traversal and selection commands
describe('SauceDemo DOM Traversal and Selection Tests', () => {

  // Runs before each test in this suite
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/v1/');
  });

  // Test: Use cy.get() to find an element by CSS selector
  it('should find an element using cy.get()', () => {
    cy.get('.login_logo').should('exist'); // Finds the login logo
  });

  // Test: Use cy.contains() to find an element by its text content
  it('should find an element containing specific text using cy.contains()', () => {
    cy.contains('Accepted usernames are:').should('be.visible'); // Finds instructional text
  });

  // Test: Use .find() to locate child input elements inside login box
  it('should find child input elements using .find()', () => {
    cy.get('.login-box').find('input').should('have.length', 3); // Finds username, password, and login button
  });

  // Test: Use .first() to get the first input element (username field)
  it('should get the first input element (username)', () => {
    cy.get('.login-box input').first().should('have.attr', 'placeholder', 'Username');
  });

  // Test: Use .eq() to get the second input element (password field)
  it('should get the second input element (password)', () => {
    cy.get('.login-box input').eq(1).should('have.attr', 'placeholder', 'Password');
  });

  // Test: Use .last() to get the last input element (login button)
  it('should get the last input element (login button)', () => {
    cy.get('.login-box input').last().should('have.attr', 'type', 'submit'); // Login button has type="submit"
  });
});

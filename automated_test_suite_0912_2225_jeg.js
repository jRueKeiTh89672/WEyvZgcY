// 代码生成时间: 2025-09-12 22:25:11
const { render, screen, fireEvent } = require('@testing-library/react');
const userEvent = require('@testing-library/user-event');
const { GatsbyServer } = require('./gatsby-server'); // Assume this is a custom Gatsby server wrapper

// Utility function to wait for a certain element to be available
const waitFor = (selector) => {
  return screen.findByRole(selector);
};

// Mock data for testing
const mockData = {
  "users": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Doe" }
  ]
};

// Test suite for Gatsby pages and components
describe('Gatsby Automated Testing Suite', () => {
  // Before each test, set up the Gatsby server
  beforeEach(() => {
    GatsbyServer.setup();
  });

  // After each test, clean up the Gatsby server
  afterEach(() => {
    GatsbyServer.teardown();
  });

  // Test to check if the homepage loads correctly
  it('should load the homepage', async () => {
    const { getByText } = render(GatsbyServer.homepage());
    await waitFor('main');
    expect(getByText('Welcome to Your Gatsby Site!')).toBeInTheDocument();
  });

  // Test to check if the users page displays the correct data
  it('should display user data on users page', async () => {
    const { getByText } = render(GatsbyServer.usersPage(mockData));
    await waitFor('user-list');
    expect(getByText(mockData.users[0].name)).toBeInTheDocument();
    expect(getByText(mockData.users[1].name)).toBeInTheDocument();
  });

  // Test for user interaction with a form
  it('should handle form submission', async () => {
    const { getByLabelText, getByText } = render(GatsbyServer.formPage());
    const usernameInput = await waitFor('label', { name: 'username' });
    userEvent.type(usernameInput, 'Test User');
    const submitButton = getByText('Submit');
    userEvent.click(submitButton);
    expect(getByText('Thank you for submitting!')).toBeInTheDocument();
  });

  // Test to check error handling
  it('should handle errors gracefully', async () => {
    const { getByText } = render(GatsbyServer.errorPage());
    await waitFor('error-message');
    expect(getByText('An error occurred')).toBeInTheDocument();
  });
});

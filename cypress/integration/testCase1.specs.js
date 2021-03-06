import * as pages from '../fixtures/pages.json';
import * as utilities from '../support/utilities';

describe('Validating the sign up flow', () => {
  const imagePath = `/images/growth/celebration.png`;
  const email = utilities.emailId();

  beforeEach(() => {
    //launching the website
    cy.visit("https://www.airtable.com/");
    cy.clearCookies({domain: null});
    cy.findAllByText('Sign up for free').contains('Sign up for free').should('exist').click();
    cy.url().should('contain', pages['signup']);

    //validating fields on the create your account modal
    cy.findByText('Create your free account').should('exist');
    cy.findByLabelText('Work email');
    cy.findByText('Sign up with Google').should('exist');
    cy.findByText('Already have an account?').should('exist');
    cy.findByText('Sign in').should('exist').should('have.class', 'link');
  });

  it.only('signing up without selecting any option in sign up flow', () => {

    //signing up
    cy.findByLabelText('Work email address').should('exist').clear().type(email);
    cy.findByText('Continue').should('exist').should('have.class', 'focusable').click();

    cy.url().should('contain', pages['usernameAndPassword']);
    cy.findByText('Continue').should('exist').should('not.have.class', 'focusable');
    cy.findByText('Create your free account').should('exist');
    cy.findByLabelText('Full Name').should('exist');
    cy.findByLabelText('Password').should('exist');
    cy.findAllByPlaceholderText('First and Last').should('exist').clear().type('Rama');
    cy.get('#password').should('exist').clear().type('Testing123!');
    cy.findByText('Continue').should('exist').should('have.class', 'focusable').click();
        
    //recursive function to click all skips
    const recurse = (commandFn, check) => {
      commandFn().then((val) => {
        if (check(val)) {
          cy.log('final page');
          return;
        }
        recurse(commandFn, check);
      });
    };
    recurse(
      () => 
        cy.findByText('Skip').should('exist').click().then(() => {
          return cy.wrap(Cypress.$("body:contains('Skip')").length);
        }),
      (len) => len === 0
    );

    //testing start building page
    cy.findByText(`Let???s start building!`).should('exist');
    cy.findByText(`You???re ready to set up your first workflow.`).should('exist');
    cy.get(`img[src="${imagePath}"]`).should('exist');
    cy.findByText('Start building').should('exist');

    //testing get started page
    cy.findByText('Go to workspace').should('exist').click();
    cy.findAllByText('My First Workspace').contains('My First Workspace').should('exist');
  });

  it('signing up with an existing email id', () => {
    const emailId = 'r4@grr.la';
    cy.findByLabelText('Work email address').should('exist').clear().type(emailId);
    cy.findByText('Continue').should('exist').should('have.class', 'focusable').click();
    cy.findAllByPlaceholderText('First and Last').should('exist').clear().type('Rama');
    cy.get('#password').should('exist').clear().type('Testing123!');
    cy.findByText('Continue').should('exist').should('have.class', 'focusable').click();
    cy.findByText('Email already in use').should('exist').should('have.class', 'strong')
      .parents('div').should('have.class', 'red');
  });

  it('signing up with invalid email id(missing @) should keep continue button in disabled state', () => {
    const emailId = 'r4gmail.la';
    cy.findByLabelText('Work email address').should('exist').clear().type(emailId);
    cy.findByText('Continue').should('exist').should('not.have.class', 'focusable');
  });

  it('signing up with invalid email id(missing dot) should keep continue button in disabled state', () => {
    const emailId = 'r4@gmailla';
    cy.findByLabelText('Work email address').should('exist').clear().type(emailId);
    cy.findByText('Continue').should('exist').should('not.have.class', 'focusable');
  });

  it('signing up with invalid email id, should throw an inline error message saying invalid email', () => {
    const emailId = 'r4gmail.la';
    cy.findByLabelText('Work email address').should('exist').clear().type(emailId);
    cy.findByText('Continue').should('exist').should('not.have.class', 'focusable').click({force: true});
    cy.findByText('Invalid email').should('exist').should('have.class', 'text-red');
  });
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import * as pages from '../fixtures/pages.json'
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  //launching the website
  cy.visit("https://www.airtable.com/");
  cy.clearCookies({domain: null});
    
  //validating login page elements
  cy.findByText('Sign in').should('exist').click();
  cy.url().should('include', pages['login']);
  cy.get('h1').contains('Sign in').should('exist');
  cy.get('.lockIcon').should('exist');
  cy.findByText('create an account').should('exist').should('have.class', 'understroke').should('have.attr', 'href', '/signup');
  cy.findByText('Email').should('exist').then(() => {
    cy.findByPlaceholderText('name@company.com').should('exist').clear().type('r4@grr.la');
    cy.log('continue button: '+(Cypress.$("body:contains('Continue')")).length);
        
    //if continue button exists on login page
    if (Cypress.$("body:contains('Continue')").length) {
      cy.findByText('Continue').should('exist').click();
    } else {
      cy.get('.horizontalBar').should('exist').should('have.length', 2);
      cy.get('p').contains('or').should('exist');
      cy.get('#sign-in-form-fields-root').find('button').contains('Sign in').should('exist').should('be.disabled');
    }
  });
    
  //validating password entry page
  cy.findByText('Password').should('exist');
  cy.findByText('Forgot password?').should('exist').should('have.class', 'link').should('have.attr', 'href', '/forgot');
    
  //siging in
  cy.findByPlaceholderText('********').should('exist').clear().type('!/qbr7:HAF*Se*-');
  cy.get('#sign-in-form-fields-root').find('button').contains('Sign in').should('exist').click();
});

Cypress.Commands.add('createBase', (baseName) => {
  //validating and adding a new base
  cy.findByText('Start from scratch').should('exist').click();
  cy.findByText('Find a view').should('exist');

  //renaming the base
  cy.findByText('Untitled Base').should('exist').click();
  cy.get(`input[aria-label="rename base"]`).should('exist').clear().type(baseName).type('{enter}');
});

Cypress.Commands.add('inviteToBase', (inviteeEmail, inviteeRole) => {
  const inviteCategory = ['Creator', 'Editor', 'Commenter', 'Read only'];
  const inviteCategoryDescription = ['Can fully configure and edit this base', 'Can edit records and views, but cannot configure tables or fields',
    'Can comment on records and create personal views', 'Cannot edit or comment'];

  //validating invite page and invite flow
  cy.findByText('Email invite').should('be.visible').should('exist').should('have.class', 'active');
  cy.findByText('Create link').should('exist').should('have.class', 'quiet');
  cy.findByText('Share publicly').should('exist').should('have.class', 'quiet');
  cy.findAllByPlaceholderText('Invite by email...').clear().type(inviteeEmail);
  cy.findByText('Creator').click();
  inviteCategory.forEach(category => {
    cy.get('.hdropdown').within(() => {
      cy.findByText(category).should('exist');
      cy.findByText(inviteCategoryDescription[inviteCategory.indexOf(category)]).should('exist');
    })
  })
    
  //sending invite to email
  cy.findByText(inviteeRole).click();
  cy.findByText('Invite').should('exist').click({force: true});
});

Cypress.Commands.add('deleteBaseFromDashboard', (baseName) => {
  cy.get(`a[aria-label="${baseName}"]`).trigger('hover').siblings(`div[tabindex="0"]`).click();
  cy.findByText('Delete base').should('exist').click();
  cy.findByText('Delete').should('exist').click();
});

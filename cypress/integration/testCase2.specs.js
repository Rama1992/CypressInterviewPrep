import * as utilities from '../support/utilities';
import * as pages from '../fixtures/pages.json';


describe('Inviting a new user as editor', () => {
  const emailToBeInvited = utilities.emailId();

  beforeEach(() => {
    cy.login();
    cy.log('deleting RamaTest base if exists').then(() => {
      if(Cypress.$("body:contains('RamaTest')").length) {
        cy.deleteBaseFromDashboard('RamaTest');
      }
    })
  })

  it('creating a new base and inviting a new user as editor', () => {
    cy.createBase('RamaTest');
    cy.findByText('Share').should('exist').click();
    cy.inviteToBase(emailToBeInvited, 'Editor');
    cy.get('.snackbar').should('exist').should('contain.text', 'Successfully sent!');
    cy.go('back');

    //validating the invitee is added to the base
    cy.get(`a[aria-label="RamaTest"]`).should('exist')
      .siblings('.absolute').within(() => {
        cy.get('.mr-half').should('exist').click();
      })
        
    //validting the collaborators modal
    cy.findByText('Base collaborators').should('exist');
    cy.get(`div[title="${emailToBeInvited}"]`).should('exist')
      .parents(`div[role="listitem"]`).within((elements) => {
        cy.wrap(elements).find('.white').should('exist').children().should('exist').should('contain.text', 'Editor');
      });
    cy.get(`div[aria-label="Close dialog"]`).should('exist').click();
  });

  it('inviting with invalid email id', () => {
    cy.createBase('RamaTest');
    cy.findByText('Share').should('exist').click();
    cy.inviteToBase('invalid@email', 'Editor');
    cy.findByText('Invite').should('exist').should('have.class', 'quieter');
  });

  it('inviting with same email id as the logged in user', () => {
    const emailToBeInvited = 'r4@grr.la';
    cy.createBase('RamaTest');
    cy.findByText('Share').should('exist').click();
    cy.inviteToBase(emailToBeInvited, 'Editor');
    cy.findByText('Already shared').should('exist');
    cy.findByText(`${emailToBeInvited} already has access to this base.`).should('exist');
    cy.findByText('Okay').should('exist');
  });

  afterEach(() => {
    cy.log('deleting RamaTest base if exists').then(() => {
      cy.visit(pages['dashboard']);
      if(Cypress.$("body:contains('RamaTest')").length) {
        cy.deleteBaseFromDashboard('RamaTest');
      }
    })
  })
});
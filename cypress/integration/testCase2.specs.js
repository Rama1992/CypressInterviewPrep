import * as utilities from '../support/utilities';


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
        //perform snapshot test for page level validation
        cy.createBase('RamaTest');
        cy.findByText('Share').should('exist').click();
        cy.inviteToBase(emailToBeInvited, 'Editor');
        
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

    afterEach(() => {
        cy.log('deleting RamaTest base if exists').then(() => {
            if(Cypress.$("body:contains('RamaTest')").length) {
                cy.deleteBaseFromDashboard('RamaTest');
            }
        })
    })
});
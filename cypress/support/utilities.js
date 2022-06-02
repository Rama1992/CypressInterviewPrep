export const emailId = () => {
    const randomNumber = `${Math.floor(Math.random() * 1000)}`;
    const email = `rama${randomNumber}@grr.la`;

    return email;
}

export const recurseSkip = () => {
    cy.log('inside recurse skip');
    cy.findByText('Skip').should('exist').click();
    if (Cypress.$('.ml3').length) {
        cy.log('on the last page')
        return 1;
    } else {
        cy.log('inside else');
        recurseSkip();
    }
}
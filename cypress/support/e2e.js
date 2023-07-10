Cypress.Commands.add('login', (email, pass) => {
	cy.visit('http://localhost:3000/auth')
	cy.get('input[name=email]').type(email)
	cy.get('input[name=password]').type(pass)
	cy.get('button[type=submit]').click()
	cy.contains('Sign out')
})

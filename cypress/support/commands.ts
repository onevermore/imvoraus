Cypress.Commands.add('login' as any, (email: string, pass: string) => {
	cy.visit('http://localhost:3000/auth')
	cy.get('input[name=email]').type(email)
	cy.get('input[name=password]').type(pass)
	cy.get('button[type=submit]').click()
	cy.contains('Sign out')
})

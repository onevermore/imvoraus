describe('template spec', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('should have a h3 element with text', () => {
		cy.get('h3').should('contain.text', 'Sign up to create a course !')
	})

	it('should login user', () => {
		/*	cy.contains('Sign in').click()
		cy.url().should('include', 'auth')*/
		cy.login('test@gmail.com', 'tester*333')
		cy.contains('Sign out').click()
	})
})

export {}

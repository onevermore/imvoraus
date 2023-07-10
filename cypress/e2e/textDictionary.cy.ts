describe('template spec', () => {
	beforeEach(() => {
		cy.login('test@gmail.com', 'tester*333')
		cy.visit('http://localhost:3000/courses')
	})
	afterEach(() => {
		cy.contains('Sign out').click()
	})

	it('should add word from course text to dictionary', () => {
		cy.get('#courses-list')
			.should('be.visible')
			.find('div')
			.first()
			.find('button')
			.click()

		cy.get('#text-list')
			.should('be.visible')
			.find('div')
			.first()
			.contains('Open')
			.click()

		cy.get('#dictionary-list').children('tr').should('have.length', 0)
		cy.get('#text').find('span').find('span').eq(0).click()

		cy.contains('Add +').click()

		cy.on('uncaught:exception', (err, runnable) => {
			if (err.message.includes('This word is already in your dictionary'))
				return false
		})

		cy.get('#dictionary-list')
			.children('tr')
			.should(($divs) => {
				expect($divs.length).to.eq(1)
			})

		//cy.url().should('include', 'courses')
	})
})

export {}

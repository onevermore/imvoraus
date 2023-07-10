declare global {
	namespace Cypress {
		interface Chainable {
			login(email: string, pass: string): Chainable<Element>
		}
	}
}

export {}

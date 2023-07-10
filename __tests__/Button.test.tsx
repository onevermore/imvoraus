import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from '@/components/ui/form-elements/Button'

describe('Button component render', () => {
	it('should render the button with the provided text', () => {
		const buttonText = 'Click me'
		render(<Button> {buttonText}</Button>)

		expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument()
	})

	it('should invoke the provided onClick function when clicked', () => {
		const onClickMock = jest.fn()
		render(<Button onClick={onClickMock}>Button</Button>)

		const buttonElement = screen.getByRole('button')

		fireEvent.click(buttonElement)

		expect(onClickMock).toHaveBeenCalledTimes(1)
	})

	it('should apply the specified className', () => {
		const myClassName = 'custom-button'
		render(<Button className={myClassName}>Button</Button>)

		const buttonElement = screen.getByRole('button')

		expect(buttonElement).toHaveClass(myClassName)
	})
	/*	it('should have specific color when "rose" prop is true', () => {
		render(<Button rose>Button</Button>)

		const buttonElement = screen.getByRole('button')

		const computedStyles = window.getComputedStyle(buttonElement)
		expect(computedStyles.backgroundColor).toBe('rgb(218, 135, 135)')
	})*/
})

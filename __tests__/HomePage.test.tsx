import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import HomePage from '../pages'

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}))

describe('Home Page - Rendering', () => {
	it('should have text Learn German with us!', () => {
		;(useRouter as jest.Mock).mockReturnValue({ query: {} })
		render(<HomePage />)

		expect(screen.getByText('Learn German with us!')).toBeInTheDocument()
	})
})

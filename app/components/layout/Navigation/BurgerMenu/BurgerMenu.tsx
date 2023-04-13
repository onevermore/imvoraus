import Link from 'next/link'
import { FC, useState } from 'react'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import { firstMenu } from '../MenuContainer/menu.data'

import s from './BurgerMenu.module.scss'

export const BurgerMenu: FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const onClickOutside = () => {
		setIsOpen(false)
	}

	const ref = useOutsideClick(onClickOutside)

	return (
		<div className=" xl:hidden flex items-center justify-between  max-w-full px-[8%] flex-wrap w-full">
			<div
				ref={ref}
				className="space-y-2 cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
			>
				<svg
					width="31"
					height="21"
					viewBox="0 0 31 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3.6969 3.96618C8.86842 3.96618 13.8851 2.94859 18.9608 2.94859C20.9796 2.94859 22.4956 1.931 24.5575 1.931C27.0065 1.931 27.0474 3.26974 29.1367 3.96618"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M2.67929 11.0893C10.1858 11.0893 22.625 8.85108 29.1367 12.1069"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
					/>
					<path
						d="M1.66171 19.2301C5.72663 19.2301 11.4484 18.1739 15.3427 19.2866C19.6417 20.5149 22.9771 19.2301 27.1015 19.2301"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</div>

			<nav
				className={`${
					isOpen ? 'block w-full lg:flex lg:items-center lg:w-auto' : 'hidden'
				}  `}
			>
				<ul className="text-base text-gray-700 ">
					{firstMenu.items.map((item, i) => (
						<li key={i} className="uppercase">
							<Link href={item.link}>
								<a className=" py-2 pt-4 block hover:text-gray-500">
									{item.title}
								</a>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}

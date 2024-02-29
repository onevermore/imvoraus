import cn from 'classnames'

export const Section = ({
	children,
	bg,
}: {
	children?: React.ReactNode
	bg?: string
}) => {
	return <div className={cn('lg:py-12', bg)}>{children}</div>
}

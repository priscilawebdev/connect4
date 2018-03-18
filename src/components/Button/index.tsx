import React from 'react'
import { bm } from 'utils/bem'

interface IButtonProps {
	type?: string
	label: string
	fullWidth?: boolean
	primary?: boolean
	center?: boolean
	className?: string[]
	// React.FormEvent<HtmlInputElement> does not exit in preact :/
	onClick: (event: any) => void
}

const Button = ({
	type = 'text',
	label,
	onClick,
	fullWidth,
	primary,
	center,
	className = []
}: IButtonProps) => (
	<button
		className={bm('Button', { primary, center, fullWidth }, className)}
		type={type}
		onClick={onClick}
	>
		{label}
	</button>
)

export default Button

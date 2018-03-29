import React from 'react'
import { bm } from 'utils/bem'

interface IButtonProps {
	type?: string
	label: string
	fullWidth?: boolean
	primary?: boolean
	center?: boolean
	className?: string[]
	onClick: (event: React.FormEvent<HTMLButtonElement>) => void
}

const Button = ({
	type = 'text',
	fullWidth = false,
	primary = false,
	center = false,
  label,
  onClick,
  className = [],
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

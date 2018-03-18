import React from 'react'
import { bm } from 'utils/bem'

interface ILabelProps {
	label: string
	inlineBlock?: boolean
	required?: boolean
  uppercase?: boolean
  bold?: boolean
	className?: string[]
}

const Label = ({
	label,
	inlineBlock,
	required,
  uppercase,
  bold,
	className = []
}: ILabelProps) => (
	<div className={bm('Label', { inlineBlock, required, uppercase, bold }, className)}>
		{label}
	</div>
)

export default Label

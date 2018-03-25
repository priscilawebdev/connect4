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
	inlineBlock = false,
	required = false,
  uppercase = false,
  bold = false,
	className = [],
  label
}: ILabelProps) => (
	<div className={bm('Label', { inlineBlock, required, uppercase, bold }, className)}>
		{label}
	</div>
)

export default Label

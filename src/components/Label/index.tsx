import { h } from 'preact'
import { bm } from 'utils/bem'

interface ILabelProps {
	label: string
	inlineBlock?: boolean
	required?: boolean
	className?: string[]
}

const Label = ({
	label,
	inlineBlock,
	required,
	className = []
}: ILabelProps) => (
	<div className={bm('Label', { inlineBlock, required }, className)}>
		{label}
	</div>
)

export default Label

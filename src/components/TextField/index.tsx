import { h } from 'preact'
import { be, bm } from 'utils/bem'

interface ITextFieldProps {
	type?: string
	name: string
	value: string
	fullWidth?: boolean
	placeholder?: string
	onChange: (event: any) => void
	onKeyPress?: (event: any) => void
}

const TextField = ({
	type = 'text',
	name,
	onChange,
	onKeyPress,
	fullWidth,
	placeholder
}: ITextFieldProps) => (
	<div className={bm('TextField', { fullWidth })}>
		<input
			className={be('TextField', 'input')}
			type={type}
			name={name}
			onChange={onChange}
			onKeyPress={onKeyPress}
			placeholder={placeholder}
		/>
	</div>
)

export default TextField

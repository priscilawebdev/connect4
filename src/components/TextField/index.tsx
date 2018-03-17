import * as React from 'react'
import { be, bm } from 'utils/bem'

interface ITextFieldProps {
	type?: string
	name: string
	value: string
	fullWidth?: boolean
	placeholder?: string
  error: string
	onChange: (event: React.FormEvent<HTMLInputElement>) => void
	onKeyPress?: (event: React.FormEvent<HTMLInputElement>) => void
}

const TextField = ({
	type = 'text',
	name,
	onChange,
  value,
	onKeyPress,
	fullWidth,
	placeholder,
  error = ''
}: ITextFieldProps) => (
	<div className={bm('TextField', { fullWidth, error: error.trim().length > 0 })}>
		<input
			className={be('TextField', 'input')}
			type={type}
			name={name}
      value={value}
      onChange={onChange}
			onKeyPress={onKeyPress}
			placeholder={placeholder}
		/>
    {error && (
      <div className={be('TextField', 'error')}>
        {error}
      </div>
    )}
	</div>
)

export default TextField

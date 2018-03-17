import Button from 'components/Button'
import TextField from 'components/TextField'
import { Component, h } from 'preact'

interface IHomeState {
	userName: string
}

export class Home extends Component<{}, IHomeState> {
	public state: IHomeState = {
		userName: ''
	}

	public handleChangeName = (event: any) => {
		this.setState({ userName: event.target.value })
	}

	public handleKeyPress = (event: any) => {
		console.log(event)
	}

	public render() {
		const { userName } = this.state
		return (
			<div className='Home'>
				<h1 className='Home__title'>{'Connect 4'}</h1>
				<div class='Home__content'>
					<TextField
						name='userName'
						placeholder='Name'
						onChange={this.handleChangeName}
						onKeyPress={this.handleKeyPress}
						value={userName}
						fullWidth
					/>
					<Button
						label='Start'
						onClick={() => console.log('wait...')}
						primary
					/>
				</div>
			</div>
		)
	}
}

export default Home

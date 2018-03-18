import * as React from 'react'
import Button from 'components/Button'
import Label from 'components/Label'
import TextField from 'components/TextField'

interface IWelcomeProps {
  onStartGame: (name: string) => void
}

export interface IWelcomeState {
  valid: boolean,
  fields: {
    name: string
  },
  errors: {
    name: string
  }
}

class Welcome extends React.Component<IWelcomeProps, IWelcomeState> {
  state: IWelcomeState = {
    valid: false,
    fields: {
      name: ''
    },
    errors: {
      name: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: event.target.value
      }
    }, () => this.validate('name'))
  }

  handleKeyPress = event => {
    if (event.key.name === 'Enter') {
      this.handleStartGame()
    }
  }

  validate = (name?: string) => {
    const { fields, errors } = this.state
    const newErros = errors
    const requiredFields = ['name']
    if (name) {
      requiredFields.forEach((field) => {
        newErros[field] = !fields[field] && field === name ? 'Field is required' : ''
      })
    } else {
      requiredFields.forEach((field) => {
        newErros[field] = !fields[field] ? 'Field is required' : ''
      })
    }
    const isInvalid = Object.keys(newErros).some(field =>  newErros[field].trim().length > 0)

    this.setState({
      valid: !isInvalid,
      errors: {
        ...errors,
        ...newErros
      }
    })
  }

  handleStartGame = () => {
    const { onStartGame } = this.props
    const { fields: { name }, valid } = this.state
    valid ? onStartGame(name) : this.validate()
  }

  render() {
    const { errors, fields } = this.state
    return (
      <React.Fragment>
        <Label
          label='Name'
          className={['u-spacing5px']}
          required
        />
        <TextField
          name='name'
          placeholder='Enter your name...'
          onChange={this.handleChange('name')}
          onKeyPress={this.handleKeyPress}
          error={errors.name}
          value={fields.name}
          fullWidth
        />
        <Button
          label='Start Game'
          onClick={this.handleStartGame}
          className={['u-leading20px']}
          primary
          center
        />
      </React.Fragment>
    )
  }
}

export default Welcome

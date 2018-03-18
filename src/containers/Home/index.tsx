import React, { SFC } from 'react'
import { connect } from 'react-redux'
import { actions, IAuth } from 'ducks/auth'
import Welcome from '../Welcome'
import Game from '../Game'

interface IHomeProps {
  handleSetUserName: (name: string) => void,
  auth: IAuth
}

const Home: SFC<IHomeProps> = ({ auth: { name }, handleSetUserName }) => (
  <div className='Home'>
    <h1 className='Home__title'>
      Connect 4
    </h1>
    <div className='Home__content'>
      {!name ? (
        <Welcome onStartGame={handleSetUserName} />
      ): (
        <Game />
      )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  handleSetUserName: actions.setUserName
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

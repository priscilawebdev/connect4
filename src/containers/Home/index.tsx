import React, { SFC } from 'react'
import { connect } from 'react-redux'
import { actions as AuthActions, IAuth } from 'ducks/auth'
import { IGame } from 'ducks/game'
import Welcome from '../Welcome'
import Game from '../Game'

interface IHomeProps {
  handleSetUserName: (name: string) => void,
  auth: IAuth,
  game: IGame
}

const Home: SFC<IHomeProps> = ({ auth: { name }, handleSetUserName, game }) => (
  <div className='Home'>
    <h1 className='Home-title'>
      Connect 4
    </h1>
    <div className='Home-content'>
      {!name ? (
        <Welcome onStartGame={handleSetUserName} />
      ): (
        <Game game={game} />
      )}
    </div>
  </div>
)

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.game
})

const mapDispatchToProps = {
  handleSetUserName: AuthActions.setUserName
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

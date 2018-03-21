import React, { SFC } from 'react'
import { connect } from 'react-redux'
import { actions as AuthActions, IAuth } from 'ducks/auth'
import { actions as GameActions, IGame } from 'ducks/game'
import Welcome from '../Welcome'
import Game from '../Game'

interface IHomeProps {
  handleSetUserName: (name: string) => void,
  handleSetScore: (position: number) => void,
  auth: IAuth,
  game: IGame
}

const Home: SFC<IHomeProps> = ({ auth: { name }, handleSetUserName, game, handleSetScore }) => (
  <div className='Home'>
    <div className='Home-container'>
      <h1 className='Home-title'>
        Connect 4
      </h1>
      <div className='Home-content'>
        {!name ? (
          <Welcome onStartGame={handleSetUserName} />
        ): (
          <Game
            game={game}
            handleSetScore={handleSetScore}
          />
        )}
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  auth: state.auth,
  game: state.game
})

const mapDispatchToProps = {
  handleSetUserName: AuthActions.setUserName,
  handleSetScore: GameActions.setScore
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

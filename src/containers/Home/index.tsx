import React, { SFC } from 'react'
import { connect } from 'react-redux'
import { actions as AuthActions, IAuth } from 'ducks/auth'
import { actions as GameActions, IGame } from 'ducks/game'
import Welcome from '../Welcome'
import Game from '../Game'

interface IHomeProps {
  handleSetUserName: (name: string) => { type: string, name: string },
  handleSetScore: (col: number, row: number) => { type: string, position: { col: number, row: number } },
  handleResetGame: () => { type: string },
  auth: IAuth,
  game: IGame
}

const Home: SFC<IHomeProps> = ({ auth: { name }, handleSetUserName, game, handleSetScore, handleResetGame }) => (
  <div className='Home'>
    <div className='Home-container'>
      <h1 className='Home-title'>
        Connect 4
      </h1>
      <div className='Home-content'>
        {!name ? (
          <Welcome onStartGame={handleSetUserName} />
        ): (
          <Game game={game} onSetScore={handleSetScore} onResetGame={handleResetGame} />
        )}
      </div>
    </div>
  </div>
)

const mapStateToProps = (state: { auth: IAuth, game: IGame }) => ({
  auth: state.auth,
  game: state.game
})

const mapDispatchToProps = {
  handleSetUserName: AuthActions.setUserName,
  handleSetScore: GameActions.setScore,
  handleResetGame: GameActions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

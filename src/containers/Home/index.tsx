import React, { SFC } from 'react'
import { connect } from 'react-redux'
import { actions as AuthActions, IAuth } from 'ducks/auth'
import { actions as GameActions, IGame, TStatus } from 'ducks/game'
import Welcome from '../Welcome'
import Game from '../Game'

interface IHomeProps {
  handleSetUserName: (name: string) => { type: string, name: string }
  handleSetScore: (row: number, col: number) => { type: string, move: { col: number, row: number } }
  handleSetStatus: (status: TStatus) => { type: string, status: TStatus },
  handleResetGame: () => { type: string }
  auth: IAuth
  game: IGame
}

const Home: SFC<IHomeProps> = ({
  auth: { name },
  game,
  handleSetUserName,
  handleSetStatus,
  handleSetScore,
  handleResetGame
}) => (
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
            onSetScore={handleSetScore}
            onResetGame={handleResetGame}
            onSetStatus={handleSetStatus}
          />
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
  handleResetGame: GameActions.reset,
  handleSetStatus: GameActions.setStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

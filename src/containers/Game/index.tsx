import React from 'react'
import Circle from 'components/Circle'

import { IGame } from 'ducks/game'

interface IGameProps {
  game: IGame
}

class Game extends React.Component<IGameProps, {}> {
  render() {
    const { game: { matrix, userCurrentPlayer } } = this.props
    return (
      <div className='Game'>
        <div className='Game-header'>
         <div className='Game-info'>
           <span>{`${userCurrentPlayer ? 'Your' : 'Computer'} `}</span>
           Turn
         </div>
        </div>
        <div className='Game-content'>
          {matrix.map((item, index) => (
            <Circle key={index} />
          ))}
        </div>
      </div>
    )
  }
}

export default Game

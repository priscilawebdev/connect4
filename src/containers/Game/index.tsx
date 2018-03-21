import React from 'react'
import Circle from 'components/Circle'

import { IGame } from 'ducks/game'

interface IGameProps {
  game: IGame,
  handleSetScore: (position: number) => void
}

class Game extends React.Component<IGameProps, null> {
  render() {
    const { game: { matrix, userCurrentPlayer }, handleSetScore } = this.props
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
            <Circle
              key={index}
              onClick={() => handleSetScore(index)}
              primary={item === 1}
              secondary={item === 0}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Game

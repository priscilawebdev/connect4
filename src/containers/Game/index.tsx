import React, { Component } from 'react'
import Cell from 'components/Cell'
import Col from 'components/Col'
import Button from 'components/Button'
import { IGame } from 'ducks/game'

interface IGameProps {
  game: IGame,
  onSetScore: (col: number, row: number) => { type: string, position: { col: number, row: number } },
  onResetGame: (event: React.FormEvent<HTMLButtonElement>) => { type: string }
}

class Game extends Component<IGameProps, {}> {
  render() {
    const { game: { matrix, userCurrentPlayer }, onSetScore, onResetGame } = this.props
    return (
      <div className='Game'>
        <div className='Game-heading'>
         <div className='Game-info'>
           <span>{`${userCurrentPlayer ? 'Your' : 'Computer'} `}</span>
           Turn
         </div>
        </div>
        <div className='Game-content'>
          {matrix.map((row, rowIndex) => (
            <Col key={rowIndex}>
              {row.map((cell, celIndex) => (
                celIndex === 0 ? (
                  <Cell
                    key={celIndex}
                    col={rowIndex}
                    primary={!userCurrentPlayer}
                    secondary={userCurrentPlayer}
                    disabled={matrix[rowIndex][1] !== 0}
                    matrix={matrix}
                    onClick={onSetScore}
                    heading
                  />
                ) : (
                  <Cell
                    key={celIndex}
                    col={rowIndex}
                    disabled={matrix[rowIndex][celIndex] !== 0}
                    primary={matrix[rowIndex][celIndex] === 1}
                    secondary={matrix[rowIndex][celIndex] === 2}
                    onClick={onSetScore}
                    matrix={matrix}
                  />
                )
              ))}
            </Col>
          ))}
        </div>
        <div className='Game-footer'>
          <Button label='Reset Game' onClick={onResetGame} primary />
        </div>
      </div>
    )
  }
}

export default Game

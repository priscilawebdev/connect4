import React, { Component } from 'react'
import Cell from 'components/Cell'
import Col from 'components/Col'
import Button from 'components/Button'
import { IGame, TStatus } from 'ducks/game'
import SoundDrop from './sounds/drop.mp3'
import SoundOver from './sounds/game-over.mp3'
import SoundWinner from './sounds/winner.mp3'

interface IGameProps {
  game: IGame
  onSetScore: (row: number, col: number) => { type: string, move: { col: number, row: number } }
  onSetStatus: (status: TStatus) => { type: string, status: TStatus }
  onResetGame: () => { type: string }
}

interface IGameState {
  heading: number[]
}

interface ICheck {
  matrix: number [][]
  row: number
  col: number
  player: number
}

const initialState = (props: IGameProps) => {
  const { game: { matrix }} = props
  const newMatrix = JSON.parse(JSON.stringify(matrix))
  return { heading: newMatrix[0].fill(4) }
}

class Game extends Component<IGameProps, IGameState> {
  dropSound: HTMLAudioElement
  gameOver: HTMLAudioElement
  gameHasWinner: HTMLAudioElement

  constructor(props: IGameProps) {
    super(props)
    this.state = initialState(props)
    this.dropSound = new Audio(SoundDrop)
    this.gameOver = new Audio(SoundOver)
    this.gameHasWinner = new Audio(SoundWinner)
  }

  handleDrop = (col: number) => () => {
   const { onSetStatus, onSetScore } = this.props
   const row = this.getRow(col)

   return (async () => {
      await onSetStatus('thinking')
      const status = await this.checkForWin(row, col)
      await this.dropCircle(row, col)
      await this.resetState()
      await onSetScore(row, col)
      await onSetStatus(status as TStatus)
    })()
  }

  handleReset = () => {
    const { onResetGame } = this.props
    this.gameOver.pause()
    this.gameOver.currentTime = 0
    onResetGame()
  }

  dropCircle = (row: number, col: number) => {
    const { heading } = this.state
    const headingClone = JSON.parse(JSON.stringify(heading))
    headingClone[col] = ((row + 1) * 60) + 14
    return new Promise(resolve => (
      this.setState(
        { heading: headingClone },
        () =>
          this.dropSound.play()
            .then(() => resolve())
      )
    ))
  }

  resetState = () => (
    new Promise(resolve => (
      setTimeout(() => {
        this.setState(initialState(this.props), () => resolve())
      }, 400)
    ))
  )

  checkForWin = (row: number, col: number) => {
    const { game: { matrix, player }} = this.props

    const tempMatrix = JSON.parse(JSON.stringify(matrix))
    tempMatrix[row][col] = player

    const check: ICheck = { matrix: tempMatrix, row, col, player }

    return new Promise(resolve => {
      if (this.checkHorizontal(check) || this.checkVertical(check) ||
        this.checkBackSlash(check) || this.checkForwardSlash(check)) {
        this.gameOver.play()
        resolve('winner')
      } else if (this.checkDraw(check)) {
        this.gameHasWinner.play()
        resolve('draw')
      } else {
        resolve('running')
      }
    })
  }

  checkHorizontal = ({ matrix, row, player }: ICheck): boolean => {
    let result = false
    let col = 0

    while (col <= 3) {
      const winner = this.getWinner(
        matrix, [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]], player
      )
      if (winner) {
        result = true
        break
      }
      col++
    }

    return result
  }

  checkVertical = ({ matrix, col, player }: ICheck): boolean => {
    let result = false
    let row = 5

    while (row > 2) {
      const winner = this.getWinner(
        matrix, [[row, col], [row - 1, col], [row - 2, col], [row - 3, col]], player
      )
      if (winner) {
        result = true
        break
      }
      row--
    }

    return result
  }

  checkForwardSlash = ({ matrix, player, row, col }: ICheck): boolean => {
    let result = false

    if (row + col <= 5) {
      let x = 0
      let y = col + row
      while (y >= 3) {
        const winner = this.getWinner(
          matrix, [[x, y], [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]], player
        )
        if (winner) {
          result = true
          break
        }
        y--
        x++
      }
    } else {
      let x = (col + row) - 6
      let y = 6
      while (x <= 2) {
        const winner = this.getWinner(
          matrix, [[x, y], [x + 1, y - 1], [x + 2, y - 2], [x + 3, y - 3]], player
        )
        if (winner) {
          result = true
          break
        }
        y--
        x++
      }
    }

    return result
  }

  checkBackSlash = ({ matrix, player, row, col }: ICheck): boolean => {
    let result = false

    if (col <= 5) {
      let x = row - col
      let y = 0
      while (x <= 2) {
        const winner = this.getWinner(
          matrix, [[x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]], player
        )
        if (winner) {
          result = true
          break
        }
        y++
        x++
      }
    } else {
      let x = 0
      let y = col - row
      while (y <= 3) {
        const winner = this.getWinner(
          matrix, [[x, y], [x + 1, y + 1], [x + 2, y + 2], [x + 3, y + 3]], player
        )
        if (winner) {
          result = true
          break
        }
        y++
        x++
      }
    }

    return result
  }

  checkDraw = ({ matrix }: ICheck): boolean => {
    let result
    result =  matrix.reduce((accCol, row) =>
      accCol + row.reduce((accCell, cell) => {
        if (cell !== 0) { accCell++ }
        return accCell
      }, 0)
      , 0)
    return result === matrix.length * matrix[0].length
  }

  getWinner = (matrix: number[][], positions: number[][], player: number) =>
    positions.every(position => matrix[position[0]][position[1]] === player)

  getRow = (col: number) => {
    const { game: { matrix } } = this.props
    let row = matrix.length - 1
    while (matrix[row][col]) {
      row--
    }
    return row
  }

  getInfo = () => {
    const { game: { player, status } } = this.props
    const currentPlayer = (player === 2) ? 'You' : 'The Computer'
    let result: string | React.ReactElement<any> = (
      <React.Fragment>
        {currentPlayer}<span>{' Turn'}</span>{'!'}
      </React.Fragment>
    )
    switch (status) {
      case 'winner':
        result = (
          <React.Fragment>
            {currentPlayer}<span>{' Won'}</span>{'!'}
          </React.Fragment>
        )
        break
      case 'draw':
        result = 'Draw!'
        break
    }

    return result
  }

  render() {
    const { game: { matrix, player, status } } = this.props
    const { heading } = this.state
    return (
      <div className='Game'>
        <div className='Game-info'>
          {this.getInfo()}
        </div>
        <div className='Game-heading'>
          <div className='Game-subheading'>
            {heading.map((cell, cellIndex) => (
              <Col
                key={cellIndex}
                disabled={cell !== 4 || status !== 'running'}
                onClick={this.handleDrop(cellIndex)}
              >
                <Cell
                  primary={player === 1}
                  secondary={player === 2}
                  drop={cell !== 4}
                  top={cell}
                  heading
                />
              </Col>
            ))}
          </div>
        </div>
        <div className='Game-content'>
          {matrix.map((row, rowIndex) => (
            <Col key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Cell
                  key={cellIndex}
                  primary={matrix[rowIndex][cellIndex] === 1}
                  secondary={matrix[rowIndex][cellIndex] === 2}
                />
              ))}
            </Col>
          ))}
        </div>
        <div className='Game-footer'>
          <Button label='Reset Game' onClick={this.handleReset} primary />
        </div>
      </div>
    )
  }
}

export default Game

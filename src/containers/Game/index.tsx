import React, { Component } from 'react'
import Cell from 'components/Cell'
import Col from 'components/Col'
import Button from 'components/Button'
import { IGame, TStatus } from 'ducks/game'

interface IGameProps {
  game: IGame
  onSetScore: (row: number, col: number, status: TStatus) => {
    type: string, move: { col: number, row: number, status: TStatus }
  }
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
  readonly numRows = 6
  readonly numCols = 7

  constructor(props: IGameProps) {
    super(props)
    this.state = initialState(props)
  }

  async handleDrop(col: number) {
    const { onSetScore } = this.props
    const row = this.getRow(col)
    const status = await this.checkForWin(row, col)
    await this.dropCircle(row, col)
    await this.resetState()
    onSetScore(row, col, status as TStatus)
  }

  dropCircle = (row: number, col: number) => {
    const { heading } = this.state
    const headingClone = JSON.parse(JSON.stringify(heading))
    headingClone[col] = ((row + 1) * 60) + 14
    return new Promise(resolve => (
      this.setState({
        heading: headingClone
      }, () => resolve())
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
        this.checkForwardSlash(check) || this.checkBackSlash(check)) {
        resolve('winner')
      } else if (this.checkDraw(check)) {
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

  checkForwardSlash = ({ matrix, player }: ICheck): boolean => {
    let row = this.numRows - 1
    let col = 0
    const minRowDiagonal = 3
    const maxColumnDiagonal = 3
    let result = false

    while (row >= minRowDiagonal) {
      while (col <= maxColumnDiagonal) {
        if (row - 3 >= 0 && col + 3 < this.numCols) {
          const winner = this.getWinner(
            matrix, [[row, col], [row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3]], player
          )
          if (winner) {
            result = true
            break
          }
        }
        col++
      }
      row--
      col = 0
    }
    return result
  }

  checkBackSlash = ({ matrix, player }: ICheck): boolean => {
    let row = 0
    let col = 0
    const maxRowDiagonal = 2
    const maxColumnDiagonal = 3
    let result = false

    while (row <= maxRowDiagonal) {
      while (col <= maxColumnDiagonal) {
        if (row + 3 < this.numRows && col + 3 < this.numCols) {
          const winner = this.getWinner(
            matrix, [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]], player
          )
          if (winner) {
            result = true
            break
          }
        }
        col++
      }
      row++
      col = 0
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
    const { game: { matrix, player, status }, onResetGame } = this.props
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
                disabled={cell !== 4 || status === 'winner'}
                onClick={() => this.handleDrop(cellIndex)}
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
          <Button label='Reset Game' onClick={onResetGame} primary />
        </div>
      </div>
    )
  }
}

export default Game

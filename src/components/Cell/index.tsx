import React, { Component } from 'react'
import { bm, be } from 'utils/bem'

interface ICellProps {
  primary?: boolean
  secondary?: boolean
  disabled?: boolean
  heading?: boolean
  col: number
  row: number
  onClick: (col: number, row: number) => void
  matrix: number[][]
}

interface ICellState {
  top: number
  drop: boolean
}

const initialState: ICellState = {
  top: 4,
  drop: false
}

class Cell extends Component<ICellProps, ICellState> {
  state = initialState

  getRow = () => {
    const { matrix, col } = this.props
    let row = matrix.length - 1
    while (matrix[col][row]) {
      row--
    }
    return row
  }

  reset = () => (
    new Promise((resolve) => {
      setTimeout(() => {
        this.setState(initialState, () => resolve())
      }, 330)
    })
  )

  handlerClick = () => {
    const { col, onClick } = this.props
    const cellIndex = this.getRow()
    this.setState({
      top: (cellIndex * 60) + 8,
      drop: true
    }, () => {
      this.reset().then(() => onClick(col, cellIndex))
    })
  }

  getMoves = () => {
    const { top } = this.state
    const moves = ['top4', 'top68', 'top128', 'top188', 'top248', 'top308', 'top368']
    const filteredMoves = moves.findIndex(move => move === `top${top}`)
    return { [moves[filteredMoves]]: true }
  }

  render() {
    const { primary = false, secondary = false, disabled = false, heading = false } = this.props
    const { drop } = this.state
    return (
      <div
        className={bm('Cell', { primary, secondary, disabled: drop || disabled, heading })}
        onClick={this.handlerClick}
      >
        {heading && (
          <div className={be('Cell', 'inner', { drop, ...this.getMoves() })} />
        )}
      </div>
    )
  }
}

export default Cell

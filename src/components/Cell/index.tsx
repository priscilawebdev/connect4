import React, { MouseEvent } from 'react'
import { bm, be } from 'utils/bem'

interface ICellProps {
  primary?: boolean
  secondary?: boolean
  heading?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  top?: number
  drop?: boolean
}

const getMoves = (top: number) => {
  const moves = ['top4', 'top74', 'top134', 'top194', 'top254', 'top314', 'top374']
  const filteredMoves = moves.findIndex(move => move === `top${top}`)
  return { [moves[filteredMoves]]: true }
}

const Cell = ({
  primary = false,
  secondary = false,
  heading = false,
  drop = false,
  top = 4,
  onClick
}: ICellProps) => (
  <div className={bm('Cell', { primary, secondary, heading, drop, ...getMoves(top) })} onClick={onClick}>
    {heading && (
      <div className={be('Cell', 'inner')} />
    )}
  </div>
)

export default Cell

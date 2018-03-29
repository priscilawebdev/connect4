import React from 'react'
import { bm } from 'utils/bem'

interface ICellProps {
  primary?: boolean
  secondary?: boolean
  onClick?: () => void
}

const Cell = ({
  primary = false,
  secondary = false,
  onClick
}: ICellProps) => <div className={bm('Cell', { primary, secondary })} onClick={onClick} />

export default Cell

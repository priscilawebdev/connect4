import React from 'react'
import { bm } from 'utils/bem'

interface ICellProps {
  primary?: boolean
  secondary?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Cell = ({
  primary = false,
  secondary = false,
  disabled = false,
  onClick
}: ICellProps) => <div className={bm('Cell', { primary, secondary, disabled })} onClick={onClick} />

export default Cell

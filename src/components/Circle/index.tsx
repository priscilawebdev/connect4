import React from 'react'
import { bm } from 'utils/bem'

interface ICircleProps {
  primary?: boolean
  secondary?: boolean
  onClick?: () => void
}

const Circle = ({
  primary = false,
  secondary = false,
  onClick
}: ICircleProps) => <div className={bm('Circle', { primary, secondary })} onClick={onClick} />

export default Circle

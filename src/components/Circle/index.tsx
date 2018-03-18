import React from 'react'
import { bm } from 'utils/bem'

interface ICircleProps {
  primary?: boolean
  secondary?: boolean
}

const Circle = ({
  primary,
  secondary
}: ICircleProps) => <div className={bm('Circle', { primary, secondary })} />

export default Circle

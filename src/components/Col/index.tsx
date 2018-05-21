import React, { ReactNode, MouseEvent } from 'react'
import { bm } from 'utils/bem'

interface IColProps {
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLElement>) => void
  disabled?: boolean
}

const Col = ({
  children,
  onClick,
  disabled = false
}: IColProps) => <div className={bm('Col', { disabled })} onClick={onClick}>{children}</div>

export default Col

import React, { ReactNode } from 'react'
import { bm } from 'utils/bem'

interface IColProps {
  children: ReactNode
}

const Col = ({
 children
}: IColProps) => <div className={bm('Col')}>{children}</div>

export default Col

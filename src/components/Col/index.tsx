import React from 'react'
import { bm } from 'utils/bem'

const Col = ({ children }: any) => (
  <div className={bm('Col')}>{children}</div>
)

export default Col

import React from 'react'
import { be, bm } from 'utils/bem'

const Layout = ({ children }) => (
  <div className={bm('Layout')}>
    <div className={be('Layout', 'container')}>
      {children}
    </div>
  </div>
)

export default Layout

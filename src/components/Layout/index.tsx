import React from 'react'
import { be, bm } from 'utils/bem'

interface ILayout {
  children: JSX.Element
}
const Layout = ({ children }: ILayout) => (
  <div className={bm('Layout')}>
    <div className={be('Layout', 'container')}>
      {children}
    </div>
  </div>
)

export default Layout

import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import 'utils/styles/index.sass'
import Home from './containers/Home'
import { store, persistor } from './store'

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={'loading...'} persistor={persistor}>
      <Home />
    </PersistGate>
  </Provider>
)

ReactDOM.render(<Main />, document.getElementById('root'))

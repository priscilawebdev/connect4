import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Spinner from 'components/Spinner'
import Layout from 'components/Layout'
import Home from 'containers/Home'
import 'utils/styles/index.sass'
import { store, persistor } from './store'

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <Layout>
        <Home />
      </Layout>
    </PersistGate>
  </Provider>
)

ReactDOM.render(<Main />, document.getElementById('root'))

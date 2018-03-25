import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'
import game from 'ducks/game'
import auth from 'ducks/auth'

const config = { key: 'root', storage }
const reducer = persistCombineReducers(config, { auth, game })

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    (window as any)['devToolsExtension'] ? (window as any)['devToolsExtension']() : (f: any) => f
  )
)

const persistor = persistStore(store)

export {
  store,
  persistor
}

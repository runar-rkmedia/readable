import { createStore, compose, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from 'reducers/'
import * as storage from 'redux-storage'
import { SettingsActions } from 'actions'

import createEngine from 'redux-storage-engine-localstorage'
import filter from 'redux-storage-decorator-filter'
const Ngin = createEngine('my-save-key')
const engine = filter(Ngin, ['settings'])

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createHistory()

const routerMW = routerMiddleware(history)
const storageMW = storage.createMiddleware(engine, [], [
  SettingsActions.SETAUTHOR,
  SettingsActions.SETSORTBY,
  SettingsActions.SETSORTORDER,
])

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, storageMW, routerMW))
)
const load = storage.createLoader(engine)
load(store)

import { createStore, compose, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from '../reducers/'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const history = createHistory()

const middleware = routerMiddleware(history)

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, middleware))
)

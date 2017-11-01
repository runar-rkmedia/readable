import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App'
import {
  createStore,
  // applyMiddleware,
  compose,
  // Store,
  // Middleware
} from 'redux'
import reducer from './reducers/Reducer'
import { Provider } from 'react-redux'
import './style/index.css'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(
  reducer,
  composeEnhancers()
)

export default store

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root') as HTMLElement
)

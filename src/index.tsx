import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './containers/App'
import { Provider } from 'react-redux'
import { store, history } from './store/store'
import './style/index.css'

export default store

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
)

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './style/index.css'

export default store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
)

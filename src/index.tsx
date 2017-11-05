import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { MuiThemeProvider } from 'material-ui/styles'
import { myTheme } from './style/base'

export default store

ReactDOM.render(
  <MuiThemeProvider theme={myTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('root') as HTMLElement
)

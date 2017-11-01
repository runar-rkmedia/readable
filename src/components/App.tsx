import * as React from 'react'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../store/mapper'
import { Catagories } from './Catagories'

import '../style/App.css'

class App extends React.Component {
  render() {
    console.log('App', this)
    return (
      <div className="App">
        <div className="App-header">
          <h2><Link to="/">Readable<small> – comments and posts</small></Link></h2>
        </div>
        <Route
          path="/"
          exact={true}
        >
          <Catagories
            list={(this.props as any).catagories}
          />
        </Route>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

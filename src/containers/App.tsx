import * as React from 'react'
import { connect } from 'react-redux'
import MainContent from './MainContent'
import { fetchCategories } from '../actions/categories'
import { CategoryInterface } from '../components/CategoryList'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
import { Dispatch } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '../store/store'

import styles from '../style/base'

class App extends React.Component<{
  category: CategoryInterface | null
} & AppDispatchProps & any> {
  state = {
    mobileOpen: false,
  }
  componentDidMount() {
    this.props.fetchCategories()
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header handleDrawerToggle={this.handleDrawerToggle} />
          <LeftDrawer
            open={this.state.mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <ConnectedRouter history={history}>
            <MainContent />
          </ConnectedRouter>
        </div>
      </div>
    )
  }
}

export interface AppDispatchProps {
  fetchCategories: () => void
}

export function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>): AppDispatchProps {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(null, mapDispatchToProps)(withStyles((styles as any), { withTheme: true })(App))

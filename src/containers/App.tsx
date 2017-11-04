import * as React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { RouterState } from 'react-router-redux'
import Category from '../components/CategoryHeader'
import { fetchCategories } from '../actions/categories'
import { CategoryInterface } from '../components/CategoryList'
import { StoreCategories } from '../reducers/Categories'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
import { Dispatch } from 'react-redux'
import { withStyles } from 'material-ui/styles'

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
          <main className={classes.content}>
            <Route
              path="/category/"
              component={Category}
            />
          </main>
        </div>
      </div>
    )
  }
}

export interface AppDispatchProps {
  fetchCategories: () => void
}
const mapStateToProps = (
  { categories, router }: {
    categories: StoreCategories
    router: RouterState
  }
) => {
  return {
    category: null,
    router: router
  }
}

export function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>): AppDispatchProps {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles((styles as any), { withTheme: true })(App))

import * as React from 'react'
import { connect } from 'react-redux'
import MainContent from './MainContent'
import { fetchCategories } from '../actions/categories'
import { CategoryI, StoreStateI } from '../interfaces'
import Header from '../components/Header'
import LeftDrawer from '../components/LeftDrawer'
import { Dispatch } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '../store/store'

import { withMyStyle, WithMyStyle } from '../style/base'

class App extends React.Component<{
  category: CategoryI | null
} & AppDispatchProps & WithMyStyle & PropsMappedI> {
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
            loading={this.props.loading}
          />
          <ConnectedRouter history={history}>
            <MainContent />
          </ConnectedRouter>
        </div>
      </div>
    )
  }
}
interface PropsMappedI {
  loading: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { categories } = state
  return {
    loading: categories.loading,
    ...ownprops
  }
}

interface AppDispatchProps {
  fetchCategories: () => void
}

function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    ...ownprops
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withMyStyle(App))

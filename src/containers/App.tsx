import * as React from 'react'
import { connect } from 'react-redux'
import { MainContent } from './'
import { fetchCategories, categoriesHasError as removeCategoriesError } from '../actions/'
import { postsHasError as removePostError } from '../actions/posts'
import { CategoryI, StoreStateI } from '../interfaces'
import { Header, SnackBar, LeftDrawer } from '../components/'
import { Dispatch } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { history } from '../store/store'
import decorate, { WithStyles } from '../style'

interface Props {
  category: CategoryI | null
}

type app = Props & AppDispatchProps & PropsMappedI & WithStyles

const AppC = decorate(
  class extends React.Component<app> {
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
      const { loading, categoriesHasError, categoriesErrorMsg, postsHasError, postsErrorMsg, classes } = this.props
      return (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <Header handleDrawerToggle={this.handleDrawerToggle} />
            <LeftDrawer
              open={this.state.mobileOpen}
              handleDrawerToggle={this.handleDrawerToggle}
              loading={loading}
            />
            <ConnectedRouter history={history}>
              <MainContent />
            </ConnectedRouter>
            <SnackBar
              open={categoriesHasError}
              message={categoriesErrorMsg}
              onClose={this.props.closeCategoriesErrorMessage}
            />
            <SnackBar
              open={postsHasError}
              message={postsErrorMsg}
              onClose={this.props.closePostErrorMessage}
            />
          </div>
          <footer>This is a footer</footer>
        </div>
      )
    }
  })
interface PropsMappedI {
  loading: boolean
  categoriesHasError: boolean,
  categoriesErrorMsg: string,
  postsHasError: boolean,
  postsErrorMsg: string,
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { categories, posts } = state
  return {
    loading: categories.loading,
    categoriesHasError: categories.hasError,
    categoriesErrorMsg: categories.error,
    postsHasError: posts.hasError,
    postsErrorMsg: posts.error,
    ...ownprops
  }
}

interface AppDispatchProps {
  fetchCategories: () => void
  closePostErrorMessage: () => void
  closeCategoriesErrorMessage: () => void
}

function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    closePostErrorMessage: () => dispatch(removePostError(false)),
    closeCategoriesErrorMessage: () => dispatch(removeCategoriesError(false)),
    ...ownprops
  }
}
export const App = connect(mapStateToProps, mapDispatchToProps)(AppC)

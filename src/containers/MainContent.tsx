import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import { RouterState } from 'react-router-redux'
import CategoryHeader from '../components/CategoryHeader'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { mapCatagory } from '../store/mapper'
import { CategoriesState } from '../reducers/Categories'
import FrontPage from './FrontPage'

import styles from '../style/base'

export class SidebarContent extends React.Component<{
  onSetOpen: (open: boolean) => void
} & any> {
  render() {
    const { classes, category } = this.props
    return (
      <main className={classes.content}>
        <Route
          path="/category/"
          render={() => (
            <CategoryHeader category={category}/>
          )}
        />
        <Route
          exact={true}
          path="/"
          render={() => (
            <FrontPage/>
          )}
        />
      </main>
    )
  }
}
const mapStateToProps = (
  { categories, router }: {
    categories: CategoriesState
    router: RouterState
  }
) => {
  return {
    category: mapCatagory(categories.selectedCatagory, categories.items),
    router: router
  }
}
export default connect(mapStateToProps)(withStyles((styles as any), { withTheme: true })(SidebarContent))

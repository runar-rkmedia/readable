import * as React from 'react'
import { RouterState } from 'react-router-redux'
import CategoryHeader from '../components/CategoryHeader'
import { CategoryInterface } from '../components/CategoryList'
import PostList, { PostInterface } from '../components/PostList'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { mapCatagory } from '../store/mapper'
// import { CategoriesState } from '../reducers/Categories'
import { StoreState } from '../reducers'
import { fetchPosts } from '../actions/posts'
import { Dispatch } from 'react-redux'
import FrontPage from './FrontPage'
import { withMyStyle, WithMyStyle } from '../style/base'

interface SidebarContentProps {
  onSetOpen: (open: boolean) => void
  classes: any
}

export class SidebarContent extends React.Component<SidebarMappedProps & DispatchProps & WithMyStyle, DispatchProps> {
  componentDidMount() {
    this.retrievePosts()
  }
  componentWillReceiveProps(nextProps: SidebarMappedProps) {
    const newCategoryPath = nextProps.category.path
    if (this.props.category.path !== newCategoryPath) {
      this.retrievePosts(nextProps)
    }
  }
  retrievePosts = (nextProps?: SidebarMappedProps) => {
    const { category } = nextProps || this.props
    this.props.fetchPosts(category.path)
  }

  render() {
    const { classes, category, posts } = this.props
    return (
      <main className={classes.content}>
        <Route
          path="/category/"
          render={() => (
            <div>
              <CategoryHeader category={category} type="header"/>
              <PostList
                posts={posts.filter(
                  post => post.category === category.id)
                }
              />
            </div>
          )}
        />
        <Route
          exact={true}
          path="/"
          render={() => (
            <div>
              <FrontPage />
              <PostList
                showCategory={true}
                posts={posts}
              />
            </div>
          )}
        />
      </main>
    )
  }
}
interface SidebarMappedProps extends SidebarContentProps {
  router: RouterState
  posts: PostInterface[]
  category: CategoryInterface
}
const mapStateToProps = (state: StoreState, ownprops: any) => {
  const { categories, router, posts } = state
  return {
    posts: Object.keys(posts.items).map(key => posts.items[key]),
    category: mapCatagory(categories.selectedCatagory, categories.items),
    router: router,
    ...ownprops
  }
}
// export default connect(mapStateToProps)(withStyles((styles as any), { withTheme: true })(SidebarContent))

interface DispatchProps {
  fetchPosts: (category?: string) => void
}

function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ): DispatchProps {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(withMyStyle(SidebarContent))

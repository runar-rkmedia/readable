import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { RouterState, push } from 'react-router-redux'
import CategoryHeader from '../components/CategoryHeader'
import { CategoryInterface } from '../components/CategoryList'
import PostList, { PostInterface } from '../components/PostList'
import PostForm from '../components/PostForm'
import { mapCatagory } from '../store/mapper'
import { StoreState } from '../reducers'
import { fetchPosts, addPost } from '../actions/posts'
import FrontPage from './FrontPage'
import { withMyStyle, WithMyStyle } from '../style/base'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Typography from 'material-ui/Typography'
import { initializeNewPost } from '../utils/ReadableAPI'
import urls from '../utils/urls'

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
    const {
      classes, category, posts,
      goTo,
      postIsSending, categoriesAreloading
    } = this.props
    return (
      <main className={classes.content}>
        <Switch>
          <Route
            path="/category/:category/post/add"
            render={() => (
              <PostForm
                category={category}
                post={initializeNewPost(category.id)}
                onSubmit={this.props.addPost}
                postIsSending={postIsSending}
              />
            )}

          />
          <Route
            path="/category/"
            render={() => (category.path ? (
              <div>
                <CategoryHeader category={category} type="header" />
                <Button
                  fab={true}
                  color="primary"
                  aria-label="add"
                  className={classes.button}
                  onClick={() => goTo(urls.addPost(category.id))}
                >
                  <AddIcon />
                </Button>
                <PostList
                  posts={posts.filter(
                    post => post.category === category.id)
                  }
                />
              </div>) : (
                !categoriesAreloading && (
                  <Typography color="error">Not a valid category</Typography>
                )
              )
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
        </Switch>
      </main>
    )
  }
}
interface SidebarMappedProps extends SidebarContentProps {
  router: RouterState
  posts: PostInterface[]
  category: CategoryInterface
  postIsSending: boolean
  postsAreLoading: boolean
  categoriesAreloading: boolean
}
const mapStateToProps = (state: StoreState, ownprops: any) => {
  const { categories, router, posts } = state
  return {
    posts: Object.keys(posts.items).map(key => posts.items[key]),
    category: mapCatagory(categories.selectedCatagory, categories.items),
    postIsSending: posts.sending,
    postsAreLoading: posts.loading,
    categoriesAreloading: categories.loading,
    router: router,
    ...ownprops
  }
}
// export default connect(mapStateToProps)(withStyles((styles as any), { withTheme: true })(SidebarContent))

interface DispatchProps {
  fetchPosts: (category?: string) => void,
  addPost: (post: PostInterface) => void,
  goTo: (path: string) => void,
}

function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ): DispatchProps {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    addPost: (post) => dispatch(addPost(post)),
    goTo: (path: string) => dispatch(push(path)),
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(withMyStyle(SidebarContent))

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { RouterState, push } from 'react-router-redux'
import { CategoryHeader, PostList } from '../components/'
import { PostForm, Post } from './'
import {
  CategoryI,
  StoreStateI,
  APIPostI
} from '../interfaces'
import { mapCatagory } from '../store/mapper'
import { fetchSinglePost, fetchPosts, addPost, PostActionType } from '../actions/'
import FrontPage from './FrontPage'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Typography from 'material-ui/Typography'
import { initializeNewPost } from '../utils/ReadableAPI'
import { urls } from '../utils'
import decorate, { WithStyles } from '../style'

interface Props {
  onSetOpen: (open: boolean) => void
}

type maincontent = SidebarMappedProps & DispatchProps & WithStyles

export const MainContentC = decorate(
  class extends React.Component<maincontent> {
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
      const { postID, postsHash, postsAreLoading } = this.props
      const { category } = nextProps || this.props
      // Fetch single post, but only if viewed directly, and post is not already downloaded.
      if (postID && (!postsAreLoading || !postsHash[postID])) {
        this.props.fetchSinglePost(postID)
      }
      this.props.fetchPosts(category.path)
    }
    checkCorrectPath = (renderThis: JSX.Element) => {
      if (!this.props.category.path) {
        return (
          !this.props.categoriesAreloading && (
            <Typography color="error">Not a valid category</Typography>
          ))
      }
      return renderThis
    }
    render() {
      const {
      classes, category, posts, selectedPost, goTo,
        addNewPost,
        postIsSending, loading,
    } = this.props
      return (
        <main className={classes.content}>
          <Route
            path="/category/"
            render={() => (
              <CategoryHeader category={category} type="header" />

            )}
          />
          <Switch>
            <Route
              path="/category/:category/post/add"
              render={() => this.checkCorrectPath(
                <div>
                  <Typography gutterBottom={true} type="headline" color="inherit" noWrap={true}>
                    New post in {category.name}
                  </Typography>
                  <PostForm
                    post={initializeNewPost(category.id)}
                    onSubmit={addNewPost}
                    postIsSending={postIsSending}
                  />
                </div>
              )

              }

            />
            <Route
              path="/category/:category/post/:postID"
              render={() =>
                selectedPost ? (
                  this.checkCorrectPath(
                    <Post post={selectedPost} />
                  )) : (loading ? (
                    <div>Finding your post....</div>
                  ) : (
                      <div>Post appears to not exist. It might have been deleted.</div>
                    ))
              }
            />
            )

          <Route
              path="/category/"
              render={() => (this.checkCorrectPath(
                <div>
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
                </div>
              ))}
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
  })
interface SidebarMappedProps extends Props {
  router: RouterState
  posts: APIPostI[]
  postsHash: { [s: string]: APIPostI }
  selectedPost: APIPostI
  postID: string
  category: CategoryI
  postIsSending: boolean
  postsAreLoading: boolean
  categoriesAreloading: boolean
  loading: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { categories, router, posts } = state
  return {
    posts: Object.keys(posts.items).map(key => posts.items[key]),
    postsHash: posts.items,
    category: mapCatagory(categories.selectedCatagory, categories.items),
    postID: posts.selectedPost,
    selectedPost: posts.items[posts.selectedPost],
    postIsSending: posts.sending,
    postsAreLoading: posts.loading,
    categoriesAreloading: categories.loading,
    loading: posts.sending || posts.loading || categories.loading,
    router: router,
    ...ownprops
  }
}
// export default connect(mapStateToProps)(withStyles((styles as any), {withTheme: true })(MainContent))

interface DispatchProps {
  fetchPosts: (category?: string) => Promise<PostActionType>,
  fetchSinglePost: (postID: string) => Promise<PostActionType>,
  addNewPost: (post: APIPostI) => void,
  goTo: (path: string) => void,
}

function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ): DispatchProps {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    fetchSinglePost: (postID) => dispatch(fetchSinglePost(postID)),
    addNewPost: (post) => dispatch(addPost(post)),
    goTo: (path: string) => dispatch(push(path)),
  }
}
export const MainContent = connect(
  mapStateToProps, mapDispatchToProps
)(MainContentC)

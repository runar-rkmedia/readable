import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { RouterState, push } from 'react-router-redux'
import { CategoryHeader, PostList, PostForm, PostView } from '../components/'
import {
  PostI,
  CategoryI,
  StoreStateI,
  APIPostI
} from '../interfaces'
import { mapCatagory } from '../store/mapper'
import { fetchSinglePost, fetchPosts, addPost, votePost, PostActionType } from '../actions/'
import FrontPage from './FrontPage'
import { withMyStyle, WithMyStyle } from '../style'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Typography from 'material-ui/Typography'
import { initializeNewPost } from '../utils/ReadableAPI'
import { urls } from '../utils'

interface MainContentProps {
  onSetOpen: (open: boolean) => void
  classes: any
}

export class MainContentC extends React.Component
  <SidebarMappedProps & DispatchProps & WithMyStyle & DispatchProps> {
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
      classes, category, posts, selectedPost,
      goTo, voteOnPost, addNewPost,
      postIsSending, loading, isVoting
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
              <PostForm
                category={category}
                post={initializeNewPost(category.id)}
                onSubmit={addNewPost}
                postIsSending={postIsSending}
              />
            )
            }

          />
          <Route
            path="/category/:category/post/:postID"
            render={() =>
              selectedPost ? (
                this.checkCorrectPath(
                  <PostView
                    post={selectedPost}
                    onVote={voteOnPost}
                    isVoting={isVoting}
                  />
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
interface SidebarMappedProps extends MainContentProps {
  router: RouterState
  posts: PostI[]
  postsHash: { [s: string]: APIPostI }
  selectedPost: PostI
  postID: string
  category: CategoryI
  postIsSending: boolean
  postsAreLoading: boolean
  categoriesAreloading: boolean
  loading: boolean
  isVoting: boolean
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
    isVoting: posts.isVoting,
    loading: posts.sending || posts.loading || categories.loading,
    router: router,
    ...ownprops
  }
}
// export default connect(mapStateToProps)(withStyles((styles as any), { withTheme: true })(MainContent))

interface DispatchProps {
  fetchPosts: (category?: string) => void,
  fetchSinglePost: (postID: string) => Promise<PostActionType>,
  addNewPost: (post: PostI) => void,
  voteOnPost: (post: PostI, isUpVote: boolean) => void,
  goTo: (path: string) => void,
}

function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ): DispatchProps {
  return {
    fetchPosts: (category) => dispatch(fetchPosts(category)),
    fetchSinglePost: (postID) => dispatch(fetchSinglePost(postID)),
    addNewPost: (post) => dispatch(addPost(post)),
    voteOnPost: (post, isUpVote) => dispatch(votePost(post, isUpVote)),
    goTo: (path: string) => dispatch(push(path)),
  }
}
export const MainContent = connect(
  mapStateToProps, mapDispatchToProps
)(withMyStyle(MainContentC))

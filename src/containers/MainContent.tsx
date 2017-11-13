import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { RouterState, push } from 'react-router-redux'
import { CategoryHeader } from 'components'
import { PostFormView, Post, SortablePostList } from './'
import {
  CategoryI,
  StoreStateI,
  APIPostI
} from 'interfaces'
import { mapCatagory } from 'store'
import { fetchSinglePost, fetchPosts, addPost, PostActionType } from 'actions'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import { initializeNewPost, urls } from 'utils'
import decorate, { WithStyles } from 'style'
//
interface Props {
  onSetOpen: (open: boolean) => void
}

type maincontent = SidebarMappedProps & DispatchProps & WithStyles

const FrontPage: CategoryI = {
  id: 'front',
  name: 'Readable',
  description: 'A Udacity assignment built with React.',
  path: '/',
  icon: '',
}

export const MainContentC = decorate(
  class extends React.Component<maincontent> {
    componentDidMount() {
      this.retrievePosts()
    }
    componentWillReceiveProps(nextProps: maincontent) {
      if (nextProps.router.location!.key !== this.props.router.location!.key) {
        this.retrievePosts(nextProps)
      }
    }
    retrievePosts = (nextProps?: maincontent) => {
      const { postID, postsHash, postsAreLoading, category } = nextProps || this.props
      if (!postsAreLoading || !postsHash[postID]) {
        if (postID) {
          this.props.fetchSinglePost(postID)
        } else {
          this.props.fetchPosts(category.path)
        }
      }

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
        loading,
    } = this.props
      return (
        <main className={classes.content}>
        {loading && <CircularProgress className={classes.pullRight}/>}
          <CategoryHeader
            category={category.id ? category : FrontPage}
            type="header"
          />
          <Switch>
            <Route
              path="/category/:category/post/add"
              render={() => this.checkCorrectPath(
                <div>
                  <Typography gutterBottom={true} type="headline" color="inherit" noWrap={true}>
                    New post in {category.name}
                  </Typography>
                  <PostFormView
                    post={{ ...initializeNewPost(category.id) }}
                  />
                </div>
              )
              }
            />
            <Route
              path="/category/:category/post/:postID/edit"
              render={() =>
                selectedPost ? (
                  this.checkCorrectPath(
                    <PostFormView post={selectedPost} edit={true} />
                  )) : (loading ? (
                    <div>Finding your post....</div>
                  ) : (
                      <div>Post appears to not exist. It might have been deleted.</div>
                    ))
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
                  {posts.length ? (
                    <SortablePostList posts={posts.filter(post => post.category === category.id)} />
                  ) : (
                      <Typography type="subheading">
                        There doesn't seem to be any posts in this category yet. Why don't you create one?
                    </Typography>
                    )}
                  <Button
                    fab={true}
                    color="primary"
                    aria-label="add"
                    className={classes.pullRight}
                    onClick={() => goTo(urls.addPost(category.id))}
                  >
                    <AddIcon />
                  </Button>
                </div>
              ))}
          />
            <Route
              exact={true}
              path="/"
              render={() => (
                  <SortablePostList {...{ posts }} />
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

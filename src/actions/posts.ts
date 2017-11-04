import { Dispatch } from 'react-redux'
import { PostInterface } from '../components/PostList'
import { PostAPI, APIPost } from '../utils/ReadableAPI'
import { StoreState } from '../reducers'

export const enum PostActions {
  FETCH = 'POST_FETCH',
  RECIEVE = 'POST_RECIEVE',
  RECIEVEONE = 'POST_RECIEVEONE',
  ERROR = 'POST_ERROR',
  LOADING = 'POST_LOADING',
}
export type PostActionType =
  { type: PostActions.FETCH } |
  { type: PostActions.RECIEVE, posts: APIPost[], previousPosts: any } |
  { type: PostActions.RECIEVEONE, post: APIPost } |
  { type: PostActions.ERROR, error: boolean } |
  { type: PostActions.LOADING, loading: boolean }

export const recievePosts = (posts: APIPost[], previousPosts: any): PostActionType => {
  return {
    type: PostActions.RECIEVE,
    posts,
    previousPosts

  }
}
export const postsHasError = (e: boolean): PostActionType => {
  return {
    type: PostActions.ERROR,
    error: e,
  }
}
export const postsAreLoading = (loading: boolean): PostActionType => {
  return {
    type: PostActions.LOADING,
    loading,
  }
}
export const fetchPosts = (categoryID?: string) => ((dispatch: Dispatch<PostInterface>, getState: any) => {
  dispatch(postsAreLoading(true))
  const state: StoreState = getState()
  return PostAPI.get(categoryID)
    .then(posts => dispatch(recievePosts(posts, state.posts.items)))
    .catch((e) => dispatch(postsHasError(true)))
}
)

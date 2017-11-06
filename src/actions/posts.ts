import { Dispatch } from 'react-redux'
import { PostI } from '../components/PostList'
import { APIPostI, APIPostSendNewI } from '../interfaces'
import { PostAPI } from '../utils/ReadableAPI'
import { StoreStateI } from '../reducers'

export const enum PostActions {
  FETCH = 'POST_FETCH',
  RECIEVE = 'POST_RECIEVE',
  RECIEVEAFTERSEND = 'POST_RECIEVEAFTERSEND',
  ERROR = 'POST_ERROR',
  LOADING = 'POST_LOADING',
  SENDING = 'POST_SENDING',
  ADD = 'POST_ADD',
}
export type PostActionType =
  { type: PostActions.FETCH } |
  { type: PostActions.RECIEVE, posts: APIPostI[], previousPosts: any } |
  { type: PostActions.RECIEVEAFTERSEND, post: APIPostI, previousPosts: any } |
  { type: PostActions.ERROR, error: boolean } |
  { type: PostActions.LOADING, loading: boolean } |
  { type: PostActions.SENDING, sending: boolean } |
  { type: PostActions.ADD, post: PostI }

export const recievePosts = (posts: APIPostI[], previousPosts: any): PostActionType => {
  return {
    type: PostActions.RECIEVE,
    posts,
    previousPosts
  }
}

export const recieveAfterSend = (post: APIPostI, previousPosts: any): PostActionType => {
  return {
    type: PostActions.RECIEVEAFTERSEND,
    post,
    previousPosts
  }
}

export const sendPost = (post: PostI): PostActionType => {
  return {
    type: PostActions.ADD,
    post
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
export const postIsSending = (sending: boolean): PostActionType => {
  return {
    type: PostActions.SENDING,
    sending,
  }
}
export const fetchPosts = (categoryID?: string) => ((dispatch: Dispatch<PostI>, getState: any) => {
  dispatch(postsAreLoading(true))
  const state: StoreStateI = getState()
  return PostAPI.get(categoryID)
    .then(posts => dispatch(recievePosts(posts, state.posts.items)))
    .catch((e) => dispatch(postsHasError(true)))
}
)
export const fetchSinglePost = (postID: string) => ((dispatch: Dispatch<PostI>, getState: any) => {
  dispatch(postsAreLoading(true))
  console.log('byid', postID)
  const state: StoreStateI = getState()
  return PostAPI.getByID(postID)
    .then(singlePost => dispatch(recievePosts(singlePost, state.posts.items)))
    .catch((e) => dispatch(postsHasError(true)))
}
)
export function verifyOkToSubmitPost(post: APIPostSendNewI) {
  const { author, title, body } = post
  if (!(author && title && body)) {
    return false
  }
  // Other checks should be put here. redux-form could be used.
  return true
}

export const addPost = (post: PostI) => ((dispatch: Dispatch<PostI>, getState: any) => {
  dispatch(postIsSending(true))
  const state: StoreStateI = getState()
  return PostAPI.add(post)
    .then(returnedPost => dispatch(recieveAfterSend(returnedPost, state.posts.items)))
    .catch((e) => dispatch(postsHasError(true)))
}
)

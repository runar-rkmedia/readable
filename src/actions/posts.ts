import { Dispatch } from 'react-redux'
import { PostI } from '../components/PostList'
import { APIPostI, APIPostSendNewI } from '../interfaces'
import { PostAPI } from '../utils/ReadableAPI'
import { StoreStateI } from '../reducers'
import urls from '../utils/urls'
import { push } from 'react-router-redux'

export const enum PostActions {
  FETCH = 'POST_FETCH',
  RECIEVE = 'POST_RECIEVE',
  RECIEVEAFTERSEND = 'POST_RECIEVEAFTERSEND',
  ERROR = 'POST_ERROR',
  LOADING = 'POST_LOADING',
  SENDING = 'POST_SENDING',
  VOTING = 'POST_VOTING',
  ADD = 'POST_ADD',
  VOTE = 'POST_VOTE',
}
export type PostActionType =
  { type: PostActions.FETCH } |
  { type: PostActions.RECIEVE, posts: APIPostI[], previousPosts: any } |
  { type: PostActions.RECIEVEAFTERSEND, post: APIPostI, previousPosts: any } |
  { type: PostActions.ERROR, hasError: boolean, error: string } |
  { type: PostActions.LOADING, loading: boolean } |
  { type: PostActions.SENDING, sending: boolean } |
  { type: PostActions.VOTING, isVoting: boolean } |
  { type: PostActions.VOTE, isUpVote: boolean } |
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
export const postsHasError = (hasError: boolean, error: string = ''): PostActionType => {
  return {
    type: PostActions.ERROR,
    hasError,
    error
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
export const postIsVoting = (isVoting: boolean): PostActionType => {
  return {
    type: PostActions.VOTING,
    isVoting,
  }
}
export const fetchPosts = (categoryID?: string) => ((dispatch: Dispatch<PostI>, getState: any) => {
  dispatch(postsAreLoading(true))
  const state: StoreStateI = getState()
  return PostAPI.get(categoryID)
    .then(posts => dispatch(recievePosts(posts, state.posts.items)))
    .catch((e) => dispatch(postsHasError(true, `Retrieve posts: ${e.message}`)))
}
)
export const fetchSinglePost = (postID: string) => ((dispatch: Dispatch<PostI>, getState: any) => {
  dispatch(postsAreLoading(true))
  const state: StoreStateI = getState()
  return PostAPI.getByID(postID)
    .then(singlePost => dispatch(recievePosts([singlePost], state.posts.items)))
    .catch((e) => dispatch(postsHasError(true, `Retrieve post: ${e.message}`)))
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
    .then(() => dispatch(push(urls.viewPost(post))))
    .catch((e) => dispatch(postsHasError(true, `Add post: ${e.message}`)))
}
)

export const votePost = (post: PostI, isUpVote: boolean) => ((dispatch: Dispatch<PostI>, getState: any) => {
  dispatch(postIsVoting(true))
  const state: StoreStateI = getState()
  return PostAPI.vote(post.id, isUpVote ? 'upVote' : 'downVote')
    .then(returnedPost => dispatch(recieveAfterSend(returnedPost, state.posts.items)))
    .catch((e) => dispatch(postsHasError(true, `Vote on post: ${e.message}`)))
    .then(() => setTimeout(() => dispatch(postIsVoting(false)), 1000))
}
)

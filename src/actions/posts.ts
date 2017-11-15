import { Dispatch } from 'react-redux'
import { APIPostI, APIPostSendNewI } from 'interfaces'
import { PostAPI, urls } from 'utils'
import { push } from 'react-router-redux'
import { setAuthor, PostActions, PostActionType } from './'

export const recievePosts = (posts: APIPostI[]): PostActionType => {
  return {
    type: PostActions.RECIEVE,
    posts,
  }
}

export const recieveAfterSend = (post: APIPostI): PostActionType => {
  return {
    type: PostActions.RECIEVEAFTERSEND,
    post,
  }
}

export const recieveAfterDelete = (post: APIPostI): PostActionType => {
  return {
    type: PostActions.RECIEVEAFTERDELETE,
    post,
  }
}

export const sendPost = (post: APIPostI): PostActionType => {
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
export const fetchPosts = (categoryID?: string) => ((dispatch: Dispatch<APIPostI>, getState: any) => {
  dispatch(postsAreLoading(true))
  return PostAPI.get(categoryID)
    .then(posts => dispatch(recievePosts(posts)))
    .catch((e) => dispatch(postsHasError(true, `Retrieve posts: ${e.message}`)))
}
)
export const fetchSinglePost = (postID: string) => ((dispatch: Dispatch<APIPostI>, getState: any) => {
  dispatch(postsAreLoading(true))
  return PostAPI.getByID(postID)
    .then(singlePost => {
      return dispatch(recievePosts([singlePost]))
    })
    .catch((e) => dispatch(postsHasError(true, `Retrieve post: ${e.message}`)))
}
)
export function verifyOkToSubmitPost(post: APIPostSendNewI) {
  const { author, title, body } = post
  if (!(author.trim() && title.trim() && body.trim())) {
    return false
  }
  // Other checks should be put here. redux-form could be used.
  return true
}

export const addPost = (post: APIPostI) => ((dispatch: Dispatch<APIPostI>, getState: any) => {
  dispatch(postIsSending(true))
  return PostAPI.add(post)
    .then(returnedPost => dispatch(recieveAfterSend(returnedPost)))
    .then(() => dispatch(push(urls.viewPost(post))))
    .then(() => dispatch(setAuthor(post.author)))
    .catch((e) => dispatch(postsHasError(true, `Add post: ${e.message}`)))
}
)
export const editPost = (post: APIPostI) => ((dispatch: Dispatch<APIPostI>, getState: any) => {
  dispatch(postIsSending(true))
  return PostAPI.edit(post)
    .then(returnedPost => dispatch(recieveAfterSend(returnedPost)))
    .then(() => dispatch(push(urls.viewPost(post))))
    .catch((e) => dispatch(postsHasError(true, `Add post: ${e.message}`)))
}
)

export const votePost = (post: APIPostI, isUpVote: boolean) => ((dispatch: Dispatch<APIPostI>, getState: any) => {
  dispatch(postIsVoting(true))
  return PostAPI.vote(post.id, isUpVote ? 'upVote' : 'downVote')
    .then(returnedPost => dispatch(recieveAfterSend(returnedPost)))
    .catch((e) => dispatch(postsHasError(true, `Vote on post: ${e.message}`)))
    .then(() => dispatch(postIsVoting(false)))
}
)
export const deletePost = (post: APIPostI) => ((dispatch: Dispatch<APIPostI>, getState: any) => {
  dispatch(postIsSending(true))
  return PostAPI.remove(post.id)
    .then(returnedPost => dispatch(recieveAfterDelete(returnedPost)))
    .catch((e) => dispatch(postsHasError(true, `Delete post: ${e.message}`)))
}
)

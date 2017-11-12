import { Dispatch } from 'react-redux'
import {
  APICommentI,
  APICommentSendNewI
} from '../interfaces'
import { CommentAPI } from '../utils/ReadableAPI'
import { setAuthor } from './'

export const enum CommentActions {
  FETCH = 'COMMENT_FETCH',
  RECIEVE = 'COMMENT_RECIEVE',
  RECIEVEAFTERSEND = 'COMMENT_RECIEVEAFTERSEND',
  RECIEVEAFTERDELETE = 'COMMENT_RECIEVEAFTERDELETE',
  ERROR = 'COMMENT_ERROR',
  LOADING = 'COMMENT_LOADING',
  SENDING = 'COMMENT_SENDING',
  VOTING = 'COMMENT_VOTING',
  ADD = 'COMMENT_ADD',
  EDIT = 'COMMENT_EDIT',
  VOTE = 'COMMENT_VOTE',
}
export type CommentActionType =
  { type: CommentActions.FETCH } |
  { type: CommentActions.RECIEVE, comments: APICommentI[] } |
  { type: CommentActions.RECIEVEAFTERSEND, comment: APICommentI } |
  { type: CommentActions.RECIEVEAFTERDELETE, comment: APICommentI } |
  { type: CommentActions.ERROR, hasError: boolean, error: string } |
  { type: CommentActions.LOADING, loading: boolean } |
  { type: CommentActions.SENDING, sending: boolean } |
  { type: CommentActions.VOTING, isVoting: boolean } |
  { type: CommentActions.VOTE, isUpVote: boolean } |
  { type: CommentActions.ADD, comment: APICommentI } |
  { type: CommentActions.EDIT, comment: APICommentI }

export const recieveComments = (comments: APICommentI[]): CommentActionType => {
  return {
    type: CommentActions.RECIEVE,
    comments,
  }
}

export const recieveCommentAfterSend = (comment: APICommentI): CommentActionType => {
  return {
    type: CommentActions.RECIEVEAFTERSEND,
    comment,
  }
}
export const recieveCommentAfterDelete = (comment: APICommentI): CommentActionType => {
  return {
    type: CommentActions.RECIEVEAFTERDELETE,
    comment,
  }
}

export const sendComment = (comment: APICommentI): CommentActionType => {
  return {
    type: CommentActions.ADD,
    comment
  }
}
export const commentsHasError = (hasError: boolean, error: string = ''): CommentActionType => {
  return {
    type: CommentActions.ERROR,
    hasError,
    error
  }

}
export const commentsAreLoading = (loading: boolean): CommentActionType => {
  return {
    type: CommentActions.LOADING,
    loading,
  }
}
export const commentIsSending = (sending: boolean): CommentActionType => {
  return {
    type: CommentActions.SENDING,
    sending,
  }
}
export const commentIsVoting = (isVoting: boolean): CommentActionType => {
  return {
    type: CommentActions.VOTING,
    isVoting,
  }
}
export const fetchComments = (postID: string) => ((dispatch: Dispatch<APICommentI>, getState: any) => {
  dispatch(commentsAreLoading(true))
  return CommentAPI.get(postID)
    .then(comments => dispatch(recieveComments(comments)))
    .catch((e) => dispatch(commentsHasError(true, `Retrieve comments: ${e.message}`)))
}
)
export function verifyOkToSubmitComment(comment: APICommentSendNewI) {
  const { author, body } = comment
  if (!(author && body)) {
    return false
  }
  // Other checks should be put here. redux-form could be used.
  return true
}
export const addComment = (comment: APICommentI) => ((dispatch: Dispatch<APICommentI>, getState: any) => {
  dispatch(commentIsSending(true))
  return CommentAPI.add(comment)
    .then(returnedComment => dispatch(recieveCommentAfterSend(returnedComment)))
    .then(() => dispatch(setAuthor(comment.author)))
    .catch((e) => dispatch(commentsHasError(true, `Add comment: ${e.message}`)))
}
)
export const editComment = (comment: APICommentI) => ((dispatch: Dispatch<APICommentI>, getState: any) => {
  dispatch(commentIsSending(true))
  return CommentAPI.edit(comment)
    .then(returnedComment => dispatch(recieveCommentAfterSend(returnedComment)))
    .catch((e) => dispatch(commentsHasError(true, `Edit comment: ${e.message}`)))
}
)

export const voteComment = (
  comment: APICommentI, isUpVote: boolean) => ((dispatch: Dispatch<APICommentI>, getState: any) => {
    dispatch(commentIsVoting(true))
    return CommentAPI.vote(comment.id, isUpVote ? 'upVote' : 'downVote')
      .then(returnedComment => dispatch(recieveCommentAfterSend(returnedComment)))
      .catch((e) => dispatch(commentsHasError(true, `Vote on comment: ${e.message}`)))
      .then(() => dispatch(commentIsVoting(false)))
  }
  )
export const deleteComment = (comment: APICommentI) => ((dispatch: Dispatch<APICommentI>, getState: any) => {
  dispatch(commentIsSending(true))
  return CommentAPI.remove(comment.id)
    .then(returnedPost => dispatch(recieveCommentAfterDelete(returnedPost)))
    .catch((e) => dispatch(commentsHasError(true, `Delete comment: ${e.message}`)))
}
)

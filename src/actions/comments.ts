import { Dispatch } from 'react-redux'
import {
  APICommentI,
  APICommentSendNewI
} from 'interfaces'
import { CommentAPI } from 'utils/ReadableAPI'
import { setAuthor, CommentActions, CommentActionType } from './'

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
  if (!(author.trim() && body.trim())) {
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

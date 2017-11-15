import { APIPostI, APICommentI, APICategoriesI } from 'interfaces'

export const enum SettingsActions {
  SETAUTHOR = 'SETTINGS_SETAUTHOR',
  SETSORTBY = 'SETTINGS_SORTBY',
  SETSORTORDER = 'SETTINGS_SORTORDER',
}
export type SettingsActionType =
  { type: SettingsActions.SETAUTHOR, author: string } |
  { type: SettingsActions.SETSORTORDER, order: 1 | -1 } |
  { type: SettingsActions.SETSORTBY, sortBy: string }

export const enum PostActions {
  FETCH = 'POST_FETCH',
  RECIEVE = 'POST_RECIEVE',
  RECIEVEAFTERSEND = 'POST_RECIEVEAFTERSEND',
  RECIEVEAFTERDELETE = 'POST_RECIEVEAFTERDELETE',
  ERROR = 'POST_ERROR',
  LOADING = 'POST_LOADING',
  SENDING = 'POST_SENDING',
  VOTING = 'POST_VOTING',
  ADD = 'POST_ADD',
  VOTE = 'POST_VOTE',
}
export type PostActionType =
  { type: PostActions.FETCH } |
  { type: PostActions.RECIEVE, posts: APIPostI[] } |
  { type: PostActions.RECIEVEAFTERSEND, post: APIPostI } |
  { type: PostActions.RECIEVEAFTERDELETE, post: APIPostI } |
  { type: PostActions.ERROR, hasError: boolean, error: string } |
  { type: PostActions.LOADING, loading: boolean } |
  { type: PostActions.SENDING, sending: boolean } |
  { type: PostActions.VOTING, isVoting: boolean } |
  { type: PostActions.VOTE, isUpVote: boolean } |
  { type: PostActions.ADD, post: APIPostI }

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

export const enum CategoriesActions {
  FETCH = 'CATEGORIES_FETCH',
  RECIEVE = 'CATEGORIES_RECIEVE',
  ERROR = 'CATEGORIES_ERROR',
  LOADING = 'CATEGORIES_LOADING',
}
export type CategoriesActionType =
  { type: CategoriesActions.FETCH } |
  { type: CategoriesActions.RECIEVE, categories: APICategoriesI[] } |
  { type: CategoriesActions.ERROR, hasError: boolean, error: string } |
  { type: CategoriesActions.LOADING, loading: boolean }

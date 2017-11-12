import { CommentActions, CommentActionType } from '../actions/'
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux'
import { APICommentI } from '../interfaces'

export interface CommentStateI {
  items: { [s: string]: APICommentI }
  loading: boolean
  sending: boolean
  hasError: boolean
  selectedPost: string
  isVoting: boolean
  error: string
}
export const initialCommentState: CommentStateI = {
  items: {},
  loading: false,
  sending: false,
  hasError: false,
  isVoting: false,
  selectedPost: '',
  error: ''
}

export function comments(
  state: CommentStateI = initialCommentState,
  action: CommentActionType | LocationChangeAction): CommentStateI {
  switch (action.type) {
    case CommentActions.LOADING:
      return { ...state, loading: action.loading }
    case CommentActions.SENDING:
      return { ...state, sending: action.sending }
    case CommentActions.VOTING:
      return { ...state, isVoting: action.isVoting }
    case CommentActions.ERROR:
      const error = action.error || state.error
      return {
        ...state,
        hasError: action.hasError,
        error,
        loading: false,
        sending: false,
      }
    case LOCATION_CHANGE:
      const pathcomps = action.payload.pathname.split('/')
      const ignoreList = ['add', 'edit']
      if (
        pathcomps.length > 4 &&
        pathcomps[3] === 'post' &&
        ignoreList.indexOf(pathcomps[4]) === -1
      ) {
        const selectedPost = pathcomps[4]
        return { ...state, selectedPost }
      }
      return state
    case CommentActions.RECIEVE:
      return {
        ...state,
        loading: false,
        items: action.comments.reduce(
          (map: any, obj: any) => {
            map[obj.id] = obj
            return map
          },
          { ...action.previousComments }
        )
      }
    case CommentActions.RECIEVEAFTERSEND:
      return {
        ...state,
        sending: false,
        items: { ...action.previousComments, [action.comment.id]: action.comment }
      }
    case CommentActions.RECIEVEAFTERDELETE:
      let items = state.items
      if (items.hasOwnProperty(action.comment.id)) {
        delete items[action.comment.id]
      }
      return {
        ...state,
        sending: false,
        items
      }
    default:
      return state
  }
}

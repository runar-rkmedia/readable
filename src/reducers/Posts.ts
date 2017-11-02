import { PostActions, PostActionType } from '../actions/posts'
import { StorePosts } from '../store/mapper'

export function posts(state: StorePosts = [], action: PostActionType) {
  // const { id } = action
  switch (action.type) {
    case PostActions.GET_POST:
      return {
        ...state,
      }
    default:
      return state
  }
}

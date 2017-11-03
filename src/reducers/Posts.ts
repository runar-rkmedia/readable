import { PostActions, PostActionType } from '../actions/posts'
// import { StorePosts } from '../store/mapper'

export interface PostState {
  items: { [s: string]: {} }
  loading: boolean
  hasError: boolean
}
export const initialPostState: PostState = {
  items: {},
  loading: false,
  hasError: false
}

export function posts(state: PostState = initialPostState, action: PostActionType): PostState {
  switch (action.type) {
    case PostActions.GET_POST:
      return state
    default:
      return state
  }
}

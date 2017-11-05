import { PostActions, PostActionType } from '../actions/posts'
// import { PostAPI } from '../utils/ReadableAPI'

export interface PostState {
  items: { [s: string]: {} }
  loading: boolean
  sending: boolean
  hasError: boolean
}
export const initialPostState: PostState = {
  items: {},
  loading: false,
  sending: false,
  hasError: false
}

export function posts(
  state: PostState = initialPostState,
  action: PostActionType): PostState {
  switch (action.type) {
    case PostActions.LOADING:
      return { ...state, loading: action.loading }
    case PostActions.SENDING:
      return { ...state, sending: action.sending }
    case PostActions.ERROR:
      return {
        ...state,
        hasError: action.error,
        loading: false,
        sending: false
      }
    case PostActions.RECIEVE:
      return {
        ...state,
        loading: false,
        items: action.posts.reduce(
          (map: any, obj: any) => {
            map[obj.id] = obj
            return map
          },
          { ...action.previousPosts }
        )
      }
    case PostActions.RECIEVEAFTERSEND:
      return {
        ...state,
        sending: false,
        items: { ...action.previousPosts, [action.post.id]: action.post }
      }
    default:
      return state
  }
}

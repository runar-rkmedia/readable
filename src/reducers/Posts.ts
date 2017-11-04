import { PostActions, PostActionType } from '../actions/posts'
// import { PostAPI } from '../utils/ReadableAPI'

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

export function posts(
  state: PostState = initialPostState,
  action: PostActionType): PostState {
  switch (action.type) {
    case PostActions.LOADING:
      return { ...state, loading: action.loading }

    case PostActions.ERROR:
      return {
        ...state,
        hasError: action.error,
        loading: false,
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
    default:
      return state
  }
}

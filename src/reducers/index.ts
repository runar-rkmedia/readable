import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
export * from './Categories'
export * from './Posts'
export * from './Comments'
import { posts, initialPostState } from './Posts'
import { comments, initialCommentState } from './Comments'
import { categories, initialCategoriesState } from './Categories'
import { PostStateI, CategoriesStateI, CommentStateI } from '../interfaces'
import { RouterState } from 'react-router-redux'

export type StoreStateI = {
  categories: CategoriesStateI,
  posts: PostStateI
  comments: CommentStateI
  router?: RouterState
}
export const initialStoreState: StoreStateI = {
  categories: initialCategoriesState,
  posts: initialPostState,
  comments: initialCommentState,
}

export default combineReducers({
  posts,
  categories,
  comments,
  router: routerReducer
}, )

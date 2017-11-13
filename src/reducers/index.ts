import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
export * from './Categories'
export * from './Posts'
export * from './Comments'
export * from './Settings'
import { posts, initialPostState } from './Posts'
import { comments, initialCommentState } from './Comments'
import { categories, initialCategoriesState } from './Categories'
import { initialSettingsStateI, settings } from './Settings'
import * as storage from 'redux-storage'
import { PostStateI, CategoriesStateI, CommentStateI, SettingsStateI } from '../interfaces'
import { RouterState } from 'react-router-redux'

export type StoreStateI = {
  categories: CategoriesStateI,
  posts: PostStateI
  comments: CommentStateI
  settings: SettingsStateI
  router?: RouterState
}
export const initialStoreState: StoreStateI = {
  categories: initialCategoriesState,
  posts: initialPostState,
  comments: initialCommentState,
  settings: initialSettingsStateI
}

export default storage.reducer(combineReducers({
  posts,
  categories,
  comments,
  settings,
  router: routerReducer
}, ))

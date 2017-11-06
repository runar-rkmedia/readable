import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { posts, initialPostState } from './Posts'
import { PostStateI, CategoriesStateI } from '../interfaces'
import { categories, initialCategoriesState } from './Categories'
import { RouterState } from 'react-router-redux'

export type StoreStateI = {
  categories: CategoriesStateI,
  posts: PostStateI
  router?: RouterState
}
export const initialStoreState: StoreStateI = {
  categories: initialCategoriesState,
  posts: initialPostState,
}

export default combineReducers({
  posts,
  categories,
  router: routerReducer
}, )

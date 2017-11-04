import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { posts, PostState, initialPostState } from './Posts'
import { categories, CategoriesState, initialCategoriesState } from './Categories'
import { RouterState } from 'react-router-redux'

export type StoreState = {
  categories: CategoriesState,
  posts: PostState
  router?: RouterState
}
export const initialStoreState: StoreState = {
  categories: initialCategoriesState,
  posts: initialPostState,
}

export default combineReducers({
  posts,
  categories,
  router: routerReducer
}, )

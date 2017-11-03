import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { posts, PostState, initialPostState } from './Posts'
import { categories, CategoriesState, initialCategoriesState } from './Categories'

export type StoreState = {
  categories: CategoriesState,
  posts: PostState
}
export const initialStoreState: StoreState = {
  categories: initialCategoriesState,
  posts: initialPostState
}

export default combineReducers({
  posts,
  categories,
  router: routerReducer
}, )

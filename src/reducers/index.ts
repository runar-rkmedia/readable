import { combineReducers } from 'redux'
import { posts, PostState, initialPostState } from './Posts'
import { categories, CategoriesState, initialCatagoriesState } from './Categories'

export type StoreState = {
  categories: CategoriesState,
  posts: PostState
}
export const initialStoreState: StoreState = {
  categories: initialCatagoriesState,
  posts: initialPostState
}

export default combineReducers({
  posts,
  categories,
})

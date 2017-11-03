import { combineReducers } from 'redux'
import { posts } from './Posts'
import { categories, catagoriesAreLoading, catagoriesHasError } from './Categories'

export default combineReducers({
  posts,
  categories,
  catagoriesAreLoading,
  catagoriesHasError
})

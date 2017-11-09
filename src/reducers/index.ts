import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
export * from './Categories'
export * from './Posts'
export * from './Comments'
export * from './Author'
import { posts, initialPostState } from './Posts'
import { comments, initialCommentState } from './Comments'
import { categories, initialCategoriesState } from './Categories'
import { initialAuthorStateI, author } from './Author'

import { PostStateI, CategoriesStateI, CommentStateI, AuthorStateI } from '../interfaces'
import { RouterState } from 'react-router-redux'

export type StoreStateI = {
  categories: CategoriesStateI,
  posts: PostStateI
  comments: CommentStateI
  author: AuthorStateI
  router?: RouterState
}
export const initialStoreState: StoreStateI = {
  categories: initialCategoriesState,
  posts: initialPostState,
  comments: initialCommentState,
  author: initialAuthorStateI
}

export default combineReducers({
  posts,
  categories,
  comments,
  author,
  router: routerReducer
}, )

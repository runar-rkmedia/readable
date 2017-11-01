import { combineReducers } from 'redux'
import { Actions, ActionType } from '../actions/posts'
import { Posts } from '../components/Posts'
import { Catagory, defaultCatagories } from '../components/Catagories'
import { StorePosts } from '../store/mapper'

export const initialPost: Posts = {
  id: '',
  timestamp: null,
  title: '',
  body: '',
  catagory: null,
}

function posts(state: StorePosts = [], action: ActionType) {
  // const { id } = action
  switch (action.type) {
    case Actions.GET_POST:
      return {
        ...state,
      }
    default:
      return state
  }
}

function catagories(state: Catagory[] = defaultCatagories, action: ActionType) {
  // const { id } = action
  switch (action.type) {
    case Actions.GET_POST:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default combineReducers({
  posts,
  catagories
})

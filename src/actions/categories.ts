import { Dispatch } from 'react-redux'
import { Category, } from '../components/Catagories'
import { CategoryAPI, APICategories } from '../utils/ReadableAPI'

export const enum CategoriesActions {
  FETCH = 'FETCH',
  RECIEVE = 'RECIEVE'
}

export type CategoriesActionType =
  { type: CategoriesActions.FETCH } |
  { type: CategoriesActions.RECIEVE, categories: APICategories[] }

export const recieveCategories = (categories: APICategories[]) => {
  return {
    type: CategoriesActions.RECIEVE,
    categories
  }
}
export const fetchCategories = () => (
  (dispatch: Dispatch<Category>) => (
    CategoryAPI.get()
      .then(categories => dispatch(recieveCategories(categories)))
  )
)

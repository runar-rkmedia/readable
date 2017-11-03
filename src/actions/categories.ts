import { Dispatch } from 'react-redux'
import { Category } from '../components/Catagories'
import { CategoryAPI, APICategories } from '../utils/ReadableAPI'

export const enum CategoriesActions {
  FETCH = 'FETCH',
  RECIEVE = 'RECIEVE',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
}

export type CategoriesActionType =
  { type: CategoriesActions.FETCH } |
  { type: CategoriesActions.RECIEVE, categories: APICategories[] } |
  { type: CategoriesActions.ERROR, error: boolean } |
  { type: CategoriesActions.LOADING, loading: boolean }

export const recieveCategories = (categories: APICategories[]): CategoriesActionType => {
  return {
    type: CategoriesActions.RECIEVE,
    categories
  }
}
export const catagoriesHasError = (e: boolean): CategoriesActionType => {
  return {
    type: CategoriesActions.ERROR,
    error: e,
  }
}
export const catagoriesAreLoading = (loading: boolean): CategoriesActionType => {
  return {
    type: CategoriesActions.LOADING,
    loading,
  }
}
export const fetchCategories = () => ((dispatch: Dispatch<Category>) => {
  dispatch(catagoriesAreLoading(true))
  return CategoryAPI.get()
    .then(categories => dispatch(recieveCategories(categories)))
    .catch((e) => dispatch(catagoriesHasError(true)))
}
)

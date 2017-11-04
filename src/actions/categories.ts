import { Dispatch } from 'react-redux'
import { CategoryInterface } from '../components/CategoryList'
import { CategoryAPI, APICategories } from '../utils/ReadableAPI'

export const enum CategoriesActions {
  FETCH = 'CATEGORIES_FETCH',
  RECIEVE = 'CATEGORIES_RECIEVE',
  ERROR = 'CATEGORIES_ERROR',
  LOADING = 'CATEGORIES_LOADING',
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
export const categoriesHasError = (e: boolean): CategoriesActionType => {
  return {
    type: CategoriesActions.ERROR,
    error: e,
  }
}
export const categoriesAreLoading = (loading: boolean): CategoriesActionType => {
  return {
    type: CategoriesActions.LOADING,
    loading,
  }
}
export const fetchCategories = () => ((dispatch: Dispatch<CategoryInterface>) => {
  dispatch(categoriesAreLoading(true))
  return CategoryAPI.get()
    .then(categories => dispatch(recieveCategories(categories)))
    .catch((e) => dispatch(categoriesHasError(true)))
}
)

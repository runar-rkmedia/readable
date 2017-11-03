import { CategoriesActions, CategoriesActionType } from '../actions/categories'
import { Category, } from '../components/Catagories'

export function categories(state: Category[] = [], action: CategoriesActionType) {
  switch (action.type) {
    case CategoriesActions.RECIEVE:
      return action.categories
    default:
      return state
  }
}
export function catagoriesAreLoading(state: boolean = false, action: CategoriesActionType) {
  switch (action.type) {
    case CategoriesActions.LOADING:
      return action.loading
    default:
      return state
  }
}
export function catagoriesHasError(state: boolean = false, action: CategoriesActionType) {
  switch (action.type) {
    case CategoriesActions.ERROR:
      return action.err
    default:
      return state
  }
}

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

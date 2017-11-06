import { CategoriesActions, CategoriesActionType } from '../actions/categories'
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux'
import { CategoryI } from '../interfaces'

export interface StoreCategories {
  [s: string]: string
}
export interface CategoriesStateI {
  items: StoreCategories
  loading: boolean
  hasError: boolean
  selectedCatagory: CategoryI | null | any
}
export const initialCategoriesState: CategoriesStateI = {
  items: {},
  loading: false,
  hasError: false,
  selectedCatagory: null
}

export function categories(
  state: CategoriesStateI = initialCategoriesState,
  action: CategoriesActionType | LocationChangeAction): CategoriesStateI {
  switch (action.type) {
    case CategoriesActions.LOADING:
      return { ...state, loading: action.loading }
    case LOCATION_CHANGE:
      const pathcomps = action.payload.pathname.split('/')
      if (pathcomps.length > 2 && pathcomps[1] === 'category') {
        const selectedCatagory = pathcomps[2]
        return { ...state, selectedCatagory }
      }
      return state

    case CategoriesActions.ERROR:
      return {
        ...state,
        hasError: action.error,
        loading: false,
      }
    case CategoriesActions.RECIEVE:
      return {
        ...state,
        loading: false,
        items: action.categories.reduce(
          (map: any, obj: any) => {
            map[obj.name] = obj.path
            return map
          },
          {}
        )
      }
    default:
      return state
  }
}

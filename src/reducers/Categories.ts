import { CategoriesActions, CategoriesActionType } from 'actions'
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux'

export interface StoreCategories {
  [s: string]: string
}
export interface CategoriesStateI {
  items: StoreCategories
  loading: boolean
  hasError: boolean
  error: string
  selectedCatagory: string
}
export const initialCategoriesState: CategoriesStateI = {
  items: {},
  loading: false,
  error: '',
  hasError: false,

  selectedCatagory: ''
}

export function categories(
  state: CategoriesStateI = initialCategoriesState,
  action: CategoriesActionType | LocationChangeAction): CategoriesStateI {
  switch (action.type) {
    case CategoriesActions.LOADING:
      return { ...state, loading: action.loading }
    case LOCATION_CHANGE:
      const pathcomps = action.payload.pathname.split('/')
      let selectedCatagory = ''
      if (pathcomps.length > 2 && pathcomps[1] === 'category') {
        selectedCatagory = pathcomps[2]
      }
      return { ...state, selectedCatagory }

    case CategoriesActions.ERROR:
      const error = action.error || state.error
      return {
        ...state,
        hasError: action.hasError,
        error,
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

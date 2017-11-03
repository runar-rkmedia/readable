import { CategoriesActions, CategoriesActionType } from '../actions/categories'
// import { Category, } from '../components/Catagories'
// import { APICategories } from '../utils/ReadableAPI'

export interface StoreCategories {
  [s: string]: string
}
export interface CategoriesState {
  items: StoreCategories
  loading: boolean
  hasError: boolean
}
export const initialCatagoriesState: CategoriesState = {
  items: {},
  loading: false,
  hasError: false
}

export function categories(
  state: CategoriesState = initialCatagoriesState,
  action: CategoriesActionType): CategoriesState {
  switch (action.type) {
    case CategoriesActions.LOADING:
      return { ...state, loading: action.loading }
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

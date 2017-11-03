import { Dispatch } from 'react-redux'
import {
  CategoriesType, Category,
  defaultCatagories
} from '../components/Catagories'
import { getPost } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { StoreState, } from '../reducers'
import { StoreCategories } from '../reducers/Categories'

export const mapCategories = (categories: StoreCategories): Category[] => {
  return Object.keys(categories).map(key => {
    if (key in defaultCatagories) {
      return defaultCatagories[key]
    }
    return {
      id: (key as CategoriesType),
      path: (categories[key] as CategoriesType),
      icon: '',
      name: key,
      description: ''
    }
  })
}
export const mapStateToProps = ({ posts, categories }: StoreState
) => {
  return {
    posts, categories: mapCategories(categories.items)
  }
}

export interface AppDispatchProps {
  getPost: any
  fetchCategories: any
}

export function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>): AppDispatchProps {
  return {
    getPost: (id: string) => dispatch(getPost({ id })),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

import { Dispatch } from 'react-redux'
import { Post } from '../components/Posts'
import { CategoriesType, Category, defaultCatagories } from '../components/Catagories'
import { getPost } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { APICategories } from '../utils/ReadableAPI'

export type StorePosts = Post[]

const mapCategories = (categories: APICategories[]): Category[] => (
  categories.map(c => {
    if (c.name in defaultCatagories) {
      return defaultCatagories[c.name]
    }
    return {
      id: (c.name as CategoriesType),
      path: (c.path as CategoriesType),
      icon: '',
      name: c.name,
      description: ''
    }
  })
)

export const mapStateToProps = (
  { posts, categories }: { posts: StorePosts, categories: APICategories[] }
) => ({
  posts, categories: mapCategories(categories)
})

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

import { CategoriesType } from './Catagories'

export interface Post {
  id: string
  timestamp: number | null
  title: string
  body: string
  author: string
  catagory: CategoriesType | null
}

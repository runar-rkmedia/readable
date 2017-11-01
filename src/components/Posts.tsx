import { CatagoriesType } from './Catagories'

export interface Post {
  id: string
  timestamp: number | null
  title: string
  body: string
  author: string
  catagory: CatagoriesType | null
}

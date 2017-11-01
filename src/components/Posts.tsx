import { CatagoriesType } from './Catagories'

export interface Posts {
  id: string
  timestamp: Date | null
  title: string
  body: string
  catagory: CatagoriesType | null
}

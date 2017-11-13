import * as React from 'react'
import { connect } from 'react-redux'
import { CategoriesStateI } from 'interfaces'
import { CategoryHeader } from './'
import { mapCategories, } from 'store/mapper'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
export interface CategoryI {
  id: string
  name: string
  description: string
  icon: string
  path: string
}
const CategoryListC = (props: {
  categories: CategoryI[]
  loading: boolean
  error: boolean
}) => {
  const CategoriesLength = props.categories.length
  return (
    <List>
      {props.categories.map((item, i) => (
        <div key={item.id}>
          <CategoryHeader
            category={item}
            type="listitem"
          />
          {CategoriesLength !== i + 1 && (<Divider inset={true} />)}
        </div>

      ))}
    </List>
  )
}

const mapStateToProps = ({ categories }: { categories: CategoriesStateI }
) => {
  return {
    categories: mapCategories(categories.items),
    loading: categories.loading,
    error: categories.hasError
  }
}

export const CategoryList = connect(mapStateToProps)(CategoryListC)

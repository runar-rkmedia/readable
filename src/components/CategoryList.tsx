import * as React from 'react'
import { connect } from 'react-redux'
import { CategoriesStateI } from '../interfaces'
import CategoryItem from './CategoryHeader'
import { mapCategories, } from '../store/mapper'
import List from 'material-ui/List'

import { withMyStyle } from '../style/base'

export interface CategoryI {
  id: string
  name: string
  description: string
  icon: string
  path: string
}
const CategoryList = (props: {
  categories: CategoryI[]
  loading: boolean
  error: boolean
}) =>
  (
    <List>
      {props.categories.map(item => (
        <CategoryItem
          category={item}
          type="listitem"
          key={item.id}
        />
      ))}
    </List>
  )

const mapStateToProps = ({ categories }: { categories: CategoriesStateI }
) => {
  return {
    categories: mapCategories(categories.items),
    loading: categories.loading,
    error: categories.hasError
  }
}

export default connect(
  mapStateToProps)(
  withMyStyle(
    CategoryList
    )
  )

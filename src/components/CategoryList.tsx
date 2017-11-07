import * as React from 'react'
import { connect } from 'react-redux'
import { CategoriesStateI } from '../interfaces'
import { CategoryHeader } from './'
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
const CategoryListC = (props: {
  categories: CategoryI[]
  loading: boolean
  error: boolean
}) =>
  (
    <List>
      {props.categories.map(item => (
        <CategoryHeader
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

export const CategoryList = connect(
  mapStateToProps)(
  withMyStyle(
    CategoryListC
  )
  )

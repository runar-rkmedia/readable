import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { CategoriesState } from '../reducers/Categories'
import CategoryItem from './CategoryHeader'
import { mapCategories, } from '../store/mapper'
import List from 'material-ui/List'

import { withMyStyle } from '../style/base'

export interface CategoryInterface {
  id: string
  name: string
  description: string
  icon: string
  path: string
}
const CategoryList = (props: {
  categories: CategoryInterface[]
  loading: boolean
  error: boolean
} & AppDispatchProps) =>
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

const mapStateToProps = ({ categories }: { categories: CategoriesState }
) => {
  return {
    categories: mapCategories(categories.items),
    loading: categories.loading,
    error: categories.hasError
  }
}

export interface AppDispatchProps {
  goToCategory: (path: string) => void
}
export function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goToCategory: (path: string) => dispatch(push(`/category/${path}`)),
    ...ownprops
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(
  withMyStyle(
    CategoryList
    )
  )

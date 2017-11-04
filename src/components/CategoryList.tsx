import * as React from 'react'
import { connect } from 'react-redux'
import { CategoriesState } from '../reducers/Categories'
import { mapCategories, } from '../store/mapper'
import '../style/Categories.css'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { Dispatch } from 'react-redux'
import { push } from 'react-router-redux'

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
        <div>
          <ListItem button={true} key={item.id} onClick={() => { props.goToCategory(item.path) }}>
            <img style={{ width: '3em' }} src={item.icon} alt={item.name + ' icon'} />
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
          <Divider />
        </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)

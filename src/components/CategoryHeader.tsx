import * as React from 'react'
import { CategoryInterface } from '../components/CategoryList'
import Typography from 'material-ui/Typography'
import { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { connect } from 'react-redux'
import { Dispatch } from 'react-redux'
import { push } from 'react-router-redux'

import { withMyStyle, WithMyStyle } from '../style/base'

interface CategoryHeaderI {
  category: CategoryInterface
  type: 'header' | 'listitem'
}

const CategoryHeader = (props: CategoryHeaderI & AppDispatchProps & WithMyStyle) => {
  const { category, classes, goToCategory, type } = props
  const { path, icon, name, description } = category
  if (!path) {
    return (
      <div className="warning">Not a valid category</div>
    )
  }
  switch (type) {
    case 'header':
      return (
        <div>
          <Typography
            type="display3"
            onClick={() => goToCategory(path)}
            className={classes.link}
          >
            <img className={classes.headericon} src={icon} alt="" />{name}
          </Typography>
          <Typography type="subheading">{description}</Typography>
          <hr />
        </div>
      )

    case 'listitem':
      return (
        <div>
          <ListItem
            button={true}
            onClick={() => goToCategory(path)}
          >
            <img className={classes.sidebaricon} src={icon} alt={name + ' icon'} />
            <ListItemText primary={name} secondary={description} />
          </ListItem>
          <Divider />
        </div>
      )
    default:
      return null
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

export default connect(null, mapDispatchToProps)(withMyStyle(CategoryHeader))

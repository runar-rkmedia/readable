import * as React from 'react'
import { CategoryI } from '../interfaces'
import Typography from 'material-ui/Typography'
import { ListItem, ListItemText } from 'material-ui/List'
import { connect } from 'react-redux'
import { Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { urls } from '../utils/'

import decorate, { WithStyles } from '../style'

interface Props {
  category: CategoryI
  type: 'header' | 'listitem'
}

const CategoryHeaderC = decorate<Props & AppDispatchProps & WithStyles>((props) => {
  const { classes, goTo, type, category } = props
  const { path, icon, name, description } = category
  if (!path) {
    return (
      <div className="warning">Not a valid category</div>
    )
  }
  const fullPath = urls.category(path)
  switch (type) {
    case 'header':
      return (
        <div>
          <Typography
            type="display3"
            onClick={() => goTo(fullPath)}
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
        <ListItem
          button={true}
          onClick={() => goTo(fullPath)}
        >
          <img className={classes.sidebaricon} src={icon} alt={name + ' icon'} />
          <ListItemText primary={name} secondary={description} />
        </ListItem>
      )
    default:
      return null
  }
})

interface AppDispatchProps {
  goTo: (path: string) => void
}
function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goTo: (path: string) => dispatch(push(path)),
    ...ownprops
  }
}

export const CategoryHeader = connect(null, mapDispatchToProps)(CategoryHeaderC)

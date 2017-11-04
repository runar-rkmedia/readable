import * as React from 'react'
import { CategoryInterface } from '../components/CategoryList'
import Typography from 'material-ui/Typography'

export default (props: {
  category: CategoryInterface
}) => {
  const { path, icon, name, description } = props.category
  if (!path) {
    return (
      <div className="warning">Not a valid category</div>
    )
  }
  return (
    <div className="category-main">
      <Typography type="display3" >
        <img src={icon} alt="" />{name}
      </Typography>
      <Typography type="subheading">{description}</Typography>
      <hr />
    </div>
  )
}

import * as React from 'react'
import { CategoryInterface as CategoryInterface } from '../components/CategoryList'
import { connect } from 'react-redux'
import { CategoriesState } from '../reducers/Categories'
import { mapCatagory } from '../store/mapper'
import { RouterState } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
import Typography from 'material-ui/Typography'

const Catagory = (props: CategoryInterface) => {
  if (!props.path) {
    return (
      <div className="warning">Not a valid category</div>
    )
  }
  return (
    <div className="category-main">
      <Typography type="display3" >
        <img src={props.icon} alt="" />{props.name}
      </Typography>
      <Typography type="subheading">{props.description}</Typography>
      <hr/>
      <div className="posts">
        <Typography>Here you can see all the posts in this section.</Typography>
      </div>
    </div>
  )
}

const mapStateToProps = ({ categories, router }: { categories: CategoriesState, router: RouterState }
) => {
  return {
    ...mapCatagory(categories.selectedCatagory, categories.items)
  }
}
export default connect(mapStateToProps)(withRouter(Catagory))

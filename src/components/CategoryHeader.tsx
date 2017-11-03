import * as React from 'react'
import { CategoryInterface as CategoryInterface } from '../components/CategoryList'
import { connect } from 'react-redux'
import { CategoriesState } from '../reducers/Categories'
import { mapCatagory } from '../store/mapper'
import { RouterState } from 'react-router-redux'
import { withRouter } from 'react-router-dom'

const Catagory = (props: CategoryInterface) => {
  if (!props.path) {
    return (
      <div className="warning">Not a valid category</div>
    )
  }
  return (
    <div className="category-main">
      <h1><img src={props.icon} alt=""/>{props.name}</h1>
      <p>{props.description}</p>
      <hr/>
      <div className="posts">
      Here you can see all the posts in this section.</div>
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

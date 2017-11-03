import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CategoriesState } from '../reducers/Categories'
import { mapCategories, } from '../store/mapper'
import '../style/Categories.css'

export interface CategoryInterface {
  id: string
  name: string
  description: string
  icon: string
  path: string
}

const CategoryList = (props: {
  onSetOpen: (open: boolean) => void
  categories: CategoryInterface[]
  loading: boolean
  error: boolean
}) =>
  (
    <div className="categories">
      <div className="categories-header">
        <h2>Categories</h2>
        <div className="category-container">
          {props.loading ? (
            <div>loading...</div>
          ) : props.error && (
            <div>Error retrieving categories from server. Please try again.</div>
          )}
          {props.categories.map((item => (
            <div className="category" key={item.path}>
              <img src={item.icon} alt={item.name + ' icon'} />
              <div className="category-name">
                <Link
                  to={'/category/' + item.path}
                  onClick={() => props.onSetOpen(false)}
                >{item.name}
                </Link>
              </div>
              <div className="category-description">
                {item.description}
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  )

const mapStateToProps = ({ categories }: { categories: CategoriesState }
) => {
  return {
    categories: mapCategories(categories.items),
    loading: categories.loading,
    error: categories.hasError
  }
}
import { withRouter } from 'react-router-dom'
export default connect(mapStateToProps)(withRouter(CategoryList))

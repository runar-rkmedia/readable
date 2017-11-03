import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CategoriesState } from '../reducers/Categories'
import {
  mapCategories,
  // AppDispatchProps
} from '../store/mapper'

import '../style/Catagories.css'

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  path: string
}

const Categories = (props: {
  onSetOpen: (open: boolean) => void
  categories: Category[]
  loading: boolean
  error: boolean
}) =>
  (
    <div className="catagories">
      <div className="catagories-header">
        <h2>Catagories</h2>
        <div className="catagory-container">
          {props.loading ? (
            <div>loading...</div>
          ) : props.error && (
            <div>Error retrieving categories from server. Please try again.</div>
          )}
          {props.categories.map((item => (
            <div className="catagory" key={item.path}>
              <img src={item.icon} alt={item.name + ' icon'} />
              <div className="catagory-name">
                <Link
                  to={'/catagory/' + item.path}
                  onClick={() => props.onSetOpen(false)}
                >{item.name}
                </Link>
              </div>
              <div className="catagory-description">
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
export default connect(mapStateToProps)(Categories)

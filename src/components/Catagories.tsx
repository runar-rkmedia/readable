import * as React from 'react'
import { Link } from 'react-router-dom'
const reduxLogo = require('../icons/redux.svg')
const reactLogo = require('../icons/react.svg')
const udacityLogo = require('../icons/udacity.svg')

import '../style/Catagories.css'

export type CatagoriesType = 'react' | 'redux' | 'udacity'

export interface Catagory {
  id: CatagoriesType
  name: string
  description: string
  icon: string
  path: CatagoriesType
}

// Hardcoded since API doesn't serve enough information.
export const defaultCatagories: Catagory[] = [
  {
    id: 'react',
    name: 'React',
    description: `React is a powerful JavaScript-framework for creating both webapps and native applications.`,
    icon: reactLogo,
    path: 'react'
  },
  {
    id: 'redux',
    name: 'Redux',
    description: 'Redux is a predictable state container for JavaScript apps.',
    icon: reduxLogo,
    path: 'redux'
  },
  {
    id: 'udacity',
    name: 'Udacity',
    description: 'Udacity is an innovative online education provider.',
    icon: udacityLogo,
    path: 'udacity'
  },
]

export class Catagories extends React.Component<{
  list: Catagory[]
}> {
  render() {
    return (
      <div className="catagories">
        <div className="catagories-header">
          <h2>Catagories</h2>
          <div className="catagory-container">
            {this.props.list.map((item => (
              <div className="catagory" key={item.id}>
                <img src={item.icon} alt={item.name + ' icon'} />
                <div className="catagory-name">
                  <Link to={'/catagory/' + item.id}>{item.name}</Link>
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
  }
}

import { Category } from '../components/Catagories'
import { StoreCategories } from '../reducers/Categories'
const reduxLogo = require('../icons/redux.svg')
const reactLogo = require('../icons/react.svg')
const udacityLogo = require('../icons/udacity.svg')

// Hardcoded since API doesn't serve enough information.
const defaultCatagories: {
  [s: string]: Category
} = {
    react: {
      name: 'React',
      description: `React is a powerful JavaScript-framework for creating both webapps and native applications.`,
      icon: reactLogo,
      path: 'react',
      id: 'react'
    },
    redux: {
      name: 'Redux',
      description: 'Redux is a predictable state container for JavaScript apps.',
      icon: reduxLogo,
      path: 'redux',
      id: 'redux'
    },
    udacity: {
      name: 'Udacity',
      description: 'Udacity is an innovative online education provider.',
      icon: udacityLogo,
      path: 'udacity',
      id: 'udacity'
    }
  }
export const mapCategories = (categories: StoreCategories): Category[] => {
  return Object.keys(categories).map(key => {
    if (key in defaultCatagories) {
      return defaultCatagories[key]
    }
    return {
      id: key,
      path: categories[key],
      icon: '',
      name: key,
      description: ''
    }
  })
}

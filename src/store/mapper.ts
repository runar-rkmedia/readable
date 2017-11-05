import { CategoryInterface } from '../components/CategoryList'
import { StoreCategories } from '../reducers/Categories'
const reduxLogo = require('../icons/redux.svg')
const reactLogo = require('../icons/react.svg')
// const udacityLogo = require('../icons/udacity.svg')

// Hardcoded since API doesn't serve enough information.
const defaultCategories: {
  [s: string]: CategoryInterface
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
    // udacity: {
    //   name: 'Udacity',
    //   description: 'Udacity is an innovative online education provider.',
    //   icon: udacityLogo,
    //   path: 'udacity',
    //   id: 'udacity'
    // }
  }

export const mapCatagory = (key: string, categories?: StoreCategories): CategoryInterface => {
  if (key in defaultCategories) {
    return defaultCategories[key]
  }
  return {
    id: key,
    path: categories ? categories[key] : key,
    icon: '',
    name: key,
    description: ''
  }
}
export const mapCategories = (categories: StoreCategories): CategoryInterface[] => {
  return Object.keys(categories).map(key => mapCatagory(key, categories))
}

import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux'
import { StoreState } from './index'

// This initial state is *copied* from react-router-redux's
// routerReducer (the property name 'locationBeforeTransitions' is
// because this is designed for use with react-router)
const initialState = { locationBeforeTransitions: null }

export function routing(state: any = initialState, action: LocationChangeAction & { getState: () => StoreState }) {
  // This LOCATION_CHANGE case is copied from react-router-redux's routerReducer
  if (action.type === LOCATION_CHANGE) {
    let selectedCatagory
    const { items } = action.getState().categories
    console.log(items)
    const path = action.payload.pathname
    selectedCatagory = path
    return {
      ...state,
      locationBeforeTransitions: action.payload,
      selectedCatagory
    }

  }
  return state
}

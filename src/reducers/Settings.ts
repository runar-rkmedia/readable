import { SettingsActions, SettingsActionType } from 'actions'

export interface SettingsStateI {
  name: string
  sortBy: string
  order: 1 | -1
}
export const initialSettingsStateI: SettingsStateI = {
  name: '',
  sortBy: 'timestamp',
  order: 1
}

export function settings(
  state: SettingsStateI = initialSettingsStateI,
  action: SettingsActionType): SettingsStateI {
  switch (action.type) {
    case SettingsActions.SETAUTHOR:
      return { ...state, name: action.author }
    case SettingsActions.SETSORTBY:
      return { ...state, sortBy: action.sortBy }
    case SettingsActions.SETSORTORDER:
      return { ...state, order: action.order }
    default:
      return state
  }
}

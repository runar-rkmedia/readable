import { SettingsActionType, SettingsActions } from './'

export const setAuthor = (author: string): SettingsActionType => {
  return {
    type: SettingsActions.SETAUTHOR,
    author
  }
}
export const setSortBy = (sortBy: string): SettingsActionType => {
  return {
    type: SettingsActions.SETSORTBY,
    sortBy
  }
}
export const setSortOrder = (order: 1 | -1): SettingsActionType => {
  return {
    type: SettingsActions.SETSORTORDER,
    order
  }
}

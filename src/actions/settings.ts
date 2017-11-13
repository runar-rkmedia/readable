export const enum SettingsActions {
  SETAUTHOR = 'SETTINGS_SETAUTHOR',
  SETSORTBY = 'SETTINGS_SORTBY',
  SETSORTORDER = 'SETTINGS_SORTORDER',
}
export type SettingsActionType =
  { type: SettingsActions.SETAUTHOR, author: string } |
  { type: SettingsActions.SETSORTORDER, order: 1 | -1 } |
  { type: SettingsActions.SETSORTBY, sortBy: string }

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

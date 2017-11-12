import { AuthorActions, AuthorActionType } from 'actions'

export interface AuthorStateI {
  name: string
}
export const initialAuthorStateI: AuthorStateI = {
  name: ''
}

export function author(
  state: AuthorStateI = initialAuthorStateI,
  action: AuthorActionType): AuthorStateI {
  switch (action.type) {
    case AuthorActions.SET:
      return { ...state, name: action.author }
    default:
      return state
  }
}

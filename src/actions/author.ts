export const enum AuthorActions {
  SET = 'Author_SET',
}
export type AuthorActionType = { type: AuthorActions.SET, author: string }

export const setAuthor = (author: string): AuthorActionType => {
  return {
    type: AuthorActions.SET,
    author
  }
}

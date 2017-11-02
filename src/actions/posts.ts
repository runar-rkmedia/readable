
export const enum PostActions {
  NEW_POST = 'NEW_POST',
  GET_POST = 'GET_POST'
}

export type PostActionType =
  { type: PostActions.NEW_POST, id: string } |
  { type: PostActions.GET_POST, id: string }

export function getPost({ id }: { id: string }) {
  return {
    type: PostActions.GET_POST,
    id
  }
}

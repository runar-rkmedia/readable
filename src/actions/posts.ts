
export const enum Actions {
  NEW_POST = 'NEW_POST',
  GET_POST = 'GET_POST'
}

export type ActionType =
  { type: Actions.NEW_POST, id: string } |
  { type: Actions.GET_POST, id: string }

export function getPost({ id }: { id: string }) {
  return {
    type: Actions.GET_POST,
    id
  }
}

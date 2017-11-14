import uuid from 'uuid/v4'

const api = process.env.REACT_APP_API_URL

let token = localStorage.token

if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export interface APICategoriesI {
  name: string
  path: string
}
export interface APIPostSendNewI {
  id: string
  timestamp: number
  title: string
  body: string
  author: string
  category: string
}
export interface APIPostI extends APIPostSendNewI {
  voteScore: number
  deleted: boolean
  commentCount: number
}
export interface APICommentI extends APICommentSendNewI {
  voteScore: number
  deleted: boolean
  commentCount: number
}
export interface APICommentSendNewI {
  id: string
  timestamp: number
  body: string
  author: string
  parentId: string
}
export interface APIPostSendEditI {
  title: string
  body: string
}
export interface APICommentSendEditI {
  timestamp: number
  body: string
}

export const initialComment: APICommentI = {
  author: '',
  body: '',
  id: '',
  timestamp: 0,
  voteScore: 1,
  deleted: false,
  commentCount: 0,
  parentId: ''
}
export const initialPost: APIPostI = {
  author: '',
  title: '',
  body: '',
  id: '',
  timestamp: 0,
  voteScore: 1,
  deleted: false,
  commentCount: 0,
  category: ''
}
export const initializeNewPost = (category: string): APIPostI => ({
  ...initialPost, category, id: uuid(),
}
)
export const initializeNewComment = (parentId: string): APICommentI => ({
  ...initialComment, parentId, id: uuid(),
}
)

export const myFetch = (url: string, method: string = 'GET', body?: {}) => {
  return fetch(`${api}/${url}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => {
    if (res.status !== 200) {
      throw new Error(`${res.status}, ${res.statusText}`)
    }
    return res.json()
  })
}

type voteOption = 'upVote' | 'downVote'

export const CategoryAPI = {
  get: (): Promise<APICategoriesI[]> => {
    return myFetch('categories').then(data => data.categories)
  },
  getPostsInCategory: (category: string): Promise<APIPostI[]> => (
    myFetch(`${category}/posts`)
  )
}

export const PostAPI = {
  remove: (id: string) => myFetch(`posts/${id}`, 'DELETE'),
  get: (categoryID?: string): Promise<APIPostI[]> => {
    if (categoryID) {
      return PostAPI.getByCategory(categoryID)
    }
    return myFetch('posts')
  },
  getByID: (id: string): Promise<APIPostI> => myFetch(`posts/${id}`),
  getByCategory: (category: string) => CategoryAPI.getPostsInCategory(category),
  getComments: (id: string) => CommentAPI.get(id),
  add: (post: APIPostI) => {
    const { id, title, body, author, category } = post
    const postWithNewDate: APIPostSendNewI = {
      timestamp: Date.now(),
      id, title, body, author, category
    }
    return myFetch(`posts/`, 'POST', postWithNewDate)
  },
  edit: (post: APIPostI) => (
    myFetch(
      `posts/ ${post.id}`,
      'PUT',
      { title: post.title, body: post.body }
    )
  ),
  vote: (
    id: string,
    option: voteOption
  ) => myFetch(`posts/${id}`, 'POST', { option }),
}

export const CommentAPI = {
  remove: (id: string) => myFetch(`comments/${id}`, 'DELETE'),
  get: (id: string) => myFetch(`posts/${id}/comments`),
  add: (comment: APICommentI): Promise<APICommentI> => {
    const { id, body, author, parentId } = comment
    const postWithNewDate: APICommentSendNewI = {
      timestamp: Date.now(),
      id, body, author, parentId,
    }
    return myFetch(`comments/`, 'POST', postWithNewDate)
  },
  vote: (
    id: string,
    option: voteOption
  ) => myFetch(`comments/${id}`, 'POST', { option }),
  edit: (comment: APICommentI) => (
    myFetch(
      `comments/ ${comment.id}`,
      'PUT',
      { body: comment.body, timestamp: Date.now() }
    )
  ),
}

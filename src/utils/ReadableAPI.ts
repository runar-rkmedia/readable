import { PostI, CommentI } from '../components/'
import uuid from 'uuid'

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

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

export interface APIPostI {
  id: string
  timestamp: number | null
  title: string
  body: string
  author: string
  category: string
  voteScore: number
  deleted: boolean
  commentCount: number
}
export interface APICommentI {
  // TODO: Needs verification
  id: string
  timestamp: number | null
  title: string
  body: string
  author: string
  category: string
  voteScore: number
  deleted: boolean
  commentCount: number
}
export interface APIPostSendNewI {
  id: string
  timestamp: number | null
  title: string
  body: string
  author: string
  category: string
}
export interface APICommentSendNewI {
  id: string
  timestamp: number | null
  body: string
  author: string
  parentID: string
}
export interface APIPostSendEditI {
  title: string
  body: string
}
export interface APICommentSendEditI {
  timestamp: number | null
  body: string
}
export const initializeNewPost = (category: string): APIPostSendNewI => ({
  author: '',
  title: '',
  body: '',
  id: uuid(),
  timestamp: null,
  category
}
)

export const myFetch = (url: string, method: string = 'GET', body?: {}) => {
  return fetch(`${api}/${url}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => res.json())
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
  add: (post: PostI) => {
    const { id, title, body, author, category } = post
    const postWithNewDate: APIPostSendNewI = {
      timestamp: Date.now(),
      id, title, body, author, category
    }
    return myFetch(`posts/`, 'POST', postWithNewDate)
  },
  edit: (post: PostI) => (
    myFetch(
      `posts/${post.id}`,
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
  add: (comment: CommentI) => myFetch(`comments/`, 'POST', comment),
  vote: (
    id: string,
    option: voteOption
  ) => myFetch(`comments/${id}`, 'POST', { option }),
  edit: (comment: CommentI) => (
    myFetch(
      `comments/${comment.id}`,
      'PUT',
      { body: comment.body }
    )
  ),
}

import { PostInterface } from '../components/PostList'
import { CommentInterface } from '../components/Comment'

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

export interface APICategories {
  name: string
  path: string
}

export interface APIPost {
  id: string
  timestamp: number | null
  title: string
  body: string
  author: string
  category: string
}

export const myFetch = (url: string, method: string = 'GET', body?: {}) => {
  console.log(`fetching ${url} by ${method}`)
  return fetch(`${api}/${url}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  }).then(res => res.json())
}

type voteOption = 'upVote' | 'downVote'

export const CategoryAPI = {
  get: (): Promise<APICategories[]> => {
    return myFetch('categories').then(data => data.categories)
  },
  getPostsInCategory: (category: string): Promise<APIPost[]> => (
    myFetch(`${category}/posts`)
  )
}

export const PostAPI = {
  remove: (id: string) => myFetch(`posts/${id}`, 'DELETE'),
  get: (categoryID?: string): Promise<APIPost[]> => {
    if (categoryID) {
      return PostAPI.getByCategory(categoryID)
    }
    return myFetch('posts')
  },
  getByID: (id: string) => myFetch(`posts/${id}`),
  getByCategory: (category: string) => CategoryAPI.getPostsInCategory(category),
  getComments: (id: string) => CommentAPI.get(id),
  add: (post: PostInterface) => myFetch(`posts/`, 'POST', post),
  edit: (post: PostInterface) => (
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
  add: (comment: CommentInterface) => myFetch(`comments/`, 'POST', comment),
  vote: (
    id: string,
    option: voteOption
  ) => myFetch(`comments/${id}`, 'POST', { option }),
  edit: (comment: CommentInterface) => (
    myFetch(
      `comments/${comment.id}`,
      'PUT',
      { body: comment.body }
    )
  ),
}

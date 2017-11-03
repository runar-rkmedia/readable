import { Post } from '../components/Posts'
import { Comment } from '../components/Comment'

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
  get: (category?: string): Promise<APICategories[]> => {
    if (category) {
      return CategoryAPI.getPostsInCategory(category)
    }
    return myFetch('categories').then(data => data.categories)
  },
  getPostsInCategory: (category: string) => (
    myFetch(`${category}/posts`)
  )
}

export const PostAPI = {
  remove: (id: string) => myFetch(`posts/${id}`, 'DELETE'),
  get: (id?: string) => {
    if (id) {
      return PostAPI.getByID(id)
    }
    return myFetch('posts')
  },
  getByID: (id: string) => myFetch(`posts/${id}`),
  getByCategory: (category: string) => CategoryAPI.get(category),
  getComments: (id: string) => CommentAPI.get(id),
  add: (post: Post) => myFetch(`posts/`, 'POST', post),
  edit: (post: Post) => (
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
  add: (comment: Comment) => myFetch(`comments/`, 'POST', comment),
  vote: (
    id: string,
    option: voteOption
  ) => myFetch(`comments/${id}`, 'POST', { option }),
  edit: (comment: Comment) => (
    myFetch(
      `comments/${comment.id}`,
      'PUT',
      { body: comment.body }
    )
  ),
}

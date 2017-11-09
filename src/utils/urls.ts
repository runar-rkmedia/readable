import { APIPostI } from '../interfaces'

export const urls = {
  root: '/',
  category: (categoryID: string) => (`/category/${categoryID}`),
  addPost: (categoryID: string) => (`/category/${categoryID}/post/add`),
  editPost: (post: APIPostI) => (`/category/${post.category}/post/${post.id}/edit`),
  viewPost: (post: APIPostI) => (`/category/${post.category}/post/${post.id}`),
}

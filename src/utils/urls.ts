import { PostI } from '../interfaces'

export const urls = {
  root: '/',
  category: (categoryID: string) => (`/category/${categoryID}`),
  addPost: (categoryID: string) => (`/category/${categoryID}/post/add`),
  editPost: (post: PostI) => (`/category/${post.category}/post/${post.id}/edit`),
  viewPost: (post: PostI) => (`/category/${post.category}/post/${post.id}`),
}

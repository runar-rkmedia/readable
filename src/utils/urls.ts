import { PostI } from '../interfaces'

export default {
  root: '/',
  category: (categoryID: string) => (`/category/${categoryID}`),
  addPost: (categoryID: string) => (`/category/${categoryID}/post/add`),
  editPost: (categoryID: string) => (`/category/${categoryID}/post/edit`),
  viewPost: (post: PostI) => (`/category/${post.category}/post/${post.id}`),
}

import { PostInterface } from '../components/PostList'

export default {
  root: '/',
  category: (categoryID: string) => (`/category/${categoryID}`),
  addPost: (categoryID: string) => (`/category/${categoryID}/post/add`),
  editPost: (categoryID: string) => (`/category/${categoryID}/post/edit`),
  viewPost: (post: PostInterface) => (`/category/${post.category}/post/${post.id}`),
}

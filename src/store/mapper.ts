import { Dispatch } from 'react-redux'
import { Post } from '../components/Posts'
import { CatagoriesType } from '../components/Catagories'
import { getPost } from '../actions/posts'

export type StorePosts = Post[]

export function mapStateToProps(
  { posts, catagories }: { posts: StorePosts, catagories: CatagoriesType }
): any {
  return { posts, catagories }
}

export interface AppDispatchProps {
  getPost: any
}

export function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>): AppDispatchProps {
  return {
    getPost: (id: string) => dispatch(getPost({ id })),
  }
}

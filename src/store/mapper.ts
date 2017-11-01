import { Dispatch } from 'react-redux'
import { Posts } from '../components/Posts'
import { CatagoriesType } from '../components/Catagories'
import { getPost } from '../actions/posts'

export type StorePosts = Posts[]

export function mapStateToProps(
  { posts, catagories }: { posts: StorePosts, catagories: CatagoriesType }
): any {
  console.log('posts', catagories)
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

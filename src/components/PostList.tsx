import * as React from 'react'
import List from 'material-ui/List'
import PostItem from './PostItem'

export interface PostInterface {
  id: string
  timestamp: string
  title: string
  body: string
  author: string
  category: string
  voteScore: number,
  deleted: boolean
  commentCount: number
}

export default (props: {
  posts: PostInterface[]
  showCategory?: boolean
}) => {
  return (
    <List>
      {props.posts.map(post => (
        <PostItem post={post} key={post.id}/>
      ))}
    </List>
  )
}

import * as React from 'react'
import List from 'material-ui/List'
import PostItem from './PostItem'
import Divider from 'material-ui/Divider'

export interface PostI {
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

export const PostList = (props: {
  posts: PostI[]
  showCategory?: boolean
}) => {
  const postCount = props.posts.length
  return (
    <List>
      {props.posts.map((post, i) => (
        // For some reason, redux complaints of non-unique keys if I don't append this key with some string.
        <div key={'post ' + post.id}>
          <PostItem post={post}/>
          {postCount !== i + 1 && (
            <Divider inset={true}/>
          )}
        </div>
      ))}
    </List>
  )
}

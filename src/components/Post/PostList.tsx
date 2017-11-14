import * as React from 'react'
import List from 'material-ui/List'
import { PostItem } from './'
import { APIPostI } from 'interfaces'
import Divider from 'material-ui/Divider'

interface Props {
  posts: APIPostI[]
  showCategory?: boolean
}

export const PostList = (props: Props) => {
  const { posts, showCategory } = props
  const postCount = posts.length
  return (
    <List>
      {posts.map((post, i) => (
        <div key={'post' + post.id}>
          <PostItem {...{ post, showCategory }} />
          {postCount !== i + 1 && (
            <Divider inset={true} />
          )}
        </div>
      ))}
    </List>
  )
}

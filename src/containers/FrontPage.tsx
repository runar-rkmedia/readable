import * as React from 'react'
import Typography from 'material-ui/Typography'
import { PostList } from 'components'
import { APIPostI } from 'interfaces'

interface Props {
  posts: APIPostI[]
}

export const FrontPage = (props: Props) => {
  const { posts } = props
  return (
    <div>
      <Typography type="display3" gutterBottom={true}>Front page</Typography>
      <Typography type="subheading">
        Here there should be various sortable lists.
      </Typography>
      <PostList
        showCategory={true}
        posts={posts}
      />
    </div>
  )
}

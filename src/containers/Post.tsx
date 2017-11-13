import * as React from 'react'
import { APIPostI } from 'interfaces'
import { PostView } from 'components'
import { Comments } from './'
import LazyLoad from 'react-lazy-load'

interface Props {
  post: APIPostI
}

export const Post = (props: Props) => {
  const { post } = props
  return (
    <div>
      <PostView post={post} />
      <LazyLoad height={300} offsetVertical={300}>
        <Comments post={post} />
      </LazyLoad>
    </div>
  )
}

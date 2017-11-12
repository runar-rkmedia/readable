import * as React from 'react'
import { APIPostI } from '../interfaces'
import { PostView } from '../components'
import { Comments } from './'

interface Props {
  post: APIPostI
}

export const Post = (props: Props) => {
  const { post } = props
  return (
    <div>
      <PostView post={post} />
      <Comments post={post} />
    </div>
  )
}

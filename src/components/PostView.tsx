import * as React from 'react'
import { APIPostI } from '../interfaces'
import { PostHeader } from './'

import decorate from '../style'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import * as ReactMarkdown from 'react-markdown'

interface Props {
  post: APIPostI
  isVoting: boolean
  onVote: (post: APIPostI, isUpvote: boolean) => void
}

export const PostView = decorate<Props>((props) => {
  const { post, classes, isVoting, onVote } = props
  return (
    <Paper className={classes.formRoot} elevation={4}>
      <PostHeader {...{ post, isVoting, onVote }} />
      <Divider />
      <ReactMarkdown source={post.body} />
    </Paper>
  )
})

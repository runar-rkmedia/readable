import * as React from 'react'
import { APIPostI } from 'interfaces'
import { PostHeader } from './'

import decorate from 'style'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import * as ReactMarkdown from 'react-markdown'

interface Props {
  post: APIPostI
}

export const PostView = decorate<Props>((props) => {
  const { post, classes } = props
  return (
    <Paper className={classes.formRoot} elevation={4}>
      <PostHeader post={post} />
      <Divider />
      <ReactMarkdown escapeHtml={true} source={post.body} />
    </Paper>
  )
})

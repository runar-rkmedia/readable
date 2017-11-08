import * as React from 'react'
import { APIPostI } from '../interfaces'
import { CommentsRetriever, PostHeader } from './'
const classNames = require('classnames')

import decorate from '../style'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import * as ReactMarkdown from 'react-markdown'

interface Props {
  post: APIPostI
  hideComments?: boolean
}

export const PostView = decorate<Props>((props) => {
  const { post, classes, hideComments } = props
  return (
    <div className={classes.root}>
      <Paper className={classes.formRoot} elevation={4}>
        <PostHeader post={post} />
        <Divider />
        <ReactMarkdown source={post.body} />
      </Paper>
      {!hideComments && (
        <Paper className={classNames(classes.formRoot, classes.commentsPaper)} elevation={2}>
          <Typography type="title" gutterBottom={true}>
            Comments to this post
                </Typography>
          <CommentsRetriever post={post} />
        </Paper>
      )}
    </div>
  )
})

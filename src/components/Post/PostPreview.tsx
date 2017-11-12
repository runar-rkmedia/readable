import * as React from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import { APIPostI } from 'interfaces'
import { PostView } from './'
import decorate from 'style'

interface Props {
  post: APIPostI
}

export const PostPreview = decorate<Props>((props) => {
  const { classes, post } = props
  const hideComments = true
  const onVote = () => null
  const isVoting = false
  return (
    <div>
      <Paper className={classes.formRoot} elevation={4}>
        <Typography gutterBottom={true} type="headline" color="inherit">
          Below is a preview of your post.
              </Typography>
        <Typography gutterBottom={true} type="subheading" color="inherit">
          It has not been published yet.
                You can make changes and publish it by pressing the WRITE-button above.
                </Typography>
      </Paper>
      <PostView {...{ post, isVoting, onVote, hideComments }} />
    </div>
  )
})

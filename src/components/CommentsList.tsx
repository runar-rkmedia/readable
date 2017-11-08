import * as React from 'react'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'

import { CommentI } from '../interfaces'
import { CommentItem } from './'
import decorate from '../style'

interface Props {
  comments: CommentI[]
}

export const CommentsList = decorate<Props>((props) => {
  const { comments, classes } = props
  const commentsLength = comments.length
  return (
    <List className={classes.commentsList}>
      {comments.map((comment, i) => (
        <div key={comment.id} className={classes.commentItem}>
          <CommentItem comment={comment} />
          {commentsLength !== i + 1 && (
            // All comments, except the last
            <Divider className={classes.commentDivider} />
          )}
        </div>
      ))}
    </List>
  )
})

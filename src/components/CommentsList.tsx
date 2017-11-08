import * as React from 'react'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { withMyStyle, WithMyStyle } from '../style'

import { CommentI } from '../interfaces'
import { CommentItem } from './'

export const CommentsListC = (props: {
  comments: CommentI[]
} & WithMyStyle) => {
  const { comments, classes } = props
  const commentsLength = comments.length
  return (
    <List className={classes.commentsList}>
      {comments.map((comment, i) => (
        <div key={comment.id} className={classes.commentItem}>
          <CommentItem comment={comment} />
          {commentsLength !== i + 1 && (
            // All comments, except the last
            <Divider className={classes.commentDivider}/>
          )}
        </div>
      ))}
    </List>
  )
}
export const CommentsList = withMyStyle(CommentsListC)

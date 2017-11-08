import * as React from 'react'
import * as moment from 'moment'
import { CommentI } from '../interfaces'
import decorate from '../style'

interface Props {
  comment: CommentI
}

export const CommentItem = decorate<Props>((props) => {
  const { comment, classes } = props
  const {
    author,
    body,
    // parentDeleted,
    timestamp,
    // voteScore
  } = comment
  return (
    <div className={classes.comment}>
      <div
        className={classes.commentHeader}
      >
        <span className={classes.authorName}>{author}</span>
        <span className={classes.commentTime}>{moment(timestamp).calendar()}</span>
      </div>
      <div className={classes.commentBody}>{body}</div>
    </div>
  )
})

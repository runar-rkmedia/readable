import * as React from 'react'
import * as moment from 'moment'
import { APICommentI } from '../interfaces'
import decorate from '../style'
import { Voter } from './'

interface Props {
  comment: APICommentI
  onVote: (comment: APICommentI, isUpvote: boolean) => void
  isVoting: boolean
}

export const CommentItem = decorate<Props>((props) => {
  const { comment, classes, isVoting, onVote } = props
  const {
    author,
    body,
    // parentDeleted,
    timestamp,
    voteScore
  } = comment
  return (
    <div className={classes.comment}>
      <div className={classes.commentHeader}>
        <span>
          <span className={classes.authorName}>{author}</span>
          <span className={classes.commentTime}>{moment(timestamp).calendar()}</span>
        </span>
        <Voter
          onVote={(isUpvote: boolean) => onVote(comment, isUpvote)}
          voteScore={voteScore}
          isVoting={isVoting || false}
        />
      </div>
      <div className={classes.commentBody}>{body}</div>
    </div>
  )
})

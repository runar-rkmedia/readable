import * as React from 'react'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { connect, Dispatch, } from 'react-redux'
import { APICommentI, StoreStateI } from '../interfaces'
import { voteComment } from '../actions'
import { CommentItem } from './'
import decorate from '../style'

interface Props {
  comments: APICommentI[]
}

type commentslist = Props & MappedProps & DispatchProps

const CommentsListC = decorate<commentslist>((props) => {
  const { comments, classes, isVoting, onVote } = props
  const commentsLength = comments.length
  return (
    <List className={classes.commentsList}>
      {comments.map((comment, i) => (
        <div key={comment.id} className={classes.commentItem}>
          <CommentItem {...{isVoting, comment, onVote}} />
          {commentsLength !== i + 1 && (
            // All comments, except the last
            <Divider className={classes.commentDivider} />
          )}
        </div>
      ))}
    </List>
  )
})

interface MappedProps {
  isVoting: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  return {
    isVoting: state.comments.isVoting
  }
}
interface DispatchProps {
  onVote: (comment: APICommentI, isUpvote: boolean) => void,
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    onVote: (comment: APICommentI, isUpvote: boolean) => dispatch(voteComment(comment, isUpvote)),
    ...ownprops
  }
}

export const CommentsList = connect(mapStateToProps, mapDispatchToProps)(CommentsListC)

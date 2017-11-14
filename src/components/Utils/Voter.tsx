import * as React from 'react'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'
import decorate from 'style'
import { StoreStateI, APICommentI, APIPostI } from 'interfaces'
import { voteComment, votePost } from 'actions'
import { connect, Dispatch, } from 'react-redux'

interface Props {
  comment?: APICommentI
  post?: APIPostI
}

type ExtendedProps = Props & MappedProps & DispatchProps
export const VoterC = decorate<ExtendedProps>((props) => {
  const { comment, post, isVoting, onVotePost, onVoteComment, classes } = props

  let onVote: (isUpvote: boolean) => any
  let voteScore
  if (post) {
    voteScore = post.voteScore
    onVote = (isUpvote) => onVotePost(post, isUpvote)
  } else if (comment) {
    onVote = (isUpvote) => onVoteComment(comment, isUpvote)
    voteScore = comment.voteScore
  } else {
    return null
  }

  return (
    <span>
      <IconButton
        className={[classes.voteButton, classes.upVoteButton].join(' ')}
        aria-label="Vote up"
        onClick={() => onVote(true)}
        disabled={isVoting}
        color="primary"
      >
        <ThumbUp />
      </IconButton>
      <IconButton
        className={[classes.voteButton, classes.downVoteButton].join(' ')}
        aria-label="Vote down"
        onClick={() => onVote(false)}
        disabled={isVoting}
      >
        <ThumbDown />
      </IconButton>

    </span>
  )
})
interface MappedProps {
  isVoting: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  return {
    isVoting: state.comments.isVoting,
    ...ownprops
  }
}
interface DispatchProps {
  onVoteComment: (comment: APICommentI, isUpvote: boolean) => void,
  onVotePost: (post: APIPostI, isUpvote: boolean) => void,
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    onVoteComment: (comment: APICommentI, isUpvote: boolean) => dispatch(voteComment(comment, isUpvote)),
    onVotePost: (post: APIPostI, isUpvote: boolean) => dispatch(votePost(post, isUpvote)),
    ...ownprops
  }
}

export const Voter = connect(mapStateToProps, mapDispatchToProps)(VoterC)

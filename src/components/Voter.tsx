import * as React from 'react'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'
import decorate from '../style'

interface Props {
  voteScore: number
  isVoting: boolean
  onVote: (isUpvote: boolean) => void
}
export const Voter = decorate<Props>((props) => {
  const { voteScore, isVoting, onVote, classes } = props
  return (
    <span>
      {voteScore}
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
// export const Voter = decorate(VoterC)

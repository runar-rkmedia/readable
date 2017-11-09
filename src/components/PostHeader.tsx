import * as React from 'react'
import Typography from 'material-ui/Typography'
import * as moment from 'moment'
import { APIPostI } from '../interfaces'
import { Voter } from './'
import decorate from '../style'

interface Props {
  post: APIPostI
  isVoting: boolean
  onVote: (post: APIPostI, isUpvote: boolean) => void
}

export const PostHeader = decorate<Props>((props) => {
  const { post, isVoting, onVote, classes } = props
  const { author, title, voteScore, timestamp } = post
  const VoteFunc = onVote ?
    (isUpVoting: boolean) => onVote(post, isUpVoting) :
    (isUpVoting: boolean) => null
  const date = moment(timestamp || undefined).calendar()
  return (
    <div>
      <Typography gutterBottom={true} type="headline" color="inherit">
        {title}
      </Typography>
      <Typography type="subheading" color="inherit" className={classes.postcommentDetails}>
        <span>by {author}. {date}</span>
        <Voter
          onVote={VoteFunc}
          voteScore={voteScore}
          isVoting={isVoting || false}
        />
      </Typography>
    </div>
  )
})

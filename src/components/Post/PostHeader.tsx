import * as React from 'react'
import Typography from 'material-ui/Typography'
import ThumbsUpDown from 'material-ui-icons/ThumbsUpDown'
import Badge from 'material-ui/Badge'
import * as moment from 'moment'
import { APIPostI } from 'interfaces'
import { DelEditVote } from 'components'
import decorate, { WithStyles } from 'style'
const classNames = require('classnames')

interface Props {
  post: APIPostI
}
type ExtendedProps = Props & WithStyles
export const PostHeader = decorate(
  class extends React.Component<ExtendedProps> {
    render() {
      const { post, classes } = this.props
      const { author, title, timestamp, voteScore } = post
      const date = moment(timestamp || undefined).calendar()
      return (
        <div>
          <Badge
            badgeContent={voteScore}
            className={classNames(classes.pullRight,
              voteScore >= 0 ? classes.voteScoreBadgePositive
                : classes.voteScoreBadgeNegative)}
            color="default"
          ><ThumbsUpDown />
          </Badge>
          <Typography gutterBottom={true} type="headline" color="inherit">
            {title}
          </Typography>
          <Typography type="subheading" color="inherit" className={classes.postDetails}>
            <span>by {author}. {date}</span>
          </Typography>
          <DelEditVote
            post={post}
            styleName={classes.pullRightz}
            noBreakPoint={true}
          />
        </div>
      )
    }
  })

import * as React from 'react'
import MailIcon from 'material-ui-icons/Mail'
import decorate, { WithStyles } from 'style'
import Typography from 'material-ui/Typography'
import ThumbsUpDown from 'material-ui-icons/ThumbsUpDown'
import Hidden from 'material-ui/Hidden'
import Truncate from 'react-truncate'
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from 'material-ui/List'
import { mapCatagory } from 'store/mapper'
import { urls } from 'utils/'
import { DelEditVote } from 'components'
import * as moment from 'moment'
import Badge from 'material-ui/Badge'
import { APIPostI } from 'interfaces'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
const removeMd = require('remove-markdown')

interface Props {
  post: APIPostI
  showCategory?: boolean
}
type ExtendedProps = Props & WithStyles & DispatchProps
const PostItemC = decorate<ExtendedProps>((props) => {
  const {
     title, body, author, timestamp, category, commentCount, voteScore } = props.post
  const { classes, post, showCategory } = props
  return (
    <ListItem button={true} onClick={() => props.goTo(urls.viewPost(props.post))}>
      <ListItemIcon>
        <div >
          {commentCount ? (
            <Badge
              className={classes.commentCountBadge}
              badgeContent={commentCount}
              color="default"
            ><MailIcon />
            </Badge>
          ) : (
              <MailIcon />
            )}
          <Badge
            badgeContent={voteScore}
            className={
              voteScore >= 0 ? (classes as any).voteScoreBadgePositive
                : (classes as any).voteScoreBadgeNegative}
            color="default"
          ><ThumbsUpDown />
          </Badge>
        </div>
      </ListItemIcon>
      <div style={{ width: '100%' }}>
        <Typography type="subheading" >{title}</Typography>
        <Typography color="secondary" type="body1">
          by <strong>{author}</strong>
          {showCategory && (
            <span>
              , <Hidden mdDown={true}>
                posted in
              </Hidden> {mapCatagory(category).name}
            </span>
          )}
          <span>.
          <Hidden smUp={true}>
              <br />
            </Hidden> {moment(timestamp).calendar()}
          </span>
        </Typography>
        <div className={classes.postItemText}>
          <Truncate lines={3} ellipsis={<b> Click to read more</b>}>
            {removeMd(body)}
          </Truncate>
        </div>
      </div>
      <ListItemSecondaryAction className={classes.secondaryAction}>
        <DelEditVote post={post} />
      </ListItemSecondaryAction>
    </ListItem>
  )
})
interface DispatchProps {
  goTo: (category?: string) => void,
}

function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ): DispatchProps {
  return {
    goTo: (url: string) => dispatch(push(url)),
  }
}
const mapStateToProps = (state: any, ownprops: any) => {
  return {
    ...ownprops
  }
}
export const PostItem = connect(mapStateToProps, mapDispatchToProps)(PostItemC)

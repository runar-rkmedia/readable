import * as React from 'react'
import MailIcon from 'material-ui-icons/Mail'
import { withMyStyle, WithMyStyle } from '../style/base'
import DeleteIcon from 'material-ui-icons/Delete'
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import Typography from 'material-ui/Typography'
import Hidden from 'material-ui/Hidden'
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  // ListItemText,
} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import { mapCatagory } from '../store/mapper'
import * as moment from 'moment'
import Badge from 'material-ui/Badge'
import { PostInterface } from './PostList'

const PostItem = (props: {
  post: PostInterface
  showCategory?: boolean
} & WithMyStyle) => {
  const { id, title, author, timestamp, category, commentCount, voteScore } = props.post
  const { status } = props.theme
  return (
    <ListItem button={true} key={id}>
      <ListItemIcon>
        {commentCount ? (
          <Badge
            badgeContent={commentCount}
            color="primary"
          ><MailIcon />
          </Badge>
        ) : (
            <MailIcon />
          )}
      </ListItemIcon>
      <div>
        <Typography type="subheading" >{title}</Typography>
        <Typography color="secondary" type="body1">
          by <strong>{author}</strong>
          {props.showCategory && (
            `, posted in ${mapCatagory(category).name}`
          )}
          <span> at {moment(timestamp).calendar()}
          </span>
          <span> <Hidden mdDown={true}>popularity:</Hidden> {voteScore === 0 ? (voteScore) :
            (voteScore > 0 ? (
              <span
                style={{ color: status.upVote }}
              >
                {voteScore}
                <KeyboardArrowUp />
              </span>
            ) : (
                <span
                  style={{ color: status.downVote }}
                >
                  {voteScore}
                  <KeyboardArrowDown />
                </span>
              ))}
          </span>

        </Typography>
      </div>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default withMyStyle(PostItem)

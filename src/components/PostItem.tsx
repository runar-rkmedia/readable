import * as React from 'react'
import MailIcon from 'material-ui-icons/Mail'
import decorate, { WithStyles } from '../style'
import DeleteIcon from 'material-ui-icons/Delete'
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
import Typography from 'material-ui/Typography'
import Truncate from 'react-truncate'
import Hidden from 'material-ui/Hidden'
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  // ListItemText,
} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import { mapCatagory } from '../store/mapper'
import { urls } from '../utils/'
import * as moment from 'moment'
import Badge from 'material-ui/Badge'
import { PostI } from '../interfaces'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
const removeMd = require('remove-markdown')

interface Props {
  post: PostI
  showCategory?: boolean
}

const PostItemC = decorate<Props & WithStyles & DispatchProps>((props) => {
  const {
     title, body, author, timestamp, category, commentCount, voteScore } = props.post
  return (
    <ListItem button={true} onClick={() => props.goTo(urls.viewPost(props.post))}>
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
          <span>. {moment(timestamp).calendar()}
          </span>
          <span> <Hidden mdDown={true}>popularity:</Hidden> {voteScore === 0 ? (voteScore) :
            (voteScore > 0 ? (
              <span
                // style={{ color: status.upVote }}
              >
                {voteScore}
                <KeyboardArrowUp />
              </span>
            ) : (
                <span
                  // style={{ color: status.downVote }}
                >
                  {voteScore}
                  <KeyboardArrowDown />
                </span>
              ))}
          </span>
        </Typography>
        <div>
          <Truncate lines={3} ellipsis={<b> Click to read more</b>}>
            {removeMd(body)}
          </Truncate>
        </div>
      </div>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
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

import * as React from 'react'
import MailIcon from 'material-ui-icons/Mail'
import decorate, { WithStyles } from 'style'
import Typography from 'material-ui/Typography'
import Truncate from 'react-truncate'
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  // ListItemText,
} from 'material-ui/List'
import { mapCatagory } from 'store/mapper'
import { urls } from 'utils/'
import { Voter } from 'components'
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
     title, body, author, timestamp, category, commentCount } = props.post
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
        </Typography>
        <div>
          <Truncate lines={3} ellipsis={<b> Click to read more</b>}>
            {removeMd(body)}
          </Truncate>
        </div>
      </div>
      <ListItemSecondaryAction>
        <Voter post={props.post}/>
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

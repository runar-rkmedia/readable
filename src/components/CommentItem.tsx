import * as React from 'react'
// import MailIcon from 'material-ui-icons/Mail'
import { withMyStyle, WithMyStyle } from '../style'
// import DeleteIcon from 'material-ui-icons/Delete'
// import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
// import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
// import Typography from 'material-ui/Typography'
// import Hidden from 'material-ui/Hidden'
import {
  // ListItem,
  // ListItemIcon,
  // ListItemSecondaryAction,
  // ListItemText,
} from 'material-ui/List'
// import IconButton from 'material-ui/IconButton'
// import { mapCatagory } from '../store/mapper'
// import urls from '../utils/urls'
import * as moment from 'moment'
// import Badge from 'material-ui/Badge'
import { CommentI } from '../interfaces'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'

interface Props {
  comment: CommentI
}

const CommentItemC = (props: Props & WithMyStyle & DispatchProps) => {
  const { classes, comment } = props
  const {
    author,
    body,
    // parentDeleted,
    timestamp,
    // voteScore
  } = comment
  return (
    <div className={classes.comment}>
      <div
        className={classes.commentHeader}
      >
        <span className={classes.authorName}>{author}</span>
        <span className={classes.commentTime}>{moment(timestamp).calendar()}</span>
      </div>
      <div className={classes.commentBody}>{body}</div>
    </div>
  )
}
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
export const CommentItem = connect(mapStateToProps, mapDispatchToProps)(withMyStyle(CommentItemC))

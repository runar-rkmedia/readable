import * as React from 'react'
// import MailIcon from 'material-ui-icons/Mail'
import { withMyStyle, WithMyStyle } from '../style/base'
// import DeleteIcon from 'material-ui-icons/Delete'
// import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'
// import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown'
// import Typography from 'material-ui/Typography'
// import Hidden from 'material-ui/Hidden'
import {
  ListItem,
  // ListItemIcon,
  // ListItemSecondaryAction,
  // ListItemText,
} from 'material-ui/List'
// import IconButton from 'material-ui/IconButton'
// import { mapCatagory } from '../store/mapper'
// import urls from '../utils/urls'
// import * as moment from 'moment'
// import Badge from 'material-ui/Badge'
import { CommentI } from '../interfaces'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'

interface Props {
  comment: CommentI
}

const CommentItem = (props: Props & WithMyStyle & DispatchProps) => {
  return (
    <ListItem>
      Here there be a comment
    </ListItem>
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
export default connect(mapStateToProps, mapDispatchToProps)(withMyStyle(CommentItem))

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import Typography from 'material-ui/Typography'
import EditIcon from 'material-ui-icons/Edit'
import DeleteIcon from 'material-ui-icons/Delete'
import IconButton from 'material-ui/IconButton'
import * as moment from 'moment'
import { APIPostI } from 'interfaces'
import { Voter, DeleteDialog, DeleteDialogType } from 'components'
import decorate, { WithStyles } from 'style'
import { urls } from 'utils'

interface Props {
  post: APIPostI
}
type ExtendedProps = Props & WithStyles & AppDispatchProps
export const PostHeaderC = decorate(
  class extends React.Component<ExtendedProps> {
    delDialog: DeleteDialogType
    render() {
      const { post, classes, goTo } = this.props
      const { author, title, timestamp } = post
      const date = moment(timestamp || undefined).calendar()
      return (
        <div>
          <Typography gutterBottom={true} type="headline" color="inherit">
            {title}
          </Typography>
          <Typography type="subheading" color="inherit" className={classes.postcommentDetails}>
            <span>by {author}. {date}</span>
            <span>
              <IconButton onClick={() => goTo(urls.editPost(post))}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => this.delDialog.dialog.open()}>
                <DeleteIcon />
              </IconButton>
              <Voter post={post} />
            </span>
          </Typography>
          <DeleteDialog
            post={post}
            onRef={(ref: DeleteDialogType) => (this.delDialog = ref)}
          />
        </div>
      )
    }
  })

interface AppDispatchProps {
  goTo: (path: string) => void
}
function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goTo: (path: string) => dispatch(push(path)),
    ...ownprops
  }
}

export const PostHeader = connect(null, mapDispatchToProps)(PostHeaderC)

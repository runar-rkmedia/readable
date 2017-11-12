import * as React from 'react'
import * as moment from 'moment'
import { APICommentI } from 'interfaces'
import decorate, { WithStyles } from 'style'
import { FormHandler, FormHandlerType } from 'containers/'
import { Voter, DeleteDialog, DeleteDialogType } from 'components/'
import { initialComment } from 'utils'
import * as ReactMarkdown from 'react-markdown'
import DeleteIcon from 'material-ui-icons/Delete'
import IconButton from 'material-ui/IconButton'

interface Props {
  comment: APICommentI
  onToggleEdit: (comment: APICommentI) => void
  editingComment: boolean
}
type ExtendedProps = Props & WithStyles
export const CommentItem = decorate(
  class extends React.Component<ExtendedProps> {
    delDialog: DeleteDialogType
    render() {
      const {
    comment, classes, onToggleEdit, editingComment } = this.props
      const { author, body, timestamp } = comment
      return (
        <div className={classes.comment}>
          <div className={classes.commentHeader}>
            <span>
              <span className={classes.authorName}>{author}</span>
              <span className={classes.commentTime}>{moment(timestamp).calendar()}</span>
            </span>
            <span>
              <IconButton onClick={() => this.delDialog.dialog.open()}>
                <DeleteIcon />
              </IconButton>
              <Voter comment={comment} />
            </span>
          </div>
          {editingComment ? (
            <FormHandler
              type={FormHandlerType.editComment}
              comment={comment}
              submitCallBack={() => onToggleEdit(initialComment)}
            />

          ) : (
              <div onClick={() => onToggleEdit(comment)}>
                <ReactMarkdown
                  escapeHtml={true}
                  source={body}
                  disallowedTypes={['Heading']}
                  unwrapDisallowed={true}
                />
              </div>
            )}
          <DeleteDialog
            comment={comment}
            onRef={(ref: DeleteDialogType) => (this.delDialog = ref)}
          />
        </div>
      )
    }
  })

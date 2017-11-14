import * as React from 'react'
import * as moment from 'moment'
import { APICommentI } from 'interfaces'
import decorate, { WithStyles } from 'style'
import { FormHandler, FormHandlerType } from 'containers/'
import { DelEditVote } from 'components/'
import { initialComment } from 'utils'
import * as ReactMarkdown from 'react-markdown'

interface Props {
  comment: APICommentI
  onToggleEdit: (comment: APICommentI) => void
  editingComment: boolean
}
type ExtendedProps = Props & WithStyles
export const CommentItem = decorate(
  class extends React.Component<ExtendedProps> {
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
            <DelEditVote comment={comment} editAction={() => onToggleEdit(comment)} />
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
        </div>
      )
    }
  })

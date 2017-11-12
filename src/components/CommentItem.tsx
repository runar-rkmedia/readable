import * as React from 'react'
import * as moment from 'moment'
import { APICommentI } from '../interfaces'
import decorate from '../style'
import { FormHandler, FormHandlerType } from '../containers'
import { Voter } from './'
import { initialComment } from '../utils'
import * as ReactMarkdown from 'react-markdown'

interface Props {
  comment: APICommentI
  onToggleEdit: (comment: APICommentI) => void
  editingComment: boolean
}

export const CommentItem = decorate<Props>((props) => {
  const {
    comment, classes, onToggleEdit, editingComment} = props
  const { author, body, timestamp } = comment
  return (
    <div className={classes.comment}>
      <div className={classes.commentHeader}>
        <span>
          <span className={classes.authorName}>{author}</span>
          <span className={classes.commentTime}>{moment(timestamp).calendar()}</span>
        </span>
        <Voter comment={comment} />
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
})

import * as React from 'react'
import * as moment from 'moment'
import { APICommentI, CommentsFormProps } from '../interfaces'
import decorate from '../style'
import { Voter, LoadingButton } from './'
import * as ReactMarkdown from 'react-markdown'
import TextField from 'material-ui/TextField'
// import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

interface Props extends CommentsFormProps {
  comment: APICommentI
  onVote: (comment: APICommentI, isUpvote: boolean) => void
  isVoting: boolean
  onToggleEdit: (comment: APICommentI) => void
  editingComment: APICommentI | null
  handleFormChange: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CommentItem = decorate<Props>((props) => {
  const {
    comment, classes, isVoting, onVote, onToggleEdit, editingComment,
    onSubmitForm, commentIsSending, handleFormChange } = props
  const { author, body, timestamp, voteScore } = comment
  return (
    <div className={classes.comment}>
      <div className={classes.commentHeader}>
        <span>
          <span className={classes.authorName}>{author}</span>
          <span className={classes.commentTime}>{moment(timestamp).calendar()}</span>
        </span>
        <Voter
          onVote={(isUpvote: boolean) => onVote(comment, isUpvote)}
          voteScore={voteScore}
          isVoting={isVoting || false}
        />
      </div>
      {editingComment ? (
        <div>
        <Typography type="subheading">Editing comment by {author}</Typography>
          <TextField
            className={classes.editCommentField}
            label="Body text"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Your comment goes here."
            value={editingComment.body}
            helperText={`Markdown is supported.`}
            onChange={handleFormChange('body')}
            fullWidth={true}
            margin="normal"
            rowsMax={40}
            rows={5}
            multiline={true}
          />
          <LoadingButton
            onSubmit={() => onSubmitForm(editingComment)}
            showLoading={commentIsSending}
            isDisabled={commentIsSending || !editingComment.body}
            text={'Submit Comment'}
          />
        </div>

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

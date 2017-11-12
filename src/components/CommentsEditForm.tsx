import * as React from 'react'
import { APICommentI, APICommentSendNewI } from '../interfaces'

import decorate from '../style'
import { LoadingButton } from './'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

interface CommentsFormProps {
  comment: APICommentI
  onSubmitForm: (comment: APICommentSendNewI) => void
  commentIsSending: boolean
  handleFormChange: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CommentsEditForm = decorate<CommentsFormProps>((props) => {
  const { classes, onSubmitForm, commentIsSending, handleFormChange, comment } = props
  const { author, body } = comment
  return (
    <div>
      <Typography type="subheading">Editing comment by {author}</Typography>
      <TextField
        className={classes.editCommentField}
        label="Body text"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Your comment goes here."
        value={body}
        helperText={`Markdown is supported.`}
        onChange={handleFormChange('body')}
        fullWidth={true}
        margin="normal"
        rowsMax={40}
        rows={5}
        multiline={true}
      />
      <LoadingButton
        onSubmit={() => onSubmitForm(comment)}
        showLoading={commentIsSending}
        isDisabled={commentIsSending || !body}
        text={'Submit Comment'}
      />
    </div>
  )
})

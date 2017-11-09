import * as React from 'react'
import { APICommentI, APICommentSendNewI } from '../interfaces'
import { verifyOkToSubmitComment } from '../actions/'

import decorate from '../style'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import MenuIcon from 'material-ui-icons/Add'
import TextField from 'material-ui/TextField'
import { FormHelperText } from 'material-ui/Form'

// The maxiumum total payload-length is 102263, so we neeed to have
// some limit on input-length, and have a bit extra room for other stuff.
const maxLengths = {
  title: 100,
  author: 20,
  body: 99500
}

interface Props {
  onSubmit: (comment: APICommentSendNewI) => void
  comment: APICommentI
  commentIsSending: boolean
  handleChange: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CommentsForm = decorate<Props>((props) => {
  const { classes, onSubmit, commentIsSending, handleChange, comment } = props
  const { author, body } = comment
  return (
    <div>
      <TextField
        label="Author name"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Author name"
        value={author}
        helperText="Your name, or nickname"
        onChange={handleChange('author')}
        margin="normal"
      />
      <TextField
        className="fullWidthFix"
        label="Body text"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Your comment goes here."
        value={body}
        onChange={handleChange('body')}
        fullWidth={true}
        margin="normal"
        rowsMax={40}
        rows={5}
        multiline={true}
      />
      <FormHelperText>
        Body text {body.length} characters. (max {maxLengths.body}). <br/>
        Markdown allowed (except headlines)
      </FormHelperText>
      <Button
        disabled={commentIsSending || !verifyOkToSubmitComment(comment)}
        raised={true}
        color="primary"
        aria-label="Submit form"
        onClick={() => onSubmit(comment)}
        className={classes.button}
      >
        {commentIsSending ? (
          <CircularProgress size={18} />
        ) : (
            <MenuIcon />
          )}
        Submit Comment
      </Button>
    </div>
  )
})

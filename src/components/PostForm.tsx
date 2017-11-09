import * as React from 'react'
import { APIPostSendNewI, APIPostI } from '../interfaces'
import { verifyOkToSubmitPost } from '../actions/'

import decorate from '../style'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import MenuIcon from 'material-ui-icons/Add'
import TextField from 'material-ui/TextField'

// The maxiumum total payload-length is 102263, so we neeed to have
// some limit on input-length, and have a bit extra room for other stuff.
const maxLengths = {
  title: 100,
  author: 20,
  body: 99500
}

interface Props {
  onSubmit: (post: APIPostSendNewI) => void
  post: APIPostI
  postIsSending: boolean
  handleChange: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PostForm = decorate<Props>((props) => {
  const { classes, onSubmit, postIsSending, handleChange, post } = props
  const { author, title, body } = post
  return (
    <Paper className={classes.formRoot} elevation={4}>
      <TextField
        autoFocus={!author}
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
        autoFocus={!!author}
        className="fullWidthFix"
        label="Title"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Title"
        value={title}
        helperText="A nice little descriptive title here."
        onChange={handleChange('title')}
        fullWidth={true}
        margin="normal"
      />
      <TextField
        className="fullWidthFix"
        label="Body text"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Your post goes here."
        value={body}
        helperText={`Body text ${body.length} characters. (max ${maxLengths.body}). Markdown is supported.`}
        onChange={handleChange('body')}
        fullWidth={true}
        margin="normal"
        rowsMax={40}
        rows={5}
        multiline={true}
      />
      <Button
        disabled={postIsSending || !verifyOkToSubmitPost(post)}
        raised={true}
        color="primary"
        aria-label="Submit form"
        onClick={() => onSubmit(post)}
        className={classes.button}
      >
        {postIsSending ? (
          <CircularProgress size={18} />
        ) : (
            <MenuIcon />
          )}
        Submit Post
      </Button>
    </Paper>
  )
})

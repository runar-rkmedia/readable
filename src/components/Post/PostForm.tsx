import * as React from 'react'
import { APIPostSendNewI, APIPostI } from 'interfaces'
import { verifyOkToSubmitPost } from 'actions'
import { LoadingButton } from 'components'

import decorate, { WithStyles } from 'style'
import Paper from 'material-ui/Paper'
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
  edit?: boolean
  postIsSending: boolean
  handleFormChange: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
}
type ExtpendedProps = Props & WithStyles

export const PostForm = decorate<Props>((props: ExtpendedProps) => {
  const { classes, onSubmit, postIsSending, handleFormChange, post, edit } = props
  const { author, title, body } = post
  return (
    <Paper className={classes.formRoot} elevation={4}>
      <TextField
        disabled={edit}
        autoFocus={!author}
        label="Author name"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Author name"
        value={author}
        helperText="Your name, or nickname"
        onChange={handleFormChange('author')}
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
        onChange={handleFormChange('title')}
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
        onChange={handleFormChange('body')}
        fullWidth={true}
        margin="normal"
        rowsMax={40}
        rows={5}
        multiline={true}
      />
      <LoadingButton
        onSubmit={() => onSubmit(post)}
        showLoading={postIsSending}
        isDisabled={postIsSending || !verifyOkToSubmitPost(post)}
        text={'Submit Post'}
      />
    </Paper>
  )
})

import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Dispatch } from 'react-redux'

import { CategoryI, APIPostSendNewI } from '../interfaces'
import { verifyOkToSubmitPost } from '../actions/posts'

import { withMyStyle, WithMyStyle } from '../style/base'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import MenuIcon from 'material-ui-icons/Add'
import TextField from 'material-ui/TextField'

class PostForm extends React.Component<{
  onSubmit: (post: APIPostSendNewI) => void
  category: CategoryI
  post: APIPostSendNewI
  postIsSending: boolean
} & AppDispatchProps & WithMyStyle> {
  state: {
    post: APIPostSendNewI
  } = {
    post: { ...this.props.post }
  }
  handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      post: {
        ...this.state.post,
        [prop]: event.target.value,
      }
    })
  }

  render() {
    const { category, classes, onSubmit, postIsSending } = this.props
    const { author, title, body } = this.state.post
    return (
      <Paper className={classes.formRoot} elevation={4}>
        <Typography gutterBottom={true} type="headline" color="inherit" noWrap={true}>
          New post in {category.name}
        </Typography>
        <hr />
        <TextField
          className="fullWidthFix"
          label="Author name"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Author name"
          value={author}
          helperText="Your name, or nickname"
          onChange={this.handleChange('author')}
          margin="normal"
        />
        <TextField
          className="fullWidthFix"
          label="Title"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Title"
          value={title}
          helperText="Add a nice little descriptive title here."
          onChange={this.handleChange('title')}
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
          helperText="Body text"
          onChange={this.handleChange('body')}
          fullWidth={true}
          margin="normal"
          rowsMax={20}
          rows={5}
          multiline={true}
        />
        <div>
          <Button
            disabled={postIsSending || !verifyOkToSubmitPost(this.state.post)}
            raised={true}
            color="primary"
            aria-label="Submit form"
            onClick={() => onSubmit(this.state.post)}
            className={classes.button}
          >
            {postIsSending ? (
              <CircularProgress size={18} />
            ) : (
                <MenuIcon />
              )}
            Submit Post
          </Button>
        </div>
      </Paper>
    )
  }
}

interface AppDispatchProps {
  goHome: () => void
}
function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goHome: () => dispatch(push('/')),
    ...ownprops
  }
}

export default connect(null, mapDispatchToProps)(withMyStyle(PostForm))

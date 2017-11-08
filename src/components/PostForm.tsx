import * as React from 'react'
import { CategoryI, APIPostSendNewI, APIPostI } from '../interfaces'
import { verifyOkToSubmitPost } from '../actions/posts'
import { PostView } from './'

import decorate, { WithStyles } from '../style'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import MenuIcon from 'material-ui-icons/Add'
import TextFieldsIcon from 'material-ui-icons/TextFields'
import PreviewIcon from 'material-ui-icons/RemoveRedEye'
import TextField from 'material-ui/TextField'
import Tabs, { Tab } from 'material-ui/Tabs'

// The maxiumum total payload-length is 102263, so we neeed to have
// some limit on input-length, and have a bit extra room for other stuff.
const maxLengths = {
  title: 100,
  author: 20,
  body: 99500
}

interface Props {
  onSubmit: (post: APIPostSendNewI) => void
  category: CategoryI
  post: APIPostI
  postIsSending: boolean
}
type postform = Props & WithStyles

export const PostForm = decorate(
  class extends React.Component<postform> {
    state: {
      post: APIPostI,
      selectedTab: number
    }
    constructor(props: postform) {
      super(props)
      this.state = {
        post: props.post,
        selectedTab: 0
      }
    }
    handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value
      const maxLength = maxLengths[prop]
      if (maxLength && value.length > maxLength) {
        value = value.substring(0, maxLengths[prop])
      }
      this.setState({
        post: {
          ...this.state.post,
          [prop]: value,
        }
      })
    }
    handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
      this.setState({ selectedTab: value })
    }

    render() {
      if ('sdlkfjsdsd' === 'sdlkfjsdsd') {
        return null
      }
      const { category, classes, onSubmit, postIsSending, } = this.props
      const { author, title, body } = this.state.post
      return (
        <div>
          <Paper className={classes.formRoot} elevation={1}>
            <Tabs
              value={this.state.selectedTab}
              onChange={this.handleTabChange}
              fullWidth={true}
              indicatorColor="accent"
              textColor="accent"
            >
              <Tab icon={<TextFieldsIcon />} label="WRITE" />
              <Tab disabled={!verifyOkToSubmitPost(this.state.post)} icon={<PreviewIcon />} label="PREVIEW" />
            </Tabs>
          </Paper>
          {this.state.selectedTab === 1 ? (
            <div>
              <Paper className={classes.formRoot} elevation={4}>
                <Typography gutterBottom={true} type="headline" color="inherit">
                  Below is a preview of your post.
              </Typography>
                <Typography gutterBottom={true} type="subheading" color="inherit">
                  It has not been published yet.
                You can make changes and publish it by pressing the WRITE-button above.
                </Typography>
                </Paper>
                <PostView post={this.state.post} hideComments={true} />
            </div>
          ) : (
              <Paper className={classes.formRoot} elevation={4}>
                <Typography gutterBottom={true} type="headline" color="inherit" noWrap={true}>
                  New post in {category.name}
                </Typography>
                <hr />
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
                  label="Body text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Your post goes here."
                  value={body}
                  helperText={`Body text ${body.length} characters. (max ${maxLengths.body}). Markdown is supported.`}
                  onChange={this.handleChange('body')}
                  fullWidth={true}
                  margin="normal"
                  rowsMax={20}
                  rows={5}
                  multiline={true}
                />
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
              </Paper>
            )

          }
        </div >
      )
    }
  })

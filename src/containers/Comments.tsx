import * as React from 'react'
import { connect, Dispatch, } from 'react-redux'
import { APIPostI, APICommentI, StoreStateI } from '../interfaces'
import { addComment } from '../actions'
import { fetchComments } from '../actions'
import { CommentsList, CommentsForm } from '../components'
import { initializeNewComment } from '../utils/ReadableAPI'

import decorate, { WithStyles } from '../style/'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Paper from 'material-ui/Paper'
const classNames = require('classnames')

interface Props {
  post: APIPostI
}
interface State {
  comment: APICommentI
  newPostIsOpen: boolean
}

const maxLengths = {
  author: 20,
  body: 99500
}
type commentsprops = Props & WithStyles & DispatchProps & MappedProps
export const CommentsC = decorate(
  class extends React.Component<commentsprops, State> {
    componentDidMount() {
      this.props.fetchComments(this.props.post)
    }
    constructor(props: commentsprops) {
      super(props)
      this.state = {
        comment: this.newComment(),
        newPostIsOpen: false
      }
    }
    newComment = () => ({
      ...initializeNewComment(this.props.post.id),
        author: this.props.author
    })
    handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value
      const maxLength = maxLengths[prop]
      if (maxLength && value.length > maxLength) {
        value = value.substring(0, maxLengths[prop])
      }
      this.setState({
        comment: {
          ...this.state.comment,
          [prop]: value,
        }
      })
    }
    onSubmit = (comment: APICommentI) => {
      this.props.onAddComment(comment)
        .then(() => {
          this.setState({
            comment: this.newComment()
          })
          this.toggleNewPost(false)
        }
        )
    }
    toggleNewPost = (open: boolean = !this.state.newPostIsOpen) => {
      this.setState({
        newPostIsOpen: open
      })
    }

    render() {
      const { state, props, onSubmit, handleChange, toggleNewPost } = this
      const { classes, post, commentIsSending, comments } = props
      const { comment, newPostIsOpen } = state
      return (
        <div>
          <Paper className={classNames(classes.formRoot, classes.commentsPaper, classes)} elevation={2}>
            <Typography type="subheading" gutterBottom={true}>
              {post.commentCount ? 'Comments to this post:' : 'Be the very first to post a comment to this post.'}
            </Typography>
            <CommentsList comments={comments} />
          </Paper>
          {newPostIsOpen ? (
            <Paper className={classNames(classes.formRoot, classes.commentsPaper)} elevation={2}>
              <Typography type="subheading" gutterBottom={true}>
                Post a comment
                      </Typography>
              <CommentsForm
                {...{ comment, commentIsSending, onSubmit, handleChange }}
              />
            </Paper>
          ) : (
              <Button
                fab={true}
                color="primary"
                aria-label="add"
                className={classNames(classes.button, classes.pullRight)}
                onClick={() => toggleNewPost()}
              ><AddIcon />
              </Button>
            )}
        </div>
      )
    }
  }
)
interface MappedProps {
  comments: APICommentI[]
  commentIsSending: boolean
  author: string
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { comments, author } = state
  return {
    comments: Object.keys(comments.items).map(
      key => comments.items[key]).filter(
      c => c.parentId === ownprops.post.id
      ),
    author: author.name,
    ...ownprops
  }
}
interface DispatchProps {
  fetchComments: (post: APIPostI) => void,
  onAddComment: (comment: APICommentI) => Promise<APIPostI>,
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    fetchComments: (post: APIPostI) => dispatch(fetchComments(post.id)),
    onAddComment: (comment: APICommentI) => dispatch(addComment(comment)),
    ...ownprops
  }
}

export const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsC)

import * as React from 'react'
import { connect, Dispatch, } from 'react-redux'
import { APIPostI, APICommentI, StoreStateI } from '../interfaces'
import { addComment, editComment as editCommentA } from '../actions'
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
    handleFormChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
    onSubmitForm = (func: any, comment: APICommentI) => {
      func(comment)
        .then(() => {
          this.setState({
            comment: this.newComment()
          })
          this.toggleNewPost(false)
        }
        )
    }
    onSubmitEdit = (comment: APICommentI) => {
      this.onSubmitForm(this.props.onEditComment, comment)
    }
    onSubmitNew = (comment: APICommentI) => {
      this.onSubmitForm(this.props.onAddComment, comment)
    }
    toggleNewPost = (open: boolean = !this.state.newPostIsOpen) => {
      this.setState({
        newPostIsOpen: open,
        comment: this.newComment()
      })
    }
    editComment = (comment: APICommentI) => this.setState({ comment })

    render() {
      const { state, props, onSubmitNew, onSubmitEdit, handleFormChange, toggleNewPost, editComment } = this
      const { classes, post, commentIsSending, comments, author } = props
      const { comment, newPostIsOpen } = state
      return (
        <div>
          <Paper className={classNames(classes.formRoot, classes.commentsPaper, classes)} elevation={2}>
            <Typography type="title">
              {post.commentCount ? 'Comments to this post:' : 'Be the very first to post a comment to this post.'}
            </Typography>
            {post.commentCount && (
              <Typography type="body2" gutterBottom={true}>
                To edit a comment, click on its text.
              </Typography>
            )}

            <CommentsList
              {...{
                comments, onSubmitForm: onSubmitEdit, commentIsSending, handleFormChange, author, comment, editComment
              }}
            />
          </Paper>
          {newPostIsOpen ? (
            <Paper className={classNames(classes.formRoot, classes.commentsPaper)} elevation={2}>
              <Typography type="subheading" gutterBottom={true}>
                Post a comment
                      </Typography>
              <CommentsForm
                {...{
                  comment, commentIsSending, handleFormChange,
                  onSubmitForm: onSubmitNew
                }}
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
  onAddComment: (comment: APICommentI) => Promise<APICommentI>,
  onEditComment: (comment: APICommentI) => Promise<APICommentI>,
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    fetchComments: (post: APIPostI) => dispatch(fetchComments(post.id)),
    onAddComment: (comment: APICommentI) => dispatch(addComment(comment)),
    onEditComment: (comment: APICommentI) => dispatch(editCommentA(comment)),
    ...ownprops
  }
}

export const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsC)

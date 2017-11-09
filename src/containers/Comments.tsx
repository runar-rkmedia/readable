import * as React from 'react'
import { connect, Dispatch, } from 'react-redux'
import { APIPostI, APICommentI, StoreStateI } from '../interfaces'
import { addComment } from '../actions'
import { fetchComments } from '../actions'
import { CommentsList, CommentsForm } from '../components'
import { initializeNewComment } from '../utils/ReadableAPI'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import decorate, { WithStyles } from '../style/'
import { } from './'
const classNames = require('classnames')

interface Props {
  post: APIPostI
}
interface State {
  comment: APICommentI
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
        comment: initializeNewComment(props.post.id)
      }
    }
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
    render() {
      const { classes, post, commentIsSending, onAddComment } = this.props
      return (
        <div>
          <Paper className={classNames(classes.formRoot, classes.commentsPaper)} elevation={2}>
            <Typography type="subheading" gutterBottom={true}>
              {post.commentCount ? 'Comments to this post:' : 'Be the very first to post a comment to this post.'}
            </Typography>
            <CommentsList comments={this.props.comments} />
          </Paper>
          <Paper className={classNames(classes.formRoot, classes.commentsPaper)} elevation={2}>
            <Typography type="subheading" gutterBottom={true}>
              Post a comment
          </Typography>
            <CommentsForm
              comment={this.state.comment}
              commentIsSending={commentIsSending}
              onSubmit={onAddComment}
              handleChange={this.handleChange}
            />
          </Paper>
        </div>
      )
    }
  }
)
interface MappedProps {
  comments: APICommentI[]
  commentIsSending: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { comments } = state
  return {
    comments: Object.keys(comments.items).map(
      key => comments.items[key]).filter(
      c => c.parentId === ownprops.post.id
      ),
    ...ownprops
  }
}
interface DispatchProps {
  fetchComments: (post: APIPostI) => void,
  onAddComment: (comment: APICommentI) => void,
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    fetchComments: (post: APIPostI) => dispatch(fetchComments(post.id)),
    onAddComment: (comment: APICommentI) => dispatch(addComment(comment)),
    ...ownprops
  }
}

export const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsC)

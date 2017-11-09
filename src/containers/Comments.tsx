import * as React from 'react'
import { connect, Dispatch, } from 'react-redux'
import { APIPostI, APICommentI, StoreStateI } from '../interfaces'
import { fetchComments } from '../actions'
import { CommentsList } from '../components'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import decorate, { WithStyles } from '../style/'
import { } from './'
const classNames = require('classnames')

interface OwnProps {
  post: APIPostI
}
export const CommentsC = decorate(
  class extends React.Component<OwnProps & WithStyles & DispatchProps & MappedProps> {
    componentDidMount() {
      this.props.fetchComments(this.props.post)
    }
    render() {
      const { classes, post } = this.props
      return (
        <div>
          <Paper className={classNames(classes.formRoot, classes.commentsPaper)} elevation={2}>
            <Typography type="subheading" gutterBottom={true}>
              {post.commentCount ? 'Comments to this post:' : 'Be the very first to post a comment to this post.'}
            </Typography>
            <CommentsList comments={this.props.comments} />
          </Paper>
        </div>
      )
    }
  }
)
interface MappedProps {
  comments: APICommentI[]
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
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    fetchComments: (post: APIPostI) => dispatch(fetchComments(post.id)),
    ...ownprops
  }
}

export const Comments = connect(mapStateToProps, mapDispatchToProps)(CommentsC)

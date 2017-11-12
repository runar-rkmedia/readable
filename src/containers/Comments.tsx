import * as React from 'react'
import { connect, Dispatch, } from 'react-redux'
import { APIPostI, APICommentI, StoreStateI } from 'interfaces'
import { fetchComments } from 'actions'
import { CommentsList } from 'components'
import { initializeNewComment } from 'utils/ReadableAPI'
import { FormHandler, FormHandlerType } from './'

import decorate, { WithStyles } from 'style'
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
    newComment = () => initializeNewComment(this.props.post.id)
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
    toggleNewPost = (open: boolean = !this.state.newPostIsOpen) => {
      this.setState({
        newPostIsOpen: open,
        comment: this.newComment()
      })
    }

    render() {
      const { state, props, toggleNewPost, newComment } = this
      const { classes, post, comments } = props
      const { newPostIsOpen } = state
      return (
        <div>
          <Paper className={classNames(classes.formRoot, classes.commentsPaper, classes)} elevation={2}>
            <Typography type="title">
              {(!!post.commentCount || !!comments.length) ?
                'Comments to this post:' : 'Be the very first to post a comment to this post.'}
            </Typography>
            {!post.commentCount && (
              <Typography type="body2" gutterBottom={true}>
                To edit a comment, click on its text.
              </Typography>
            )}
            <CommentsList comments={comments} />
          </Paper>
          {newPostIsOpen ? (
            <Paper className={classNames(classes.formRoot, classes.commentsPaper)} elevation={2}>
              <Typography type="subheading" gutterBottom={true}>
                Post a comment
                      </Typography>
              <FormHandler
                comment={newComment()}
                type={FormHandlerType.addComment}
                submitCallBack={() => { toggleNewPost(false) }}
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

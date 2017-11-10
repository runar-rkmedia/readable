import * as React from 'react'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { connect, Dispatch, } from 'react-redux'
import { APICommentI, StoreStateI, CommentsFormProps } from '../interfaces'
import { voteComment } from '../actions'
import { CommentItem } from './'
import decorate, { WithStyles } from '../style'

interface Props extends CommentsFormProps {
  comments: APICommentI[]
  author: string
  editComment: (comment: APICommentI) => void
}
interface State {
  currentlyEditingCommentID: string
}

type commentslist = Props & MappedProps & DispatchProps & WithStyles

export const CommentsListC = decorate(
  class extends React.Component<commentslist, State> {
    constructor(props: commentslist) {
      super(props)
      this.state = {
        currentlyEditingCommentID: ''
      }
    }
    handleCurrentlyEditing = (commentId: string) => {
      this.setState({
        currentlyEditingCommentID: commentId
      })
    }
    render() {
      const {
         comments, classes, isVoting, onVote, onSubmitForm, commentIsSending,
        handleFormChange, editComment } = this.props
      const commentsLength = comments.length
      const editingComment = this.props.comment
      return (
        <List className={classes.commentsList}>
          {comments.map((comment, i) => (
            <div key={comment.id} className={classes.commentItem}>
              <div>
                <CommentItem
                  {...{
                    comment, isVoting, onVote,
                    handleFormChange, onSubmitForm, commentIsSending,
                    editingComment: editingComment.id === comment.id ? editingComment : null,
                    onToggleEdit: () => editComment(comment)
                  }}
                />
                {commentsLength !== i + 1 && (
                  // All comments, except the last
                  <Divider className={classes.commentDivider} />
                )}
              </div>
            </div>
          ))}
        </List>
      )
    }
  })

interface MappedProps {
  isVoting: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  return {
    isVoting: state.comments.isVoting,
    ...ownprops
  }
}
interface DispatchProps {
  onVote: (comment: APICommentI, isUpvote: boolean) => void,
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    onVote: (comment: APICommentI, isUpvote: boolean) => dispatch(voteComment(comment, isUpvote)),
    ...ownprops
  }
}

export const CommentsList = connect(mapStateToProps, mapDispatchToProps)(CommentsListC)

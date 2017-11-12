import * as React from 'react'
import List from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { APICommentI } from 'interfaces'
import { CommentItem } from './'
import decorate, { WithStyles } from 'style'

interface Props {
  comments: APICommentI[]
}
interface State {
  editingComment: string
}

type commentslist = Props & WithStyles

export const CommentsList = decorate(
  class extends React.Component<commentslist, State> {
    constructor(props: commentslist) {
      super(props)
      this.state = {
        editingComment: ''
      }
    }
    handleCurrentlyEditing = (commentId: string) => {
      this.setState({
        editingComment: commentId
      })
    }
    onToggleEdit = (comment: APICommentI) => {
      this.setState({
        editingComment: comment.id
      })
    }
    render() {
      const { onToggleEdit } = this
      const { comments, classes } = this.props
      const commentsLength = comments.length
      return (
        <List className={classes.commentsList}>
          {comments.map((comment, i) => (
            <div key={comment.id} className={classes.commentItem}>
              <div>
                <CommentItem
                  {...{
                    comment,
                    onToggleEdit,
                    editingComment: !!this.state.editingComment
                  }}
                />
                {commentsLength !== i + 1 && (
                  // All comments, except the lastonToggleEdit
                  <Divider className={classes.commentDivider} />
                )}
              </div>
            </div>
          ))}
        </List>
      )
    }
  })

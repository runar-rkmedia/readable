import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { APIPostI, APICommentI, StoreStateI } from 'interfaces'
import { deletePost, deleteComment } from 'actions'
import { MyDialog } from './'
import { urls } from 'utils'

interface Props {
  post?: APIPostI
  comment?: APICommentI
  onRef: (f: any) => any
  open?: boolean
}
type ExtendedProps = Props & AppDispatchProps & MappedProps
export type DeleteDialogType = DeleteDialogC
class DeleteDialogC extends React.Component<ExtendedProps> {
  dialog: MyDialog
  componentDidMount() {
    this.props.onRef(this)
  }
  delete = () => {
    const { post } = this.props
    const action = post ?
      this.deletePost : this.deleteComment
    action()
  }
  deletePost = () => {
    const { goTo, post, currentPath } = this.props
    if (post) {
      this.props.deletePost(post!)
        .then(() => {
          if (currentPath !== '/') {
            goTo(urls.category(post!.category))
          }
        })
    }
  }
  deleteComment = () => {
    this.props.deleteComment(this.props.comment!)
  }
  render() {

    const isPost = !!this.props.post
    const isComment = !!this.props.comment
    return (
      <MyDialog
        title="Delete?"
        OKCallback={this.delete}
        open={this.props.open || false}
        agreeText="Delete"
        onRef={(ref: MyDialog) => (this.dialog = ref)}
      >
        Are you sure you want to delete this {isPost ? 'post' : isComment ? 'comment' : 'unknown item'}?
      </MyDialog>
    )
  }
}
interface MappedProps extends Props {
  currentPath: string
}
const mapStateToProps = ({ router }: StoreStateI, ownprops: any) => {
  return {
    currentPath: router!.location!.pathname,
    ...ownprops
  }
}
interface AppDispatchProps {
  goTo: (path: string) => void
  deleteComment: (comment: APICommentI) => Promise<any>
  deletePost: (post: APIPostI) => Promise<any>
}
function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goTo: (path: string) => dispatch(push(path)),
    deleteComment: (comment: APICommentI) => dispatch(deleteComment(comment)),
    deletePost: (post: APIPostI) => dispatch(deletePost(post)),
    ...ownprops
  }
}

export const DeleteDialog = connect(mapStateToProps, mapDispatchToProps)(DeleteDialogC)

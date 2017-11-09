import * as React from 'react'
import { connect, Dispatch, } from 'react-redux'
import { APIPostI, APICommentI, StoreStateI } from '../interfaces'
import { fetchComments } from '../actions'
import { CommentsList } from './'
import decorate, { WithStyles } from '../style/'
import { } from './'

interface OwnProps {
  post: APIPostI
}
export const CommentsRetrieverC = decorate(
  class extends React.Component<OwnProps & WithStyles & DispatchProps & MappedProps> {
    componentDidMount() {
      this.props.fetchComments(this.props.post)
    }
    render() {

      return (
        <CommentsList comments={this.props.comments} />
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

export const CommentsRetriever = connect(mapStateToProps, mapDispatchToProps)(CommentsRetrieverC)

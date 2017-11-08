import * as React from 'react'
import { connect, Dispatch, } from 'react-redux'
import { push } from 'react-router-redux'
import { PostI, CommentI, StoreStateI } from '../interfaces'
import { fetchComments } from '../actions'
import { CommentsList } from './'
import decorate, { WithStyles } from '../style/'
import { } from './'

interface OwnProps {
  post: PostI
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
  comments: CommentI[]
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
  fetchComments: (post: PostI) => void,
  // addNewPost: (post: PostI) => void,
  // voteOnPost: (post: PostI, isUpVote: boolean) => void,
  goTo: (path: string) => void,
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    goTo: (path: string) => dispatch(push(path)),
    fetchComments: (post: PostI) => dispatch(fetchComments(post.id)),
    ...ownprops
  }
}

export const CommentsRetriever = connect(mapStateToProps, mapDispatchToProps)(CommentsRetrieverC)

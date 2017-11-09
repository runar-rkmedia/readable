import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { APIPostI, StoreStateI } from '../interfaces'
import { PostView } from '../components'
import { Comments } from './'
import { votePost } from '../actions'

import decorate from '../style'

interface Props {
  post: APIPostI
}

type postcontainer = Props & MappedProps & DispatchProps

export const PostC = decorate<postcontainer>((props) => {
  const { post, isVoting, onVote } = props
  return (
    <div>
      <PostView
        post={post}
        isVoting={isVoting}
        onVote={onVote}
      />
      <Comments post={post} />
    </div>
  )
})

interface MappedProps {
  isVoting: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  return {
    isVoting: state.posts.isVoting
  }
}
interface DispatchProps {
  onVote: (post: APIPostI, isUpvote: boolean) => void,
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    onVote: (post: APIPostI, isUpvote: boolean) => dispatch(votePost(post, isUpvote)),
    ...ownprops
  }
}

export const Post = connect(mapStateToProps, mapDispatchToProps)(PostC)

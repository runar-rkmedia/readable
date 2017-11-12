import * as React from 'react'
import { APIPostI, APICommentI, StoreStateI } from '../interfaces'
import { PostForm, CommentsForm, CommentsEditForm } from '../components'
import { connect, Dispatch } from 'react-redux'

import { addPost, editComment, addComment, editPost } from '../actions/'

// The maxiumum total payload-length is 102263, so we neeed to have
// some limit on input-length, and have a bit extra room for other stuff.
const maxLengths = {
  title: 100,
  author: 20,
  body: 99500
}

export enum FormHandlerType {
  editComment, addComment, editPost, addPost
}
interface Base {
  post?: APIPostI
  comment?: APICommentI
}

interface Props extends Base {
  type: FormHandlerType
  submitCallBack?: ({ post, comment }: Base) => any
}
interface State {
  post: APIPostI
  comment: APICommentI
}
type postform = Props & MappedProps & DispatchProps

class FormHandlerC extends React.Component<postform, State> {
  state: State
  onSubmit = {
    post: {
      new: (post: APIPostI) => {
        this.props.addNewPost(post)
          .then(() => this.callback({post: post}))
      },
      edit: (post: APIPostI) => {
        this.props.editPost(post)
          .then(() => this.callback({post: post}))
      }
    },
    comment: {
      new: (comment: APICommentI) => {
        this.props.addNewComment(comment)
          .then(() => this.callback({comment: comment}))
      },
      edit: (comment: APICommentI) => {
        this.props.editComment(comment)
          .then(() => this.callback({comment}))
      }
    }
  }
  callback = (data: Base) => {
    if (this.props.submitCallBack) {
      this.props.submitCallBack(data)
    }
  }
  isPost = () => [FormHandlerType.addPost, FormHandlerType.editPost].includes(this.props.type)

  isComment = () => [FormHandlerType.addComment, FormHandlerType.editComment].includes(this.props.type)

  constructor(props: postform) {
    super(props)
    let { type, author } = this.props
    let post = (this.props.post as APIPostI)
    let comment = (this.props.comment as APICommentI)
    if (type === FormHandlerType.addPost) {
      post = {...post, author}
    }
    if (type === FormHandlerType.addComment) {
      comment = {...comment, author}
    }
    this.state = {
      post,
      comment,
    }

  }
  handleFormChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    const maxLength = maxLengths[prop]
    if (maxLength && value.length > maxLength) {
      value = value.substring(0, maxLengths[prop])
    }
    if (this.isPost()) {
      this.setState({
        post: {
          ...this.state.post,
          [prop]: value,
        }
      })
    } else if (this.isComment()) {
      this.setState({
        comment: {
          ...this.state.comment,
          [prop]: value,
        }
      })
    }

  }

  render() {
    const { onSubmit, handleFormChange } = this
    const { postIsSending, commentIsSending, type } = this.props
    const { post, comment } = this.state
    const passedPostProps = { handleFormChange, postIsSending, post }
    const passedCommentProps = { handleFormChange, commentIsSending, comment }
    switch (type) {
      case FormHandlerType.addPost:
        return (
          <PostForm
            onSubmit={onSubmit.post.new}
            {...passedPostProps}
          />
        )
      case FormHandlerType.editPost:
        return (
          <PostForm
            edit={true}
            onSubmit={onSubmit.post.edit}
            {...passedPostProps}
          />
        )
      case FormHandlerType.addComment:
        return (
          <CommentsForm
            onSubmitForm={onSubmit.comment.new}
            {...passedCommentProps}
          />
        )
      case FormHandlerType.editComment:
        return (
          <CommentsEditForm
            onSubmitForm={onSubmit.comment.new}
            {...passedCommentProps}
          />
        )
      default:
        return (
          <div>Missing type, got {type}</div >
        )
    }
  }
}

interface MappedProps extends Props {
  postIsSending: boolean
  commentIsSending: boolean
  loading: boolean
  author: string
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { posts, author, comments } = state
  return {
    postIsSending: posts.sending,
    commentIsSending: comments.sending,
    author: author.name,
    ...ownprops
  }
}

interface DispatchProps {
  addNewPost: (post: APIPostI) => Promise<any>,
  addNewComment: (comment: APICommentI) => Promise<any>,
  editComment: (comment: APICommentI) => Promise<any>,
  editPost: (post: APIPostI) => Promise<any>,
}

function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ): DispatchProps {
  return {
    addNewPost: (post) => dispatch(addPost(post)),
    addNewComment: (comment) => dispatch(addComment(comment)),
    editComment: (comment) => dispatch(editComment(comment)),
    editPost: (Post) => dispatch(editPost(Post)),
  }
}
export const FormHandler = connect(
  mapStateToProps, mapDispatchToProps
)(FormHandlerC)

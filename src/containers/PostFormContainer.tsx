import * as React from 'react'
import { APIPostSendNewI, APIPostI } from 'interfaces'
import { verifyOkToSubmitPost } from 'actions/'
import { PostPreview, PostForm } from 'components'
import { formMaxLengths } from './'

import decorate, { WithStyles } from 'style'
import Paper from 'material-ui/Paper'
import TextFieldsIcon from 'material-ui-icons/TextFields'
import PreviewIcon from 'material-ui-icons/RemoveRedEye'
import Tabs, { Tab } from 'material-ui/Tabs'
interface Props {
  onSubmitForm: (post: APIPostSendNewI) => void
  post: APIPostI
  postIsSending: boolean
}
type postform = Props & WithStyles

export const PostFormContainer = decorate(
  class extends React.Component<postform> {
    state: {
      post: APIPostI,
      selectedTab: number
    }
    constructor(props: postform) {
      super(props)
      this.state = {
        post: props.post,
        selectedTab: 0
      }
    }
    handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value
      const maxLength = formMaxLengths[prop]
      if (maxLength && value.length > maxLength) {
        value = value.substring(0, formMaxLengths[prop])
      }
      this.setState({
        post: {
          ...this.state.post,
          [prop]: value,
        }
      })
    }
    handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
      this.setState({ selectedTab: value })
    }

    render() {
      const { classes, onSubmitForm, postIsSending, } = this.props
      const { post, selectedTab } = this.state
      return (
        <div>
          <Paper className={classes.formRoot} elevation={1}>
            <Tabs
              value={selectedTab}
              onChange={this.handleTabChange}
              fullWidth={true}
              indicatorColor="accent"
              textColor="accent"
            >
              <Tab icon={<TextFieldsIcon />} label="WRITE" />
              <Tab disabled={!verifyOkToSubmitPost(post)} icon={<PreviewIcon />} label="PREVIEW" />
            </Tabs>
          </Paper>
          {selectedTab === 1 ? (
            <PostPreview post={post} />
          ) : (
              <PostForm
                onSubmit={onSubmitForm}
                post={post}
                postIsSending={postIsSending}
                handleFormChange={this.handleChange}
              />
            )
          }
        </div >
      )
    }
  })

import * as React from 'react'
import { APIPostI } from 'interfaces'
import { verifyOkToSubmitPost } from 'actions'
import { PostPreview } from 'components'
import { FormHandler, FormHandlerType } from './'

import decorate, { WithStyles } from 'style'
import Paper from 'material-ui/Paper'
import TextFieldsIcon from 'material-ui-icons/TextFields'
import PreviewIcon from 'material-ui-icons/RemoveRedEye'
import Tabs, { Tab } from 'material-ui/Tabs'

interface Props {
  post: APIPostI
  edit?: boolean
}
type postform = Props & WithStyles

export const PostFormView = decorate(
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
    handleTabChange = (e: React.ChangeEvent<{}>, value: number) => {
      this.setState({ selectedTab: value })
    }

    render() {
      const { classes, edit } = this.props
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
              <FormHandler
                type={edit ? FormHandlerType.editPost : FormHandlerType.addPost}
                post={post}
              />
            )
          }
        </div >
      )
    }
  })

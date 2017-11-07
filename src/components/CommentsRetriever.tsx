import * as React from 'react'
import { connect, Dispatch, } from 'react-redux'
import { push } from 'react-router-redux'
import List from 'material-ui/List'
import { PostI } from '../interfaces'
import { withMyStyle } from '../style/'
import { } from './'

export const CommentsRetrieverC = (props: {
  post: PostI
}) => {
  return (
    <List>
      Loading commments.
    </List>
  )
}

interface AppDispatchProps {
  goHome: () => void
}
function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goHome: () => dispatch(push('/')),
    ...ownprops
  }
}

export const CommentsRetriever = connect(null, mapDispatchToProps)(withMyStyle(CommentsRetrieverC))

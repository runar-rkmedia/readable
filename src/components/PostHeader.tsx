import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import Typography from 'material-ui/Typography'
import EditIcon from 'material-ui-icons/Edit'
import IconButton from 'material-ui/IconButton'
import * as moment from 'moment'
import { APIPostI } from '../interfaces'
import { Voter } from './'
import decorate from '../style'
import { urls } from '../utils'

interface Props {
  post: APIPostI
}

export const PostHeaderC = decorate<Props & AppDispatchProps>((props) => {
  const { post, classes } = props
  const { author, title, timestamp } = post
  const date = moment(timestamp || undefined).calendar()
  return (
    <div>
      <Typography gutterBottom={true} type="headline" color="inherit">
        {title}
      </Typography>
      <Typography type="subheading" color="inherit" className={classes.postcommentDetails}>
        <span>by {author}. {date}</span>
        <span>
          <IconButton onClick={() => props.goTo(urls.editPost(post))}>
            <EditIcon />
          </IconButton>
          <Voter post={post} />
        </span>
      </Typography>
    </div>
  )
})

interface AppDispatchProps {
  goTo: (path: string) => void
}
function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goTo: (path: string) => dispatch(push(path)),
    ...ownprops
  }
}

export const PostHeader = connect(null, mapDispatchToProps)(PostHeaderC)

import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Dispatch } from 'react-redux'
import { PostI } from '../interfaces'

import { withMyStyle, WithMyStyle } from '../style/base'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
// import Avatar from 'material-ui/Avatar'
import Grid from 'material-ui/Grid'
// import AuthorAvatar from 'material-ui-icons/Face'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'

class PostView extends React.Component<{
  post: PostI
} & AppDispatchProps & WithMyStyle> {
  state: {
    post: PostI
  } = {
    post: { ...this.props.post }
  }
  handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      post: {
        ...this.state.post,
        [prop]: event.target.value,
      }
    })
  }

  render() {
    const { classes, theme } = this.props
    const { author, title, body, voteScore } = this.state.post
    return (
      <div className={classes.root}>
        <Paper className={classes.formRoot} elevation={4}>
          <Typography gutterBottom={true} type="headline" color="inherit">
            {title}
          </Typography>
          <Typography gutterBottom={true} type="subheading" color="inherit">
            <Grid container={true} justify="space-between" alignItems="baseline">
              <span>by {author}</span>
              <Grid item={true}>
                {voteScore}
                <IconButton className={classes.button} aria-label="Vote up">
                  <ThumbUp color={theme.status.upVote} />
                </IconButton>
                <IconButton className={classes.button} aria-label="Vote down">
                  <ThumbDown color={theme.status.downVote} />
                </IconButton>

              </Grid>
            </Grid>
          </Typography>
        </Paper>
        <Paper className={classes.formRoot} elevation={4}>
          <Typography gutterBottom={true} type="body1" color="inherit">
            {body}
          </Typography>
        </Paper>
      </div>
    )
  }
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

export default connect(null, mapDispatchToProps)(withMyStyle(PostView))

import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Dispatch } from 'react-redux'

import styles from '../style/base'

const ButtonAppBar = (props: {
  handleDrawerToggle: () => void
} & any) => {
  const { classes } = props
  return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="contrast"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={props.goHome} type="title" color="inherit" noWrap={true}>
            Readable<small> – comments and posts</small>
                  </Typography>
        </Toolbar>
      </AppBar>
  )
}

export interface AppDispatchProps {
  goHome: () => void
}
export function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goHome: () => dispatch(push('/')),
  }
}

export default connect(null, mapDispatchToProps)(withStyles((styles as any), { withTheme: true })(ButtonAppBar))

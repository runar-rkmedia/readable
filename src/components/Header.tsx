import * as React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import { push } from 'react-router-redux'
import { LinearProgress } from 'material-ui/Progress'
import { connect, Dispatch } from 'react-redux'
import { StoreStateI } from '../interfaces'
import { urls } from '../utils/'
import decorate from '../style'

interface Props {
  handleDrawerToggle: () => void
}

const HeaderC = decorate<Props & SidebarMappedProps & DispatchProps>((props) => {
  const { loading, classes, theme } = props
  return (
    <div>
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
          <Typography onClick={props.goHome} type="title" color="inherit" className={classes.link}>
            Readable
          </Typography>
        </Toolbar>
        <div style={{ height: 5, marginTop: -5 }}>
          {loading && (
            <LinearProgress mode="query" style={{ color: theme!.palette.common.darkWhite }} />
          )}</div>
      </AppBar>
    </div>
  )
})
interface SidebarMappedProps {
  loading: boolean
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { categories, posts } = state
  return {
    postIsSending: posts.sending,
    loading: posts.loading || categories.loading || posts.sending,
    ...ownprops
  }
}

interface DispatchProps {
  goHome: () => void
}
function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ownprops: any) {
  return {
    goHome: () => dispatch(push(urls.root)),
    ...ownprops
  }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderC)

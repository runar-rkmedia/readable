import * as React from 'react'
import { withMyStyle, WithMyStyle } from '../style'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import { CategoryList } from '../components/'
// import {  } from 'material-ui/Progress'

const LeftDrawerC = (props: {
  handleDrawerToggle: () => void
  open: boolean
  loading: boolean
} & WithMyStyle) => {
  const { classes, theme, loading } = props
  const drawer = (
    <div>
      <div className={classes.drawerHeader} />
      {loading && (
        <div className={classes.textCenter}>Categories are loading...</div>
      )}
      <Divider />
      <CategoryList />
    </div>
  )
  return (
    <div className="">
      <Hidden mdUp={true}>
        <Drawer
          type="temporary"
          onClick={props.handleDrawerToggle}
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown={true} implementation="css">
        <Drawer
          type="permanent"
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  )
}

export const LeftDrawer = withMyStyle(LeftDrawerC)

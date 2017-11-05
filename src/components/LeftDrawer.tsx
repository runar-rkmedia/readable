import * as React from 'react'
import { withMyStyle } from '../style/base'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import CategoryList from '../components/CategoryList'

const LeftDrawer = (props: {
  handleDrawerToggle: () => void
  open: boolean
}) => {
  const { classes, theme } = (props as any)
  const drawer = (
    <div>
      <div className={classes.drawerHeader} />
      <Divider/>
      <CategoryList/>
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

export default withMyStyle(LeftDrawer)

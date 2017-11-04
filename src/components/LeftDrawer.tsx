import * as React from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import Divider from 'material-ui/Divider'
import CategoryList from '../components/CategoryList'
import styles from '../style/base'

const LeftDrawer = (props: {
  handleDrawerToggle: () => void
  open: boolean
} & any) => {
  const { classes, theme } = props
  const drawer = (
    <div>
      <div className={classes.drawerHeader} />
      <Divider/>
      <CategoryList onSetOpen={props.onSetOpen}/>
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

export default withStyles((styles as any), { withTheme: true })(LeftDrawer)

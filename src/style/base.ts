import { withStyles, StyleRules, Theme } from 'material-ui/styles'

export const withMyStyle = (component: any) => (
  withStyles(styles, { withTheme: true })(component) as typeof component
)

export interface WithMyStyle {
  classes: any
  theme: Theme
}

const drawerWidth = 280
const sidebariconWidth = '3em'
const sidebariconHeight = '3em'
const headerIconsWidth = '1.5em'
const headerIconsHeight = '1.5em'
const styles = (theme: Theme): StyleRules => ({
  root: {
    width: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  link: {
    cursor: 'pointer'
  },
  sidebarCategoryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  sidebaricon: {
    // padding: '0.2em',
    width: sidebariconWidth,
    maxWidth: sidebariconWidth,
    height: sidebariconHeight,
    minHeight: sidebariconHeight,
  },
  headericon: {
    padding: '0 0.2em',
    width: headerIconsWidth,
    maxWidth: headerIconsWidth,
    height: headerIconsHeight,
    minHeight: headerIconsHeight,
  },
})

export default styles

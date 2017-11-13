import { StyleRules } from 'material-ui/styles'
import { myTheme } from './'
import green from 'material-ui/colors/green'
import grey from 'material-ui/colors/grey'
import red from 'material-ui/colors/red'

const drawerWidth = 280
const sidebariconWidth = '3em'
const headerIconsWidth = '1.5em'
const headerIconsHeight = '1.5em'
export const styles = (theme: typeof myTheme): StyleRules => ({
  root: {
    width: '100%',
    minHeight: '100%',
    zIndex: 1,
    flexGrow: 1,
    fontFamily: theme.typography.fontFamily
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
  formRoot: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  pullRight: {
    // width: '100%',
    float: 'right',
    // extend: 'clearFix'
  },
  clearFix: {
    '&:after': {
      display: 'block',
      clear: 'both',
      content: '""'
    }
  },
  authorName: {
    fontWeight: 'bold',
    marginRight: theme.spacing.unit,
  },
  commentsPaper: {
    backgroundColor: grey[100],
  },
  commentHeader: {
    extend: 'postcommentDetails',
    marginBottom: '2ex'
  },
  commentTime: {
    fontSize: '.75em',
    color: grey[500]
  },
  commentDivider: {
    width: 'calc(100% - 2em)',
    margin: [theme.spacing.unit * 2, 'auto', theme.spacing.unit * 3]
  },
  commentListDivider: {
    width: 'calc(100% - 2em)',
    margin: [theme.spacing.unit * 4, 'auto', theme.spacing.unit * 5],
  },
  authorAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  editCommentField: {
    backgroundColor: '#fff'
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
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0
  },
  voteButton: {
    marginRight: '-5px',
    marginLeft: '-5px',
    '&:disabled': {
      color: grey[500]
    },
  },
  downVoteButton: {
    color: red[500]
  },
  upVoteButton: {
    color: green[500]
  },
  textCenter: {
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  content: {
    backgroundColor: theme.palette.background.default,
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
  justifyContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  postcommentDetails: {
    extend: 'justifyContent',
    alignItems: 'baseline',
    marginTop: '-20px'
  },
  postDetails: {
    extend: 'postcommentDetails',
    marginTop: '-5px'
  },
  sidebaricon: {
    // padding: '0.2em',
    width: sidebariconWidth,
    maxWidth: sidebariconWidth,
  },
  headericon: {
    padding: '0 0.2em',
    width: headerIconsWidth,
    maxWidth: headerIconsWidth,
    height: headerIconsHeight,
    minHeight: headerIconsHeight,
  },
  badge: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  }
})

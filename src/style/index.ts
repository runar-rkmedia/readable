export { withStyles, WithStyles } from 'material-ui/styles'
import { withStyles } from 'material-ui/styles'
import { createMuiTheme } from 'material-ui/styles'
import primary from 'material-ui/colors/blueGrey'
import recondary from 'material-ui/colors/red'
import { styles } from './'
export * from './style'

const decorate = withStyles(styles, { withTheme: true })
export const myTheme = createMuiTheme({
  palette: {
    primary: primary,
    secondary: recondary,
  },
  status: {
    danger: 'orange',
    upVote: 'green',
    downVote: 'red',
  },
})

export default decorate

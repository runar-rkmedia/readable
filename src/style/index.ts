import { withStyles } from 'material-ui/styles'
import { createMuiTheme } from 'material-ui/styles'
import primary from 'material-ui/colors/blueGrey'
import recondary from 'material-ui/colors/red'
import styles from './style'

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

export const withMyStyle = (component: any): any => (
  withStyles(styles, { withTheme: true })(component)
)

export interface WithMyStyle {
  classes: any
  theme: typeof myTheme
}

export default styles

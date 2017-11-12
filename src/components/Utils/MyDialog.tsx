import * as React from 'react'
import Button from 'material-ui/Button'
import { PropTypes } from 'material-ui/'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

interface Props {
  title: string
  onRef: (f: any) => any
  OKCallback: () => any
  open?: boolean
  agreeText: string
  agreeColor?: PropTypes.Color
  disagreeText?: string
  disagreeColor?: PropTypes.Color
  children?: any
}

interface State {
  dialogOpen: boolean
}
export class MyDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      dialogOpen: this.props.open || false
    }
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  handleDialog = (open: boolean = !this.state.dialogOpen) => {
    this.setState({
      dialogOpen: open
    })
  }
  CallBack = () => {
    this.close()
    this.props.OKCallback()
  }
  close = () => this.handleDialog(false)
  open = () => this.handleDialog(true)
  render() {
    const { title,
      disagreeText, agreeText, disagreeColor, agreeColor, children } = this.props
    const { close, CallBack } = this
    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          onRequestClose={close}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {children}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color={disagreeColor || 'primary'}>
              {disagreeText || 'Cancel'}
            </Button>
            <Button onClick={CallBack} color={agreeColor || 'accent'} autoFocus={true}>
              {agreeText}
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }
}

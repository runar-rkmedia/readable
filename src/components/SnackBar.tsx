import * as React from 'react'
import { withMyStyle, WithMyStyle } from '../style'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'

interface Props {
  message: string
  open: boolean
  onClose: () => void
}

const SnackBarC = (props: Props & WithMyStyle) => {
  const { message, open, onClose, classes } = props
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onRequestClose={onClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  )
}

export const SnackBar = withMyStyle(SnackBarC)

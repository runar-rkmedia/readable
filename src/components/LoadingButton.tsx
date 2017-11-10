import * as React from 'react'
import decorate from '../style'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import MenuIcon from 'material-ui-icons/Add'
interface Props {
  onSubmit: () => void
  showLoading: boolean
  isDisabled: boolean
  text: string
}

export const LoadingButton = decorate<Props>((props) => {
  const { classes, onSubmit, showLoading, isDisabled, text } = props
  return (
    <Button
      disabled={isDisabled}
      raised={true}
      color="primary"
      dense={true}
      aria-label={text}
      onClick={() => onSubmit()}
      className={classes.button}
    >
      {showLoading ? (
        <CircularProgress size={18} />
      ) : ( <MenuIcon/> )}
      {text}
    </Button>
  )
})

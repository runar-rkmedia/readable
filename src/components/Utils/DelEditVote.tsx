import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import EditIcon from 'material-ui-icons/Edit'
import DeleteIcon from 'material-ui-icons/Delete'
import IconButton from 'material-ui/IconButton'
import ArrowDropDown from 'material-ui-icons/ArrowDropDown'
import Menu, { MenuItem } from 'material-ui/Menu'

import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Hidden from 'material-ui/Hidden'
import { APIPostI, APICommentI } from 'interfaces'
import { Voter, DeleteDialog, DeleteDialogType } from 'components'
import decorate, { WithStyles } from 'style'
import { urls } from 'utils'
const classNames = require('classnames')

interface Props {
  post?: APIPostI
  comment?: APICommentI
  styleName?: any
  editAction?: () => any
  noBreakPoint?: boolean
}
interface State {
  anchorElement: any
  menuOpen: boolean
}
type ExtendedProps = Props & WithStyles & AppDispatchProps
const DelEditVoteC = decorate(
  class extends React.Component<ExtendedProps, State> {
    state = {
      anchorElement: undefined,
      menuOpen: false
    }
    delDialog: DeleteDialogType
    voter = () => {
      const { post, comment } = this.props
      return (<Voter {...{ post, comment }} />)
    }
    handleClick = (event: React.MouseEvent<any>) => {
      this.setState({ menuOpen: true, anchorElement: event.currentTarget })
    }
    handleRequestClose = (action?: () => void) => {
      this.setState({ menuOpen: false })
      if (action) {
        action()
      }
    }
    delAction = () => this.delDialog.dialog.open()
    editAction = () => {
      const { editAction, post, goTo } = this.props
      if (editAction) {
        return editAction()
      }
      return post && goTo(urls.editPost(post))
    }
    render() {
      const { post, comment, classes, styleName, noBreakPoint } = this.props
      const { menuOpen, anchorElement } = this.state
      const { handleRequestClose, editAction, delAction, voter } = this
      return (
        <div className={classNames(classes.delEditVote, styleName)}>
          {!noBreakPoint && (<Hidden smUp={true}>
            <Button
              dense={true}
              onClick={this.handleClick}
            >
              <ArrowDropDown />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorElement}
              open={menuOpen}
              onRequestClose={() => this.handleRequestClose()}
            >
              <MenuItem
                onClick={() => handleRequestClose(editAction)}
              >
                Edit
              </MenuItem>
              <MenuItem onClick={() => handleRequestClose(delAction)}>
                Delete
              </MenuItem>
              <Divider />
              <MenuItem>
                {voter()}
              </MenuItem>
              ))}

            </Menu>
          </Hidden >)}
          <Hidden xsDown={!noBreakPoint}>
            <IconButton onClick={editAction}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={delAction}>
              <DeleteIcon />
            </IconButton>
            {voter()}
          </Hidden>
          <DeleteDialog
            {...{ post, comment }}
            onRef={(ref: DeleteDialogType) => (this.delDialog = ref)}
          />
        </div >
      )
    }
  })

interface AppDispatchProps {
  goTo: (path: string) => void
}
function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>, ownprops: any) {
  return {
    goTo: (path: string) => dispatch(push(path)),
    ...ownprops
  }
}

export const DelEditVote = connect(null, mapDispatchToProps)(DelEditVoteC)

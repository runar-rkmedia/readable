import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { PostList } from 'components'
import { APIPostI, StoreStateI } from 'interfaces'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import SortIcon from 'material-ui-icons/Sort'
import AscIcon from 'material-ui-icons/KeyboardArrowUp'
import DescIcon from 'material-ui-icons/KeyboardArrowDown'
import Typography from 'material-ui/Typography'
import decorate, { WithStyles } from 'style'
import { setSortBy, setSortOrder } from 'actions'

interface Props {
  posts: APIPostI[]
}

interface Sortables {
  [s: string]: string
}

type orderType = 1 | -1

interface State {
  anchorElement: any
  menuOpen: boolean
}

const sortables: Sortables = {
  timestamp: 'Date',
  category: 'Category',
  author: 'Author',
  commentCount: 'Comments',
  voteScore: 'Popularity',
}

type ExtendedProps = Props & WithStyles & MappedProps & DispatchProps

export const SortablePostListC = decorate(
  class extends React.Component<ExtendedProps, State> {
    constructor(props: ExtendedProps) {
      super(props)
      this.state = {
        anchorElement: null,
        menuOpen: false,
      }
    }
    handleClick = (event: React.MouseEvent<any>) => {
      this.setState({ menuOpen: true, anchorElement: event.currentTarget })
    }

    handleRequestClose = (selectedSort: string = this.props.sortBy) => {
      this.props.saveSortby(selectedSort)
      this.setState({ menuOpen: false })
    }
    toggleOrder(order: orderType = (this.props.sortOrder * -1 as orderType)) {
      this.props.saveSortOrder(order)
    }
    render() {
      if (!this.props.posts.length) {
        return (
          <Typography type="subheading">
            There doesn't seem to be any posts in this category yet. Why don't you create one?
            </Typography>
        )
      }
      const { posts, classes, sortOrder, sortBy } = this.props
      const { menuOpen, anchorElement } = this.state
      return (
        <div>
          <div className={classes.justifyContent}>
            <Button
              raised={true}
              dense={true}
              aria-owns={menuOpen ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <span className={classes.buttonLabel}>
                <SortIcon />Sort by {sortables[sortBy]}
              </span>
            </Button>
            <Button
              raised={true}
              dense={true}
              onClick={() => this.toggleOrder()}
            >
              {sortOrder === -1 ? (
                <span className={classes.buttonLabel}>
                  <AscIcon style={{ position: 'relative', top: '.5em' }} />Ascending
                  </span>
              ) : (
                  <span className={classes.buttonLabel}>
                    <DescIcon style={{ position: 'relative', top: '.5em' }} />Descending
                  </span>
                )}
            </Button>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorElement}
            open={menuOpen}
            onRequestClose={() => this.handleRequestClose()}
          >
            {Object.keys(sortables).map((key => (
              <MenuItem
                key={key}
                onClick={() => this.handleRequestClose(key)}
              >{sortables[key]}
              </MenuItem>
            )))}
          </Menu>
          <PostList
            showCategory={true}
            posts={posts.sort((a: any, b: any) => {
              if (a[sortBy] > b[sortBy]) {
                return -1 * sortOrder
              }
              if (a[sortBy] < b[sortBy]) {
                return 1 * sortOrder
              }
              return 0
            })}
          />
        </div>
      )
    }
  })
interface MappedProps extends Props {
  sortBy: string
  sortOrder: orderType
}
const mapStateToProps = (state: StoreStateI, ownprops: any) => {
  const { settings } = state
  return {
    sortBy: settings.sortBy,
    sortOrder: settings.order,
    ...ownprops
  }
}
interface DispatchProps {
  saveSortby: (sortBy: string) => void,
  saveSortOrder: (order: orderType) => void,
}

function mapDispatchToProps(dispatch: Dispatch<DispatchProps>, ): DispatchProps {
  return {
    saveSortby: (sortBy) => dispatch(setSortBy(sortBy)),
    saveSortOrder: (order) => dispatch(setSortOrder(order)),
  }
}
export const SortablePostList = connect(
  mapStateToProps, mapDispatchToProps
)(SortablePostListC)

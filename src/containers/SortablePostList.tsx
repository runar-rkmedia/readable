import * as React from 'react'
import { PostList } from 'components'
import { APIPostI } from 'interfaces'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
import SortIcon from 'material-ui-icons/Sort'
import AscIcon from 'material-ui-icons/KeyboardArrowUp'
import DescIcon from 'material-ui-icons/KeyboardArrowDown'
import decorate, { WithStyles } from 'style'

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
  selectedSort: string
  order: orderType
}

const sortables: Sortables = {
  timestamp: 'Date',
  category: 'Category',
  author: 'Author',
  commentCount: 'Comments',
  voteScore: 'Popularity',
}

type ExtendedProps = Props & WithStyles
export const SortablePostList = decorate(
  class extends React.Component<ExtendedProps, State> {
    constructor(props: ExtendedProps) {
      super(props)
      this.state = {
        anchorElement: null,
        menuOpen: false,
        selectedSort: 'timestamp',
        order: 1
      }
    }
    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      this.setState({ menuOpen: true, anchorElement: event.currentTarget })
    }

    handleRequestClose = (selectedSort: string = this.state.selectedSort) => {
      this.setState({ menuOpen: false, selectedSort })
    }
    toggleOrder(order: orderType = (this.state.order * -1 as orderType)) {
      this.setState({ order })
    }
    render() {
      const { posts, classes } = this.props
      const { menuOpen, anchorElement, selectedSort, order } = this.state
      return (
        <div>
          <div className={classes.justifyContent}>
            <Button
              raised={true}
              aria-owns={menuOpen ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <span className={classes.buttonLabel}>
                <SortIcon />Sort by {sortables[selectedSort]}
              </span>
            </Button>
            <Button
              raised={true}
              onClick={() => this.toggleOrder()}
            >
              {order === -1 ? (
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
              if (a[selectedSort] > b[selectedSort]) {
                return -1 * order
              }
              if (a[selectedSort] < b[selectedSort]) {
                return 1 * order
              }
              return 0
            })}
          />
        </div>
      )
    }
  })

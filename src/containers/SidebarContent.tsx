import * as React from 'react'
import Categories from '../components/Catagories'

import '../style/Sidebar.css'

export class SidebarContent extends React.Component<{
  onSetOpen: (open: boolean) => void
}> {
  render() {
    return (
      <div className="sidebar">
        <div className="App-header">
          <h2>Menu</h2>
        </div>
          <Categories
            onSetOpen={this.props.onSetOpen}
          />
      </div>
    )
  }
}

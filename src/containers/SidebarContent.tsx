import * as React from 'react'
import { Category, Catagories } from '../components/Catagories'

import '../style/Sidebar.css'

export class SidebarContent extends React.Component<{
  catagories: Category[]
  onSetOpen: (open: boolean) => void
}> {
  render() {
    return (
      <div className="sidebar">
        <div className="App-header">
          <h2>Menu</h2>
        </div>
        {this.props.catagories && (
          <Catagories
            list={this.props.catagories}
            onSetOpen={this.props.onSetOpen}
          />
        )}
      </div>
    )
  }
}

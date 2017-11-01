import * as React from 'react'
import { Catagory, Catagories } from '../components/Catagories'

import '../style/Sidebar.css'

export class SidebarContent extends React.Component<{
  catagories: Catagory[]
  onSetOpen: (open: boolean) => void
}> {
  render() {
    return (
      <div className="sidebar">
        <div className="App-header">
          <h2>Menu</h2>
        </div>
        <Catagories
          list={(this.props as any).catagories}
          onSetOpen={this.props.onSetOpen}
        />
      </div>
    )
  }
}

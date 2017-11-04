import * as React from 'react'
import CategoryList from '../components/CategoryList'

import '../style/Sidebar.css'

export class SidebarContent extends React.Component<{
  onSetOpen: (open: boolean) => void
}> {
  render() {
    return (
      <div className="sidebar">
        <CategoryList
          onSetOpen={this.props.onSetOpen}
        />
      </div>
    )
  }
}

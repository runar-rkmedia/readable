import { Link } from 'react-router-dom'
import * as React from 'react'

const Header = (props: {
  toggleSidebar: (e: any) => void
} ) => (
    <div className="App-header">
      <button onClick={(e) => props.toggleSidebar(e)}>dslkfj</button>
      <h2>
        <Link to="/">Readable<small> – comments and posts</small></Link>
      </h2>
    </div>
  )

export default Header

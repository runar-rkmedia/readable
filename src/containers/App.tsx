import * as React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import { connect } from 'react-redux'
import {
  mapStateToProps,
  mapDispatchToProps,
  AppDispatchProps
} from '../store/mapper'
import { SidebarContent } from './SidebarContent'
import { Category } from '../components/Catagories'
import { Post } from '../components/Posts'

import '../style/App.css'

const mql = window.matchMedia(`(min-width: 800px)`)

class App extends React.Component<{
  posts: Post[]
  categories: Category[]
} & AppDispatchProps> {
  state = {
    mql: mql,
    sidebarDocked: false,
    sidebarDockedOpen: false,
  }
  constructor(props: any) {
    super(props)
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    this.onSetOpen = this.onSetOpen.bind(this)
  }
  componentDidMount() {
    this.props.fetchCategories()
  }
  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: this.state.mql.matches })
  }

  onSetOpen(open: boolean) {
    this.setState({ sidebarDockedOpen: open })
  }
  toggleSidebar(e: any) {
    e.preventDefault()
    this.setState({ sidebarDockedOpen: !this.state.sidebarDocked })
  }
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mql, sidebarDocked: mql.matches })
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }
  render() {
    var sideBareContent = (
      <SidebarContent
        catagories={(this.props as any).categories}
        onSetOpen={this.onSetOpen}
      />
    )
    const sidebarProps = {
      onSetOpen: () => this.onSetOpen(false),
      sidebar: sideBareContent,
      docked: this.state.sidebarDocked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.sidebarDockedOpen,
      touch: true,
      shadow: true,
      transitions: true,
    }
    return (
      <div className="App">
        <Sidebar {...sidebarProps}>
          <div className="App-header">
            <button onClick={(e) => this.toggleSidebar(e)}>dslkfj</button>
            <h2>
              <Link to="/">Readable<small> – comments and posts</small></Link>
            </h2>
          </div>
          <div>stuff</div>
        </Sidebar>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

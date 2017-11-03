import * as React from 'react'
import Sidebar from 'react-sidebar'
import { connect } from 'react-redux'
import { SidebarContent } from './SidebarContent'
import Header from '../components/Header'
import { fetchCategories } from '../actions/categories'
import { Dispatch } from 'react-redux'

import '../style/App.css'

const mql = window.matchMedia(`(min-width: 800px)`)

class App extends React.Component<AppDispatchProps> {
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
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mql, sidebarDocked: mql.matches })
  }
  componentDidMount() { this.props.fetchCategories() }
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }
  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: this.state.mql.matches })
  }
  onSetOpen(open: boolean) { this.setState({ sidebarDockedOpen: open }) }
  toggleSidebar = (e: any) => {
    e.preventDefault()
    this.setState({ sidebarDockedOpen: !this.state.sidebarDocked })
  }
  render() {
    var sideBareContent = (
      <SidebarContent onSetOpen={this.onSetOpen}/>
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
          <Header toggleSidebar={this.toggleSidebar}/>
          <div>stuff</div>
        </Sidebar>
      </div>
    )
  }
}

export interface AppDispatchProps {
  // getPost: any
  fetchCategories: any
}

export function mapDispatchToProps(dispatch: Dispatch<AppDispatchProps>): AppDispatchProps {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(null, mapDispatchToProps)(App)

import React, { Component } from 'react'
import { object } from 'prop-types'
import Menu from './menu'
import SSConfig from './ss_config'

const MENUS = [{
  name: '运行',
  id: 0,
  Comp: SSConfig,
}, {
  name: 'ss',
  id: 1,
}, {
  name: 'http-proxy',
  id: 2,
}]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { config } = this.props

    return (
      <div>
        <Menu
          menus={MENUS}
          onChange={id => console.log('id', id)}
        />
      </div>
    )
  }
}

App.propTypes = {
  config: object,
}

App.defaultProps = {
  config: {},
}

export default App

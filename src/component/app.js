import React, { Component } from 'react'
import { object } from 'prop-types'
import Menu from './menu'
import SSConfig from './ss_config'

const MENUS = [{
  name: '运行',
  id: 0,
}, {
  name: 'SS',
  id: 1,
  Comp: SSConfig,
}, {
  name: 'HTTP PROXY',
  id: 2,
}]

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // id: MENUS[0].id,
      id: MENUS[1].id,
    }
  }

  render() {
    const { config } = this.props
    const { id } = this.state
    const item = MENUS.find(i => i.id === id)
    const element = item.Comp ? React.createElement(item.Comp) : null

    return (
      <div>
        <Menu
          initialId={id}
          menus={MENUS}
          onChange={i => this.setState({
            id: i,
          })}
        />
        <div
          style={{
            padding: '0 10px',
          }}
        >
          {element}
        </div>
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

import React, { Component } from 'react'
import { object } from 'prop-types'
import SSConfig from './ss_config'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { config } = this.props

    return (
      <div>
        <SSConfig />
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
